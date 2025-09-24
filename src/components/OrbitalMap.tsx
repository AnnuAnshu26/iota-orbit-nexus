import React, { useRef, useMemo, useState } from 'react';
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

// Enhanced Debris component with realistic orbital motion
const DebrisObject = ({ detection, onClick }: { detection: any; onClick?: () => void }) => {
  const debrisRef = useRef<THREE.Mesh>(null);
  const textRef = useRef<any>(null);
  const { risk, orbit } = detection;
  const [hovered, setHovered] = useState(false);
  
  // Generate orbital parameters for realistic motion
  const orbitalParams = useMemo(() => {
    const altitude = parseFloat(orbit.match(/\d+/)?.[0] || '400');
    const orbitRadius = 1 + (altitude - 300) * 0.002; // Scale altitude to radius
    const eccentricity = Math.random() * 0.3; // Elliptical orbit
    const inclination = (Math.random() - 0.5) * Math.PI * 0.3; // Random inclination
    const speed = 0.5 + Math.random() * 0.5; // Variable orbital speed
    const phase = Math.random() * Math.PI * 2; // Random starting position
    
    return { orbitRadius, eccentricity, inclination, speed, phase };
  }, [orbit]);
  
  const color = risk === 'HIGH' ? '#ff0040' : risk === 'MEDIUM' ? '#ff8000' : '#0080ff';
  const emissive = risk === 'HIGH' ? '#440011' : risk === 'MEDIUM' ? '#442200' : '#001144';
  
  // Realistic orbital motion
  useFrame(({ clock }) => {
    if (debrisRef.current) {
      const time = clock.getElapsedTime() * orbitalParams.speed + orbitalParams.phase;
      
      // Elliptical orbit calculation
      const a = orbitalParams.orbitRadius; // Semi-major axis
      const e = orbitalParams.eccentricity; // Eccentricity
      const theta = time; // True anomaly (simplified)
      
      // Calculate position on elliptical orbit
      const r = a * (1 - e * e) / (1 + e * Math.cos(theta));
      const x = r * Math.cos(theta);
      const z = r * Math.sin(theta);
      
      // Apply orbital inclination
      const y = z * Math.sin(orbitalParams.inclination);
      const zInclined = z * Math.cos(orbitalParams.inclination);
      
      debrisRef.current.position.set(x, y, zInclined);
      
      // Enhanced pulsing and scaling effects
      const pulseFactor = risk === 'HIGH' 
        ? Math.sin(clock.getElapsedTime() * 3) * 0.3 + 1 
        : risk === 'MEDIUM' 
        ? Math.sin(clock.getElapsedTime() * 1.5) * 0.2 + 1 
        : 1;
      
      const hoverScale = hovered ? 1.5 : 1;
      debrisRef.current.scale.setScalar(0.04 * pulseFactor * hoverScale);
    }
    
    // Update risk percentage text
    if (textRef.current) {
      textRef.current.lookAt(0, 0, 0);
    }
  });

  const riskPercentage = useMemo(() => {
    const baseRisk = risk === 'HIGH' ? 85 : risk === 'MEDIUM' ? 55 : 25;
    return baseRisk + Math.floor(Math.random() * 15);
  }, [risk]);

  return (
    <group>
      <mesh 
        ref={debrisRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onClick}
        userData={{ detection }}
      >
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshPhongMaterial 
          color={hovered ? '#ffffff' : color}
          emissive={hovered ? color : emissive}
          transparent
          opacity={hovered ? 1 : 0.8}
        />
      </mesh>
      
      {/* Risk percentage indicator */}
      {hovered && (
        <Text
          ref={textRef}
          position={[0, 0.15, 0]}
          fontSize={0.08}
          color={color}
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
        >
          {riskPercentage}% RISK
        </Text>
      )}
    </group>
  );
};

// Enhanced Scene with interactive debris selection
const Scene = () => {
  const { detections, addLog } = useMissionStore();
  const [selectedDebris, setSelectedDebris] = useState<string | null>(null);

  const handleDebrisClick = (detection: any) => {
    setSelectedDebris(detection.id);
    addLog({
      type: 'INFO',
      message: `Debris ${detection.id.slice(-6).toUpperCase()} selected for analysis`,
    });
  };

  return (
    <>
      {/* Enhanced Lighting */}
      <ambientLight intensity={0.4} color="#002244" />
      <directionalLight position={[10, 10, 5]} intensity={1.2} color="#ffffff" />
      <pointLight position={[5, 5, 5]} intensity={0.6} color="#00ffff" />
      <pointLight position={[-5, -5, -5]} intensity={0.3} color="#ff0040" />

      {/* Earth and multiple orbit paths */}
      <Earth />
      <OrbitPath radius={1.3} />
      <OrbitPath radius={1.6} />
      <OrbitPath radius={1.9} />
      <OrbitPath radius={2.2} />

      {/* Spacecraft */}
      <Spacecraft />

      {/* Enhanced Debris objects with interaction */}
      {detections.map((detection) => (
        <DebrisObject 
          key={detection.id} 
          detection={detection}
          onClick={() => handleDebrisClick(detection)}
        />
      ))}

      {/* Enhanced stars background with depth */}
      <mesh>
        <sphereGeometry args={[80, 64, 64]} />
        <meshBasicMaterial 
          color="#000008" 
          side={THREE.BackSide}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Particle field for space dust */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={1000}
            array={new Float32Array(
              Array.from({ length: 3000 }, () => (Math.random() - 0.5) * 100)
            )}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.02} color="#ffffff" transparent opacity={0.6} />
      </points>

      {/* Enhanced Controls */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={2}
        maxDistance={15}
        autoRotate={false}
        rotateSpeed={0.5}
        zoomSpeed={0.8}
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