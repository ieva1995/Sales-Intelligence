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
    <div className="max-w-6xl mx-auto p-4 sm:p-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Google Trends Explorer</h1>
        <p className="text-muted-foreground text-base sm:text-lg">Analyze search trends and discover insights</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:flex-1">
              <Input
                placeholder="Enter keyword to analyze trends..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full"
              />
            </div>
            <div className="flex gap-2 sm:gap-4">
              <Button 
                onClick={handleSearch}
                disabled={!keyword.trim() || isLoading}
                className="flex-1 sm:flex-none bg-orange-500 hover:bg-orange-600 text-white"
              >
                <Search className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Analyze</span>
              </Button>
              <Button 
                onClick={handlePredict}
                disabled={!keyword.trim() || isLoading}
                className="flex-1 sm:flex-none bg-blue-500 hover:bg-blue-600 text-white"
              >
                <TrendingUp className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Predict</span>
              </Button>
            </div>
          </div>

          {isLoading && <LoadingAnimation />}

          {trendData && !isLoading && (
            <div className="h-[300px] sm:h-[400px] mt-6 sm:mt-8">
              <TrendChart
                data={trendData.timelineData}
                title={`Search Trends: ${keyword}`}
              />
            </div>
          )}

          {prediction && !isLoading && (
            <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <Card>
                <CardHeader className="py-4">
                  <CardTitle className="text-lg">Predicted Interest</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl sm:text-3xl font-bold">
                    {prediction.predictedInterest}%
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="py-4">
                  <CardTitle className="text-lg">Confidence Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl sm:text-3xl font-bold">
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