import { Activity } from "lucide-react";
import SearchBox from "./SearchBox";
import StatsPanel from "./StatsPanel";
import EarthquakeList from "./EarthquakeList";

export default function Sidebar({
  earthquakes,
  selectedEarthquake,
  onEarthquakeSelect,
  search,
  setSearch,
}) {
  return (
    <div className="h-screen bg-white dark:bg-gray-900 rounded-lg shadow-lg flex flex-col">
      {/* Header */}
     <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-gray-800 dark:to-gray-900 text-white shrink-0">
  {/* Header */}
  <div className="flex items-center gap-2 mb-3">
    <Activity className="w-5 h-5" />
    <h2 className="text-lg font-semibold">Recent Earthquakes</h2>
  </div>

  {/* Search Box */}
  <SearchBox
    search={search}
    setSearch={setSearch}
    earthquakes={earthquakes}
    onEarthquakeSelect={onEarthquakeSelect}
    className="bg-white/20 dark:bg-gray-700/30 text-gray-900 dark:text-gray-100 placeholder-gray-200 dark:placeholder-gray-400"
  />
</div>


      {/* Stats */}
      <StatsPanel earthquakes={earthquakes} />

      {/* Earthquake List (scrollable section) */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-700 dark:scrollbar-track-gray-900">
        <EarthquakeList
          earthquakes={earthquakes}
          selectedEarthquake={selectedEarthquake}
          onEarthquakeSelect={onEarthquakeSelect}
        />
      </div>
    </div>
  );
}
