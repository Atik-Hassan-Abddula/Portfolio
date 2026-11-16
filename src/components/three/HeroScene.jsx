"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Stars, Edges } from "@react-three/drei";

// Quality presets — the cube core + halo only, never heavy.
// No shadows, no postprocessing, procedural environment only.
const QUALITY = {
  high: { fov: 38, dpr: [1, 1.75], particles: 220, stars: 900 },
  medium: { fov: 39, dpr: [1, 1.5], particles: 140, stars: 500 },
  low: { fov: 41, dpr: [1, 1.2], particles: 70, stars: 0 },
};

function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Procedural studio environment (no network HDRI). A narrow "softbox"
// gradient strip is all chrome needs to pick up dramatic reflections.
function makeStudioEnv(renderer) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  // Base: deep midnight to black
  const base = ctx.createLinearGradient(0, 0, 0, 512);
  base.addColorStop(0, "#060a1f");
  base.addColorStop(0.5, "#04060f");
  base.addColorStop(1, "#02030a");
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, 1024, 512);

  // Softbox strips: electric blue, silver, violet
  const strip = (x, w, color, alpha) => {
    const g = ctx.createLinearGradient(x, 0, x + w, 0);
    g.addColorStop(0, "rgba(0,0,0,0)");
    g.addColorStop(0.5, color);
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.globalAlpha = alpha;
    ctx.fillStyle = g;
    ctx.fillRect(x, 0, w, 512);
    ctx.globalAlpha = 1;
  };
  strip(80, 260, "#38bdf8", 0.9); // cool key
  strip(430, 170, "#f1f5f9", 1.0); // silver highlight
  strip(700, 280, "#8b5cf6", 0.85); // violet rim

  // Floor glow
  const floor = ctx.createRadialGradient(512, 480, 10, 512, 480, 420);
  floor.addColorStop(0, "rgba(59,130,246,0.55)");
  floor.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = floor;
  ctx.fillRect(0, 0, 1024, 512);

  const texture = new THREE.CanvasTexture(canvas);
  texture.mapping = THREE.EquirectangularReflectionMapping;
  texture.colorSpace = THREE.SRGBColorSpace;

  const pmrem = new THREE.PMREMGenerator(renderer);
  pmrem.compileEquirectangularShader();
  const rt = pmrem.fromEquirectangular(texture);

  texture.dispose();
  pmrem.dispose();
  return rt.texture;
}

// ==========================================
// LIGHT RAYS — hover/click effects for the cube.
// One procedural beam texture (bright base fading to tip,
// feathered sides), tinted per beam. Pure additive blending.
// ==========================================
const RAY_COUNT = 12;
const PARTICLES_PER_RAY = 4;
const BURST_DURATION = 1.15; // seconds

function makeRayTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");

  // Length fade: bright at the cube, dissolving outward
  const alongY = ctx.createLinearGradient(0, 256, 0, 0);
  alongY.addColorStop(0, "rgba(255,255,255,1)");
  alongY.addColorStop(0.3, "rgba(255,255,255,0.8)");
  alongY.addColorStop(0.75, "rgba(255,255,255,0.16)");
  alongY.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = alongY;
  ctx.fillRect(0, 0, 128, 256);

  // Lateral feathering so the beam has no hard edges
  ctx.globalCompositeOperation = "destination-out";
  const alongX = ctx.createLinearGradient(0, 0, 128, 0);
  alongX.addColorStop(0, "rgba(0,0,0,1)");
  alongX.addColorStop(0.4, "rgba(0,0,0,0)");
  alongX.addColorStop(0.6, "rgba(0,0,0,0)");
  alongX.addColorStop(1, "rgba(0,0,0,1)");
  ctx.fillStyle = alongX;
  ctx.fillRect(0, 0, 128, 256);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// ==========================================
// MOUSE PARALLAX CAMERA RIG
// ==========================================
function CameraRig() {
  const target = useRef(new THREE.Vector3(0, 0, 6.4));

  useFrame((state) => {
    const { camera, pointer } = state;
    target.current.set(pointer.x * 0.85, pointer.y * 0.55, 6.4);
    camera.position.lerp(target.current, 0.04);
    camera.lookAt(0, 0.1, 0);
  });

  return null;
}

// ==========================================
// FINE PARTICLE FIELD
// ==========================================
function ParticleField({ count }) {
  const ref = useRef(null);

  const { positions, colors } = useMemo(() => {
    const rand = mulberry32(0xd16e05);
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#e2e8f0"),
      new THREE.Color("#93c5fd"),
      new THREE.Color("#c4b5fd"),
    ];
    for (let i = 0; i < count; i++) {
      const r = 3 + rand() * 3.6;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.cos(phi);
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
      const c = palette[Math.floor(rand() * palette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, [count]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += Math.min(delta, 0.05) * 0.04;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

// ==========================================
// CORE CUBE — futuristic glass cube (electric blue
// shell, soft violet energy heart, glowing edges).
// Rotates continuously on X and Y; hover eases the
// spin speed up, leaving eases it back down.
// Hover also blooms a fan of light rays from the cube;
// clicking fires a short expanding light burst.
// ==========================================
const cubeMaterialProps = {
  color: "#c7d2fe",
  metalness: 0.08,
  roughness: 0.04,
  transmission: 0.9,
  ior: 1.52,
  thickness: 1.4,
  clearcoat: 1,
  clearcoatRoughness: 0.05,
  envMapIntensity: 1.65,
  attenuationColor: "#7dd3fc",
  attenuationDistance: 2.3,
};

function CubeCore({ quality = "high" }) {
  const { gl } = useThree();
  const cubeRef = useRef(null);
  const glassMatRef = useRef(null);
  const hoverTargetRef = useRef(false);
  const hoverAmountRef = useRef(0);
  const burstAgeRef = useRef(null); // null = idle, otherwise seconds since click
  const speedRef = useRef(1);
  const raysGroupRef = useRef(null);
  const rayRefs = useRef([]);
  const shellRef = useRef(null);
  const flashRef = useRef(null);
  const particleMatRef = useRef(null);

  // Scale the cube to the stage so it always stays inside the circle
  const scale = quality === "low" ? 0.72 : quality === "medium" ? 0.82 : 0.9;

  const rayTexture = useMemo(() => makeRayTexture(), []);
  const planeGeo = useMemo(() => {
    const g = new THREE.PlaneGeometry(1, 1);
    g.translate(0, 0.5, 0); // origin at the beam base so scaling grows outward
    return g;
  }, []);

  // Deterministic beam directions (fibonacci sphere), alternating
  // electric-blue / soft-violet, with per-beam width, length, phase
  const rayDefs = useMemo(() => {
    const rand = mulberry32(0x51f15e);
    const UP = new THREE.Vector3(0, 1, 0);
    const blue = new THREE.Color("#38bdf8");
    const violet = new THREE.Color("#a78bfa");
    return Array.from({ length: RAY_COUNT }, (_, i) => {
      const y = 1 - (i / (RAY_COUNT - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = i * 2.399963; // golden angle
      const dir = new THREE.Vector3(
        Math.cos(theta) * r,
        y,
        Math.sin(theta) * r
      ).normalize();
      const color = i % 2 === 0 ? blue : violet;
      return {
        dir,
        color,
        phase: rand() * Math.PI * 2,
        width: 0.22 + rand() * 0.17,
        length: 2.1 + rand() * 1.1,
        quaternion: new THREE.Quaternion().setFromUnitVectors(UP, dir),
        material: new THREE.MeshBasicMaterial({
          map: rayTexture,
          color,
          transparent: true,
          opacity: 0,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          side: THREE.DoubleSide,
        }),
      };
    });
  }, [rayTexture]);

  // Glowing motes that travel outward along the beams
  const particleData = useMemo(() => {
    const rand = mulberry32(0xc0ffee);
    return rayDefs.flatMap((ray) =>
      Array.from({ length: PARTICLES_PER_RAY }, () => ({
        dir: ray.dir,
        color: ray.color.clone().lerp(new THREE.Color("#ffffff"), 0.4),
        offset: rand(),
        speed: 0.3 + rand() * 0.28,
      }))
    );
  }, [rayDefs]);

  const particleGeo = useMemo(() => {
    const positions = new Float32Array(particleData.length * 3);
    const colors = new Float32Array(particleData.length * 3);
    particleData.forEach((p, i) => {
      colors[i * 3] = p.color.r;
      colors[i * 3 + 1] = p.color.g;
      colors[i * 3 + 2] = p.color.b;
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return g;
  }, [particleData]);
  // Ref-held position attribute so useFrame can stream mote positions
  // (compiler rules forbid mutating useMemo values directly)
  const particleAttrRef = useRef(null);
  useEffect(() => {
    particleAttrRef.current = particleGeo.getAttribute("position");
  }, [particleGeo]);

  // Dispose of every procedural resource on unmount
  useEffect(
    () => () => {
      rayTexture.dispose();
      planeGeo.dispose();
      particleGeo.dispose();
      rayDefs.forEach((ray) => ray.material.dispose());
    },
    [rayTexture, planeGeo, particleGeo, rayDefs]
  );

  // Generate a procedural PMREM studio map once, assign to the glass
  // material via ref (never mutates hook-returned objects)
  useEffect(() => {
    const envTexture = makeStudioEnv(gl);
    const material = glassMatRef.current;
    if (material) {
      material.envMap = envTexture;
      material.needsUpdate = true;
    }
    return () => {
      if (material) {
        material.envMap = null;
        material.needsUpdate = true;
      }
      envTexture.dispose();
    };
  }, [gl]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;

    // Smoothly accelerate/decelerate toward the hover target — the base
    // rotation never stops, hover only multiplies it.
    const target = hoverTargetRef.current ? 3.15 : 1;
    speedRef.current = THREE.MathUtils.damp(speedRef.current, target, 3.5, dt);
    const cube = cubeRef.current;
    if (cube) {
      cube.rotation.y += dt * 0.42 * speedRef.current;
      cube.rotation.x += dt * 0.28 * speedRef.current;
    }

    // Hover glow energy (eased so fade-out is gradual)
    hoverAmountRef.current = THREE.MathUtils.damp(
      hoverAmountRef.current,
      hoverTargetRef.current ? 1 : 0,
      3.1,
      dt
    );
    const h = hoverAmountRef.current;

    // Click burst envelope: fast attack, silky decay (~1.15s)
    let burst = 0;
    let burstP = 1;
    if (burstAgeRef.current !== null) {
      burstAgeRef.current += dt;
      burstP = burstAgeRef.current / BURST_DURATION;
      if (burstP >= 1) {
        burstAgeRef.current = null;
      } else {
        burst = Math.pow(Math.sin(Math.PI * burstP), 1.35) * (1 - burstP * 0.3);
      }
    }

    const energy = Math.min(1.7, h + burst * 1.5);

    // Rays: breathe gently in place while hovered, flare hard on burst
    const raysGroup = raysGroupRef.current;
    if (raysGroup) raysGroup.visible = energy > 0.02;
    rayDefs.forEach((ray, i) => {
      const flicker = 0.62 + 0.38 * Math.sin(t * 1.9 + ray.phase);
      ray.material.opacity = energy * 0.5 * flicker + burst * 0.28;
      const mesh = rayRefs.current[i];
      if (mesh) {
        const reach = 0.45 + 0.62 * h + burst * 1.15;
        mesh.scale.set(
          ray.width * (1 + burst * 0.9),
          ray.length * reach,
          1
        );
      }
    });

    // Motes ride the beams outward; hidden entirely when idle
    if (particleMatRef.current) {
      particleMatRef.current.opacity = Math.min(1, energy) * 0.9;
    }
    const attr = particleAttrRef.current;
    if (attr) {
      const positions = attr.array;
      for (let i = 0; i < particleData.length; i++) {
        const p = particleData[i];
        const prog = (t * p.speed + p.offset) % 1;
        const dist = 0.5 + prog * 2.4;
        positions[i * 3] = p.dir.x * dist;
        positions[i * 3 + 1] = p.dir.y * dist;
        positions[i * 3 + 2] = p.dir.z * dist;
      }
      attr.needsUpdate = true;
    }

    // Expanding shockwave shell + light flash on click
    if (shellRef.current) {
      const shell = shellRef.current;
      if (burstAgeRef.current !== null) {
        shell.visible = true;
        shell.scale.setScalar(0.55 + burstP * 3.0);
        shell.material.opacity = Math.max(0, 1 - burstP) * 0.5;
      } else {
        shell.visible = false;
      }
    }
    if (flashRef.current) {
      flashRef.current.intensity = burst * 30;
    }
  });

  const handlePointerOver = (event) => {
    event.stopPropagation();
    hoverTargetRef.current = true;
  };
  const handlePointerOut = () => {
    hoverTargetRef.current = false;
  };
  const handleClick = (event) => {
    event.stopPropagation();
    burstAgeRef.current = 0;
  };

  return (
    <group>
      {/* Halo ring behind the cube */}
      <mesh position={[0, 0.1, -1.6]} rotation={[0.35, 0, 0]}>
        <torusGeometry args={[2.15, 0.02, 10, 96]} />
        <meshBasicMaterial color="#60a5fa" transparent opacity={0.75} />
      </mesh>
      <mesh position={[0, 0.1, -1.7]} rotation={[0.35, 0, 0]}>
        <torusGeometry args={[2.45, 0.012, 10, 96]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.45} />
      </mesh>

      <Float speed={1.35} rotationIntensity={0.18} floatIntensity={1.05}>
        {/* The glass cube — rotates continuously on X and Y */}
        <group ref={cubeRef} rotation={[-0.14, 0.5, 0]} scale={scale}>
          {/* Glass shell with glowing electric-blue edges */}
          <mesh>
            <boxGeometry args={[1.62, 1.62, 1.62]} />
            <meshPhysicalMaterial {...cubeMaterialProps} ref={glassMatRef} />
            <Edges threshold={20} color="#7dd3fc" />
          </mesh>

          {/* Inner energy cube — soft violet core */}
          <mesh>
            <boxGeometry args={[0.82, 0.82, 0.82]} />
            <meshStandardMaterial
              color="#120f2e"
              emissive="#8b5cf6"
              emissiveIntensity={2.1}
              roughness={0.3}
              metalness={0.2}
            />
          </mesh>
          <mesh rotation={[0, Math.PI / 4, 0]}>
            <boxGeometry args={[0.42, 0.42, 0.42]} />
            <meshBasicMaterial
              color="#a5f3fc"
              transparent
              opacity={0.9}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
          <pointLight position={[0, 0, 0]} intensity={8} color="#6366f1" distance={3.2} />
          <pointLight position={[0.9, 1.1, 0.9]} intensity={5} color="#22d3ee" distance={2.6} />
        </group>

        {/* Light-ray fan + traveling motes + click burst.
            Pure additive blending; group hidden entirely when idle. */}
        <group ref={raysGroupRef} scale={scale} visible={false}>
          {rayDefs.map((ray, i) => (
            <mesh
              key={i}
              ref={(m) => {
                rayRefs.current[i] = m;
              }}
              geometry={planeGeo}
              material={ray.material}
              quaternion={ray.quaternion}
              renderOrder={20}
            />
          ))}
          <points geometry={particleGeo} renderOrder={21}>
            <pointsMaterial
              ref={particleMatRef}
              size={0.075}
              vertexColors
              transparent
              opacity={0}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
              sizeAttenuation
            />
          </points>
          <mesh ref={shellRef} visible={false} renderOrder={22}>
            <sphereGeometry args={[1, 24, 24]} />
            <meshBasicMaterial
              color="#a5b4fc"
              transparent
              opacity={0}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
              side={THREE.BackSide}
            />
          </mesh>
          <pointLight
            ref={flashRef}
            position={[0, 0, 0]}
            intensity={0}
            color="#7dd3fc"
            distance={4.4}
          />
        </group>

        {/* Generous invisible hitbox for hover rays and the click burst */}
        <mesh
          position={[0, 0, 0]}
          scale={scale}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          onClick={handleClick}
        >
          <boxGeometry args={[2.3, 2.3, 2.3]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
      </Float>
    </group>
  );
}

export default function HeroScene({ quality = "high", active = true }) {
  const config = QUALITY[quality] ?? QUALITY.high;

  return (
    <Canvas
      dpr={config.dpr}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0.15, 6.4], fov: config.fov }}
      gl={{
        antialias: quality !== "low",
        alpha: true,
        powerPreference: "high-performance",
      }}
      style={{ background: "transparent" }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 3]} intensity={1.4} color="#e0f2fe" />
      <pointLight position={[-5, -2, 3]} intensity={16} color="#3b82f6" />
      <pointLight position={[5, 2, -4]} intensity={14} color="#8b5cf6" />

      <CubeCore quality={quality} />

      {config.stars > 0 && (
        <Stars
          radius={45}
          depth={35}
          count={config.stars}
          factor={2.6}
          saturation={0.3}
          fade
          speed={0.5}
        />
      )}

      <ParticleField count={config.particles} />
      <CameraRig />
    </Canvas>
  );
}
