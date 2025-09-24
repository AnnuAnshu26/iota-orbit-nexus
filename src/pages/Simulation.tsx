import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Settings,
  Trophy,
  Gamepad2,
  ExternalLink
} from 'lucide-react';

const Simulation = () => {
  return (
    <div className="min-h-screen bg-gradient-space p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold hud-text glow-primary mb-2">
              UNITY SIMULATION
            </h1>
            <p className="text-muted-foreground">
              3D Debris Capture Training Environment
            </p>
          </div>
          <Badge className="hud-text bg-warning/20 text-warning border-warning">
            INTEGRATION READY
          </Badge>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Simulation Viewport */}
          <div className="col-span-9">
            <Card className="p-6 bg-card/80 backdrop-blur-sm border-border shadow-glow-primary">
              <div className="aspect-video bg-muted/30 rounded border border-border flex items-center justify-center">
                <div className="text-center">
                  <Gamepad2 className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold hud-text mb-2">Unity WebGL Placeholder</h3>
                  <p className="text-muted-foreground mb-4">
                    Unity 3D simulation will be embedded here
                  </p>
                  <div className="flex items-center justify-center space-x-4">
                    <Button variant="outline" className="hud-text">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Load Build
                    </Button>
                    <Button variant="secondary" className="hud-text">
                      <Settings className="h-4 w-4 mr-2" />
                      Configure
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Control Panel */}
          <div className="col-span-3 space-y-6">
            {/* Simulation Controls */}
            <Card className="p-4 bg-card/80 backdrop-blur-sm border-border">
              <h3 className="text-lg font-semibold hud-text glow-primary mb-4">
                SIMULATION CONTROLS
              </h3>
              
              <div className="space-y-3">
                <Button className="w-full hud-text shadow-glow-primary">
                  <Play className="h-4 w-4 mr-2" />
                  START SIMULATION
                </Button>
                <Button variant="secondary" className="w-full hud-text">
                  <Pause className="h-4 w-4 mr-2" />
                  PAUSE
                </Button>
                <Button variant="outline" className="w-full hud-text">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  RESET
                </Button>
              </div>

              <div className="mt-6 pt-4 border-t border-border">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground hud-text">Difficulty</span>
                    <span className="text-warning hud-text">MEDIUM</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground hud-text">Time Limit</span>
                    <span className="text-foreground hud-text">10:00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground hud-text">Targets</span>
                    <span className="text-foreground hud-text">15</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Current Score */}
            <Card className="p-4 bg-card/80 backdrop-blur-sm border-border">
              <div className="flex items-center space-x-2 mb-4">
                <Trophy className="h-5 w-5 text-warning" />
                <h3 className="text-lg font-semibold hud-text">CURRENT SCORE</h3>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold glow-accent mb-2">2,450</div>
                <div className="text-sm text-muted-foreground hud-text">POINTS</div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Captures</span>
                  <span className="text-success">7/15</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Accuracy</span>
                  <span className="text-info">85%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Time</span>
                  <span className="text-warning">04:32</span>
                </div>
              </div>
            </Card>

            {/* Integration Info */}
            <Card className="p-4 bg-card/80 backdrop-blur-sm border-border">
              <h3 className="text-lg font-semibold hud-text text-warning mb-4">
                UNITY INTEGRATION
              </h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-success rounded-full"></div>
                  <span className="text-muted-foreground">WebGL Build Ready</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-success rounded-full"></div>
                  <span className="text-muted-foreground">Score API Configured</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-warning rounded-full"></div>
                  <span className="text-muted-foreground">Deployment Pending</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  Replace iframe src with Unity WebGL build URL
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulation;