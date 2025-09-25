"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Line, Text } from "@react-three/drei";
import * as THREE from "three";
import { useMissionStore } from "@/store/useMissionStore";

// ---------------- Earth ----------------
const Earth = () => {
  const earthRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (earthRef.current) earthRef.current.rotation.y += 0.002;
  });

  return (
    <Sphere ref={earthRef} args={[1, 32, 32]}>
      <meshPhongMaterial
        color="#4169E1"
        emissive="#001133"
        shininess={100}
        transparent
        opacity={0.85}
      />
    </Sphere>
  );
};

// ---------------- Orbit Path ----------------
const OrbitPath = ({ radius }: { radius: number }) => {
  const points = useMemo(() => {
    const curve = new THREE.EllipseCurve(0, 0, radius, radius, 0, 2 * Math.PI);
    return curve.getPoints(120).map((p) => new THREE.Vector3(p.x, 0, p.y));
  }, [radius]);

  return <Line points={points} color="#00ffff" lineWidth={1} opacity={0.3} />;
};

// ---------------- Spacecraft ----------------
const Spacecraft = () => {
  const spacecraftRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (spacecraftRef.current) {
      const t = clock.getElapsedTime();
      const r = 1.5;
      spacecraftRef.current.position.x = Math.cos(t * 0.5) * r;
      spacecraftRef.current.position.z = Math.sin(t * 0.5) * r;
      spacecraftRef.current.lookAt(0, 0, 0);
    }
  });

  return (
    <group ref={spacecraftRef}>
      <mesh>
        <boxGeometry args={[0.1, 0.05, 0.15]} />
        <meshPhongMaterial color="#00ffff" emissive="#004444" />
      </mesh>
      <Text position={[0, 0.2, 0]} fontSize={0.1} color="#00ffff">
        IOTA-6
      </Text>
    </group>
  );
};

// ---------------- Debris ----------------
const DebrisObject = ({ detection, onClick }: { detection: any; onClick: () => void }) => {
  const debrisRef = useRef<THREE.Mesh>(null);
  const textRef = useRef<any>(null);
  const [hovered, setHovered] = useState(false);

  const { risk } = detection;

  // orbital params
  const orbitalParams = useMemo(() => {
    const altitude = parseFloat(detection.orbit?.match(/\d+/)?.[0] || "400");
    return {
      r: 1 + (altitude - 300) * 0.002,
      speed: 0.5 + Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2,
    };
  }, [detection]);

  const color = risk === "HIGH" ? "#ff0040" : risk === "MEDIUM" ? "#ffaa00" : "#0080ff";

  useFrame(({ clock }) => {
    if (!debrisRef.current) return;

    const t = clock.getElapsedTime() * orbitalParams.speed + orbitalParams.phase;
    debrisRef.current.position.set(
      Math.cos(t) * orbitalParams.r,
      0,
      Math.sin(t) * orbitalParams.r
    );

    if (textRef.current) textRef.current.lookAt(0, 0, 0);
  });

  return (
    <group>
      <mesh
        ref={debrisRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onClick}
      >
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshPhongMaterial
          color={hovered ? "#fff" : color}
          emissive={color}
          opacity={0.9}
        />
      </mesh>
      {hovered && (
        <Text
          ref={textRef}
          position={[0, 0.15, 0]}
          fontSize={0.08}
          color={color}
          anchorX="center"
          anchorY="middle"
        >
          {detection.riskPercentage || "50%"} RISK
        </Text>
      )}
    </group>
  );
};

// ---------------- Scene ----------------
const Scene = () => {
  const { detections, isActive, addLog } = useMissionStore();

  const handleClick = (d: any) => {
    addLog({ type: "INFO", message: `Selected debris ${d.id}` });
  };

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />

      <Earth />
      {[1.3, 1.6, 1.9, 2.2].map((r) => (
        <OrbitPath key={r} radius={r} />
      ))}
      <Spacecraft />

      {isActive &&
        detections.map((d: any) => (
          <DebrisObject key={d.id} detection={d} onClick={() => handleClick(d)} />
        ))}

      <OrbitControls enableZoom={true} />
    </>
  );
};

// ---------------- Orbital Map ----------------
export const OrbitalMap = () => {
  const { logs } = useMissionStore();

  return (
    <div className="relative h-full w-full bg-black rounded-lg overflow-hidden">
      <Canvas camera={{ position: [3, 2, 3], fov: 60 }}>
        <Scene />
      </Canvas>

      {/* Controls info */}
      <div className="absolute bottom-4 left-4 bg-black/60 text-white text-xs p-2 rounded">
        DRAG: Rotate • SCROLL: Zoom • CLICK: Select
      </div>

      {/* Mission Log */}
      <div className="absolute top-4 right-4 w-64 h-40 bg-black/70 text-white text-xs p-2 rounded overflow-y-auto">
        <p className="font-bold mb-1">Mission Log</p>
        {logs.length === 0 ? (
          <p className="text-gray-400">No events yet</p>
        ) : (
          logs.map((log, i) => (
            <p key={i} className="mb-1">
              [{log.type}] {log.message}
            </p>
          ))
        )}
      </div>
    </div>
  );
};
