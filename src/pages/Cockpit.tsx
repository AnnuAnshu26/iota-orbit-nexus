import { useEffect } from 'react';
import { MissionHeader } from '@/components/MissionHeader';
import { OrbitalMap } from '@/components/OrbitalMap';
import { TelemetryPanel } from '@/components/TelemetryPanel';
import { MissionControls } from '@/components/MissionControls';
import { DetectionDetail } from '@/components/DetectionDetail';
import { MissionLog } from '@/components/MissionLog';
import { CollisionRiskMonitor } from '@/components/CollisionRiskMonitor';
import { DetectionLogsTable } from '@/components/DetectionLogsTable';
import { useMissionStore } from '@/store/useMissionStore';
import { useSocket } from '@/hooks/useSocket';

const Cockpit = () => {
  const { detections } = useMissionStore();
  
  // Initialize socket connection
  useSocket();

  // Debris detection simulation - only when mission is active
  useEffect(() => {
    const { isActive, addDetection, addLog } = useMissionStore.getState();
    
    if (!isActive) return;

    const detectionInterval = setInterval(() => {
      const { isActive: currentActive } = useMissionStore.getState();
      if (!currentActive) return;

      const debrisTypes = ['Satellite Fragment', 'Space Debris', 'Rocket Stage', 'Solar Panel'];
      const materials = ['Aluminum Alloy', 'Carbon Fiber', 'Titanium', 'Composite'];
      const images = ['/assets/debris1.png', '/assets/debris2.png', '/assets/debris3.png', '/assets/debris4.png'];
      
      const risks: ("LOW" | "MEDIUM" | "HIGH")[] = ['LOW', 'MEDIUM', 'HIGH'];
      const risk = risks[Math.floor(Math.random() * risks.length)];
      
      const detection = {
        id: `Debris-${Date.now().toString().slice(-6)}`,
        type: debrisTypes[Math.floor(Math.random() * debrisTypes.length)],
        confidence: 0.6 + Math.random() * 0.4,
        size: `${(1 + Math.random() * 3).toFixed(1)}m × ${(0.8 + Math.random() * 2).toFixed(1)}m`,
        material: materials[Math.floor(Math.random() * materials.length)],
        orbit: `LEO ${(350 + Math.random() * 200).toFixed(0)}km`,
        altitude: 350 + Math.random() * 200,
        velocity: 7.5 + Math.random() * 0.5,
        inclination: Math.random() * 90,
        risk,
        position: { 
          x: (Math.random() - 0.5) * 400, 
          y: (Math.random() - 0.5) * 400, 
          z: (Math.random() - 0.5) * 400 
        },
        imageURL: images[Math.floor(Math.random() * images.length)],
        timestamp: Date.now(),
      };

      addDetection(detection);
      addLog({
        type: 'INFO',
        message: `New debris detected: ${detection.type} - Risk: ${detection.risk}`,
      });
    }, 5000);

    return () => clearInterval(detectionInterval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-space">
      <MissionHeader />
      
      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-120px)]">
          {/* Left Panel - Controls & Telemetry */}
          <div className="col-span-3 space-y-6">
            <MissionControls />
            <TelemetryPanel />
            <CollisionRiskMonitor />
          </div>
          
          {/* Center - 3D Orbital Map */}
          <div className="col-span-6 relative">
            <OrbitalMap />
          </div>
          
          {/* Right Panel - Detections & Log */}
          <div className="col-span-3 space-y-6">
            {/* Detection Details */}
            <div className="space-y-4 max-h-[30vh] overflow-y-auto">
              {detections.length === 0 ? (
                <div className="p-6 bg-card/50 rounded-lg border border-border text-center">
                  <div className="text-muted-foreground hud-text">
                    <p className="text-lg mb-2">NO ACTIVE DETECTIONS</p>
                    <p className="text-sm">Start mission to begin detection</p>
                  </div>
                </div>
              ) : (
                detections.slice(0, 2).map((detection) => (
                  <DetectionDetail key={detection.id} detection={detection} />
                ))
              )}
            </div>
            
            {/* Detection Logs Table */}
            <div className="h-[35vh]">
              <DetectionLogsTable />
            </div>
            
            {/* Mission Log */}
            <div className="h-[25vh]">
              <MissionLog />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cockpit;