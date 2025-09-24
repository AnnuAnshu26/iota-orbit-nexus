// IOTA-6 Mission Type Definitions

export interface Detection {
  id: string;
  type: string;
  confidence: number;
  size: string;
  material: string;
  orbit: string;
  altitude: number;
  velocity: number;
  inclination: number;
  risk: "LOW" | "MEDIUM" | "HIGH";
  position: { x: number; y: number; z: number };
  imageURL?: string;
  timestamp: number;
}

export interface Telemetry {
  altitude: number;
  velocity: number;
  inclination: number;
  energy: number;
  timestamp: number;
}

export interface MissionLog {
  id: string;
  timestamp: number;
  type: "INFO" | "WARNING" | "ERROR" | "SUCCESS";
  message: string;
}

export interface MissionState {
  isActive: boolean;
  detections: Detection[];
  telemetry: Telemetry;
  logs: MissionLog[];
  score: number;
}