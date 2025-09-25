import { useEffect, useRef } from 'react';
import { useMissionStore } from '@/store/useMissionStore';
import { Detection, Telemetry } from '@/types/mission';

// Mock WebSocket implementation for now
// In production, this would connect to a real socket.io server
export const useSocket = () => {
  const intervalRef = useRef<NodeJS.Timeout>();
  const { updateTelemetry, addDetection, isActive } = useMissionStore();

  const generateMockDetection = (): Detection => {
    const types = ['Satellite Fragment', 'Space Debris', 'Micrometeorite', 'Rocket Stage', 'Solar Panel', 'Antenna Array'];
    const materials = ['Aluminum Alloy', 'Carbon Fiber', 'Steel', 'Titanium', 'Composite', 'Silicon'];
    const risks: Detection['risk'][] = ['LOW', 'MEDIUM', 'HIGH'];
    
    const risk = risks[Math.floor(Math.random() * risks.length)];
    
    // Mock debris images (placeholder URLs for future YOLOv8 integration)
    const mockImages = [
      'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=400&h=300&fit=crop',
    ];
    
    return {
      id: `det-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      type: types[Math.floor(Math.random() * types.length)],
      confidence: Math.random() * 0.4 + 0.6, // 0.6 to 1.0
      size: `${(Math.random() * 5 + 0.5).toFixed(1)}m × ${(Math.random() * 3 + 0.3).toFixed(1)}m`,
      material: materials[Math.floor(Math.random() * materials.length)],
      orbit: `LEO ${Math.floor(Math.random() * 200 + 350)}km`,
      altitude: Math.random() * 200 + 350,
      velocity: Math.random() * 2 + 6.5,
      inclination: Math.random() * 60 + 20,
      risk,
      position: {
        x: (Math.random() - 0.5) * 1000,
        y: (Math.random() - 0.5) * 1000,
        z: (Math.random() - 0.5) * 1000,
      },
      imageURL: Math.random() > 0.3 ? mockImages[Math.floor(Math.random() * mockImages.length)] : undefined,
      timestamp: Date.now(),
    };
  };

  const generateMockTelemetry = (): Telemetry => ({
    altitude: 414 + (Math.random() - 0.5) * 10,
    velocity: 7.74 + (Math.random() - 0.5) * 0.2,
    inclination: 51.2 + (Math.random() - 0.5) * 2,
    energy: 92 + (Math.random() - 0.5) * 15,
    timestamp: Date.now(),
  });

  useEffect(() => {
    if (!isActive) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      return;
    }

    // Spawn multiple debris objects when mission starts
    const debrisCount = Math.floor(Math.random() * 11) + 10; // 10-20 debris
    
    for (let i = 0; i < debrisCount; i++) {
      setTimeout(() => {
        addDetection(generateMockDetection());
      }, i * 500); // Stagger the spawning
    }

    // Update telemetry every 2 seconds
    intervalRef.current = setInterval(() => {
      updateTelemetry(generateMockTelemetry());

      // Random chance of additional detection (10% every 2 seconds when active)
      if (Math.random() < 0.1) {
        addDetection(generateMockDetection());
      }
    }, 2000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, updateTelemetry, addDetection]);

  // Mock API endpoints
  const triggerDetection = () => {
    addDetection(generateMockDetection());
  };

  const triggerCapture = (detectionId: string) => {
    useMissionStore.getState().removeDetection(detectionId);
  };

  return {
    triggerDetection,
    triggerCapture,
  };
};