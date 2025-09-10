import { Activity } from "lucide-react";
import EarthquakeItem from "./EarthquakeItem";

export default function EarthquakeList({ earthquakes, selectedEarthquake, onEarthquakeSelect }) {
  if (earthquakes.length === 0) {
    return (
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 text-center text-gray-500 dark:text-gray-400">
          <Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p>No earthquakes found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-2">
        {earthquakes.map((eq) => (
          <EarthquakeItem
            key={eq.id}
            earthquake={eq}
            isSelected={selectedEarthquake?.id === eq.id}
            onClick={() => onEarthquakeSelect(eq)}
          />
        ))}
      </div>
    </div>
  );
}