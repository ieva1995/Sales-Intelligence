import { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

  // Simulate live data
  useEffect(() => {
    const interval = setInterval(() => {
      const newActivity = {
        lat: (Math.random() - 0.5) * 180,
        lng: (Math.random() - 0.5) * 360,
        city: ["New York", "London", "Tokyo", "Paris", "Sydney"][Math.floor(Math.random() * 5)],
        country: ["USA", "UK", "Japan", "France", "Australia"][Math.floor(Math.random() * 5)],
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
      globeEl.current.controls().autoRotateSpeed = 0.5;

      // Set initial camera position
      globeEl.current.pointOfView({
        lat: 0,
        lng: 0,
        altitude: 2.5
      });
    }
  }, [rotation]);

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader>
        <CardTitle>Live Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[400px] relative bg-[#31373D]">
          <Globe
            ref={globeEl}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            backgroundColor="#31373D"
            pointsData={activities}
            pointLat="lat"
            pointLng="lng"
            pointColor={() => '#fff'}
            pointAltitude={0.1}
            pointRadius={0.8}
            pointsMerge={true}
            atmosphereColor="transparent"
            atmosphereAltitude={0}
            onGlobeClick={() => setRotation(!rotation)}
          />
        </div>
        <div className="p-4 space-y-2">
          {activities.slice(-3).reverse().map((activity, idx) => (
            <div key={idx} className="text-sm">
              <span className="font-medium">{activity.city}, {activity.country}</span>
              <span className="text-muted-foreground"> {activity.activity}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}