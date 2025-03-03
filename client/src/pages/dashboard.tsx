import { useQuery } from "@tanstack/react-query";
import TrendChart from "@/components/TrendChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchTrendData } from "@/lib/trends";
import { Trend } from "@shared/schema";

export default function Dashboard() {
  const { data: trends, isLoading } = useQuery<Trend[]>({
    queryKey: ["/api/trends"]
  });

  const { data: trendData } = useQuery({
    queryKey: ["trend-data"],
    queryFn: () => fetchTrendData("example"),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Active Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{trends?.length || 0}</div>
          </CardContent>
        </Card>
      </div>

      {trendData && (
        <TrendChart
          data={trendData.timelineData}
          title="Trend Overview"
        />
      )}
    </div>
  );
}
