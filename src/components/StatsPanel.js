export default function StatsPanel({ earthquakes }) {
  const totalEvents = earthquakes.length;
  const majorEvents = earthquakes.filter(eq => eq.properties.mag >= 4).length;

  return (
    <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg shadow-sm mb-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Total Events */}
        <div className="text-center bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3 flex flex-col items-center justify-center shadow-sm transition-colors duration-200">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
            {totalEvents}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-300">
            Total Events
          </div>
        </div>

        {/* Major Events */}
        <div className="text-center bg-red-50 dark:bg-red-900/30 rounded-lg p-3 flex flex-col items-center justify-center shadow-sm transition-colors duration-200">
          <div className="text-2xl font-bold text-red-600 dark:text-red-400 mb-1">
            {majorEvents}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-300">
            Magnitude 4+
          </div>
        </div>
      </div>
    </div>
  );
}
