import { useEffect } from 'react';
import { MissionHeader } from '@/components/MissionHeader';
import { OrbitalMap } from '@/components/OrbitalMap';
import { TelemetryPanel } from '@/components/TelemetryPanel';
import { MissionControls } from '@/components/MissionControls';
import { DetectionDetail } from '@/components/DetectionDetail';
import { MissionLog } from '@/components/MissionLog';
import { useMissionStore } from '@/store/useMissionStore';
import { useSocket } from '@/hooks/useSocket';

const Cockpit = () => {
  const { detections } = useMissionStore();
  
  // Initialize socket connection
  useSocket();

  // Add some initial mock detections for demo
  useEffect(() => {
    const { addDetection } = useMissionStore.getState();
    
    // Add a few demo detections
    setTimeout(() => {
      addDetection({
        id: 'demo-001',
        type: 'Satellite Fragment',
        confidence: 0.89,
        size: '2.3m × 1.8m',
        material: 'Aluminum Alloy',
        orbit: 'LEO 408km',
        altitude: 408,
        velocity: 7.74,
        inclination: 51.2,
        risk: 'HIGH',
        position: { x: 150, y: -80, z: 220 },
        timestamp: Date.now(),
      });
    }, 1000);

    setTimeout(() => {
      addDetection({
        id: 'demo-002',
        type: 'Space Debris',
        confidence: 0.72,
        size: '1.1m × 0.9m',
        material: 'Carbon Fiber',
        orbit: 'LEO 392km',
        altitude: 392,
        velocity: 7.68,
        inclination: 48.7,
        risk: 'MEDIUM',
        position: { x: -120, y: 45, z: -180 },
        timestamp: Date.now(),
      });
    }, 3000);
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
          </div>
          
          {/* Center - 3D Orbital Map */}
          <div className="col-span-6 relative">
            <OrbitalMap />
          </div>
          
          {/* Right Panel - Detections & Log */}
          <div className="col-span-3 space-y-6">
            {/* Detection Details */}
            <div className="space-y-4 max-h-[45vh] overflow-y-auto">
              {detections.length === 0 ? (
                <div className="p-6 bg-card/50 rounded-lg border border-border text-center">
                  <div className="text-muted-foreground hud-text">
                    <p className="text-lg mb-2">NO ACTIVE DETECTIONS</p>
                    <p className="text-sm">Start mission to begin detection</p>
                  </div>
                </div>
              ) : (
                detections.slice(0, 3).map((detection) => (
                  <DetectionDetail key={detection.id} detection={detection} />
                ))
              )}
            </div>
            
            {/* Mission Log */}
            <div className="h-[45vh]">
              <MissionLog />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cockpit;