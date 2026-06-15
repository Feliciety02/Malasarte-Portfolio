import { useEffect, useMemo, useRef, useState } from "react";
import burpSuiteLogo from "@/assets/tools/burpsuite.svg";
import canvaLogo from "@/assets/tools/canva.svg";
import cssLogo from "@/assets/tools/css3.svg";
import figjamLogo from "@/assets/tools/figjam.svg";
import figmaLogo from "@/assets/tools/figma.svg";
import framerLogo from "@/assets/tools/framer.svg";
import gitLogo from "@/assets/tools/git.svg";
import githubLogo from "@/assets/tools/github.svg";
import googleColabLogo from "@/assets/tools/googlecolab.svg";
import googleWorkspaceLogo from "@/assets/tools/googleworkspace.svg";
import htmlLogo from "@/assets/tools/html5.svg";
import intelliJLogo from "@/assets/tools/intellijidea.svg";
import javaLogo from "@/assets/tools/java.svg";
import javascriptLogo from "@/assets/tools/javascript.svg";
import jupyterLogo from "@/assets/tools/jupyter.svg";
import laravelLogo from "@/assets/tools/laravel.svg";
import microsoftOfficeLogo from "@/assets/tools/msoffice.svg";
import mySqlLogo from "@/assets/tools/mysql.svg";
import nextJsLogo from "@/assets/tools/nextdotjs.svg";
import phpLogo from "@/assets/tools/php.svg";
import phpMyAdminLogo from "@/assets/tools/phpmyadmin.svg";
import postmanLogo from "@/assets/tools/postman.svg";
import pythonLogo from "@/assets/tools/python.svg";
import reactLogo from "@/assets/tools/react.svg";
import tailwindCssLogo from "@/assets/tools/tailwindcss.svg";
import typescriptLogo from "@/assets/tools/typescript.svg";
import vsCodeLogo from "@/assets/tools/vscode.svg";
import wiresharkLogo from "@/assets/tools/wireshark.svg";
import xamppLogo from "@/assets/tools/xampp.svg";

type Tool = { name: string; slug: string; color: string; category: string };

type Body = {
  id: string;
  name: string;
  slug: string;
  color: string;
  category: string;
  width: number;
  height: number;
  capRadius: number;
  halfLength: number;
  mass: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  av: number;
  asleep: boolean;
};

type DragState = {
  id: string;
  offsetX: number;
  offsetY: number;
  lastX: number;
  lastY: number;
  lastTime: number;
};

const MOBILE_TOKEN_SIZE = 64;
const GLOBE_PADDING = 14;
const COLLISION_PADDING = 2;
const POSITION_ITERATIONS = 12;
const BOUNDARY_BOUNCE = 0.06;
const BODY_BOUNCE = 0.03;
const LINEAR_DAMPING = 0.965;
const ANGULAR_DAMPING = 0.91;
const CONTACT_FRICTION = 0.34;
const WALL_FRICTION = 0.22;
const GRAVITY = 2600;
const SLEEP_SPEED = 6;
const SLEEP_ANGULAR_SPEED = 0.012;
const WAKE_SPEED = 14;

type ToolIcon = {
  src: string;
};

const TOOL_ICONS: Record<string, ToolIcon> = {
  figma: { src: figmaLogo },
  figjam: { src: figjamLogo },
  framer: { src: framerLogo },
  canva: { src: canvaLogo },
  vscode: { src: vsCodeLogo },
  xampp: { src: xamppLogo },
  git: { src: gitLogo },
  github: { src: githubLogo },
  postman: { src: postmanLogo },
  mysql: { src: mySqlLogo },
  phpmyadmin: { src: phpMyAdminLogo },
  jupyter: { src: jupyterLogo },
  googlecolab: { src: googleColabLogo },
  msoffice: { src: microsoftOfficeLogo },
  googleworkspace: { src: googleWorkspaceLogo },
  wireshark: { src: wiresharkLogo },
  burpsuite: { src: burpSuiteLogo },
  html5: { src: htmlLogo },
  css3: { src: cssLogo },
  javascript: { src: javascriptLogo },
  typescript: { src: typescriptLogo },
  react: { src: reactLogo },
  nextdotjs: { src: nextJsLogo },
  tailwindcss: { src: tailwindCssLogo },
  php: { src: phpLogo },
  laravel: { src: laravelLogo },
  java: { src: javaLogo },
  python: { src: pythonLogo },
  intellijidea: { src: intelliJLogo },
};

export function GlassDome({
  tools,
  reducedMotion,
  activeCategory,
}: {
  tools: readonly Tool[];
  reducedMotion: boolean;
  activeCategory: string | null;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bodiesRef = useRef<Body[]>([]);
  const dragRef = useRef<DragState | null>(null);
  const moveHistoryRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const frameRef = useRef<number | null>(null);
  const lastFrameRef = useRef<number | null>(null);
  const [size, setSize] = useState(560);
  const [bodies, setBodies] = useState<Body[]>([]);
  const [revealedId, setRevealedId] = useState<string | null>(null);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ro = new ResizeObserver(() => {
      const nextWidth = el.clientWidth;
      setSize(Math.min(nextWidth, 860));
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const globeRadius = size * 0.41;
  const isCompact = size < 640;

  const baseBodies = useMemo<Body[]>(
    () =>
      tools.map((tool, index) => {
        const pillSize = MOBILE_TOKEN_SIZE;
        const capRadius = pillSize * 0.5 - 1 + COLLISION_PADDING * 0.5;
        const halfLength = 0;
        const itemsPerRow = 6;
        const column = index % itemsPerRow;
        const row = Math.floor(index / itemsPerRow);
        const columnCenter = (itemsPerRow - 1) * 0.5;
        const rowOffset = row % 2 === 0 ? 0 : 24;
        const x = (column - columnCenter) * (isCompact ? 70 : 78) + rowOffset * 0.7;
        const y = -globeRadius * 0.7 - row * 62;

        return {
          id: tool.slug,
          name: tool.name,
          slug: tool.slug,
          color: tool.color,
          category: tool.category,
          width: pillSize,
          height: pillSize,
          capRadius,
          halfLength,
          mass: pillSize * 0.12,
          x,
          y,
          vx: 0,
          vy: 0,
          angle: 0,
          av: 0,
          asleep: false,
        };
      }),
    [globeRadius, isCompact, tools],
  );

  const particles = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, index) => ({
        id: index,
        left: 16 + ((index * 17) % 68),
        top: 12 + ((index * 23) % 70),
        size: 2 + ((index * 7) % 4),
        duration: 3.5 + ((index * 5) % 7) * 0.5,
        delay: ((index * 3) % 5) * 0.35,
      })),
    [],
  );

  useEffect(() => {
    bodiesRef.current = baseBodies.map((body) => ({ ...body }));
    setBodies(baseBodies.map((body) => ({ ...body })));
    dragRef.current = null;
  }, [baseBodies]);

  useEffect(() => {
    const simulate = (timestamp: number) => {
      const previousTime = lastFrameRef.current ?? timestamp;
      const dt = Math.min((timestamp - previousTime) / 1000, 1 / 30);
      lastFrameRef.current = timestamp;

      const snapshot = bodiesRef.current.map((body) => ({ ...body }));
      stepPhysics(snapshot, dt, globeRadius, dragRef.current);
      bodiesRef.current = snapshot;
      setBodies(snapshot.map((body) => ({ ...body })));
      frameRef.current = window.requestAnimationFrame(simulate);
    };

    frameRef.current = window.requestAnimationFrame(simulate);
    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
      lastFrameRef.current = null;
    };
  }, [globeRadius]);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const local = getLocalPoint(event.clientX, event.clientY, containerRef.current);
    if (!local) return;

    const now = performance.now();
    const previousMove = moveHistoryRef.current;
    if (previousMove && !dragRef.current) {
      const elapsed = Math.max((now - previousMove.time) / 1000, 0.001);
      const dx = local.x - previousMove.x;
      const dy = local.y - previousMove.y;
      const speed = Math.hypot(dx, dy) / elapsed;

      if (speed > 900) {
        applyShakeImpulse(
          bodiesRef.current,
          local.x,
          local.y,
          dx / elapsed,
          dy / elapsed,
          globeRadius,
        );
      }
    }
    moveHistoryRef.current = { x: local.x, y: local.y, time: now };

    const drag = dragRef.current;
    if (!drag) return;

    event.preventDefault();
    const body = bodiesRef.current.find((item) => item.id === drag.id);
    if (!body) return;

    const targetX = local.x - drag.offsetX;
    const targetY = local.y - drag.offsetY;
    const clamped = clampBodyToGlobe(body, targetX, targetY, globeRadius);
    const dt = Math.max((now - drag.lastTime) / 1000, 0.001);

    body.vx = (clamped.x - drag.lastX) / dt;
    body.vy = (clamped.y - drag.lastY) / dt;
    body.x = clamped.x;
    body.y = clamped.y;
    body.av = clamp(body.vx * 0.014, -1.8, 1.8);
    body.angle = clamp(body.angle + body.av * dt, -0.28, 0.28);

    dragRef.current = {
      ...drag,
      lastX: clamped.x,
      lastY: clamped.y,
      lastTime: now,
    };
  };

  const handlePointerLeave = () => {
    moveHistoryRef.current = null;
  };

  const handlePointerUp = () => {
    dragRef.current = null;
  };

  useEffect(() => {
    window.addEventListener("pointerup", handlePointerUp);
    return () => window.removeEventListener("pointerup", handlePointerUp);
  }, []);

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative mx-auto aspect-square w-full"
      style={{ perspective: 1400 }}
    >
      <div
        aria-hidden
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 35%, rgba(255,255,255,0.16), transparent 44%), radial-gradient(circle at 70% 72%, rgba(255,255,255,0.08), transparent 32%), linear-gradient(180deg, rgba(24,25,26,0.96), rgba(9,10,11,0.98) 68%, rgba(4,5,6,1))",
          boxShadow: "0 40px 120px rgba(0, 0, 0, 0.6)",
        }}
      />

      <div style={{ transformStyle: "preserve-3d" }} className="relative h-full w-full">
        <div
          aria-hidden
          className="absolute inset-[5%] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15), rgba(255,255,255,0.04) 42%, transparent 70%)",
          }}
        />

        <div
          aria-hidden
          className="absolute inset-[7%] overflow-hidden rounded-full border border-white/18"
          style={{
            background:
              "radial-gradient(circle at 28% 18%, rgba(255,255,255,0.28), rgba(255,255,255,0.06) 24%, rgba(30,31,32,0.34) 54%, rgba(4,5,6,0.58) 82%), radial-gradient(circle at 70% 80%, rgba(255,255,255,0.08), transparent 26%), radial-gradient(circle at 24% 72%, rgba(255,255,255,0.06), transparent 28%)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            boxShadow:
              "inset 0 0 80px rgba(255,255,255,0.1), inset 0 -42px 90px rgba(8,10,24,0.55), 0 32px 80px rgba(0,0,0,0.45)",
          }}
        >
          <div
            aria-hidden
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "conic-gradient(from 110deg, transparent 0deg, rgba(255,255,255,0.08) 42deg, transparent 110deg, rgba(255,255,255,0.06) 180deg, transparent 240deg, rgba(255,255,255,0.07) 310deg, transparent 360deg)",
              mixBlendMode: "screen",
            }}
          />

          <div
            aria-hidden
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 50% 84%, rgba(255,255,255,0.16), transparent 30%), radial-gradient(circle at 50% 94%, rgba(255,255,255,0.06), transparent 20%)",
            }}
          />

          {particles.map((particle) => (
            <span
              key={particle.id}
              aria-hidden
              className="absolute rounded-full bg-white/65"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                width: particle.size,
                height: particle.size,
                boxShadow: `0 0 ${particle.size * 6}px rgba(255, 255, 255, 0.28)`,
                filter: "blur(0.4px)",
                opacity: 0.25,
              }}
            />
          ))}

          <div
            aria-hidden
            className="absolute left-[10%] top-[7%] h-[18%] w-[48%] rounded-full"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(255,255,255,0.5), rgba(255,255,255,0) 72%)",
              filter: "blur(5px)",
            }}
          />
        </div>

        <div className="absolute inset-[7%] overflow-hidden rounded-full">
          {bodies.map((body) => {
            const isDragging = dragRef.current?.id === body.id;
            const isRevealed = revealedId === body.id;

            const startLongPress = () => {
              if (longPressTimer.current) clearTimeout(longPressTimer.current);
              longPressTimer.current = setTimeout(() => {
                setRevealedId(body.id);
              }, 400);
            };

            const cancelLongPress = () => {
              if (longPressTimer.current) {
                clearTimeout(longPressTimer.current);
                longPressTimer.current = null;
              }
              setRevealedId(null);
            };

            return (
              <button
                key={body.id}
                type="button"
                aria-label={`${body.name} tool`}
                onPointerDown={(event) => {
                  const local = getLocalPoint(event.clientX, event.clientY, containerRef.current);
                  if (!local) return;

                  event.currentTarget.setPointerCapture(event.pointerId);
                  dragRef.current = {
                    id: body.id,
                    offsetX: local.x - body.x,
                    offsetY: local.y - body.y,
                    lastX: body.x,
                    lastY: body.y,
                    lastTime: performance.now(),
                  };
                  body.asleep = false;
                  startLongPress();
                }}
                onPointerUp={() => {
                  cancelLongPress();
                }}
                onPointerLeave={() => {
                  cancelLongPress();
                }}
                className="absolute left-1/2 top-1/2 cursor-grab rounded-full outline-none active:cursor-grabbing"
                style={{
                  width: body.width,
                  height: body.height,
                  transform: `translate3d(${body.x - body.width / 2}px, ${body.y - body.height / 2}px, 0) rotate(${body.angle}rad)`,
                  transition: isDragging ? "none" : "box-shadow 180ms ease, filter 180ms ease",
                  zIndex: isRevealed ? 40 : isDragging ? 30 : 10,
                  touchAction: "none",
                }}
              >
                <div
                  className="relative flex h-full w-full items-center justify-center rounded-full border border-white/20"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.2), rgba(255,255,255,0.08)), linear-gradient(135deg, rgba(20,22,24,0.9), rgba(44,45,47,0.58))",
                    boxShadow: isDragging
                      ? "0 22px 34px rgba(0,0,0,0.32), 0 0 24px rgba(255,255,255,0.08)"
                      : "0 14px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.16)",
                    backdropFilter: "blur(14px)",
                    WebkitBackdropFilter: "blur(14px)",
                    filter: isDragging ? "brightness(1.06)" : "none",
                  }}
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-full"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.14), transparent 34%, transparent 62%, rgba(255,255,255,0.06))",
                    }}
                  />
                  <span
                    className="relative grid shrink-0 place-items-center overflow-hidden rounded-lg border border-white/14"
                    style={{
                      width: 40,
                      height: 40,
                      background: "linear-gradient(180deg, rgba(6,7,8,0.78), rgba(38,39,41,0.54))",
                      boxShadow:
                        activeCategory === body.category
                          ? `0 0 20px #${body.color}66, 0 0 60px #${body.color}33, 0 0 18px rgba(255,255,255,0.08)`
                          : "0 0 18px rgba(255,255,255,0.08)",
                    }}
                  >
                    <ToolLogo
                      slug={body.slug}
                      name={body.name}
                      color={body.color}
                      isActive={activeCategory === body.category}
                    />
                  </span>

                  {isRevealed ? (
                    <span
                      className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/15 bg-[#1a1b1d] px-2.5 py-1 text-[11px] font-medium text-white shadow-xl"
                      style={{
                        backdropFilter: "blur(12px)",
                      }}
                    >
                      {body.name}
                    </span>
                  ) : null}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ToolLogo({
  slug,
  name,
  color,
  isActive,
}: {
  slug: string;
  name: string;
  color: string;
  isActive: boolean;
}) {
  const icon = TOOL_ICONS[slug];

  if (!icon) {
    return (
      <span
        aria-hidden
        className="select-none text-[10px] font-semibold uppercase tracking-[-0.01em] text-white"
        style={{
          opacity: isActive ? 1 : 0.4,
          filter: isActive ? "none" : "grayscale(1)",
        }}
      >
        {name.slice(0, 2)}
      </span>
    );
  }

  return (
    <span aria-hidden className="grid h-full w-full place-items-center">
      <img
        src={icon.src}
        alt=""
        aria-hidden
        className="h-[70%] w-[70%] object-contain transition-all duration-300"
        style={{
          filter: isActive ? "none" : "grayscale(1) brightness(1.15)",
          transition: "filter 0.3s ease",
        }}
      />
    </span>
  );
}

function stepPhysics(bodies: Body[], dt: number, globeRadius: number, dragState: DragState | null) {
  const dragId = dragState?.id ?? null;
  const damping = Math.pow(LINEAR_DAMPING, dt * 60);
  const angularDamping = Math.pow(ANGULAR_DAMPING, dt * 60);

  for (const body of bodies) {
    if (body.id === dragId) continue;
    if (body.asleep) continue;

    body.vy += GRAVITY * dt;
    body.vx *= damping;
    body.vy *= damping;
    body.av *= angularDamping;
    body.x += body.vx * dt;
    body.y += body.vy * dt;
    body.angle = clamp(body.angle + body.av * dt, -0.34, 0.34);
  }

  for (let iteration = 0; iteration < POSITION_ITERATIONS; iteration += 1) {
    resolveBodyCollisions(bodies, dragId);
    resolveBoundaryCollisions(bodies, globeRadius, dragId);
  }

  for (const body of bodies) {
    if (body.id === dragId) continue;

    const speed = Math.hypot(body.vx, body.vy);
    const nearRest = speed < 18 && Math.abs(body.av) < 0.08;
    if (nearRest) {
      body.vx *= 0.62;
      body.vy *= 0.62;
      body.av *= 0.44;
      body.angle *= 0.95;

      if (speed < SLEEP_SPEED) {
        body.vx = 0;
        body.vy = 0;
      }
      if (Math.abs(body.av) < SLEEP_ANGULAR_SPEED) {
        body.av = 0;
      }
      if (Math.abs(body.angle) < 0.008) {
        body.angle = 0;
      }
      if (body.vx === 0 && body.vy === 0 && body.av === 0) {
        body.asleep = true;
      }
    } else {
      body.asleep = false;
    }
  }
}

function resolveBoundaryCollisions(bodies: Body[], globeRadius: number, dragId: string | null) {
  for (const body of bodies) {
    const limit = globeRadius - getBoundaryExtent(body) - GLOBE_PADDING;
    const distance = Math.hypot(body.x, body.y);
    if (distance <= limit) continue;

    const nx = distance === 0 ? 0 : body.x / distance;
    const ny = distance === 0 ? 1 : body.y / distance;
    body.x = nx * limit;
    body.y = ny * limit;

    if (body.id === dragId) continue;
    body.asleep = false;

    const normalVelocity = body.vx * nx + body.vy * ny;
    if (normalVelocity > 0) {
      body.vx -= (1 + BOUNDARY_BOUNCE) * normalVelocity * nx;
      body.vy -= (1 + BOUNDARY_BOUNCE) * normalVelocity * ny;
    }

    const tangentX = -ny;
    const tangentY = nx;
    const tangentVelocity = body.vx * tangentX + body.vy * tangentY;

    body.vx -= tangentX * tangentVelocity * WALL_FRICTION;
    body.vy -= tangentY * tangentVelocity * WALL_FRICTION;
    body.vx *= 0.992;
    body.vy *= 0.992;
    body.av += clamp((body.vx * ny - body.vy * nx) * 0.00035, -0.035, 0.035);
  }
}

function resolveBodyCollisions(bodies: Body[], dragId: string | null) {
  for (let index = 0; index < bodies.length; index += 1) {
    const first = bodies[index];
    for (let inner = index + 1; inner < bodies.length; inner += 1) {
      const second = bodies[inner];
      const collision = getCapsuleCollision(first, second);

      if (!collision) continue;

      const { nx, ny, overlap } = collision;
      const firstLocked = first.id === dragId;
      const secondLocked = second.id === dragId;
      const separation = overlap + 0.02;

      first.asleep = false;
      second.asleep = false;

      if (firstLocked && !secondLocked) {
        second.x += nx * separation;
        second.y += ny * separation;
      } else if (!firstLocked && secondLocked) {
        first.x -= nx * separation;
        first.y -= ny * separation;
      } else {
        first.x -= nx * separation * 0.5;
        first.y -= ny * separation * 0.5;
        second.x += nx * separation * 0.5;
        second.y += ny * separation * 0.5;
      }

      const rvx = second.vx - first.vx;
      const rvy = second.vy - first.vy;
      const separatingVelocity = rvx * nx + rvy * ny;
      const firstInvMass = firstLocked ? 0 : 1 / first.mass;
      const secondInvMass = secondLocked ? 0 : 1 / second.mass;
      const invMassSum = firstInvMass + secondInvMass;

      if (separatingVelocity < 0 && invMassSum > 0) {
        const impulse = (-(1 + BODY_BOUNCE) * separatingVelocity) / invMassSum;
        const impulseX = impulse * nx;
        const impulseY = impulse * ny;

        if (!firstLocked) {
          first.vx -= impulseX * firstInvMass;
          first.vy -= impulseY * firstInvMass;
        }
        if (!secondLocked) {
          second.vx += impulseX * secondInvMass;
          second.vy += impulseY * secondInvMass;
        }

        const tx = -ny;
        const ty = nx;
        const tangentVelocity = rvx * tx + rvy * ty;
        const frictionImpulse = clamp((-tangentVelocity * CONTACT_FRICTION) / invMassSum, -14, 14);

        if (!firstLocked) {
          first.vx -= tx * frictionImpulse * firstInvMass;
          first.vy -= ty * frictionImpulse * firstInvMass;
          first.av -= clamp(frictionImpulse * 0.0035, -0.032, 0.032);
        }
        if (!secondLocked) {
          second.vx += tx * frictionImpulse * secondInvMass;
          second.vy += ty * frictionImpulse * secondInvMass;
          second.av += clamp(frictionImpulse * 0.0035, -0.032, 0.032);
        }
      }
    }
  }
}

function applyShakeImpulse(
  bodies: Body[],
  originX: number,
  originY: number,
  velocityX: number,
  velocityY: number,
  globeRadius: number,
) {
  for (const body of bodies) {
    const dx = body.x - originX;
    const dy = body.y - originY;
    const distance = Math.hypot(dx, dy);
    const falloff = Math.max(0.2, 1 - distance / (globeRadius * 1.15));
    body.vx += velocityX * 0.0075 * falloff;
    body.vy += velocityY * 0.0075 * falloff;
    body.av += clamp((velocityX - velocityY) * 0.00008 * falloff, -0.22, 0.22);
    if (Math.hypot(body.vx, body.vy) > WAKE_SPEED || Math.abs(body.av) > SLEEP_ANGULAR_SPEED) {
      body.asleep = false;
    }
  }
}

function clampToCircle(x: number, y: number, limit: number) {
  const distance = Math.hypot(x, y);
  if (distance <= limit) return { x, y };
  const scale = limit / distance;
  return { x: x * scale, y: y * scale };
}

function clampBodyToGlobe(body: Body, x: number, y: number, globeRadius: number) {
  const limit = globeRadius - getBoundaryExtent(body) - GLOBE_PADDING;
  return clampToCircle(x, y, limit);
}

function getBoundaryExtent(body: Body) {
  const axis = getAxis(body.angle);
  const radial = normalize(body.x, body.y, 0, 1);
  const axialProjection = Math.abs(axis.x * radial.x + axis.y * radial.y);
  return body.capRadius + body.halfLength * axialProjection;
}

function getCapsuleCollision(first: Body, second: Body) {
  const firstAxis = getAxis(first.angle);
  const secondAxis = getAxis(second.angle);
  const firstStart = {
    x: first.x - firstAxis.x * first.halfLength,
    y: first.y - firstAxis.y * first.halfLength,
  };
  const firstEnd = {
    x: first.x + firstAxis.x * first.halfLength,
    y: first.y + firstAxis.y * first.halfLength,
  };
  const secondStart = {
    x: second.x - secondAxis.x * second.halfLength,
    y: second.y - secondAxis.y * second.halfLength,
  };
  const secondEnd = {
    x: second.x + secondAxis.x * second.halfLength,
    y: second.y + secondAxis.y * second.halfLength,
  };

  const closest = closestPointsBetweenSegments(firstStart, firstEnd, secondStart, secondEnd);
  const dx = closest.bx - closest.ax;
  const dy = closest.by - closest.ay;
  const distance = Math.hypot(dx, dy);
  const minDistance = first.capRadius + second.capRadius;

  if (distance >= minDistance) return null;

  const normal =
    distance > 0.0001
      ? { x: dx / distance, y: dy / distance }
      : normalize(second.x - first.x, second.y - first.y, 1, 0);

  return {
    nx: normal.x,
    ny: normal.y,
    overlap: minDistance - Math.max(distance, 0.0001),
  };
}

function closestPointsBetweenSegments(
  a0: { x: number; y: number },
  a1: { x: number; y: number },
  b0: { x: number; y: number },
  b1: { x: number; y: number },
) {
  const ux = a1.x - a0.x;
  const uy = a1.y - a0.y;
  const vx = b1.x - b0.x;
  const vy = b1.y - b0.y;
  const wx = a0.x - b0.x;
  const wy = a0.y - b0.y;

  const a = ux * ux + uy * uy;
  const b = ux * vx + uy * vy;
  const c = vx * vx + vy * vy;
  const d = ux * wx + uy * wy;
  const e = vx * wx + vy * wy;
  const epsilon = 0.000001;
  const denominator = a * c - b * b;

  let sN: number;
  let sD = denominator;
  let tN: number;
  let tD = denominator;

  if (denominator < epsilon) {
    sN = 0;
    sD = 1;
    tN = e;
    tD = c;
  } else {
    sN = b * e - c * d;
    tN = a * e - b * d;

    if (sN < 0) {
      sN = 0;
      tN = e;
      tD = c;
    } else if (sN > sD) {
      sN = sD;
      tN = e + b;
      tD = c;
    }
  }

  if (tN < 0) {
    tN = 0;
    if (-d < 0) {
      sN = 0;
    } else if (-d > a) {
      sN = sD;
    } else {
      sN = -d;
      sD = a;
    }
  } else if (tN > tD) {
    tN = tD;
    if (-d + b < 0) {
      sN = 0;
    } else if (-d + b > a) {
      sN = sD;
    } else {
      sN = -d + b;
      sD = a;
    }
  }

  const sc = Math.abs(sN) < epsilon ? 0 : sN / sD;
  const tc = Math.abs(tN) < epsilon ? 0 : tN / tD;

  return {
    ax: a0.x + sc * ux,
    ay: a0.y + sc * uy,
    bx: b0.x + tc * vx,
    by: b0.y + tc * vy,
  };
}

function getAxis(angle: number) {
  return { x: Math.cos(angle), y: Math.sin(angle) };
}

function normalize(x: number, y: number, fallbackX: number, fallbackY: number) {
  const length = Math.hypot(x, y);
  if (length < 0.0001) return { x: fallbackX, y: fallbackY };
  return { x: x / length, y: y / length };
}

function getLocalPoint(clientX: number, clientY: number, element: HTMLDivElement | null) {
  if (!element) return null;
  const rect = element.getBoundingClientRect();
  return {
    x: clientX - rect.left - rect.width / 2,
    y: clientY - rect.top - rect.height / 2,
  };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}
