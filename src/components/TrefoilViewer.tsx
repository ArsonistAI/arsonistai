"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import * as THREE from "three";

function EnvMap() {
  const { scene } = useThree();
  const texture = useLoader(THREE.TextureLoader, "/hdri.png");

  useEffect(() => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;
    scene.environment = texture;
    scene.background = null;
    return () => {
      scene.environment = null;
      texture.dispose();
    };
  }, [texture, scene]);

  return null;
}

function useSatinChromeMaterial() {
  const mat = useRef<THREE.MeshStandardMaterial>(null!);

  useEffect(() => {
    if (!mat.current) return;

    mat.current.onBeforeCompile = (shader) => {
      shader.vertexShader = shader.vertexShader.replace(
        "void main() {",
        "varying vec3 vWorldPos;\nvarying vec3 vWorldNormal;\nvoid main() {",
      );
      shader.vertexShader = shader.vertexShader.replace(
        "#include <worldpos_vertex>",
        [
          "#include <worldpos_vertex>",
          "vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;",
          "vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);",
        ].join("\n"),
      );

      shader.fragmentShader = shader.fragmentShader.replace(
        "void main() {",
        [
          "varying vec3 vWorldPos;",
          "varying vec3 vWorldNormal;",
          "float hash13(vec3 p) {",
          "  p = fract(p * vec3(0.1031, 0.1030, 0.0973));",
          "  p += dot(p, p.yzx + 19.19);",
          "  return fract((p.x + p.y) * p.z);",
          "}",
          "float grain(vec3 p, float scale) {",
          "  vec3 i = floor(p * scale); vec3 f = fract(p * scale);",
          "  f = f * f * (3.0 - 2.0 * f);",
          "  float a = hash13(i); float b = hash13(i+vec3(1,0,0));",
          "  float c = hash13(i+vec3(0,1,0)); float d = hash13(i+vec3(1,1,0));",
          "  float e = hash13(i+vec3(0,0,1)); float ff = hash13(i+vec3(1,0,1));",
          "  float g = hash13(i+vec3(0,1,1)); float h = hash13(i+vec3(1,1,1));",
          "  return mix(mix(mix(a,b,f.x),mix(c,d,f.x),f.y),mix(mix(e,ff,f.x),mix(g,h,f.x),f.y),f.z);",
          "}",
          "void main() {",
        ].join("\n"),
      );

      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <roughnessmap_fragment>",
        [
          "#include <roughnessmap_fragment>",
          "float g1 = grain(vWorldPos, 18.0);",
          "float g2 = grain(vWorldPos, 45.0);",
          "float satinGrain = g1 * 0.6 + g2 * 0.4;",
          "roughnessFactor += (satinGrain - 0.5) * 0.18;",
          "roughnessFactor = clamp(roughnessFactor, 0.15, 0.55);",
        ].join("\n"),
      );

      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <metalnessmap_fragment>",
        [
          "#include <metalnessmap_fragment>",
          "metalnessFactor -= (1.0 - satinGrain) * 0.04;",
        ].join("\n"),
      );

      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <output_fragment>",
        [
          "vec3 viewDir = normalize(cameraPosition - vWorldPos);",
          "float fresnel = pow(1.0 - max(dot(viewDir, vWorldNormal), 0.0), 3.0);",
          "gl_FragColor.rgb = mix(gl_FragColor.rgb, gl_FragColor.rgb * 1.4, fresnel * 0.35);",
          "#include <output_fragment>",
        ].join("\n"),
      );
    };

    mat.current.needsUpdate = true;
  }, []);

  return mat;
}

function Trefoil({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useSatinChromeMaterial();
  const scrollRotation = useRef(0);
  const isDragging = useRef(false);
  const dragOffset = useRef(0);
  const lastPointerX = useRef(0);
  const manualRotation = useRef(0);

  const handleScroll = useCallback(() => {
    scrollRotation.current = window.scrollY * 0.002;
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onPointerDown = (e: PointerEvent) => {
      isDragging.current = true;
      lastPointerX.current = e.clientX;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      const deltaX = e.clientX - lastPointerX.current;
      manualRotation.current += deltaX * 0.01;
      lastPointerX.current = e.clientX;
    };

    const onPointerUp = () => {
      isDragging.current = false;
    };

    el.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [containerRef]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    dragOffset.current += delta * 0.15;
    const target =
      scrollRotation.current + manualRotation.current + dragOffset.current;
    meshRef.current.rotation.y +=
      (target - meshRef.current.rotation.y) * 0.08;
  });

  return (
    <mesh ref={meshRef} scale={1.5}>
      <torusKnotGeometry args={[1, 0.4, 200, 40, 2, 3]} />
      <meshStandardMaterial
        ref={materialRef}
        color="#8a8a8a"
        roughness={0.3}
        metalness={1.0}
        envMapIntensity={1.8}
      />
    </mesh>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.7} />
      <directionalLight position={[-4, 2, -3]} intensity={0.3} />
      <directionalLight position={[0, -3, 4]} intensity={0.2} />
    </>
  );
}

function SceneSetup({ onContextLost }: { onContextLost: () => void }) {
  const { gl } = useThree();

  useEffect(() => {
    const canvas = gl.domElement;
    const onLost = (e: Event) => {
      e.preventDefault();
      console.warn("[TrefoilViewer] WebGL context lost");
      onContextLost();
    };
    canvas.addEventListener("webglcontextlost", onLost);
    return () => canvas.removeEventListener("webglcontextlost", onLost);
  }, [gl, onContextLost]);

  return null;
}

export default function TrefoilViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvasKey, setCanvasKey] = useState(0);
  const remountCount = useRef(0);

  const handleContextLost = useCallback(() => {
    if (remountCount.current >= 2) return;
    remountCount.current += 1;
    setCanvasKey((prev) => prev + 1);
  }, []);

  return (
    <div ref={containerRef} className="w-full aspect-square max-h-[700px]">
      <Canvas
        key={canvasKey}
        camera={{ position: [0, 0, 7], fov: 50 }}
        dpr={[1, 1.25]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "low-power",
          failIfMajorPerformanceCaveat: false,
        }}
        style={{ background: "transparent" }}
      >
        <EnvMap />
        <Lights />
        <SceneSetup onContextLost={handleContextLost} />
        <Trefoil containerRef={containerRef} />
      </Canvas>
    </div>
  );
}
