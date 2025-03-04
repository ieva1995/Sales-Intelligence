import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, TrendingUp } from "lucide-react";
import TrendChart from "@/components/TrendChart";
import { LoadingAnimation } from "@/components/LoadingAnimation";
import { fetchTrendData, predictTrend } from "@/lib/trends";

export default function TrendsExplorer() {
  const [keyword, setKeyword] = useState("");

  const { data: trendData, isLoading: isLoadingTrends, refetch: refetchTrends } = useQuery({
    queryKey: ["trend-data", keyword],
    queryFn: () => fetchTrendData(keyword),
    enabled: false
  });

  const { data: prediction, isLoading: isLoadingPrediction, refetch: refetchPrediction } = useQuery({
    queryKey: ["prediction", keyword],
    queryFn: () => predictTrend(keyword),
    enabled: false
  });

  const handleSearch = () => {
    if (keyword.trim()) {
      refetchTrends();
    }
  };

  const handlePredict = () => {
    if (keyword.trim()) {
      refetchPrediction();
    }
  };

  const isLoading = isLoadingTrends || isLoadingPrediction;

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Google Trends Explorer</h1>
        <p className="text-muted-foreground text-lg">Analyze search trends and discover insights</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Enter keyword to analyze trends..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full"
              />
            </div>
            <Button 
              onClick={handleSearch}
              disabled={!keyword.trim() || isLoading}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              <Search className="h-4 w-4 mr-2" />
              Analyze
            </Button>
            <Button 
              onClick={handlePredict}
              disabled={!keyword.trim() || isLoading}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Predict
            </Button>
          </div>

          {isLoading && <LoadingAnimation />}

          {trendData && !isLoading && (
            <div className="h-[400px] mt-8">
              <TrendChart
                data={trendData.timelineData}
                title={`Search Trends: ${keyword}`}
              />
            </div>
          )}

          {prediction && !isLoading && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Predicted Interest</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {prediction.predictedInterest}%
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Confidence Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {prediction.confidence}%
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}