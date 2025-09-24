import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useMissionStore } from '@/store/useMissionStore';
import { useSocket } from '@/hooks/useSocket';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Search, 
  Crosshair, 
  AlertTriangle,
  Zap 
} from 'lucide-react';

export const MissionControls = () => {
  const { isActive, setMissionActive, resetMission } = useMissionStore();
  const { triggerDetection } = useSocket();

  const handleLaunch = () => {
    setMissionActive(!isActive);
  };

  const handleReset = () => {
    resetMission();
  };

  const handleManualDetection = () => {
    triggerDetection();
  };

  const controls = [
    {
      label: isActive ? 'PAUSE' : 'LAUNCH',
      action: handleLaunch,
      icon: isActive ? Pause : Play,
      variant: isActive ? 'secondary' : 'default',
      className: isActive ? '' : 'shadow-glow-primary',
    },
    {
      label: 'DETECT',
      action: handleManualDetection,
      icon: Search,
      variant: 'secondary',
      className: 'shadow-glow-secondary',
    },
    {
      label: 'EMERGENCY',
      action: () => setMissionActive(false),
      icon: AlertTriangle,
      variant: 'destructive',
      className: 'shadow-glow-danger',
    },
    {
      label: 'RESET',
      action: handleReset,
      icon: RotateCcw,
      variant: 'outline',
      className: '',
    },
  ];

  return (
    <Card className="p-4 bg-card/80 backdrop-blur-sm border-border">
      <h3 className="text-lg font-semibold hud-text glow-primary mb-4">
        MISSION CONTROLS
      </h3>
      
      <div className="grid grid-cols-2 gap-3">
        {controls.map((control) => {
          const Icon = control.icon;
          return (
            <Button
              key={control.label}
              onClick={control.action}
              variant={control.variant as any}
              className={`hud-text flex items-center space-x-2 h-12 ${control.className}`}
            >
              <Icon className="h-4 w-4" />
              <span>{control.label}</span>
            </Button>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground hud-text">STATUS</span>
          <span className={`hud-text font-bold ${isActive ? 'glow-accent' : 'text-muted-foreground'}`}>
            {isActive ? 'OPERATIONAL' : 'STANDBY'}
          </span>
        </div>
      </div>
    </Card>
  );
};