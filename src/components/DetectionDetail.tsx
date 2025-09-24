import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Detection } from '@/types/mission';
import { useSocket } from '@/hooks/useSocket';
import { 
  Target, 
  AlertTriangle, 
  Gauge, 
  Globe2, 
  Zap,
  Package,
  Clock
} from 'lucide-react';

interface DetectionDetailProps {
  detection: Detection;
}

export const DetectionDetail = ({ detection }: DetectionDetailProps) => {
  const { triggerCapture } = useSocket();

  const handleCapture = () => {
    triggerCapture(detection.id);
  };

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

  const detailItems = [
    {
      label: 'Object Type',
      value: detection.type,
      icon: Package,
    },
    {
      label: 'Confidence',
      value: `${(detection.confidence * 100).toFixed(1)}%`,
      icon: Gauge,
    },
    {
      label: 'Size',
      value: detection.size,
      icon: Target,
    },
    {
      label: 'Material',
      value: detection.material,
      icon: Package,
    },
    {
      label: 'Orbit',
      value: detection.orbit,
      icon: Globe2,
    },
    {
      label: 'Velocity',
      value: `${detection.velocity.toFixed(2)} km/s`,
      icon: Zap,
    },
  ];

  return (
    <Card className={`p-4 bg-card/80 backdrop-blur-sm border transition-all duration-300 ${
      detection.risk === 'HIGH' 
        ? 'border-danger shadow-glow-danger animate-pulse-danger' 
        : detection.risk === 'MEDIUM'
        ? 'border-warning shadow-glow-secondary'
        : 'border-info shadow-glow-primary'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <AlertTriangle className={`h-5 w-5 ${getRiskColor(detection.risk).split(' ')[0]}`} />
          <h3 className="font-semibold hud-text text-lg">DETECTION #{detection.id.slice(-6).toUpperCase()}</h3>
        </div>
        <Badge className={`hud-text ${getRiskColor(detection.risk)}`}>
          {detection.risk} RISK
        </Badge>
      </div>

      {/* Enhanced Preview with Risk Indicator */}
      <div className="mb-4 aspect-video bg-muted/50 rounded border border-border relative overflow-hidden">
        {detection.imageURL ? (
          <img 
            src={detection.imageURL} 
            alt={`${detection.type} preview`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Target className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground hud-text">OPTICAL PREVIEW</p>
              <p className="text-xs text-muted-foreground">YOLOv8 Integration Ready</p>
            </div>
          </div>
        )}
        
        {/* Risk Percentage Overlay */}
        <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-bold hud-text ${getRiskColor(detection.risk)}`}>
          {Math.floor((detection.confidence || 0.5) * 100 + (detection.risk === 'HIGH' ? 15 : detection.risk === 'MEDIUM' ? 5 : 0))}% RISK
        </div>
        
        {/* Detection Crosshair */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className={`w-8 h-8 border-2 border-dashed ${getRiskColor(detection.risk).split(' ')[0]} animate-pulse`}>
            <div className="w-full h-full relative">
              <div className="absolute top-0 left-1/2 w-0.5 h-2 bg-current transform -translate-x-1/2"></div>
              <div className="absolute bottom-0 left-1/2 w-0.5 h-2 bg-current transform -translate-x-1/2"></div>
              <div className="absolute left-0 top-1/2 w-2 h-0.5 bg-current transform -translate-y-1/2"></div>
              <div className="absolute right-0 top-1/2 w-2 h-0.5 bg-current transform -translate-y-1/2"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Detection Details */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {detailItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="space-y-1">
              <div className="flex items-center space-x-1">
                <Icon className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs hud-text text-muted-foreground">{item.label}</span>
              </div>
              <p className="text-sm font-mono text-foreground">{item.value}</p>
            </div>
          );
        })}
      </div>

      {/* Position Data */}
      <div className="mb-4 p-3 bg-muted/30 rounded border border-border">
        <div className="flex items-center space-x-1 mb-2">
          <Globe2 className="h-3 w-3 text-muted-foreground" />
          <span className="text-xs hud-text text-muted-foreground">POSITION VECTOR</span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-xs font-mono">
          <div>X: {detection.position.x.toFixed(1)}</div>
          <div>Y: {detection.position.y.toFixed(1)}</div>
          <div>Z: {detection.position.z.toFixed(1)}</div>
        </div>
      </div>

      {/* Timestamp */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-1">
          <Clock className="h-3 w-3 text-muted-foreground" />
          <span className="text-xs text-muted-foreground hud-text">
            Detected: {formatTime(detection.timestamp)}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex space-x-2">
        <Button 
          onClick={handleCapture}
          variant="default"
          size="sm"
          className="flex-1 hud-text shadow-glow-primary"
        >
          <Target className="h-4 w-4 mr-2" />
          CAPTURE
        </Button>
        <Button 
          variant="outline"
          size="sm"
          className="hud-text"
        >
          ANALYZE
        </Button>
      </div>
    </Card>
  );
};