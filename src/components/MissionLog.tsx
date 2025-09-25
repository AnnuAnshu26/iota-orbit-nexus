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
    <div className="bg-gray-900 text-white p-4 rounded-xl shadow-lg h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-bold text-cyan-400">Mission Log</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearLogs}
          className="text-gray-400 hover:text-white"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="overflow-y-auto max-h-64 space-y-2 pr-2 flex-1">
        {logs.map((log) => (
          <div
            key={log.id}
            className={`p-2 rounded text-sm transition-all duration-300 ${
              log.type === 'ERROR' 
                ? 'bg-red-900/30 text-red-400 border-l-2 border-red-500' 
                : log.type === 'WARNING'
                ? 'bg-yellow-900/30 text-yellow-400 border-l-2 border-yellow-500'
                : log.type === 'SUCCESS'
                ? 'bg-green-900/30 text-green-400 border-l-2 border-green-500'
                : 'bg-gray-800/50 text-gray-300 border-l-2 border-gray-600'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-gray-400">
                {formatTime(log.timestamp)}
              </span>
              <span className={`text-xs px-1 rounded ${
                log.type === 'ERROR' ? 'bg-red-500/30' : 
                log.type === 'WARNING' ? 'bg-yellow-500/30' : 
                log.type === 'SUCCESS' ? 'bg-green-500/30' : 
                'bg-gray-600/30'
              }`}>
                {log.type}
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-300">{log.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};