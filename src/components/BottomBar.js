export default function BottomBar({ count, selectedEarthquake }) {
	return (
		<div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-6 py-3 flex items-center justify-between shadow-md">
			<div className="text-gray-700 dark:text-gray-200 text-sm">
				Showing <span className="font-semibold">{count}</span> earthquakes
			</div>
			<div className="text-gray-700 dark:text-gray-200 text-sm">
				{selectedEarthquake
					? `Selected: ${selectedEarthquake.properties.place} (M${selectedEarthquake.properties.mag})`
					: "No earthquake selected"}
			</div>
		</div>
	);
}
