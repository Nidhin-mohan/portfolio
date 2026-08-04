// Tsukuyomi stage — one fullscreen fragment shader.
// Everything is signed-distance fields: the eye, the blades, the crosses.
// No geometry, no textures, no three.js. One quad.

export const VERT = /* glsl */ `
attribute vec2 aPos;
void main() {
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

export const FRAG = /* glsl */ `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2  uRes;
uniform float uTime;
uniform float uPhase;   // 0 = dormant void, 1 = fully inside the illusion
uniform float uCharge;  // 0..1 hold progress; also drives tomoe -> mangekyo morph
uniform float uFlash;   // 0..1 impulse at the moment of the cast
uniform float uMotion;  // 1 = animate, 0 = prefers-reduced-motion
uniform vec2  uMouse;   // -1..1, cursor

#define VOID    vec3(0.019, 0.019, 0.023)
#define CRIMSON vec3(0.839, 0.086, 0.157)
#define BLOOD   vec3(0.361, 0.024, 0.063)
#define EMBER   vec3(0.980, 0.310, 0.220)
#define BONE    vec3(0.871, 0.835, 0.788)
#define TAU3    2.0943951

float hash21(vec2 p) {
  p = fract(p * vec2(233.34, 851.73));
  p += dot(p, p + 23.45);
  return fract(p.x * p.y);
}

mat2 rot(float a) {
  float c = cos(a), s = sin(a);
  return mat2(c, -s, s, c);
}

float sdCircle(vec2 p, float r) {
  return length(p) - r;
}

float sdBox(vec2 p, vec2 b) {
  vec2 d = abs(p) - b;
  return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
}

float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}

// A magatama drawn as shrinking discs swept along an arc.
// morph 0 -> the fat comma of a three-tomoe Sharingan.
// morph 1 -> the long curved blade of the Mangekyo. Same shape, different sweep.
float sdBlade(vec2 p, float morph) {
  float d = 1e9;
  float sweep = mix(1.25, 2.60, morph);
  float headR = mix(0.055, 0.034, morph);
  float orbit = mix(0.082, 0.098, morph);
  for (int i = 0; i < 12; i++) {
    float t = float(i) / 11.0;
    float a = t * sweep;
    float rr = mix(headR, headR * 0.10, t);
    float rad = orbit * (1.0 + t * morph * 0.55);
    vec2 q = p - vec2(cos(a), sin(a)) * rad;
    d = smin(d, sdCircle(q, rr), 0.014);
  }
  return d;
}

// Returns the black marks (blades + pupil); reports iris and rim edges out-of-band.
float sdEye(vec2 p, float spin, float morph, out float iris, out float rim) {
  rim = sdCircle(p, 0.215);
  iris = sdCircle(p, 0.150);
  float marks = 1e9;
  for (int i = 0; i < 3; i++) {
    marks = min(marks, sdBlade(rot(-(spin + float(i) * TAU3)) * p, morph));
  }
  return min(marks, sdCircle(p, mix(0.040, 0.026, morph)));
}

// One receding band of the endless crosses. band 0 = nearest, 1 = far.
float crossBand(vec2 p, float band) {
  float scale = mix(0.155, 0.042, band);
  float spacing = mix(0.42, 0.115, band);
  float ybase = mix(-0.40, -0.17, band);

  float id = floor((p.x + spacing * 0.5) / spacing);
  float j = hash21(vec2(id, 31.7 + band * 17.0));
  float h = scale * (0.80 + j * 0.45);

  vec2 q = p;
  q.x = mod(q.x + spacing * 0.5, spacing) - spacing * 0.5;
  q.x += (j - 0.5) * spacing * 0.28;
  q.y -= ybase + h;

  float post = sdBox(q, vec2(h * 0.10, h));
  float arm = sdBox(q - vec2(0.0, h * 0.44), vec2(h * 0.42, h * 0.09));
  return min(post, arm);
}

void main() {
  vec2 frag = gl_FragCoord.xy;
  vec2 uv = (frag - 0.5 * uRes) / uRes.y;
  float t = uTime;
  float px = 1.6 / uRes.y;

  // The world bends toward the eye as the genjutsu takes hold.
  float r = length(uv);
  float pull = (uCharge * 0.9 + uPhase * 0.22) * uMotion;
  uv *= 1.0 + sin(r * 20.0 - t * 3.0) * 0.007 * pull - uCharge * 0.05 * exp(-r * 2.2);
  uv = rot(pull * 0.09 * exp(-r * 1.5) * sin(t * 0.6)) * uv;

  // ---- sky: black overhead bleeding to blood at the horizon
  float horizon = -0.16;
  vec3 world = mix(BLOOD * 0.85, VOID, smoothstep(horizon - 0.04, 0.66, uv.y));
  world = mix(world, VOID * 0.35, smoothstep(horizon + 0.02, horizon - 0.08, uv.y));
  world += EMBER * 0.10 * exp(-abs(uv.y - horizon) * 40.0);

  // ---- the endless crosses, silhouetted flat black
  float cd = min(crossBand(uv, 0.0), min(crossBand(uv, 0.5), crossBand(uv, 1.0)));
  world = mix(world, VOID * 0.12, 1.0 - smoothstep(0.0, px * 1.8, cd));

  vec3 col = mix(VOID, world, uPhase);

  // ---- the eye. It starts centred and rises into the sky as the moon.
  // Portrait viewports are narrow in uv.x, so keep the moon inside the frame.
  float halfW = 0.5 * uRes.x / uRes.y;
  // Portrait frames have no horizontal room to spare, and at full size the moon
  // reaches down into the headline. Taper it as the viewport narrows: square and
  // wider keeps 0.82, a phone held upright settles at 0.62. The vertical centre
  // rides along so the top clips by the same sliver either way.
  float fit = clamp((halfW - 0.24) / 0.26, 0.0, 1.0);
  float moonS = mix(0.62, 0.82, fit);
  // Rim radius is 0.215 * scale, so the inset has to clear that or the moon
  // hangs off the edge. Below ~0.30 of half-width there is nothing left to
  // inset by and it just centres.
  vec2 moonAt = vec2(-min(0.42, max(halfW - 0.30, 0.0)), mix(0.34, 0.28, fit));
  vec2 center = mix(vec2(0.0, 0.14), moonAt, uPhase);
  float scale = mix(1.0, moonS, uPhase) * (1.0 + uCharge * 0.55);
  vec2 ep = (uv - center) / scale - uMouse * 0.010 * (1.0 - uPhase);
  float ew = 1.6 / (scale * uRes.y);

  float spin = t * (0.30 + uCharge * 6.5 + uPhase * 0.18) * uMotion;
  float iris, rim;
  float marks = sdEye(ep, spin, uCharge, iris, rim);

  // moonlight / killing-intent bloom
  col += CRIMSON * exp(-max(rim, 0.0) * mix(9.0, 5.5, uPhase))
       * (0.20 + uCharge * 0.55 + uPhase * 0.45);

  // iris: crimson with radial fibres, hotter toward the pupil
  float ang = atan(ep.y, ep.x);
  float fibres = 0.5 + 0.5 * sin(ang * 46.0 + sin(ang * 7.0) * 2.0 + spin * 0.4);
  vec3 irisCol = CRIMSON * (0.76 + 0.30 * fibres);
  irisCol = mix(irisCol, EMBER, smoothstep(0.15, 0.0, length(ep)) * 0.35);
  col = mix(col, irisCol, 1.0 - smoothstep(0.0, ew * 1.5, iris));

  // outer rim, hairline bone
  col = mix(col, BONE * 0.88, (1.0 - smoothstep(0.0, ew * 1.4, abs(rim) - ew * 1.1)) * 0.9);

  // blades and pupil, flat black
  col = mix(col, VOID * 0.08, 1.0 - smoothstep(0.0, ew * 1.3, marks));

  // ---- grade
  // Cast impulse. A near-white full-screen flash is a photosensitivity hazard,
  // so this is a deep crimson pulse instead: squared falloff, capped well below
  // full brightness. It reads as a heartbeat rather than a camera flash.
  vec3 pulse = mix(CRIMSON, vec3(1.0, 0.93, 0.93), 0.30);
  col = mix(col, pulse, uFlash * uFlash * 0.42 * uMotion);
  col += (hash21(frag + fract(t) * 137.0) - 0.5) * 0.055;
  col *= 1.0 - smoothstep(0.34, 1.08, length(uv)) * 0.58;
  col *= 0.94 + 0.06 * sin(frag.y * 1.7);

  gl_FragColor = vec4(max(col, 0.0), 1.0);
}
`;
