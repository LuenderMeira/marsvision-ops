import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Html } from '@react-three/drei';
import * as THREE from 'three';

function MarcadorLesao({ position, info }: { position: [number, number, number], info: string }) {
  const [hovered, setHover] = useState(false);

  return (
    <mesh 
      position={position} 
      onPointerOver={() => setHover(true)} 
      onPointerOut={() => setHover(false)}
    >
      <sphereGeometry args={[0.2, 16, 16]} />
      <meshBasicMaterial color={hovered ? "#ff3333" : "#f97316"} /> {/* Laranja pro vermelho */}
      
      {hovered && (
        <Html distanceFactor={10}>
          <div className="bg-gray-950/90 text-white p-2 rounded-md text-xs border border-orange-500 whitespace-nowrap shadow-lg backdrop-blur-sm">
            <span className="font-bold text-orange-400">ALERTA DETECTADO:</span><br/>
            {info}
          </div>
        </Html>
      )}
    </mesh>
  );
}

function ModeloOlho() {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Esfera base do olho (Wireframe) */}
      <Sphere args={[2.5, 32, 32]}>
        <meshStandardMaterial 
          color="#ea580c" 
          wireframe={true} 
          transparent 
          opacity={0.4} 
        />
      </Sphere>

      {/* Pontos de lesão simulados */}
      <MarcadorLesao position={[1.8, 1.2, 1.2]} info="Abrasão de Córnea - Poeira Marciana Nível 2" />
      <MarcadorLesao position={[-1.5, -1.5, 1.8]} info="Dano Retinal - Exposição à Radiação (3.5 mSv)" />
    </group>
  );
}

export default function HologramaOlho() {
  return (
    <div className="h-[400px] w-full bg-black/40 rounded-xl overflow-hidden border border-gray-800/50 shadow-inner relative cursor-move">
      <div className="absolute top-4 left-4 z-10">
        <h3 className="text-orange-500 text-sm font-semibold uppercase tracking-widest flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
          Escaneamento Biométrico Ativo
        </h3>
      </div>

      <Canvas camera={{ position: [0, 0, 6] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
        <ModeloOlho />
        {/* Permite o usuário girar o olho com o mouse */}
        <OrbitControls enableZoom={false} autoRotate={false} />
      </Canvas>
    </div>
  );
}