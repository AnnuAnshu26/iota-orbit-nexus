import { Satellite, Zap, Shield, AlertTriangle } from 'lucide-react';
import { useMissionStore } from '@/store/useMissionStore';

export const MissionHeader = () => {
  const { isActive, score, detections } = useMissionStore();
  
  const highRiskCount = detections.filter(d => d.risk === 'HIGH').length;
  const mediumRiskCount = detections.filter(d => d.risk === 'MEDIUM').length;
  const lowRiskCount = detections.filter(d => d.risk === 'LOW').length;

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Satellite className="h-8 w-8 glow-primary" />
            <div>
              <h1 className="text-2xl font-bold hud-text glow-primary">IOTA-6 MISSION CONTROL</h1>
              <p className="text-sm text-muted-foreground">Orbital Debris Detection & Capture System</p>
            </div>
          </div>

          <div className="flex items-center space-x-8">
            {/* Mission Status */}
            <div className="flex items-center space-x-2">
              <div className={`h-3 w-3 rounded-full ${isActive ? 'bg-success animate-pulse-primary' : 'bg-muted'}`} />
              <span className="hud-text text-sm">
                {isActive ? 'ACTIVE' : 'STANDBY'}
              </span>
            </div>

            {/* Score */}
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-warning" />
              <span className="hud-text text-lg font-bold glow-accent">{score.toLocaleString()}</span>
            </div>

            {/* Detection Summary */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <AlertTriangle className="h-4 w-4 text-danger" />
                <span className="text-sm font-bold text-danger">{highRiskCount}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Shield className="h-4 w-4 text-warning" />
                <span className="text-sm font-bold text-warning">{mediumRiskCount}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Shield className="h-4 w-4 text-info" />
                <span className="text-sm font-bold text-info">{lowRiskCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};