// ...existing code...
export default function StatsPanel({ earthquakes }) {
  const totalEvents = earthquakes.length;
  const majorEvents = earthquakes.filter(eq => eq.properties.mag >= 4).length;

  return (
    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
      <div className="grid grid-cols-2 gap-4">
        {/* Total Events */}
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {totalEvents}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Total Events
          </div>
        </div>

        {/* Major Events */}
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">
            {majorEvents}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Magnitude 4+
          </div>
        </div>
      </div>
    </div>
  );
}
