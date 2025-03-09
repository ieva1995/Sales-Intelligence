import { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface ActivityPoint {
  lat: number;
  lng: number;
  city: string;
  country: string;
  activity: string;
  timestamp: number;
}

export default function ActivityGlobe() {
  const globeEl = useRef<any>();
  const [activities, setActivities] = useState<ActivityPoint[]>([]);
  const [rotation, setRotation] = useState<boolean>(true);

  // Generate hexagonal grid data
  const generateHexGrid = () => {
    const hexData = [];
    for (let lat = -90; lat <= 90; lat += 1) {  // Smaller step size for denser grid
      for (let lng = -180; lng <= 180; lng += 1) {
        hexData.push({ lat, lng });
      }
    }
    return hexData;
  };

  // Simulate live data
  useEffect(() => {
    const interval = setInterval(() => {
      const newActivity = {
        lat: (Math.random() - 0.5) * 180,
        lng: (Math.random() - 0.5) * 360,
        city: ["Spijkenisse", "Mohafazat Mont-Liban", "Ashburn", "Paris", "Sydney"][Math.floor(Math.random() * 5)],
        country: ["The Netherlands", "Lebanon", "United States", "France", "Australia"][Math.floor(Math.random() * 5)],
        activity: ["viewed a product", "started a session", "placed an order"][Math.floor(Math.random() * 3)],
        timestamp: Date.now()
      };

      setActivities(prev => [...prev.slice(-20), newActivity]); // Keep last 20 activities
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = rotation;
      globeEl.current.controls().autoRotateSpeed = 0.35;

      // Set initial camera position for flatter view
      globeEl.current.pointOfView({
        lat: 25,
        lng: 0,
        altitude: 2.8
      });
    }
  }, [rotation]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Live Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="px-4 py-3 border-b">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search location"
              className="pl-9 bg-gray-50 border-gray-200"
            />
          </div>
        </div>
        <div className="h-[400px] relative bg-[#1C2B36]"> 
          <Globe
            ref={globeEl}
            backgroundColor="rgba(0,0,0,0)"
            pointsData={activities}
            pointLat="lat"
            pointLng="lng"
            pointColor="#0091ff"
            pointAltitude={0.15}
            pointRadius={1.5}
            pointsMerge={true}
            atmosphereColor="transparent"
            atmosphereAltitude={0.1}
            onGlobeClick={() => setRotation(!rotation)}
            hexPolygonsData={generateHexGrid()}
            hexPolygonResolution={3}
            hexPolygonMargin={0.7}
            hexPolygonColor="#64B5F6" // Lighter blue color
            hexPolygonAltitude={0.01}
          />
        </div>
        <div className="p-4 space-y-2 border-t">
          {activities.slice(-3).reverse().map((activity, idx) => (
            <div key={idx} className="text-sm">
              <span className="font-medium">{activity.city}, {activity.country}</span>
              <span className="text-gray-500"> {activity.activity}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}