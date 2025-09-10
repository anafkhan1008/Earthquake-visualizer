import { useEffect } from "react";
import { useMap } from "react-leaflet";

export default function MapController({ selectedEarthquake }) {
  const map = useMap();

  useEffect(() => {
    if (selectedEarthquake) {
      const [lng, lat] = selectedEarthquake.geometry.coordinates;
      map.flyTo([lat, lng], 6, { duration: 1.5 }); // zoom level 6
    }
  }, [selectedEarthquake, map]);

  return null;
}
