import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Line, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useMissionStore } from '@/store/useMissionStore';

// Earth component
const Earth = () => {
  const earthRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.002;
    }
  });

  return (
    <Sphere ref={earthRef} args={[1, 32, 32]} position={[0, 0, 0]}>
      <meshPhongMaterial 
        color="#4169E1" 
        emissive="#001133" 
        shininess={100}
        transparent
        opacity={0.8}
      />
    </Sphere>
  );
};

// Orbit path component
const OrbitPath = ({ radius }: { radius: number }) => {
  const points = useMemo(() => {
    const curve = new THREE.EllipseCurve(0, 0, radius, radius, 0, 2 * Math.PI, false, 0);
    const points = curve.getPoints(100);
    return points.map(p => new THREE.Vector3(p.x, 0, p.y));
  }, [radius]);

  return (
    <Line
      points={points}
      color="#00ffff"
      lineWidth={2}
      transparent
      opacity={0.3}
    />
  );
};

// Spacecraft component
const Spacecraft = () => {
  const spacecraftRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (spacecraftRef.current) {
      const time = clock.getElapsedTime();
      const radius = 1.5;
      spacecraftRef.current.position.x = Math.cos(time * 0.5) * radius;
      spacecraftRef.current.position.z = Math.sin(time * 0.5) * radius;
      spacecraftRef.current.position.y = Math.sin(time * 0.3) * 0.1;
      spacecraftRef.current.lookAt(0, 0, 0);
    }
  });

  return (
    <group ref={spacecraftRef}>
      <mesh>
        <boxGeometry args={[0.1, 0.05, 0.15]} />
        <meshPhongMaterial 
          color="#00ffff" 
          emissive="#004444"
        />
      </mesh>
      <Text
        position={[0, 0.2, 0]}
        fontSize={0.1}
        color="#00ffff"
        anchorX="center"
        anchorY="middle"
      >
        IOTA-6
      </Text>
    </group>
  );
};

// Debris component
const DebrisObject = ({ detection }: { detection: any }) => {
  const debrisRef = useRef<THREE.Mesh>(null);
  const { position, risk } = detection;
  
  const color = risk === 'HIGH' ? '#ff0040' : risk === 'MEDIUM' ? '#ff8000' : '#0080ff';
  const emissive = risk === 'HIGH' ? '#440011' : risk === 'MEDIUM' ? '#442200' : '#001144';
  
  useFrame(({ clock }) => {
    if (debrisRef.current) {
      const pulseFactor = risk === 'HIGH' ? Math.sin(clock.getElapsedTime() * 3) * 0.5 + 1 : 1;
      debrisRef.current.scale.setScalar(0.03 * pulseFactor);
    }
  });

  // Convert world position to orbital position
  const orbitalPosition = useMemo(() => {
    const scale = 0.003;
    return [
      position.x * scale,
      position.y * scale,
      position.z * scale
    ] as [number, number, number];
  }, [position]);

  return (
    <mesh ref={debrisRef} position={orbitalPosition}>
      <sphereGeometry args={[0.03, 8, 8]} />
      <meshPhongMaterial 
        color={color}
        emissive={emissive}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
};

// Scene setup
const Scene = () => {
  const { detections } = useMissionStore();

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} color="#002244" />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#00ffff" />

      {/* Earth and orbit */}
      <Earth />
      <OrbitPath radius={1.5} />
      <OrbitPath radius={2.0} />

      {/* Spacecraft */}
      <Spacecraft />

      {/* Debris objects */}
      {detections.map((detection) => (
        <DebrisObject key={detection.id} detection={detection} />
      ))}

      {/* Stars background */}
      <mesh>
        <sphereGeometry args={[50, 32, 32]} />
        <meshBasicMaterial 
          color="#000011" 
          side={THREE.BackSide}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Controls */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={2}
        maxDistance={10}
        autoRotate={false}
      />
    </>
  );
};

export const OrbitalMap = () => {
  return (
    <div className="h-full w-full bg-gradient-to-b from-background to-card rounded-lg overflow-hidden border border-border shadow-glow-primary">
      <Canvas
        camera={{ position: [3, 2, 3], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
      
      {/* Overlay controls info */}
      <div className="absolute bottom-4 left-4 bg-card/80 backdrop-blur-sm rounded p-3 border border-border">
        <p className="text-xs hud-text text-muted-foreground">
          DRAG: Rotate • SCROLL: Zoom • CLICK: Select
        </p>
      </div>
    </div>
  );
};