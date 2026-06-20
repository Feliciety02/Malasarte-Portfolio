import "@tanstack/react-start/server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { deleteCookie, getCookie, getRequestProtocol, setCookie } from "@tanstack/react-start/server";

const ADMIN_COOKIE_NAME = "fe_admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7;
const DEFAULT_ADMIN_USERNAME = "admin";
const DEFAULT_ADMIN_PASSWORD = "admin123";

type AdminSession = {
  username: string;
  expiresAt: number;
};

function isProduction() {
  return process.env.NODE_ENV === "production";
}

export function getAdminCredentialsConfig() {
  const username = process.env.ADMIN_USERNAME?.trim();
  const password = process.env.ADMIN_PASSWORD?.trim();

  if (username && password) {
    return {
      configured: true,
      username,
      password,
    };
  }

  if (!isProduction()) {
    return {
      configured: false,
      username: DEFAULT_ADMIN_USERNAME,
      password: DEFAULT_ADMIN_PASSWORD,
    };
  }

  return {
    configured: false,
    username: "",
    password: "",
  };
}

function getSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET?.trim();
  if (secret) return secret;
  if (!isProduction()) return "development-admin-session-secret";
  throw new Error("Missing ADMIN_SESSION_SECRET.");
}

function signValue(value: string) {
  return createHmac("sha256", getSessionSecret()).update(value).digest("hex");
}

function buildCookieValue(username: string, expiresAt: number) {
  const payload = `${username}.${expiresAt}`;
  return `${payload}.${signValue(payload)}`;
}

function verifyCookieValue(value: string): AdminSession | null {
  const parts = value.split(".");
  if (parts.length < 3) return null;

  const signature = parts.pop();
  const expiresRaw = parts.pop();
  const username = parts.join(".");

  if (!signature || !expiresRaw || !username) return null;

  const expiresAt = Number(expiresRaw);
  if (!Number.isFinite(expiresAt) || expiresAt <= Date.now()) return null;

  const payload = `${username}.${expiresAt}`;
  const expected = signValue(payload);
  const providedBuffer = Buffer.from(signature, "utf8");
  const expectedBuffer = Buffer.from(expected, "utf8");

  if (
    providedBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(providedBuffer, expectedBuffer)
  ) {
    return null;
  }

  return {
    username,
    expiresAt,
  };
}

export function readAdminSession() {
  const cookie = getCookie(ADMIN_COOKIE_NAME);
  if (!cookie) return null;
  return verifyCookieValue(cookie);
}

export function requireAdminSession() {
  const session = readAdminSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
}

export function setAdminSession(username: string) {
  const expiresAt = Date.now() + SESSION_TTL_MS;
  setCookie(ADMIN_COOKIE_NAME, buildCookieValue(username, expiresAt), {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: getRequestProtocol({ xForwardedProto: true }) === "https",
    expires: new Date(expiresAt),
  });
}

export function clearAdminSession() {
  deleteCookie(ADMIN_COOKIE_NAME, {
    path: "/",
  });
}
