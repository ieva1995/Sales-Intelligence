import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { predictTrend } from "@/lib/trends";
import { LoadingAnimation } from "@/components/LoadingAnimation";
import { Search } from "lucide-react";

export default function Predictions() {
  const [keyword, setKeyword] = useState("");

  const { data: prediction, refetch, isFetching } = useQuery({
    queryKey: ["prediction", keyword],
    queryFn: () => predictTrend(keyword),
    enabled: false
  });

  const handlePredict = () => {
    if (keyword.trim()) {
      refetch();
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">ML Predictions</h1>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Enter keyword to predict trends..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handlePredict()}
                className="w-full"
              />
            </div>
            <Button 
              onClick={handlePredict}
              disabled={!keyword.trim() || isFetching}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6"
            >
              <Search className="h-4 w-4 mr-2" />
              Predict Trend
            </Button>
          </div>
        </CardContent>
      </Card>

      {isFetching && <LoadingAnimation />}

      {prediction && !isFetching && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
    </div>
  );
}