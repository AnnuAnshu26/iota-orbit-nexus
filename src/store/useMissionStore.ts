import { create } from 'zustand';
import { Detection, Telemetry, MissionLog, MissionState } from '@/types/mission';

interface MissionStore extends MissionState {
  // Actions
  setMissionActive: (active: boolean) => void;
  addDetection: (detection: Detection) => void;
  removeDetection: (id: string) => void;
  updateTelemetry: (telemetry: Telemetry) => void;
  addLog: (log: Omit<MissionLog, 'id' | 'timestamp'>) => void;
  clearLogs: () => void;
  updateScore: (score: number) => void;
  resetMission: () => void;
}

const initialState: MissionState = {
  isActive: false,
  detections: [],
  telemetry: {
    altitude: 414,
    velocity: 7.74,
    inclination: 51.2,
    energy: 92,
    timestamp: Date.now(),
  },
  logs: [
    {
      id: '1',
      timestamp: Date.now(),
      type: 'INFO',
      message: 'IOTA-6 Mission Control System Online',
    },
  ],
  score: 0,
};

export const useMissionStore = create<MissionStore>((set, get) => ({
  ...initialState,

  setMissionActive: (active) => {
    set({ isActive: active });
    get().addLog({
      type: active ? 'SUCCESS' : 'INFO',
      message: active ? 'Mission Started' : 'Mission Paused',
    });
  },

  addDetection: (detection) => {
    set((state) => ({
      detections: [...state.detections, detection],
      score: state.score + (detection.risk === 'HIGH' ? 100 : detection.risk === 'MEDIUM' ? 50 : 25),
    }));
    get().addLog({
      type: detection.risk === 'HIGH' ? 'WARNING' : 'INFO',
      message: `Debris Detected: ${detection.type} (${detection.risk} Risk)`,
    });
  },

  removeDetection: (id) => {
    set((state) => ({
      detections: state.detections.filter((d) => d.id !== id),
    }));
    get().addLog({
      type: 'SUCCESS',
      message: 'Debris Captured Successfully',
    });
  },

  updateTelemetry: (telemetry) => {
    set({ telemetry });
  },

  addLog: (log) => {
    const newLog: MissionLog = {
      ...log,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
    };
    set((state) => ({
      logs: [newLog, ...state.logs].slice(0, 100), // Keep last 100 logs
    }));
  },

  clearLogs: () => {
    set({ logs: [] });
  },

  updateScore: (score) => {
    set({ score });
  },

  resetMission: () => {
    set({
      ...initialState,
      logs: [
        {
          id: '1',
          timestamp: Date.now(),
          type: 'INFO',
          message: 'Mission Reset - System Ready',
        },
      ],
    });
  },
}));