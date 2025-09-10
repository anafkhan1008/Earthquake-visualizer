import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import MapView from "./components/MapView";
import BottomBar from "./components/BottomBar";
import LoadingSpinner from "./components/LoadingSpinner";

export default function App() {
  const [earthquakes, setEarthquakes] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedEarthquake, setSelectedEarthquake] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEarthquakes = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
        );
        const data = await response.json();
        setEarthquakes(data.features || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching earthquake data:", error);
        setLoading(false);
        // Mock data for demo purposes
        setEarthquakes([
          {
            id: "1",
            properties: {
              place: "10km NE of San Francisco, CA",
              mag: 4.2,
              time: Date.now() - 1000000
            },
            geometry: {
              coordinates: [-122.4, 37.8, 10]
            }
          },
          {
            id: "2", 
            properties: {
              place: "Southern Alaska",
              mag: 5.8,
              time: Date.now() - 2000000
            },
            geometry: {
              coordinates: [-152.0, 61.0, 25]
            }
          },
          {
            id: "3",
            properties: {
              place: "Off the coast of Japan",
              mag: 6.1,
              time: Date.now() - 3000000
            },
            geometry: {
              coordinates: [142.0, 38.0, 50]
            }
          },
          {
            id: "4",
            properties: {
              place: "Central Italy",
              mag: 3.4,
              time: Date.now() - 500000
            },
            geometry: {
              coordinates: [13.0, 42.0, 8]
            }
          },
          {
            id: "5",
            properties: {
              place: "Chile Coast",
              mag: 5.1,
              time: Date.now() - 1500000
            },
            geometry: {
              coordinates: [-71.0, -33.0, 35]
            }
          }
        ]);
      }
    };

    fetchEarthquakes();
    
    // Refresh data every 5 minutes
    const interval = setInterval(fetchEarthquakes, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const filteredEarthquakes = earthquakes.filter((eq) =>
    eq.properties.place.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 dark:text-gray-100">
      <Navbar />
      <div className="flex flex-1 p-6 gap-6" style={{ height: 'calc(100vh - 140px)' }}>
        {/* Sidebar - 30% width */}
        <div className="w-[30%] min-w-[320px]">
          <Sidebar 
            earthquakes={filteredEarthquakes}
            selectedEarthquake={selectedEarthquake}
            onEarthquakeSelect={setSelectedEarthquake}
            search={search}
            setSearch={setSearch}
          />
        </div>
        {/* Map - 70% width */}
        <div className="w-[70%]">
          <MapView 
            earthquakes={filteredEarthquakes}
            selectedEarthquake={selectedEarthquake}
            onEarthquakeSelect={setSelectedEarthquake}
          />
        </div>
      </div>
      <BottomBar 
        count={filteredEarthquakes.length}
        selectedEarthquake={selectedEarthquake}
      />
    </div>
  );
}
