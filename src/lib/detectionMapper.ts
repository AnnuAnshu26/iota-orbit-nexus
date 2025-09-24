// Detection Model Response Mapper
// Maps YOLOv8 model responses to internal Detection format

import { Detection } from '@/types/mission';

// YOLOv8 model response interface
export interface YOLOv8Response {
  detections: Array<{
    class_id: number;
    class_name: string;
    confidence: number;
    bbox: [number, number, number, number]; // [x1, y1, x2, y2]
    image_path?: string;
  }>;
  image_width: number;
  image_height: number;
  inference_time_ms: number;
  timestamp: number;
}

// Material classification based on debris type
const getMaterial = (className: string): string => {
  const materialMap: { [key: string]: string } = {
    'satellite': 'Aluminum Alloy',
    'rocket_stage': 'Steel',
    'solar_panel': 'Silicon/Glass',
    'antenna': 'Carbon Fiber',
    'debris_fragment': 'Mixed Materials',
    'micrometeorite': 'Rock/Metal',
  };
  return materialMap[className.toLowerCase()] || 'Unknown Material';
};

// Risk assessment based on size and confidence
const assessRisk = (confidence: number, size: number): Detection['risk'] => {
  if (confidence > 0.8 && size > 2) return 'HIGH';
  if (confidence > 0.6 && size > 1) return 'MEDIUM';
  return 'LOW';
};

// Size estimation from bounding box
const estimateSize = (bbox: [number, number, number, number], imageWidth: number, imageHeight: number): string => {
  const [x1, y1, x2, y2] = bbox;
  const widthPx = x2 - x1;
  const heightPx = y2 - y1;
  
  // Convert pixel dimensions to estimated real-world size (mock calculation)
  const widthM = (widthPx / imageWidth) * 5; // Assume max 5m objects
  const heightM = (heightPx / imageHeight) * 5;
  
  return `${widthM.toFixed(1)}m × ${heightM.toFixed(1)}m`;
};

// Generate orbital position from detection
const generateOrbitalPosition = (): { x: number; y: number; z: number } => ({
  x: (Math.random() - 0.5) * 1000,
  y: (Math.random() - 0.5) * 1000,
  z: (Math.random() - 0.5) * 1000,
});

// Map YOLOv8 response to Detection format
export const mapYOLOv8ToDetection = (response: YOLOv8Response): Detection[] => {
  return response.detections.map((det, index) => {
    const size = estimateSize(det.bbox, response.image_width, response.image_height);
    const sizeNum = parseFloat(size.split('m')[0]);
    const risk = assessRisk(det.confidence, sizeNum);
    
    return {
      id: `yolo-${response.timestamp}-${index}`,
      type: det.class_name.replace('_', ' ').toUpperCase(),
      confidence: det.confidence,
      size,
      material: getMaterial(det.class_name),
      orbit: `LEO ${Math.floor(Math.random() * 200 + 350)}km`,
      altitude: Math.random() * 200 + 350,
      velocity: Math.random() * 2 + 6.5,
      inclination: Math.random() * 60 + 20,
      risk,
      position: generateOrbitalPosition(),
      imageURL: det.image_path,
      timestamp: response.timestamp,
    };
  });
};

// Mock YOLOv8 API integration
export const inferModel = {
  // Mock detection endpoint
  detect: async (imageData: Blob | string): Promise<Detection[]> => {
    // In production, this would call your Python YOLOv8 service
    const mockResponse: YOLOv8Response = {
      detections: [
        {
          class_id: 0,
          class_name: 'satellite_fragment',
          confidence: 0.87,
          bbox: [120, 80, 250, 180],
          image_path: '/mock/detection-preview.jpg',
        }
      ],
      image_width: 640,
      image_height: 480,
      inference_time_ms: 156,
      timestamp: Date.now(),
    };
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return mapYOLOv8ToDetection(mockResponse);
  },

  // Mock continuous detection stream
  startDetectionStream: (callback: (detections: Detection[]) => void) => {
    // In production, this would establish WebSocket connection to Python service
    const interval = setInterval(async () => {
      if (Math.random() < 0.3) { // 30% chance of detection
        const detections = await inferModel.detect('mock-stream-frame');
        callback(detections);
      }
    }, 3000);

    return () => clearInterval(interval);
  },
};

// Integration endpoints for Python service
export const pythonServiceConfig = {
  baseURL: process.env.PYTHON_SERVICE_URL || 'http://localhost:8000',
  endpoints: {
    detect: '/api/detect',
    detectStream: '/api/detect/stream',
    health: '/api/health',
  },
};