import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Satellite, 
  Gamepad2, 
  Trophy, 
  BarChart3,
  Home 
} from 'lucide-react';

export const Navigation = () => {
  const location = useLocation();

  const navItems = [
    {
      path: '/',
      label: 'HOME',
      icon: Home,
    },
    {
      path: '/cockpit',
      label: 'COCKPIT',
      icon: Satellite,
    },
    {
      path: '/simulation',
      label: 'SIMULATION',
      icon: Gamepad2,
    },
    {
      path: '/leaderboard',
      label: 'LEADERBOARD',
      icon: Trophy,
    },
    {
      path: '/insights',
      label: 'INSIGHTS',
      icon: BarChart3,
    },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Satellite className="h-8 w-8 glow-primary" />
            <span className="text-xl font-bold hud-text glow-primary">IOTA-6</span>
          </Link>
          
          <div className="flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Button
                  key={item.path}
                  asChild
                  variant={isActive ? 'default' : 'ghost'}
                  className={`hud-text ${isActive ? 'shadow-glow-primary' : ''}`}
                >
                  <Link to={item.path} className="flex items-center space-x-2">
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};