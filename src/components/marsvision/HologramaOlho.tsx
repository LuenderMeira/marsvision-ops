import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Circle, Html, OrbitControls, Sphere, Torus } from '@react-three/drei';
import * as THREE from 'three';

export interface Lesao {
  id: number;
  position: [number, number, number];
  info: string;
}

function MarcadorLesao({ position, info }: { position: [number, number, number]; info: string }) {
  const [hovered, setHover] = useState(false);

  return (
    <mesh
      position={position}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <sphereGeometry args={[0.18, 18, 18]} />
      <meshBasicMaterial color={hovered ? '#ff3333' : '#f97316'} />

      {hovered && (
        <Html distanceFactor={10}>
          <div className="rounded-md border border-orange-500/80 bg-gray-950/90 p-2 text-[10px] text-white shadow-lg shadow-orange-500/20 backdrop-blur-sm">
            <span className="font-bold text-orange-400">ALERTA DETECTADO:</span>
            <br />
            {info}
          </div>
        </Html>
      )}
    </mesh>
  );
}

function ModeloOlho({ lesoes = [] }: { lesoes?: Lesao[] }) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={meshRef}>
      <Sphere args={[2.5, 48, 48]}>
        <meshStandardMaterial
          color="#f97316"
          emissive="#9a3d12"
          wireframe
          transparent
          opacity={0.2}
        />
      </Sphere>

      <mesh position={[0, 0, 2.3]}>
        <torusGeometry args={[1.45, 0.12, 16, 120]} />
        <meshStandardMaterial color="#7f1d1d" emissive="#ff5a1f" emissiveIntensity={0.9} />
      </mesh>

      <mesh position={[0, 0, 2.55]}>
        <circleGeometry args={[0.82, 64]} />
        <meshStandardMaterial color="#120f13" emissive="#2b0a0a" emissiveIntensity={1.2} metalness={0.35} roughness={0.4} />
      </mesh>

      <mesh position={[0, 0, 2.72]}>
        <circleGeometry args={[0.22, 32]} />
        <meshBasicMaterial color="#020202" />
      </mesh>

      {lesoes.map((lesao) => (
        <MarcadorLesao key={lesao.id} position={lesao.position} info={lesao.info} />
      ))}
    </group>
  );
}

export default function HologramaOlho({ lesoes = [] }: { lesoes?: Lesao[] }) {
  return (
    <div className="relative h-[400px] w-full overflow-hidden rounded-xl border border-gray-800/60 bg-black/40 shadow-inner shadow-orange-500/10 cursor-move">
      <div className="absolute left-4 top-4 z-10">
        <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
          <span className="h-2 w-2 animate-pulse rounded-full bg-orange-500" />
          Escaneamento Biométrico Ativo
        </h3>
      </div>

      <Canvas camera={{ position: [0, 0, 6] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
        <ModeloOlho lesoes={lesoes} />
        <OrbitControls enableZoom={false} autoRotate={false} />
      </Canvas>
    </div>
  );
}