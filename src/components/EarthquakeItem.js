import { Clock } from "lucide-react";
import { getIntensityColor, getTimeAgo } from "../utils/earthquakeUtils";

export default function EarthquakeItem({ earthquake, isSelected, onClick }) {
  const { properties, geometry } = earthquake;
  const mag = properties.mag || 0;
  
  return (
    <div
      onClick={onClick}
      className={`p-3 mb-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
        isSelected 
          ? 'bg-blue-50 dark:bg-blue-900 border-2 border-blue-200 dark:border-blue-500 shadow-sm' 
          : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${getIntensityColor(mag)}`} />
          <span className="font-semibold text-sm text-gray-800 dark:text-gray-100">
            M{mag.toFixed(1)}
          </span>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
          <Clock className="w-3 h-3" />
          {getTimeAgo(properties.time)}
        </div>
      </div>
      
      <h3 className="font-medium text-sm text-gray-800 dark:text-gray-100 mb-1 line-clamp-2">
        {properties.place}
      </h3>
      
      <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
        <div>Depth: {geometry.coordinates[2]} km</div>
        <div>
          Coords: {geometry.coordinates[1].toFixed(2)}°, {geometry.coordinates[0].toFixed(2)}°
        </div>
      </div>
    </div>
  );
}