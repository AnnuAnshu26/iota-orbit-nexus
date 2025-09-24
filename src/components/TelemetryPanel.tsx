import { useMissionStore } from '@/store/useMissionStore';
import { Card } from '@/components/ui/card';
import { Gauge, Navigation, Zap, Globe } from 'lucide-react';

export const TelemetryPanel = () => {
  const { telemetry } = useMissionStore();

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  const telemetryItems = [
    {
      label: 'Altitude',
      value: `${telemetry.altitude.toFixed(1)} km`,
      icon: Navigation,
      color: 'text-primary',
    },
    {
      label: 'Velocity',
      value: `${telemetry.velocity.toFixed(2)} km/s`,
      icon: Zap,
      color: 'text-secondary',
    },
    {
      label: 'Inclination',
      value: `${telemetry.inclination.toFixed(1)}°`,
      icon: Globe,
      color: 'text-accent',
    },
    {
      label: 'Energy',
      value: `${telemetry.energy.toFixed(0)}%`,
      icon: Gauge,
      color: telemetry.energy > 80 ? 'text-success' : telemetry.energy > 50 ? 'text-warning' : 'text-danger',
    },
  ];

  return (
    <Card className="p-4 bg-card/80 backdrop-blur-sm border-border shadow-glow-primary">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold hud-text glow-primary">TELEMETRY</h3>
        <span className="text-sm text-muted-foreground">
          {formatTime(telemetry.timestamp)}
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {telemetryItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="space-y-2">
              <div className="flex items-center space-x-2">
                <Icon className={`h-4 w-4 ${item.color}`} />
                <span className="text-sm hud-text text-muted-foreground">{item.label}</span>
              </div>
              <div className={`text-xl font-bold hud-text ${item.color}`}>
                {item.value}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};