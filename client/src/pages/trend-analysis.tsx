import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TrendChart from "@/components/TrendChart";
import TrendAlert from "@/components/TrendAlert";
import { fetchTrendData } from "@/lib/trends";
import { Alert } from "@shared/schema";

export default function TrendAnalysis() {
  const [keyword, setKeyword] = useState("");

  const { data: alerts } = useQuery<Alert[]>({
    queryKey: ["/api/alerts"]
  });

  const { data: trendData } = useQuery({
    queryKey: ["trend-data", keyword],
    queryFn: () => fetchTrendData(keyword),
    enabled: !!keyword
  });

  const toggleAlertMutation = useMutation({
    mutationFn: async ({ id, active }: { id: number; active: boolean }) => {
      await fetch(`/api/alerts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active })
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/alerts"] });
    }
  });

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Trend Analysis</h1>

      <div className="flex gap-4 mb-8">
        <Input
          placeholder="Enter keyword to analyze"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button>Analyze</Button>
      </div>

      {trendData && (
        <div className="mb-8">
          <TrendChart
            data={trendData.timelineData}
            title={`Trend Analysis: ${keyword}`}
          />
        </div>
      )}

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Trend Alerts</h2>
        {alerts?.map((alert) => (
          <TrendAlert
            key={alert.id}
            alert={alert}
            onToggle={(id, active) => toggleAlertMutation.mutate({ id, active })}
          />
        ))}
      </div>
    </div>
  );
}
