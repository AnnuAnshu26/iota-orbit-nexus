import { Button } from '@/components/ui/button';
import { useMissionStore } from '@/store/useMissionStore';
import { MissionLog as LogEntry } from '@/types/mission';
import { 
  Info, 
  AlertTriangle, 
  XCircle, 
  CheckCircle, 
  Trash2,
} from 'lucide-react';
import { useEffect, useRef } from 'react';

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
    case 'INFO': return 'text-blue-400';
    case 'WARNING': return 'text-yellow-400';
    case 'ERROR': return 'text-red-400';
    case 'SUCCESS': return 'text-green-400';
    default: return 'text-gray-300';
  }
};

export const MissionLog = () => {
  const { logs, clearLogs } = useMissionStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  // Auto-scroll to latest log
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="bg-gray-900 text-white p-4 rounded-xl shadow-lg h-full flex flex-col">
      {/* Header */}
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
      
      {/* Logs */}
      <div 
        ref={scrollRef}
        className="overflow-y-auto max-h-64 space-y-2 pr-2 flex-1 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
      >
        {logs.map((log) => {
          const Icon = getLogIcon(log.type);
          const color = getLogColor(log.type);

          return (
            <div key={log.id} className="flex items-start gap-2">
              <Icon className={`h-4 w-4 mt-1 ${color}`} />
              <p className="text-sm text-gray-300">
                <span className="font-mono text-xs text-gray-400">
                  [{formatTime(log.timestamp)}]
                </span>{" "}
                {log.message}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
