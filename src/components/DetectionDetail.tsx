import { 
  Card 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Detection } from '@/types/mission';
import { useSocket } from '@/hooks/useSocket';

// Import all 4 debris images
import Debris1 from '@/assets/debris1.png';
import Debris2 from '@/assets/debris2.png';
import Debris3 from '@/assets/debris3.png';
import Debris4 from '@/assets/debris4.png';

// Put them in an array
const debrisImages = [Debris1, Debris2, Debris3, Debris4];

interface DetectionDetailProps {
  detection: Detection;
}

export const DetectionDetail = ({ detection }: DetectionDetailProps) => {
  const { triggerCapture } = useSocket();

  const handleCapture = () => {
    triggerCapture(detection.id);
  };

  const riskPercentage = Math.floor(
    (detection.confidence || 0.5) * 100 + 
    (detection.risk === 'HIGH' ? 15 : detection.risk === 'MEDIUM' ? 5 : 0)
  );

  // Separate random picks for preview and button
  const previewDebris = detection.imageURL || debrisImages[Math.floor(Math.random() * debrisImages.length)];
  const buttonDebris = debrisImages[Math.floor(Math.random() * debrisImages.length)];

  return (
    <div className="bg-gray-900 text-white p-4 rounded-xl shadow-lg space-y-2">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-bold text-cyan-400">
          DETECTION #{detection.id.slice(-6).toUpperCase()}
        </h3>
        <Badge className={`text-xs ${
          detection.risk === 'HIGH' ? 'bg-red-500/20 text-red-400 border-red-500' : 
          detection.risk === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500' : 
          'bg-blue-500/20 text-blue-400 border-blue-500'
        }`}>
          {detection.risk}
        </Badge>
      </div>

      {/* Debris Preview Image */}
      <div className="border border-cyan-400 p-2 rounded-lg flex justify-center bg-gray-800/50">
        <img 
          src={previewDebris} 
          alt="debris" 
          className="w-32 h-32 object-contain"
        />
      </div>

      {/* Detection Details Grid */}
      <div className="grid grid-cols-2 gap-2 text-sm">
        <p><span className="text-gray-400">Object:</span> {detection.type}</p>
        <p><span className="text-gray-400">Confidence:</span> {(detection.confidence * 100).toFixed(0)}%</p>
        <p><span className="text-gray-400">Size:</span> {detection.size}</p>
        <p><span className="text-gray-400">Material:</span> {detection.material}</p>
        <p><span className="text-gray-400">Orbit:</span> {detection.altitude} km</p>
        <p><span className="text-gray-400">Risk:</span> {riskPercentage}%</p>
      </div>

      {/* Risk Progress Bar */}
      <div className="w-full bg-gray-700 h-2 rounded">
        <div 
          className={`h-2 rounded transition-all duration-300 ${
            riskPercentage > 70 ? "bg-red-500" : 
            riskPercentage > 40 ? "bg-yellow-400" : 
            "bg-blue-400"
          }`} 
          style={{width: `${riskPercentage}%`}}
        ></div>
      </div>

      {/* Orbital Parameters */}
      <div className="grid grid-cols-3 gap-2 text-xs text-gray-400 pt-2 border-t border-gray-700">
        <div>ALT: {detection.altitude}km</div>
        <div>VEL: {detection.velocity.toFixed(1)}km/s</div>
        <div>INC: {detection.inclination.toFixed(1)}°</div>
      </div>

      {/* Actions */}
      <div className="flex space-x-2 pt-2">
        <Button 
          onClick={handleCapture}
          size="sm"
          className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white"
        >
          <img src={buttonDebris} alt="capture debris" className="h-4 w-4 mr-2" />
          CAPTURE
        </Button>
        <Button 
          variant="outline"
          size="sm"
          className="text-gray-300 border-gray-600 hover:bg-gray-800"
        >
          ANALYZE
        </Button>
      </div>
    </div>
  );
};
