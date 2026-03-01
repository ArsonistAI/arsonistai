"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 600;

const EMBER_COLORS = [
  new THREE.Color("#FF4000"),
  new THREE.Color("#CC3300"),
  new THREE.Color("#FF6633"),
  new THREE.Color("#C8B464"),
  new THREE.Color("#FF9944"),
];

function EmberParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const timeRef = useRef(0);

  const { positions, colors, sizes, speeds, phases, swayAmplitudes } =
    useMemo(() => {
      const positions = new Float32Array(PARTICLE_COUNT * 3);
      const colors = new Float32Array(PARTICLE_COUNT * 3);
      const sizes = new Float32Array(PARTICLE_COUNT);
      const speeds = new Float32Array(PARTICLE_COUNT);
      const phases = new Float32Array(PARTICLE_COUNT);
      const swayAmplitudes = new Float32Array(PARTICLE_COUNT);

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 44;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 34;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 8;

        const color = EMBER_COLORS[Math.floor(Math.random() * EMBER_COLORS.length)];
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;

        sizes[i] = 0.8 + Math.random() * 1.8;
        speeds[i] = 0.004 + Math.random() * 0.008;
        phases[i] = Math.random() * Math.PI * 2;
        swayAmplitudes[i] = 0.3 + Math.random() * 0.8;
      }

      return { positions, colors, sizes, speeds, phases, swayAmplitudes };
    }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    timeRef.current += delta;

    const pos = pointsRef.current.geometry.attributes.position
      .array as Float32Array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3 + 1] += speeds[i];
      pos[i * 3] +=
        Math.sin(timeRef.current * 0.4 + phases[i]) *
        0.002 *
        swayAmplitudes[i];

      if (pos[i * 3 + 1] > 17) {
        pos[i * 3 + 1] = -17;
        pos[i * 3] = (Math.random() - 0.5) * 44;
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        size={1.8}
        sizeAttenuation={false}
        transparent
        opacity={0.35}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function EmberBackground() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -10,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 20], fov: 75 }}
        dpr={[1, 1]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "low-power",
          failIfMajorPerformanceCaveat: false,
        }}
        style={{ background: "transparent" }}
      >
        <EmberParticles />
      </Canvas>
    </div>
  );
}
