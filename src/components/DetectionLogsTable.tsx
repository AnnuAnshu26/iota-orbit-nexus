import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useMissionStore } from '@/store/useMissionStore';
import { Detection } from '@/types/mission';
import { Clock, Package, AlertTriangle } from 'lucide-react';

export const DetectionLogsTable = () => {
  const { detections } = useMissionStore();

  const getRiskColor = (risk: Detection['risk']) => {
    switch (risk) {
      case 'HIGH': return 'text-danger bg-danger/20 border-danger';
      case 'MEDIUM': return 'text-warning bg-warning/20 border-warning';
      case 'LOW': return 'text-info bg-info/20 border-info';
    }
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  const getRiskPercentage = (detection: Detection) => {
    const baseRisk = detection.risk === 'HIGH' ? 85 : detection.risk === 'MEDIUM' ? 55 : 25;
    return baseRisk + Math.floor((detection.confidence || 0.5) * 15);
  };

  return (
    <Card className="p-4 bg-card/80 backdrop-blur-sm border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold hud-text flex items-center">
          <Package className="h-5 w-5 mr-2 text-primary" />
          DETECTION LOGS
        </h3>
        <Badge variant="outline" className="hud-text">
          {detections.length} ACTIVE
        </Badge>
      </div>

      <ScrollArea className="h-[300px]">
        {detections.length === 0 ? (
          <div className="text-center py-8">
            <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground hud-text">No detections logged</p>
            <p className="text-xs text-muted-foreground">Start mission to begin scanning</p>
          </div>
        ) : (
          <div className="space-y-2">
            {detections.map((detection) => (
              <div 
                key={detection.id}
                className={`p-3 rounded border transition-all duration-300 ${
                  detection.risk === 'HIGH' 
                    ? 'border-danger/50 bg-danger/5' 
                    : detection.risk === 'MEDIUM'
                    ? 'border-warning/50 bg-warning/5'
                    : 'border-info/50 bg-info/5'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-mono font-bold text-foreground">
                      #{detection.id.slice(-6).toUpperCase()}
                    </span>
                    <Badge className={`text-xs hud-text ${getRiskColor(detection.risk)}`}>
                      {detection.risk}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{formatTime(detection.timestamp)}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-muted-foreground hud-text">TYPE:</span>
                    <span className="ml-1 font-medium">{detection.type}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground hud-text">SIZE:</span>
                    <span className="ml-1 font-medium">{detection.size}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground hud-text">MATERIAL:</span>
                    <span className="ml-1 font-medium">{detection.material}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground hud-text">ORBIT:</span>
                    <span className="ml-1 font-medium">{detection.orbit}</span>
                  </div>
                </div>

                <div className="mt-2 pt-2 border-t border-border/50">
                  <div className="flex items-center justify-between">
                    <div className="text-xs">
                      <span className="text-muted-foreground hud-text">CONFIDENCE:</span>
                      <span className="ml-1 font-bold text-primary">
                        {(detection.confidence * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="text-xs">
                      <span className="text-muted-foreground hud-text">COLLISION RISK:</span>
                      <span className={`ml-1 font-bold ${getRiskColor(detection.risk).split(' ')[0]}`}>
                        {getRiskPercentage(detection)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </Card>
  );
};