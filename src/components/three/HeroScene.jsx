"use client";

import { useEffect, useMemo, useRef, useCallback } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Stars, Edges } from "@react-three/drei";

// Quality presets — the crystal core + halo only, never heavy.
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
// CRYSTAL ENERGY CORE — irregular crystalline sculpture
// (hexagonal quartz cluster: 3 irregular facets, energy heart)
// ==========================================
const crystalMaterialProps = {
  color: "#dbe4ff",
  metalness: 0,
  roughness: 0.05,
  transmission: 0.92,
  ior: 1.55,
  thickness: 1.6,
  clearcoat: 1,
  clearcoatRoughness: 0.05,
  envMapIntensity: 1.75,
  flatShading: true,
};

function Sculpture() {
  const { gl } = useThree();
  const knotRef = useRef(null);
  const crystalMatsRef = useRef([]);
  const shardRefs = useRef([]);

  // Collect every crystal material so the studio env map can be attached once
  const registerCrystalMaterial = useCallback((m) => {
    if (m && !crystalMatsRef.current.includes(m)) {
      crystalMatsRef.current.push(m);
    }
  }, []);

  // Generate a procedural PMREM studio map once, assign to the crystal
  // materials via refs (never mutates hook-returned objects)
  useEffect(() => {
    const envTexture = makeStudioEnv(gl);
    // Capture the material list once for a deterministic cleanup
    const materials = [...crystalMatsRef.current];
    materials.forEach((mat) => {
      mat.envMap = envTexture;
      mat.needsUpdate = true;
    });
    return () => {
      materials.forEach((mat) => {
        mat.envMap = null;
        mat.needsUpdate = true;
      });
      envTexture.dispose();
    };
  }, [gl]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    if (knotRef.current) {
      knotRef.current.rotation.y += dt * 0.22;
      knotRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.28) * 0.16 - 0.12;
    }
    shardRefs.current.forEach((shard, i) => {
      if (!shard) return;
      shard.rotation.x += dt * (0.25 + i * 0.12);
      shard.rotation.y += dt * (0.32 + i * 0.09);
    });
  });

  return (
    <group>
      {/* Halo ring behind the sculpture */}
      <mesh position={[0, 0.1, -1.6]} rotation={[0.35, 0, 0]}>
        <torusGeometry args={[2.15, 0.02, 10, 96]} />
        <meshBasicMaterial color="#60a5fa" transparent opacity={0.75} />
      </mesh>
      <mesh position={[0, 0.1, -1.7]} rotation={[0.35, 0, 0]}>
        <torusGeometry args={[2.45, 0.012, 10, 96]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.45} />
      </mesh>

      <Float speed={1.35} rotationIntensity={0.28} floatIntensity={1.05}>
        {/* Crystal Energy Core — irregular quartz cluster */}
        <group ref={knotRef} rotation={[-0.12, 0.45, 0]} scale={0.9}>
          {/* Central quartz crystal (hexagonal body + pointed tip) */}
          <mesh position={[0, 0.05, 0]}>
            <cylinderGeometry args={[0.44, 0.54, 1.55, 6, 1]} />
            <meshPhysicalMaterial
              {...crystalMaterialProps}
              ref={registerCrystalMaterial}
              attenuationColor="#818cf8"
              attenuationDistance={2.3}
            />
            <Edges threshold={12} color="#7dd3fc" />
          </mesh>
          <mesh position={[0, 1.08, 0]}>
            <coneGeometry args={[0.44, 0.78, 6, 1]} />
            <meshPhysicalMaterial
              {...crystalMaterialProps}
              ref={registerCrystalMaterial}
              attenuationColor="#818cf8"
              attenuationDistance={2.3}
            />
            <Edges threshold={12} color="#7dd3fc" />
          </mesh>

          {/* Flanking shard — electric blue, tilted outward */}
          <group position={[-0.64, -0.44, 0.3]} rotation={[0.1, 0.15, 0.37]}>
            <mesh position={[0, 0.38, 0]}>
              <cylinderGeometry args={[0.16, 0.23, 0.8, 6, 1]} />
              <meshPhysicalMaterial
                {...crystalMaterialProps}
                ref={registerCrystalMaterial}
                attenuationColor="#38bdf8"
                attenuationDistance={1.6}
              />
              <Edges threshold={12} color="#67e8f9" />
            </mesh>
            <mesh position={[0, 0.89, 0]}>
              <coneGeometry args={[0.16, 0.4, 6, 1]} />
              <meshPhysicalMaterial
                {...crystalMaterialProps}
                ref={registerCrystalMaterial}
                attenuationColor="#38bdf8"
                attenuationDistance={1.6}
              />
              <Edges threshold={12} color="#67e8f9" />
            </mesh>
          </group>

          {/* Flanking shard — soft violet, mirrored kick */}
          <group position={[0.63, -0.47, 0.16]} rotation={[-0.08, -0.12, -0.34]}>
            <mesh position={[0, 0.34, 0]}>
              <cylinderGeometry args={[0.14, 0.21, 0.72, 6, 1]} />
              <meshPhysicalMaterial
                {...crystalMaterialProps}
                ref={registerCrystalMaterial}
                attenuationColor="#a78bfa"
                attenuationDistance={1.6}
              />
              <Edges threshold={12} color="#c4b5fd" />
            </mesh>
            <mesh position={[0, 0.81, 0]}>
              <coneGeometry args={[0.14, 0.36, 6, 1]} />
              <meshPhysicalMaterial
                {...crystalMaterialProps}
                ref={registerCrystalMaterial}
                attenuationColor="#a78bfa"
                attenuationDistance={1.6}
              />
              <Edges threshold={12} color="#c4b5fd" />
            </mesh>
          </group>

          {/* Inner heart of energy: cyan core + violet light spill */}
          <mesh position={[0, 0.08, 0]}>
            <octahedronGeometry args={[0.3, 0]} />
            <meshStandardMaterial
              color="#0c0a2a"
              emissive="#22d3ee"
              emissiveIntensity={2.6}
              roughness={0.25}
              metalness={0.1}
              flatShading
            />
          </mesh>
          <mesh position={[0, 0.08, 0]} rotation={[0, Math.PI / 6, 0]}>
            <octahedronGeometry args={[0.17, 0]} />
            <meshBasicMaterial
              color="#c4b5fd"
              transparent
              opacity={0.85}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
          <pointLight position={[0, 0.35, 0]} intensity={11} color="#6366f1" distance={3.6} />
          <pointLight position={[0, 1.2, 0]} intensity={6} color="#22d3ee" distance={2.6} />
        </group>

        {/* Electric blue orbiting shard */}
        <mesh
          ref={(m) => {
            shardRefs.current[0] = m;
          }}
          position={[2.15, 0.9, 0.4]}
        >
          <octahedronGeometry args={[0.22, 0]} />
          <meshStandardMaterial
            color="#0ea5e9"
            emissive="#38bdf8"
            emissiveIntensity={1.6}
            metalness={0.4}
            roughness={0.3}
          />
        </mesh>

        {/* Silver shard */}
        <mesh
          ref={(m) => {
            shardRefs.current[1] = m;
          }}
          position={[-2.1, -0.75, 0.8]}
        >
          <icosahedronGeometry args={[0.17, 0]} />
          <meshStandardMaterial
            color="#e2e8f0"
            emissive="#94a3b8"
            emissiveIntensity={0.5}
            metalness={1}
            roughness={0.18}
          />
        </mesh>

        {/* Violet shard */}
        <mesh
          ref={(m) => {
            shardRefs.current[2] = m;
          }}
          position={[1.35, -1.55, -0.6]}
        >
          <tetrahedronGeometry args={[0.2, 0]} />
          <meshStandardMaterial
            color="#7c3aed"
            emissive="#8b5cf6"
            emissiveIntensity={1.4}
            metalness={0.5}
            roughness={0.35}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function HeroScene({ quality = "high" }) {
  const config = QUALITY[quality] ?? QUALITY.high;

  return (
    <Canvas
      dpr={config.dpr}
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

      <Sculpture />

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
