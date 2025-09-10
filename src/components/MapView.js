import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useRef, useState } from "react";

// Marker color by magnitude
const getMarkerColor = (mag) => {
  if (mag >= 2) return "yellow";
  if (mag >= 6) return "red";
  if (mag >= 4) return "orange";
  return "green";
};

// Pan/zoom when selected earthquake changes
function MapFocus({ earthquake }) {
  const map = useMap();
  useEffect(() => {
    if (earthquake) {
      const [lng, lat] = earthquake.geometry.coordinates;
      map.flyTo([lat, lng], 6, { duration: 1.5 });
    }
  }, [earthquake, map]);
  return null;
}

function EarthquakeMarker({ eq, onEarthquakeSelect, selectedEarthquake, isDark }) {
  const [lng, lat] = eq.geometry.coordinates;
  const mag = eq.properties.mag;
  const color = getMarkerColor(mag);

  const markerRef = useRef(null);

  const customIcon = L.divIcon({
    className: "custom-marker",
    html: `<div style="background:${color};width:12px;height:12px;border-radius:50%;border:2px solid white;"></div>`,
  });

  // Open popup if this marker is selected
  useEffect(() => {
    if (selectedEarthquake?.id === eq.id && markerRef.current) {
      markerRef.current.openPopup();
    }
  }, [selectedEarthquake, eq.id]);

  return (
    <Marker
      position={[lat, lng]}
      icon={customIcon}
      eventHandlers={{
        click: () => onEarthquakeSelect(eq),
      }}
      ref={markerRef}
    >
      <Popup>
  <div
    className={`text-sm p-4 rounded-lg border transition-colors duration-200 ${
      isDark
        ? "bg-gray-900 text-gray-100 border-gray-700"
        : "bg-white text-gray-800 border-gray-200"
    } min-w-[220px] max-w-[280px]`}
    style={{
      boxShadow: isDark
        ? "0 6px 24px rgba(0,0,0,0.7)"
        : "0 6px 18px rgba(0,0,0,0.12)",
    }}
  >
    {/* Place / Location */}
    <div className="font-semibold text-base mb-2 leading-tight">
      {eq.properties.place}
    </div>

    {/* Magnitude + Time */}
    <div className="flex items-center justify-between mb-2">
      <span
        className={`px-2 py-0.5 text-xs font-bold rounded-md ${
          mag >= 6
            ? "bg-red-100 text-red-600 dark:bg-red-600/20 dark:text-red-400"
            : mag >= 4
            ? "bg-orange-100 text-orange-600 dark:bg-orange-600/20 dark:text-orange-400"
            : 
            mag >= 2
            ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-600/20 dark:text-yellow-400"

            : "bg-green-100 text-green-600 dark:bg-green-600/20 dark:text-green-400"
        }`}
      >
        M{mag}
      </span>
      <span className="text-xs text-gray-500 dark:text-gray-400">
        {new Date(eq.properties.time).toLocaleString()}
      </span>
    </div>

    {/* Depth */}
    <div className="text-xs text-gray-600 dark:text-gray-400">
      Depth: <span className="font-medium">{eq.geometry.coordinates[2]} km</span>
    </div>
  </div>
</Popup>

    </Marker>
  );
}

export default function MapView({ earthquakes, selectedEarthquake, onEarthquakeSelect }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <MapContainer center={[20, 0]} zoom={2} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        url={isDark
          ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        }
        attribution={isDark
          ? '&copy; <a href="https://carto.com/">CartoDB</a>'
          : '&copy; OpenStreetMap contributors'
        }
      />
      {earthquakes.map((eq) => (
        <EarthquakeMarker
          key={eq.id}
          eq={eq}
          onEarthquakeSelect={onEarthquakeSelect}
          selectedEarthquake={selectedEarthquake}
          isDark={isDark}
        />
      ))}
      <MapFocus earthquake={selectedEarthquake} />
    </MapContainer>
  );
}
