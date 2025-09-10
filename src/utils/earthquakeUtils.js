// ...existing code...
// Utility functions for earthquake data processing

export const getIntensityColor = (mag) => {
  if (mag >= 6) return "bg-red-500";
  if (mag >= 4) return "bg-orange-500";
  if (mag >= 2) return "bg-yellow-500";
  return "bg-green-500";
};

export const getMarkerSize = (mag) => Math.max(8, mag * 4);

export const getMarkerColor = (mag) => {
  if (mag >= 6) return "#dc2626"; // red
  if (mag >= 4) return "#ea580c"; // orange
  if (mag >= 2) return "#ca8a04"; // yellow
  return "#16a34a"; // green
};

export const getTimeAgo = (timestamp) => {
  const now = new Date();
  const eventTime = new Date(timestamp);
  const diffMs = now - eventTime;
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  
  if (diffHours > 0) return `${diffHours}h ago`;
  return `${diffMinutes}m ago`;
};

export const formatCoordinates = (lat, lon) => {
  return `${lat.toFixed(2)}°, ${lon.toFixed(2)}°`;
};

export const getMagnitudeLabel = (mag) => {
  if (mag >= 6) return "Major";
  if (mag >= 4) return "Moderate";
  if (mag >= 2) return "Minor";
  return "Micro";
};