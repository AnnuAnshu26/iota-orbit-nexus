import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useMissionStore } from '@/store/useMissionStore';
import { AlertTriangle, Shield, TrendingUp } from 'lucide-react';

export const CollisionRiskMonitor = () => {
  const { detections } = useMissionStore();

  // Calculate highest risk
  const highestRisk = detections.length > 0 
    ? Math.max(...detections.map(d => {
        const baseRisk = d.risk === 'HIGH' ? 85 : d.risk === 'MEDIUM' ? 55 : 25;
        return baseRisk + Math.floor(Math.random() * 15);
      }))
    : 0;

  const getRiskLevel = (risk: number) => {
    if (risk >= 70) return { level: 'HIGH', color: 'text-danger', bgColor: 'bg-danger' };
    if (risk >= 40) return { level: 'MEDIUM', color: 'text-warning', bgColor: 'bg-warning' };
    return { level: 'LOW', color: 'text-info', bgColor: 'bg-info' };
  };

  const riskInfo = getRiskLevel(highestRisk);

  return (
    <Card className="p-4 bg-card/80 backdrop-blur-sm border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold hud-text flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2 text-warning" />
          COLLISION RISK MONITOR
        </h3>
        <div className={`px-2 py-1 rounded text-xs font-bold hud-text ${riskInfo.color} bg-${riskInfo.level === 'HIGH' ? 'danger' : riskInfo.level === 'MEDIUM' ? 'warning' : 'info'}/20 border border-${riskInfo.level === 'HIGH' ? 'danger' : riskInfo.level === 'MEDIUM' ? 'warning' : 'info'}`}>
          {riskInfo.level}
        </div>
      </div>

      {/* Risk Gauge */}
      <div className="space-y-4">
        <div className="relative">
          <div className="flex justify-between text-sm hud-text text-muted-foreground mb-2">
            <span>Current Risk Level</span>
            <span>{highestRisk}%</span>
          </div>
          <Progress 
            value={highestRisk} 
            className="h-3"
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className={`text-xs font-bold ${riskInfo.color}`}>
              {highestRisk}%
            </div>
          </div>
        </div>

        {/* Risk Statistics */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <AlertTriangle className="h-4 w-4 text-danger" />
            </div>
            <div className="text-xs hud-text text-muted-foreground">HIGH RISK</div>
            <div className="text-sm font-bold text-danger">
              {detections.filter(d => d.risk === 'HIGH').length}
            </div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <TrendingUp className="h-4 w-4 text-warning" />
            </div>
            <div className="text-xs hud-text text-muted-foreground">MEDIUM</div>
            <div className="text-sm font-bold text-warning">
              {detections.filter(d => d.risk === 'MEDIUM').length}
            </div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Shield className="h-4 w-4 text-info" />
            </div>
            <div className="text-xs hud-text text-muted-foreground">LOW RISK</div>
            <div className="text-sm font-bold text-info">
              {detections.filter(d => d.risk === 'LOW').length}
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="hud-text text-muted-foreground">SYSTEM STATUS</span>
            <span className={`font-bold ${detections.length > 0 ? 'text-warning' : 'text-success'}`}>
              {detections.length > 0 ? 'MONITORING THREATS' : 'ALL CLEAR'}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};