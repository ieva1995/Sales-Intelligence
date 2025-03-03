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
        activity: ["placed an order", "viewed a product", "started a session"][Math.floor(Math.random() * 3)],
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
    }
  }, [rotation]);

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader>
        <CardTitle>Live Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[400px] relative">
          <Globe
            ref={globeEl}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            backgroundColor="rgba(0,0,0,0)"
            pointsData={activities}
            pointLat="lat"
            pointLng="lng"
            pointColor={() => '#fff'}
            pointAltitude={0.1}
            pointRadius={0.5}
            pointsMerge={true}
            atmosphereColor="#ffffff"
            atmosphereAltitude={0.1}
            onGlobeClick={() => setRotation(!rotation)}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white to-transparent h-16" />
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
