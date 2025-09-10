// ...existing code...
import { getMarkerSize, getMarkerColor } from "../utils/earthquakeUtils";

export default function EarthquakeMarker({ earthquake, isSelected, onClick }) {
  const { properties, geometry } = earthquake;
  const [lon, lat] = geometry.coordinates;
  const mag = properties.mag || 0;
  
  // Convert coordinates to screen position (simplified)
  const x = ((lon + 180) / 360) * 100;
  const y = ((90 - lat) / 180) * 100;
  
  return (
    <div
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 hover:scale-125 ${
        isSelected ? 'scale-125 ring-2 ring-white ring-opacity-50' : ''
      }`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${getMarkerSize(mag)}px`,
        height: `${getMarkerSize(mag)}px`,
        backgroundColor: getMarkerColor(mag),
        borderRadius: '50%',
        boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
      }}
      onClick={onClick}
      title={`${properties.place} - Magnitude ${mag}`}
    />
  );
}