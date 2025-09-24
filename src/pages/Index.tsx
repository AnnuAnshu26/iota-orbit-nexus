import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Satellite, 
  Gamepad2, 
  Trophy, 
  BarChart3,
  ArrowRight,
  Target,
  Zap,
  Shield
} from 'lucide-react';

const Index = () => {
  const features = [
    {
      title: 'Mission Cockpit',
      description: '3D orbital visualization with real-time debris detection and spacecraft control',
      icon: Satellite,
      path: '/cockpit',
      color: 'glow-primary',
    },
    {
      title: 'Unity Simulation',
      description: 'Interactive 3D training environment for debris capture operations',
      icon: Gamepad2,
      path: '/simulation',
      color: 'glow-secondary',
    },
    {
      title: 'Leaderboard',
      description: 'Global rankings and pilot performance statistics',
      icon: Trophy,
      path: '/leaderboard',
      color: 'glow-accent',
    },
    {
      title: 'Mission Insights',
      description: 'Advanced analytics dashboard with AI-powered insights',
      icon: BarChart3,
      path: '/insights',
      color: 'text-warning',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-space">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center space-x-4 mb-8">
            <Satellite className="h-16 w-16 glow-primary" />
            <h1 className="text-6xl font-bold hud-text glow-primary">IOTA-6</h1>
          </div>
          
          <h2 className="text-3xl font-semibold hud-text mb-6">
            ORBITAL DEBRIS DETECTION & CAPTURE SYSTEM
          </h2>
          
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
            Advanced space mission control platform featuring real-time debris detection, 
            3D orbital visualization, and AI-powered analytics for space debris management operations.
          </p>

          <div className="flex items-center justify-center space-x-6 mb-16">
            <Button asChild size="lg" className="hud-text shadow-glow-primary">
              <Link to="/cockpit" className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>LAUNCH MISSION</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="hud-text">
              <Link to="/simulation" className="flex items-center space-x-2">
                <Gamepad2 className="h-5 w-5" />
                <span>TRAINING MODE</span>
              </Link>
            </Button>
          </div>

          {/* Mission Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold glow-accent mb-2">1,247</div>
              <div className="text-sm text-muted-foreground hud-text">DEBRIS CAPTURED</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-warning mb-2">94.1%</div>
              <div className="text-sm text-muted-foreground hud-text">DETECTION ACCURACY</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-info mb-2">89</div>
              <div className="text-sm text-muted-foreground hud-text">ACTIVE PILOTS</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-6 py-20">
        <h3 className="text-2xl font-semibold hud-text glow-primary text-center mb-12">
          MISSION CONTROL SYSTEMS
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={feature.path}
                className="p-6 bg-card/80 backdrop-blur-sm border-border hover:shadow-glow-primary transition-all duration-300 group"
              >
                <div className="flex items-start space-x-4">
                  <Icon className={`h-12 w-12 ${feature.color} group-hover:scale-110 transition-transform`} />
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold hud-text mb-3">{feature.title}</h4>
                    <p className="text-muted-foreground mb-4">{feature.description}</p>
                    <Button asChild variant="outline" className="hud-text">
                      <Link to={feature.path} className="flex items-center space-x-2">
                        <span>ACCESS</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Integration Status */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold hud-text glow-primary text-center mb-12">
            FUTURE INTEGRATIONS
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-4 bg-card/80 backdrop-blur-sm border-border">
              <div className="flex items-center space-x-3 mb-3">
                <div className="h-3 w-3 bg-success rounded-full"></div>
                <span className="hud-text font-semibold">YOLOv8 Detection Model</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Python-based AI model integration ready for real-time debris detection
              </p>
            </Card>
            
            <Card className="p-4 bg-card/80 backdrop-blur-sm border-border">
              <div className="flex items-center space-x-3 mb-3">
                <div className="h-3 w-3 bg-success rounded-full"></div>
                <span className="hud-text font-semibold">Unity 3D Simulation</span>
              </div>
              <p className="text-sm text-muted-foreground">
                WebGL deployment ready for interactive training scenarios
              </p>
            </Card>
            
            <Card className="p-4 bg-card/80 backdrop-blur-sm border-border">
              <div className="flex items-center space-x-3 mb-3">
                <div className="h-3 w-3 bg-warning rounded-full"></div>
                <span className="hud-text font-semibold">Firebase Backend</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Real-time database and authentication for persistent leaderboards
              </p>
            </Card>
            
            <Card className="p-4 bg-card/80 backdrop-blur-sm border-border">
              <div className="flex items-center space-x-3 mb-3">
                <div className="h-3 w-3 bg-warning rounded-full"></div>
                <span className="hud-text font-semibold">Streamlit Analytics</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Advanced data visualization and mission performance insights
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
