import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  TrendingUp, 
  Activity,
  ExternalLink,
  Database,
  Brain,
  Settings
} from 'lucide-react';

const Insights = () => {
  return (
    <div className="min-h-screen bg-gradient-space p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold hud-text glow-primary mb-2">
              MISSION INSIGHTS
            </h1>
            <p className="text-muted-foreground">
              Advanced Analytics & Performance Dashboard
            </p>
          </div>
          <Badge className="hud-text bg-secondary/20 text-secondary border-secondary">
            STREAMLIT READY
          </Badge>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Streamlit Dashboard Embed */}
          <div className="col-span-9">
            <Card className="p-6 bg-card/80 backdrop-blur-sm border-border shadow-glow-primary">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <BarChart3 className="h-6 w-6 glow-primary" />
                  <h2 className="text-xl font-semibold hud-text glow-primary">
                    STREAMLIT DASHBOARD
                  </h2>
                </div>
                <Button variant="outline" className="hud-text">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open Full View
                </Button>
              </div>

              <div className="aspect-video bg-muted/30 rounded border border-border flex items-center justify-center">
                <div className="text-center">
                  <Activity className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold hud-text mb-2">Streamlit Integration</h3>
                  <p className="text-muted-foreground mb-4 max-w-md">
                    Advanced analytics dashboard will be embedded here using iframe or direct integration
                  </p>
                  <div className="flex items-center justify-center space-x-4">
                    <Button variant="secondary" className="hud-text">
                      <Database className="h-4 w-4 mr-2" />
                      Connect Data
                    </Button>
                    <Button variant="outline" className="hud-text">
                      <Settings className="h-4 w-4 mr-2" />
                      Configure
                    </Button>
                  </div>
                </div>
              </div>

              {/* Mock Analytics Preview */}
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="p-4 bg-muted/30 rounded border border-border">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-success" />
                    <span className="text-sm hud-text text-muted-foreground">Detection Rate</span>
                  </div>
                  <div className="text-2xl font-bold text-success">87.3%</div>
                  <div className="text-xs text-muted-foreground">+5.2% from last week</div>
                </div>
                
                <div className="p-4 bg-muted/30 rounded border border-border">
                  <div className="flex items-center space-x-2 mb-2">
                    <Activity className="h-4 w-4 text-warning" />
                    <span className="text-sm hud-text text-muted-foreground">Avg Response</span>
                  </div>
                  <div className="text-2xl font-bold text-warning">1.4s</div>
                  <div className="text-xs text-muted-foreground">-0.3s improvement</div>
                </div>
                
                <div className="p-4 bg-muted/30 rounded border border-border">
                  <div className="flex items-center space-x-2 mb-2">
                    <Brain className="h-4 w-4 text-info" />
                    <span className="text-sm hud-text text-muted-foreground">Model Accuracy</span>
                  </div>
                  <div className="text-2xl font-bold text-info">94.1%</div>
                  <div className="text-xs text-muted-foreground">YOLOv8 performance</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Control Panel & Integration Info */}
          <div className="col-span-3 space-y-6">
            {/* Analytics Controls */}
            <Card className="p-4 bg-card/80 backdrop-blur-sm border-border">
              <h3 className="text-lg font-semibold hud-text glow-primary mb-4">
                ANALYTICS CONTROLS
              </h3>
              
              <div className="space-y-3">
                <Button className="w-full hud-text shadow-glow-primary">
                  <Activity className="h-4 w-4 mr-2" />
                  REFRESH DATA
                </Button>
                <Button variant="secondary" className="w-full hud-text">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  EXPORT REPORT
                </Button>
                <Button variant="outline" className="w-full hud-text">
                  <Settings className="h-4 w-4 mr-2" />
                  CONFIGURE
                </Button>
              </div>

              <div className="mt-6 pt-4 border-t border-border">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground hud-text">Data Range</span>
                    <span className="text-info hud-text">7 DAYS</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground hud-text">Update Freq</span>
                    <span className="text-foreground hud-text">REAL-TIME</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground hud-text">Data Points</span>
                    <span className="text-foreground hud-text">15,742</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Streamlit Integration */}
            <Card className="p-4 bg-card/80 backdrop-blur-sm border-border">
              <h3 className="text-lg font-semibold hud-text text-secondary mb-4">
                STREAMLIT INTEGRATION
              </h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-success rounded-full"></div>
                  <span className="text-muted-foreground">Python Environment</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-success rounded-full"></div>
                  <span className="text-muted-foreground">Streamlit App Ready</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-success rounded-full"></div>
                  <span className="text-muted-foreground">Data Pipeline</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-warning rounded-full"></div>
                  <span className="text-muted-foreground">Deployment Pending</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  Deploy Streamlit dashboard and embed using iframe or component integration.
                </p>
              </div>
            </Card>

            {/* Key Metrics */}
            <Card className="p-4 bg-card/80 backdrop-blur-sm border-border">
              <h3 className="text-lg font-semibold hud-text glow-accent mb-4">
                KEY METRICS
              </h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Mission Success</span>
                    <span className="text-success">92%</span>
                  </div>
                  <div className="w-full bg-muted h-2 rounded-full">
                    <div className="bg-success h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Detection Accuracy</span>
                    <span className="text-info">87%</span>
                  </div>
                  <div className="w-full bg-muted h-2 rounded-full">
                    <div className="bg-info h-2 rounded-full" style={{ width: '87%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">System Efficiency</span>
                    <span className="text-warning">78%</span>
                  </div>
                  <div className="w-full bg-muted h-2 rounded-full">
                    <div className="bg-warning h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;