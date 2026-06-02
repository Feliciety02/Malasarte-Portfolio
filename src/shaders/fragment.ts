/**
 * Premium animated background shader.
 * Technique: domain-warped FBM (fractal brownian motion) with Perlin-style
 * gradient noise. Mouse creates a soft radial push; scroll shifts the field.
 *
 * Uniforms
 *   uTime       – elapsed seconds (drives slow drift)
 *   uResolution – viewport size in px (aspect correction)
 *   uMouse      – smoothed mouse [0,1], Y-flipped
 *   uScroll     – window.scrollY / innerHeight (parallax shift)
 */
export const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec2  uResolution;
  uniform vec2  uMouse;
  uniform float uScroll;

  varying vec2 vUv;

  // ── Gradient noise ───────────────────────────────────────────────────────────

  vec2 hash2(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return fract(sin(p) * 43758.5453) * 2.0 - 1.0;
  }

  float gnoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    // Quintic smoothstep fade
    vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
    float a = dot(hash2(i),              f);
    float b = dot(hash2(i + vec2(1,0)),  f - vec2(1,0));
    float c = dot(hash2(i + vec2(0,1)),  f - vec2(0,1));
    float d = dot(hash2(i + vec2(1,1)),  f - vec2(1,1));
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  // ── FBM (4 octaves, each rotated to break grid pattern) ─────────────────────

  float fbm(vec2 p) {
    // Rotation matrix slightly above 1.5 to avoid axis alignment
    mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
    float v = 0.0;
    v += 0.5000 * gnoise(p); p = m * p;
    v += 0.2500 * gnoise(p); p = m * p;
    v += 0.1250 * gnoise(p); p = m * p;
    v += 0.0625 * gnoise(p);
    return v; // approx range [-0.47, 0.47]
  }

  // ── Domain-warped FBM — two-pass warp creates organic turbulence ─────────────

  float warpFbm(vec2 p) {
    // First warp vector
    vec2 q = vec2(fbm(p + vec2(0.00, 0.00)),
                  fbm(p + vec2(5.20, 1.30)));
    // Second warp vector (warped by q)
    vec2 r = vec2(fbm(p + 4.0 * q + vec2(1.70, 9.20)),
                  fbm(p + 4.0 * q + vec2(8.30, 2.80)));
    return fbm(p + 4.8 * r);
  }

  // ── Main ─────────────────────────────────────────────────────────────────────

  void main() {
    vec2  uv = vUv;
    float ar = uResolution.x / uResolution.y;

    // Aspect-corrected coordinate space so blobs stay circular
    vec2  st = vec2(uv.x * ar, uv.y);

    float t  = uTime * 0.055;           // very slow time drift
    float sc = uScroll * 0.38;          // scroll shifts the gradient field up

    // ── Mouse soft-push (lava-lamp feel, not aggressive) ──────────────────────

    vec2  m    = vec2(uMouse.x * ar, uMouse.y);   // aspect-corrected mouse
    float md   = length(st - m);
    vec2  mDir = (st - m) / (md + 0.001);          // safe normalize
    float mAmt = exp(-md * 1.65) * 0.15;            // gaussian falloff
    vec2  mD   = -mDir * mAmt;                      // push outward from cursor

    // ── Three noise layers at different scales ────────────────────────────────

    // Layer 1 — large, slow, fully domain-warped (the "lava" blobs)
    vec2  p1 = st * 0.50 + vec2(t * 0.30, t * 0.13 + sc) + mD;
    float n1 = warpFbm(p1);

    // Layer 2 — medium, counter-drifting secondary flow
    vec2  p2 = st * 0.76 + vec2(-t * 0.20, t * 0.18 + sc * 0.5) + mD * 0.65;
    float n2 = fbm(p2);

    // Layer 3 — fine turbulence accent (adds micro-variation)
    vec2  p3 = st * 1.45 + vec2(t * 0.17, -t * 0.12) + mD * 0.30;
    float n3 = fbm(p3);

    // ── Colour palette ────────────────────────────────────────────────────────

    vec3 base   = vec3(0.018, 0.013, 0.035);  // near-black deep purple
    vec3 purple = vec3(0.545, 0.361, 0.965);  // #8B5CF6
    vec3 blue   = vec3(0.231, 0.510, 0.965);  // #3B82F6
    vec3 cyan   = vec3(0.024, 0.714, 0.831);  // #06B6D4

    vec3 col = base;

    // Large purple cloud — very low-frequency, anchored bottom-left, slow drift
    float pn   = warpFbm(st * 0.37 + vec2(0.20, 0.28) + vec2(t * 0.04, 0.0));
    float pMsk = smoothstep(-0.10, 0.42, pn);
    col += purple * 0.23 * pMsk;

    // Blue cloud — drifts toward upper-right quadrant
    float bn   = fbm(st * 0.44 + vec2(-0.26, -0.18) + vec2(-t * 0.05, t * 0.04));
    float bMsk = smoothstep(-0.08, 0.44, bn);
    col += blue * 0.19 * bMsk;

    // Cyan accent — smaller, punchier, adds the "icy edge" highlight
    float cn   = fbm(st * 0.70 + vec2(0.48, -0.32) + vec2(t * 0.07, -t * 0.05));
    float cMsk = smoothstep(0.04, 0.50, cn);
    col += cyan * 0.12 * cMsk * 0.70;

    // Bloom where purple & blue overlap — softly glowing intersection
    col += (purple * 0.09 + blue * 0.07) * pMsk * bMsk;

    // Subtle luminosity lift in brighter noise regions
    col += col * 0.14 * smoothstep(0.40, 0.82, n1 * 0.5 + 0.5);

    // Small secondary highlight using the combined noise
    float nCom = (n1 * 0.58 + n2 * 0.28 + n3 * 0.14) * 0.5 + 0.5;
    col += cyan * 0.04 * smoothstep(0.68, 0.92, nCom);

    // ── Radial vignette — darkens edges to keep centre the focal point ─────────

    vec2  cv  = uv - 0.5;
    float vd  = dot(cv * vec2(1.05, 1.30), cv * vec2(1.05, 1.30));
    float vig = 1.0 - smoothstep(0.06, 0.62, vd);
    col = mix(base * 0.30, col, vig * 0.78 + 0.22);

    // ── Grain dither (prevents colour banding on gradients) ───────────────────

    float gr = fract(sin(dot(uv + fract(uTime * 0.09), vec2(12.9898, 78.233))) * 43758.5453);
    col += (gr - 0.5) * 0.009;

    col = clamp(col, 0.0, 1.0);

    gl_FragColor = vec4(col, 1.0);
  }
`;
