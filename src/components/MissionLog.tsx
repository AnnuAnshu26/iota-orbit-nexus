import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useMissionStore } from '@/store/useMissionStore';
import { MissionLog as LogEntry } from '@/types/mission';
import { 
  Info, 
  AlertTriangle, 
  XCircle, 
  CheckCircle, 
  Trash2,
  Terminal 
} from 'lucide-react';

const getLogIcon = (type: LogEntry['type']) => {
  switch (type) {
    case 'INFO': return Info;
    case 'WARNING': return AlertTriangle;
    case 'ERROR': return XCircle;
    case 'SUCCESS': return CheckCircle;
    default: return Info;
  }
};

const getLogColor = (type: LogEntry['type']) => {
  switch (type) {
    case 'INFO': return 'text-info';
    case 'WARNING': return 'text-warning';
    case 'ERROR': return 'text-danger';
    case 'SUCCESS': return 'text-success';
    default: return 'text-foreground';
  }
};

export const MissionLog = () => {
  const { logs, clearLogs } = useMissionStore();

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <Card className="p-4 bg-card/80 backdrop-blur-sm border-border h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Terminal className="h-5 w-5 glow-primary" />
          <h3 className="text-lg font-semibold hud-text glow-primary">MISSION LOG</h3>
        </div>
        <Button 
          onClick={clearLogs}
          variant="outline"
          size="sm"
          className="hud-text"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          CLEAR
        </Button>
      </div>

      {/* Log Entries */}
      <ScrollArea className="flex-1">
        <div className="space-y-2">
          {logs.length === 0 ? (
            <div className="text-center py-8">
              <Terminal className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-muted-foreground hud-text">No log entries</p>
            </div>
          ) : (
            logs.map((log) => {
              const Icon = getLogIcon(log.type);
              const colorClass = getLogColor(log.type);
              
              return (
                <div 
                  key={log.id}
                  className="p-3 bg-muted/30 rounded border border-border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start space-x-3">
                    <Icon className={`h-4 w-4 mt-0.5 ${colorClass}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className={`text-xs hud-text font-bold ${colorClass}`}>
                          {log.type}
                        </span>
                        <span className="text-xs text-muted-foreground font-mono">
                          {formatTime(log.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-foreground font-mono leading-relaxed">
                        {log.message}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </ScrollArea>

      {/* Footer Stats */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <span className="hud-text">ENTRIES: {logs.length}</span>
          <span className="font-mono">
            {logs.length > 0 && formatTime(logs[0].timestamp)}
          </span>
        </div>
      </div>
    </Card>
  );
};