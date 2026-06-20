import "@tanstack/react-start/server-only";

import { createClient } from "@supabase/supabase-js";

let supabaseAdminClient:
  | ReturnType<typeof createClient>
  | undefined;

export function isAdminPersistenceConfigured() {
  return Boolean(
    (process.env.VITE_SUPABASE_URL || "").trim() &&
      (process.env.SUPABASE_SERVICE_ROLE_KEY || "").trim(),
  );
}

export function getAdminSupabaseClient() {
  const url = process.env.VITE_SUPABASE_URL?.trim();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!url || !serviceRoleKey) {
    throw new Error("Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  }

  supabaseAdminClient ??= createClient(url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  return supabaseAdminClient;
}
