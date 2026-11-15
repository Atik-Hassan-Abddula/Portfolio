"use client";

import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Html, Stars } from "@react-three/drei";
import * as THREE from "three";
import { techIcons } from "./techIconData";

// ==========================================
// QUALITY TIERS (high / medium / low — provided by the section)
// ==========================================
const QUALITY_CONFIG = {
  high: { fov: 40, dpr: [1, 1.75], antialias: true, particles: 420, nearParticles: 120, stars: 1600, rings: 3 },
  medium: { fov: 41, dpr: [1, 1.5], antialias: true, particles: 260, nearParticles: 80, stars: 1000, rings: 3 },
  low: { fov: 44, dpr: [1, 1.35], antialias: false, particles: 140, nearParticles: 40, stars: 600, rings: 2 },
};

// ==========================================
// PERFECT SPHERE COMPOSITION
// One round planet: 31 technologies on a Fibonacci-sphere surface,
// wrapped by concentric circular orbital rings.
// ==========================================
const SPHERE_RADIUS = 2.6;

// Rotation speed levels with smooth interpolation: 1x normal → 3x hover → 4x active
const SPEED = { normal: 1, hover: 3, active: 4 };
const BASE_SPIN = 0.1; // rad per second at 1x

// Circular orbits around the planet (radius → Ø 7.2 max, fits the square stage)
const ORBITS = [
  { radius: 3.05, tilt: [0.26, 0, -0.16], speed: 0.42, color: "#a855f7", opacity: 0.35, dots: 2 },
  { radius: 3.35, tilt: [-0.52, 0, 0.34], speed: -0.28, color: "#3b82f6", opacity: 0.3, dots: 2 },
  { radius: 3.6, tilt: [1.2, 0, 0], speed: 0.18, color: "#ec4899", opacity: 0.2, dots: 1 },
];

// Featured technologies render slightly larger than secondary ones
const PRIMARY_TECHS = new Set([
  "JavaScript",
  "TypeScript",
  "React.js",
  "Next.js",
  "Node.js",
  "Tailwind CSS",
  "MongoDB",
  "Git",
]);

// Deterministic PRNG: keeps random-looking layouts stable across re-renders
// (React Compiler forbids Math.random during render).
function mulberry32(seed) {
  let a = seed >>> 0;
  return function next() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Fibonacci sphere: even, mathematically consistent spacing — every logo
// gets a balanced latitude/longitude slot on the planet surface.
function buildSphereNodes(icons) {
  const golden = Math.PI * (3 - Math.sqrt(5));
  const rand = mulberry32(0x5fe11); // deterministic depth jitter
  return icons.map((icon, i) => {
    const y = icons.length > 1 ? 1 - (i / (icons.length - 1)) * 2 : 0;
    const flat = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    const radius = SPHERE_RADIUS + (rand() - 0.5) * 0.22;
    return {
      ...icon,
      position: [
        Math.cos(theta) * flat * radius,
        y * radius,
        Math.sin(theta) * flat * radius,
      ],
      primary: PRIMARY_TECHS.has(icon.label),
    };
  });
}

// ==========================================
// SHARED CANVAS TEXTURES (module-level cache)
// ==========================================
let haloTextureCache = null;
function getHaloTexture() {
  if (haloTextureCache) return haloTextureCache;
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255, 255, 255, 0.9)");
  g.addColorStop(0.35, "rgba(255, 255, 255, 0.28)");
  g.addColorStop(1, "rgba(255, 255, 255, 0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  haloTextureCache = new THREE.CanvasTexture(canvas);
  return haloTextureCache;
}

let dotTextureCache = null;
function getDotTexture() {
  if (dotTextureCache) return dotTextureCache;
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255, 255, 255, 1)");
  g.addColorStop(0.4, "rgba(255, 255, 255, 0.55)");
  g.addColorStop(1, "rgba(255, 255, 255, 0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  dotTextureCache = new THREE.CanvasTexture(canvas);
  return dotTextureCache;
}

let rimTextureCache = null;
function getRimTexture() {
  // Perfect circular glow hugging the planet's silhouette (purple → blue)
  if (rimTextureCache) return rimTextureCache;
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  const c = size / 2;
  const g = ctx.createRadialGradient(c, c, size * 0.42, c, c, size * 0.5);
  g.addColorStop(0, "rgba(168, 85, 247, 0)");
  g.addColorStop(0.4, "rgba(168, 85, 247, 0.6)");
  g.addColorStop(0.75, "rgba(59, 130, 246, 0.45)");
  g.addColorStop(1, "rgba(59, 130, 246, 0)");
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(c, c, c, 0, Math.PI * 2);
  ctx.fill();
  rimTextureCache = new THREE.CanvasTexture(canvas);
  return rimTextureCache;
}

// ==========================================
// PROCEDURAL ENVIRONMENT (reflections for glass + metal, no HDR download)
// ==========================================
let envTextureCache = null;
function createEnvTexture() {
  if (envTextureCache) return envTextureCache;
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");

  const bg = ctx.createLinearGradient(0, 0, 0, 256);
  bg.addColorStop(0, "#241a52");
  bg.addColorStop(0.55, "#0b1120");
  bg.addColorStop(1, "#050816");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 512, 256);

  const blobs = [
    [110, 70, "#a855f7"],
    [390, 95, "#3b82f6"],
    [255, 165, "#ec4899"],
    [490, 40, "#38bdf8"],
  ];
  for (const [x, y, color] of blobs) {
    const g = ctx.createRadialGradient(x, y, 0, x, y, 95);
    g.addColorStop(0, color);
    g.addColorStop(1, "rgba(5, 8, 22, 0)");
    ctx.globalAlpha = 0.7;
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 512, 256);
  }

  envTextureCache = new THREE.CanvasTexture(canvas);
  envTextureCache.mapping = THREE.EquirectangularReflectionMapping;
  return envTextureCache;
}

function EnvLight() {
  const gl = useThree((state) => state.gl);
  const scene = useThree((state) => state.scene);

  useEffect(() => {
    const texture = createEnvTexture();
    const pmrem = new THREE.PMREMGenerator(gl);
    const target = pmrem.fromEquirectangular(texture);
    scene.environment = target.texture;
    return () => {
      scene.environment = null;
      target.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);

  return null;
}

// ==========================================
// NODE TEXTURE: rounded glass card + brand glyph + label
// ==========================================
function roundedRectPath(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function drawRestApiBadge(ctx, color, size) {
  // Hand-drawn glyph for REST API (no official brand mark exists)
  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;

  // Thin orbit ring behind the glyph
  ctx.globalAlpha = 0.28;
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(size / 2, 104, 62, 0, Math.PI * 2);
  ctx.stroke();

  // Orbiting dot
  ctx.globalAlpha = 0.85;
  ctx.beginPath();
  ctx.arc(size / 2 + 62, 104, 7, 0, Math.PI * 2);
  ctx.fill();

  // </> glyph
  ctx.globalAlpha = 1;
  ctx.font = "700 62px 'Cascadia Code', 'Fira Code', Consolas, monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("</>", size / 2, 105);
  ctx.restore();
}

function createIconTexture(icon) {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  // Card background: subtle navy gradient
  const bg = ctx.createLinearGradient(0, 0, size, size);
  bg.addColorStop(0, "#151d38");
  bg.addColorStop(1, "#1c1445");
  roundedRectPath(ctx, 4, 4, size - 8, size - 8, 40);
  ctx.fillStyle = bg;
  ctx.fill();

  // Subtle border
  roundedRectPath(ctx, 4, 4, size - 8, size - 8, 40);
  ctx.strokeStyle = "rgba(148, 163, 184, 0.35)";
  ctx.lineWidth = 3;
  ctx.stroke();

  // Brand glyph
  if (icon.custom === "rest") {
    drawRestApiBadge(ctx, icon.color, size);
  } else {
    const glyphSize = 118;
    const vb = icon.viewBox || 24;
    const s = glyphSize / vb;
    ctx.save();
    ctx.translate((size - glyphSize) / 2, 46);
    ctx.scale(s, s);
    ctx.fillStyle = icon.color;
    ctx.fill(new Path2D(icon.path));
    ctx.restore();
  }

  // Label below the glyph
  ctx.fillStyle = "#E2E8F0";
  ctx.font = "600 21px 'Segoe UI', Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(icon.label, size / 2, 216);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

// ==========================================
// RESPONSIVE CAMERA (square stage: Ø ~7.3 world units must fit)
// ==========================================
const cameraFramingCache = new WeakMap();

function frameCamera(camera, fov) {
  const halfFov = THREE.MathUtils.degToRad(fov) / 2;
  // The stage is always 1:1, so a single fit width covers every device
  const distance = 3.95 / Math.tan(halfFov) + 0.9;
  // Dead-center framing: the camera sits exactly on the Z axis and aims at
  // the sphere's origin, so the planet projects to the precise center of
  // the viewport (no vertical/horizontal skew from camera offset).
  camera.position.set(0, 0, THREE.MathUtils.clamp(distance, 9.5, 15));
  camera.fov = fov;
  camera.updateProjectionMatrix();
  camera.lookAt(0, 0, 0);
}

function CameraRig({ fov }) {
  const camera = useThree((state) => state.camera);

  useFrame(() => {
    if (cameraFramingCache.get(camera) === fov) return;
    cameraFramingCache.set(camera, fov);
    frameCamera(camera, fov);
  });

  return null;
}

// ==========================================
// SINGLE TECHNOLOGY NODE (glass orb on the planet surface)
// ==========================================
const TechNode = memo(function TechNode({
  icon,
  position,
  primary,
  active,
  dimmed,
  tooltipScale,
  onHover,
}) {
  const slotRef = useRef(null); // surface slot (tiny bob)
  const tiltRef = useRef(null); // hover tilt + scale
  const meshRef = useRef(null); // billboarded logo plane
  const haloRef = useRef(null); // glow behind the orb
  const orbRef = useRef(null); // glass sphere
  const ringRef = useRef(null); // neon equator ring
  const phase = useMemo(
    () => (position[0] * 2.1 + position[2] * 1.7) % (Math.PI * 2),
    [position]
  );
  const texture = useMemo(() => createIconTexture(icon), [icon]);
  const haloTexture = useMemo(() => getHaloTexture(), []);
  const baseScale = primary ? 1.16 : 0.92;

  // Shared math objects (avoid per-frame allocations)
  const math = useMemo(
    () => ({
      dummy: new THREE.Object3D(),
      worldPos: new THREE.Vector3(),
      parentQuat: new THREE.Quaternion(),
      parentInv: new THREE.Quaternion(),
      localTarget: new THREE.Quaternion(),
    }),
    []
  );

  useEffect(() => () => texture.dispose(), [texture]);

  useFrame(({ camera, clock }, delta) => {
    const slot = slotRef.current;
    const tilt = tiltRef.current;
    const mesh = meshRef.current;
    if (!slot || !tilt || !mesh) return;

    // Tiny bob — kept small so the circular silhouette stays intact
    slot.position.y = position[1] + Math.sin(clock.elapsedTime * 1.1 + phase) * 0.05;

    // Featured nodes are larger; hover scales up with a spring
    const targetScale = active ? baseScale * 1.28 : baseScale;
    tilt.scale.setScalar(THREE.MathUtils.damp(tilt.scale.x, targetScale, 7, delta));
    tilt.rotation.x = THREE.MathUtils.damp(tilt.rotation.x, active ? -0.3 : 0, 6, delta);
    tilt.rotation.z = THREE.MathUtils.damp(tilt.rotation.z, active ? 0.1 : 0, 6, delta);

    // Billboard the glyph toward the camera. Compensate the planet's
    // spin + tilt so logos always face the viewer as the sphere turns.
    mesh.getWorldPosition(math.worldPos);
    const behind = math.worldPos.z < -0.35; // far side of the planet
    math.dummy.position.copy(math.worldPos);
    math.dummy.lookAt(camera.position);
    slot.getWorldQuaternion(math.parentQuat);
    math.parentInv.copy(math.parentQuat).invert();
    math.localTarget.copy(math.parentInv).multiply(math.dummy.quaternion);
    mesh.quaternion.slerp(math.localTarget, 1 - Math.exp(-5 * delta));

    // Hover glow halo
    if (haloRef.current) {
      haloRef.current.material.opacity = THREE.MathUtils.damp(
        haloRef.current.material.opacity,
        active ? 0.6 : 0,
        6,
        delta
      );
    }

    // Glass orb: brighten on hover, fade on the far side + when dimmed
    if (orbRef.current) {
      orbRef.current.material.opacity = THREE.MathUtils.damp(
        orbRef.current.material.opacity,
        active ? 0.26 : behind ? 0.07 : dimmed ? 0.09 : 0.16,
        6,
        delta
      );
    }

    // Neon equator ring: independent slow rotation + hover brighten
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.35;
      ringRef.current.material.opacity = THREE.MathUtils.damp(
        ringRef.current.material.opacity,
        active ? 0.6 : behind ? 0.1 : dimmed ? 0.14 : 0.35,
        6,
        delta
      );
    }

    // Dim far-side / sibling nodes via color (keeps the glyph opaque)
    mesh.material.color.setScalar(
      THREE.MathUtils.damp(mesh.material.color.r, behind ? 0.35 : dimmed ? 0.45 : 1, 6, delta)
    );
  });

  return (
    <group ref={slotRef} position={position}>
      <group ref={tiltRef}>
        {/* Hover glow */}
        <sprite ref={haloRef} scale={[2.5, 2.5, 1]}>
          <spriteMaterial
            map={haloTexture}
            color={icon.color}
            transparent
            opacity={0}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </sprite>

        {/* Glass orb: soft transparent surface + real env reflections */}
        <mesh
          ref={orbRef}
          onPointerOver={(event) => {
            event.stopPropagation();
            document.body.style.cursor = "pointer";
            onHover(icon.label);
          }}
          onPointerOut={() => {
            document.body.style.cursor = "";
            onHover(null);
          }}
        >
          <sphereGeometry args={[0.55, 32, 32]} />
          <meshPhysicalMaterial
            color={icon.color}
            transparent
            opacity={0.16}
            roughness={0.08}
            metalness={0.08}
            clearcoat={1}
            clearcoatRoughness={0.15}
            envMapIntensity={1.5}
            depthWrite={false}
          />
        </mesh>

        {/* Soft neon border ring orbiting the orb */}
        <mesh ref={ringRef} rotation={[Math.PI / 2.6, 0, 0.3]}>
          <torusGeometry args={[0.68, 0.007, 8, 64]} />
          <meshBasicMaterial
            color={icon.color}
            transparent
            opacity={0.35}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Brand glyph card floating inside the orb */}
        <mesh ref={meshRef}>
          <planeGeometry args={[0.76, 0.76]} />
          <meshStandardMaterial
            map={texture}
            emissive="#ffffff"
            emissiveMap={texture}
            emissiveIntensity={active ? 0.55 : 0.3}
            roughness={0.4}
            metalness={0.1}
            alphaTest={0.5}
          />
        </mesh>

        {/* Floating name tooltip (only mounted while hovered) */}
        {active && (
          <Html
            position={[0, 0.9, 0]}
            center
            distanceFactor={tooltipScale}
            zIndexRange={[40, 0]}
            style={{ pointerEvents: "none" }}
          >
            <div className="flex items-center gap-2 whitespace-nowrap rounded-full border border-white/15 bg-[#0b1120]/85 px-3.5 py-1.5 shadow-xl backdrop-blur-md">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: icon.color, boxShadow: `0 0 10px ${icon.color}` }}
              />
              <span className="text-xs font-semibold text-white">{icon.label}</span>
              <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                {icon.category}
              </span>
            </div>
          </Html>
        )}
      </group>
    </group>
  );
});

// ==========================================
// CIRCULAR ORBITAL RING (glowing torus + orbiting light dots)
// ==========================================
function OrbitRing({ orbit, speedRef }) {
  const spinRef = useRef(null);
  const torusRef = useRef(null);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    const speed = speedRef ? speedRef.current : SPEED.normal;
    const energy = THREE.MathUtils.clamp(
      (speed - SPEED.normal) / (SPEED.active - SPEED.normal),
      0,
      1
    );

    // Continuous rotation, frame-rate independent, boosted with the sphere
    if (spinRef.current) {
      spinRef.current.rotation.y += orbit.speed * speed * dt;
    }

    // Ring glow strengthens as the sphere speeds up
    if (torusRef.current) {
      torusRef.current.material.opacity = THREE.MathUtils.damp(
        torusRef.current.material.opacity,
        orbit.opacity + energy * 0.3,
        4,
        dt
      );
    }
  });

  return (
    <group rotation={orbit.tilt}>
      <group ref={spinRef}>
        {/* Glowing circular orbit path */}
        <mesh ref={torusRef} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[orbit.radius, 0.012, 8, 160]} />
          <meshBasicMaterial color={orbit.color} transparent opacity={orbit.opacity} />
        </mesh>

        {/* Small light satellites riding the ring */}
        {Array.from({ length: orbit.dots }, (_, j) => {
          const a = (j / orbit.dots) * Math.PI * 2;
          return (
            <mesh
              key={j}
              position={[Math.cos(a) * orbit.radius, 0, Math.sin(a) * orbit.radius]}
            >
              <sphereGeometry args={[0.045, 12, 12]} />
              <meshBasicMaterial color={orbit.color} transparent opacity={0.9} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

// ==========================================
// PLANET BODY (inner wall + perfect circular silhouette rim)
// ==========================================
function PlanetBody({ speedRef }) {
  const rimTexture = useMemo(() => getRimTexture(), []);
  const haloTexture = useMemo(() => getHaloTexture(), []);
  const rimRef = useRef(null);
  const haloRef = useRef(null);
  const energyRef = useRef(null);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    const speed = speedRef ? speedRef.current : SPEED.normal;
    const energy = THREE.MathUtils.clamp(
      (speed - SPEED.normal) / (SPEED.active - SPEED.normal),
      0,
      1
    );

    // Silhouette rim + atmosphere glow slightly brighter while boosted
    if (rimRef.current) {
      rimRef.current.material.opacity = THREE.MathUtils.damp(
        rimRef.current.material.opacity,
        0.55 + energy * 0.25,
        4,
        dt
      );
    }
    if (haloRef.current) {
      haloRef.current.material.opacity = THREE.MathUtils.damp(
        haloRef.current.material.opacity,
        0.13 + energy * 0.12,
        4,
        dt
      );
    }

    // Extra energy ring that only appears during the speed boost
    if (energyRef.current) {
      energyRef.current.material.opacity = THREE.MathUtils.damp(
        energyRef.current.material.opacity,
        energy * 0.4,
        4,
        dt
      );
    }
  });

  return (
    <group>
      {/* Glowing inner wall — depth backdrop behind far-side nodes */}
      <mesh>
        <sphereGeometry args={[SPHERE_RADIUS - 0.12, 48, 48]} />
        <meshBasicMaterial
          color="#1b2a55"
          transparent
          opacity={0.35}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* Perfect circular silhouette rim (always faces the camera) */}
      <sprite ref={rimRef} scale={[5.8, 5.8, 1]}>
        <spriteMaterial
          map={rimTexture}
          transparent
          opacity={0.55}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>

      {/* Electric-blue energy ring — fades in only while the sphere boosts */}
      <sprite ref={energyRef} scale={[6.3, 6.3, 1]}>
        <spriteMaterial
          map={rimTexture}
          color="#38bdf8"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>

      {/* Atmospheric halo */}
      <sprite ref={haloRef} scale={[7.4, 7.4, 1]}>
        <spriteMaterial
          map={haloTexture}
          color="#6d28d9"
          transparent
          opacity={0.13}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>
    </group>
  );
}

// ==========================================
// CENTRAL ENERGY CORE (pulsing heart of the planet)
// ==========================================
function TechCore({ speedRef }) {
  const bandsRef = useRef(null);
  const haloRef = useRef(null);
  const coreRef = useRef(null);
  const phaseRef = useRef(0);
  const haloTexture = useMemo(() => getHaloTexture(), []);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    const speed = speedRef ? speedRef.current : SPEED.normal;
    const energy = THREE.MathUtils.clamp(
      (speed - SPEED.normal) / (SPEED.active - SPEED.normal),
      0,
      1
    );

    // Accumulated phase: the heartbeat speeds up smoothly (no phase jumps)
    phaseRef.current += dt * (1.6 + energy * 1.8);
    const t = phaseRef.current;

    const bands = bandsRef.current;
    if (bands) {
      bands.rotation.y += dt * (0.28 + energy * 0.6);
      bands.rotation.z = Math.sin(t * 0.35) * 0.12;
    }
    // Heartbeat: the core's glow and emissive pulse together
    const pulse = 1 + Math.sin(t) * (0.07 + energy * 0.05);
    if (haloRef.current) {
      const s = 4.2 * pulse;
      haloRef.current.scale.set(s, s, 1);
      haloRef.current.material.opacity = 0.34 + Math.sin(t) * (0.08 + energy * 0.06);
    }
    if (coreRef.current) {
      coreRef.current.emissiveIntensity = 0.55 + Math.sin(t) * (0.2 + energy * 0.15);
    }
  });

  return (
    <Float speed={1.3} rotationIntensity={0.4} floatIntensity={0.7}>
      {/* Soft outer glow (pulsing) */}
      <sprite ref={haloRef} scale={[4.2, 4.2, 1]}>
        <spriteMaterial
          map={haloTexture}
          color="#8b5cf6"
          transparent
          opacity={0.34}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>

      {/* Crystalline core (pulsing emissive) */}
      <mesh>
        <icosahedronGeometry args={[0.95, 1]} />
        <meshStandardMaterial
          ref={coreRef}
          color="#1b1445"
          emissive="#a855f7"
          emissiveIntensity={0.55}
          roughness={0.3}
          metalness={0.45}
          envMapIntensity={1.2}
          flatShading
        />
      </mesh>

      {/* Wireframe inner shell */}
      <mesh>
        <icosahedronGeometry args={[0.62, 1]} />
        <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.35} />
      </mesh>

      {/* Energy bands */}
      <group ref={bandsRef}>
        <mesh rotation={[Math.PI / 2.25, 0, 0.35]}>
          <torusGeometry args={[1.45, 0.02, 8, 96]} />
          <meshBasicMaterial color="#a855f7" transparent opacity={0.4} />
        </mesh>
        <mesh rotation={[Math.PI / 1.85, 0, -0.5]}>
          <torusGeometry args={[1.8, 0.014, 8, 96]} />
          <meshBasicMaterial color="#3b82f6" transparent opacity={0.32} />
        </mesh>
        <mesh rotation={[Math.PI / 3.1, 0, 0.85]}>
          <torusGeometry args={[2.1, 0.008, 8, 96]} />
          <meshBasicMaterial color="#ec4899" transparent opacity={0.26} />
        </mesh>
      </group>
    </Float>
  );
}

// ==========================================
// GLOWING PARTICLES (hugging the sphere at depth)
// ==========================================
function Particles({ count, inner, outer, speed, size, speedRef }) {
  const ref = useRef(null);
  const dotTexture = useMemo(() => getDotTexture(), []);

  const { positions, colors } = useMemo(() => {
    const rand = mulberry32(0x7e3b + count);
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#a855f7"),
      new THREE.Color("#3b82f6"),
      new THREE.Color("#ec4899"),
      new THREE.Color("#7dd3fc"),
    ];
    for (let i = 0; i < count; i++) {
      // Particles live in a shell just outside the planet
      const r = inner + rand() * (outer - inner);
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.cos(phi) * 0.85;
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
      const c = palette[Math.floor(rand() * palette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, [count, inner, outer]);

  const rotRef = useRef(0);

  useFrame((_, delta) => {
    if (!ref.current) return;
    // Accumulated rotation: faster particles while boosted, no jumps
    const dt = Math.min(delta, 0.05);
    rotRef.current += dt * speed * (speedRef ? speedRef.current : SPEED.normal);
    ref.current.rotation.y = rotRef.current;
    ref.current.rotation.x = Math.sin(rotRef.current * 1.7) * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        map={dotTexture}
        vertexColors
        transparent
        opacity={0.75}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

// ==========================================
// AMBIENT DEPTH ORBS (tiny floating lights around the planet)
// ==========================================
function AmbientOrbs({ count }) {
  const orbs = useMemo(() => {
    const rand = mulberry32(0x0eb5);
    return Array.from({ length: count }, (_, i) => ({
      position: [
        (rand() - 0.5) * 9,
        (rand() - 0.5) * 6,
        (rand() - 0.5) * 7 - 2,
      ],
      size: 0.035 + rand() * 0.045,
      color: ["#a855f7", "#3b82f6", "#ec4899"][i % 3],
      speed: 0.6 + rand() * 0.8,
      phase: rand() * Math.PI * 2,
    }));
  }, [count]);

  return (
    <group>
      {orbs.map((orb, i) => (
        <Float
          key={i}
          speed={orb.speed}
          rotationIntensity={0}
          floatIntensity={1.6}
        >
          <mesh position={orb.position}>
            <sphereGeometry args={[orb.size, 8, 8]} />
            <meshBasicMaterial color={orb.color} transparent opacity={0.8} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

// ==========================================
// FULL SPHERE COMPOSITION
// (mouse rotation + entrance + orbits + core + surface nodes)
// ==========================================
function TechSphere({ quality }) {
  const parallaxRef = useRef(null); // pointer tilt + scale + entrance
  const planetRef = useRef(null); // continuous spin
  const introRef = useRef(0);
  const timeRef = useRef(0);
  const speedRef = useRef(SPEED.normal); // smoothed speed multiplier (no re-renders)
  const hoverRef = useRef(false); // cursor is over the sphere's hit-zone
  const activeUntilRef = useRef(0); // wall-clock ms until "active" 4x boost lasts
  const [activeLabel, setActiveLabel] = useState(null);

  const handleHover = useCallback((label) => setActiveLabel(label), []);

  // All 31 technologies, evenly distributed on the sphere surface
  const nodes = useMemo(() => buildSphereNodes(techIcons), []);

  const config = QUALITY_CONFIG[quality] || QUALITY_CONFIG.high;
  const orbits = useMemo(() => ORBITS.slice(0, config.rings), [config.rings]);

  useFrame(({ pointer }, delta) => {
    const dt = Math.min(delta, 0.05); // guards the delta spike after tab switches
    const group = parallaxRef.current;
    const planet = planetRef.current;
    if (!group || !planet) return;

    // Smooth speed interpolation: 1x → 3x hover → 4x active movement.
    // Pure refs — zero React re-renders per frame.
    const inside = hoverRef.current;
    const active = inside && Date.now() < activeUntilRef.current;
    const targetSpeed = !inside ? SPEED.normal : active ? SPEED.active : SPEED.hover;
    speedRef.current = THREE.MathUtils.damp(speedRef.current, targetSpeed, 2.5, dt);

    // One-time entrance: scale + rotation sweep in (~1.3s)
    introRef.current = Math.min(1, introRef.current + dt / 1.3);
    const intro = 1 - Math.pow(1 - introRef.current, 3);

    // Uniform scale only — the sphere stays perfectly round on every device
    group.scale.setScalar(
      THREE.MathUtils.damp(group.scale.x, 0.6 + 0.4 * intro, 5, dt)
    );

    timeRef.current += dt;

    // Always-on automatic rotation — starts on load, never stops, and
    // multiplies smoothly while the cursor is over the sphere.
    planet.rotation.y += dt * BASE_SPIN * speedRef.current;
    // Gentle continuous vertical sway keeps the rotation fully 3D
    planet.rotation.x = Math.sin(timeRef.current * 0.22) * 0.1;

    // Cursor tilt (eases back to center when the mouse leaves)
    group.rotation.y = THREE.MathUtils.damp(
      group.rotation.y,
      pointer.x * 0.55 + (1 - intro) * -1.1,
      2.4,
      dt
    );
    group.rotation.x = THREE.MathUtils.damp(
      group.rotation.x,
      -pointer.y * 0.42,
      2.4,
      dt
    );
  });

  return (
    <group ref={parallaxRef}>
      {/* Purple / blue / pink accent lighting */}
      <ambientLight intensity={0.75} />
      <pointLight position={[6, 4, 6]} intensity={34} color="#a855f7" />
      <pointLight position={[-6, -2, 4]} intensity={26} color="#3b82f6" />
      <pointLight position={[0, 5, -6]} intensity={22} color="#ec4899" />

      {/* Planet: energy core + surface nodes (spins continuously) */}
      <group ref={planetRef}>
        <TechCore speedRef={speedRef} />
        <pointLight intensity={8} color="#ec4899" distance={5} />
        {nodes.map((node) => (
          <TechNode
            key={node.label}
            icon={node}
            position={node.position}
            primary={node.primary}
            active={activeLabel === node.label}
            dimmed={activeLabel !== null && activeLabel !== node.label}
            tooltipScale={quality === "low" ? 9 : 7}
            onHover={handleHover}
          />
        ))}
      </group>

      {/* Planet body: inner wall + perfect circular rim glow */}
      <PlanetBody speedRef={speedRef} />

      {/* Concentric circular orbital rings */}
      {orbits.map((orbit, i) => (
        <OrbitRing key={i} orbit={orbit} speedRef={speedRef} />
      ))}

      {/* Depth particles hugging the sphere + ambient orbs */}
      <Particles count={config.particles} inner={3.3} outer={5.0} speed={0.02} size={0.075} speedRef={speedRef} />
      <Particles count={config.nearParticles} inner={2.9} outer={4.1} speed={0.032} size={0.05} speedRef={speedRef} />
      <AmbientOrbs count={quality === "low" ? 4 : 8} />

      {/* Invisible circular hit-zone over the sphere: entering it boosts the
          spin to 3x, moving within it pushes to 4x, leaving eases back to 1x.
          Touching it does the same on touch devices. It does NOT swallow
          events, so logo hover/tooltip keep working through it. */}
      <mesh
        onPointerOver={() => {
          hoverRef.current = true;
          activeUntilRef.current = Date.now() + 300;
        }}
        onPointerMove={() => {
          activeUntilRef.current = Date.now() + 300;
        }}
        onPointerOut={() => {
          hoverRef.current = false;
        }}
      >
        <sphereGeometry args={[SPHERE_RADIUS + 0.35, 24, 24]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  );
}

// ==========================================
// NEBULA LAYERS (huge soft light clouds far behind the planet)
// ==========================================
function NebulaLayers() {
  const haloTexture = useMemo(() => getHaloTexture(), []);
  const layers = useMemo(
    () => [
      // Balanced left/right pair + top/bottom accents: the soft clouds
      // carry equal visual weight on both sides so the composition
      // reads perfectly centered.
      { position: [-6, 1, -10], scale: 17, color: "#7c3aed", opacity: 0.17 },
      { position: [6, 1, -10], scale: 17, color: "#2563eb", opacity: 0.15 },
      { position: [0, 3.5, -14], scale: 15, color: "#ec4899", opacity: 0.12 },
      { position: [0, -3.5, -12], scale: 14, color: "#3b82f6", opacity: 0.1 },
    ],
    []
  );

  return (
    <group>
      {layers.map((layer, i) => (
        <sprite key={i} position={layer.position} scale={[layer.scale, layer.scale, 1]}>
          <spriteMaterial
            map={haloTexture}
            color={layer.color}
            transparent
            opacity={layer.opacity}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </sprite>
      ))}
    </group>
  );
}

// ==========================================
// SCENE (client-only, lazy-loaded by the section)
// ==========================================
export default function TechScene({ quality = "high" }) {
  const config = QUALITY_CONFIG[quality] || QUALITY_CONFIG.high;

  return (
    <Canvas
      dpr={config.dpr}
      camera={{ position: [0, 0, 11], fov: config.fov }}
      gl={{ antialias: config.antialias, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      {/* Procedural environment: real reflections for glass + metal */}
      <EnvLight />

      {/* Subtle starfield (outside the parallax group for depth layering) */}
      <Stars radius={65} depth={32} count={config.stars} factor={4} saturation={0.35} fade speed={0.6} />

      {/* Atmospheric nebula clouds far behind everything */}
      <NebulaLayers />

      <TechSphere quality={quality} />
      <CameraRig fov={config.fov} />
    </Canvas>
  );
}
