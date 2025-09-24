import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { 
  Trophy, 
  Medal, 
  Award,
  Target,
  Clock,
  Zap,
  Database
} from 'lucide-react';

const Leaderboard = () => {
  // Mock leaderboard data
  const mockLeaderboard = [
    {
      rank: 1,
      name: "Commander Steel",
      score: 15750,
      captures: 42,
      accuracy: 94,
      avgTime: "02:15",
      badge: "Elite",
    },
    {
      rank: 2,
      name: "Captain Nova",
      score: 14200,
      captures: 38,
      accuracy: 89,
      avgTime: "02:32",
      badge: "Expert",
    },
    {
      rank: 3,
      name: "Lt. Phoenix",
      score: 13850,
      captures: 35,
      accuracy: 91,
      avgTime: "02:28",
      badge: "Expert",
    },
    {
      rank: 4,
      name: "Pilot Vega",
      score: 12900,
      captures: 33,
      accuracy: 87,
      avgTime: "02:45",
      badge: "Advanced",
    },
    {
      rank: 5,
      name: "Cadet Orion",
      score: 11500,
      captures: 29,
      accuracy: 83,
      avgTime: "03:01",
      badge: "Advanced",
    },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="h-6 w-6 text-warning" />;
      case 2: return <Medal className="h-6 w-6 text-muted-foreground" />;
      case 3: return <Award className="h-6 w-6 text-amber-600" />;
      default: return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Elite': return 'bg-warning/20 text-warning border-warning';
      case 'Expert': return 'bg-info/20 text-info border-info';
      case 'Advanced': return 'bg-accent/20 text-accent border-accent';
      default: return 'bg-muted/20 text-muted-foreground border-muted';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-space p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold hud-text glow-primary mb-2">
              MISSION LEADERBOARD
            </h1>
            <p className="text-muted-foreground">
              Top Performers in Debris Capture Operations
            </p>
          </div>
          <Badge className="hud-text bg-info/20 text-info border-info">
            FIREBASE READY
          </Badge>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Leaderboard */}
          <div className="col-span-8">
            <Card className="p-6 bg-card/80 backdrop-blur-sm border-border shadow-glow-primary">
              <div className="flex items-center space-x-2 mb-6">
                <Trophy className="h-6 w-6 glow-primary" />
                <h2 className="text-xl font-semibold hud-text glow-primary">
                  TOP PILOTS
                </h2>
              </div>

              <div className="space-y-4">
                {mockLeaderboard.map((pilot) => (
                  <div 
                    key={pilot.rank}
                    className={`p-4 rounded-lg border transition-all duration-300 ${
                      pilot.rank <= 3 
                        ? 'bg-primary/10 border-primary shadow-glow-primary' 
                        : 'bg-muted/30 border-border hover:bg-muted/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          {getRankIcon(pilot.rank)}
                        </div>
                        <Avatar className="h-12 w-12">
                          <div className="w-full h-full bg-gradient-primary rounded-full flex items-center justify-center">
                            <span className="text-lg font-bold text-primary-foreground">
                              {pilot.name.charAt(0)}
                            </span>
                          </div>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold hud-text text-lg">{pilot.name}</h3>
                          <Badge className={`hud-text text-xs ${getBadgeColor(pilot.badge)}`}>
                            {pilot.badge}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex items-center space-x-8">
                        <div className="text-center">
                          <div className="text-2xl font-bold glow-accent">{pilot.score.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground hud-text">SCORE</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-success">{pilot.captures}</div>
                          <div className="text-xs text-muted-foreground hud-text">CAPTURES</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-info">{pilot.accuracy}%</div>
                          <div className="text-xs text-muted-foreground hud-text">ACCURACY</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-warning">{pilot.avgTime}</div>
                          <div className="text-xs text-muted-foreground hud-text">AVG TIME</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Stats & Firebase Info */}
          <div className="col-span-4 space-y-6">
            {/* Global Stats */}
            <Card className="p-4 bg-card/80 backdrop-blur-sm border-border">
              <h3 className="text-lg font-semibold hud-text glow-primary mb-4">
                GLOBAL STATISTICS
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Target className="h-4 w-4 text-success" />
                    <span className="text-sm hud-text">Total Captures</span>
                  </div>
                  <span className="font-bold text-success">1,247</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-warning" />
                    <span className="text-sm hud-text">Active Pilots</span>
                  </div>
                  <span className="font-bold text-warning">89</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-info" />
                    <span className="text-sm hud-text">Avg Mission Time</span>
                  </div>
                  <span className="font-bold text-info">02:47</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Trophy className="h-4 w-4 text-primary" />
                    <span className="text-sm hud-text">High Score</span>
                  </div>
                  <span className="font-bold glow-accent">15,750</span>
                </div>
              </div>
            </Card>

            {/* Firebase Integration */}
            <Card className="p-4 bg-card/80 backdrop-blur-sm border-border">
              <h3 className="text-lg font-semibold hud-text text-info mb-4">
                FIREBASE INTEGRATION
              </h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-success rounded-full"></div>
                  <span className="text-muted-foreground">Real-time Database</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-success rounded-full"></div>
                  <span className="text-muted-foreground">Authentication Ready</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-success rounded-full"></div>
                  <span className="text-muted-foreground">Score Persistence</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-warning rounded-full"></div>
                  <span className="text-muted-foreground">Cloud Functions</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center space-x-2 mb-2">
                  <Database className="h-4 w-4 text-info" />
                  <span className="text-xs hud-text text-info">Mock Data Active</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Connect Firebase SDK to enable persistent leaderboards and user authentication.
                </p>
              </div>
            </Card>

            {/* Your Stats Placeholder */}
            <Card className="p-4 bg-card/80 backdrop-blur-sm border-border">
              <h3 className="text-lg font-semibold hud-text glow-accent mb-4">
                YOUR PERFORMANCE
              </h3>
              
              <div className="text-center py-4">
                <div className="text-2xl font-bold glow-accent mb-2">--</div>
                <div className="text-sm text-muted-foreground hud-text mb-4">
                  Complete a mission to see your stats
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <div className="text-muted-foreground">Rank</div>
                    <div className="font-bold">--</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Best Score</div>
                    <div className="font-bold">--</div>
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

export default Leaderboard;