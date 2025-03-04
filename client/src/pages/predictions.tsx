import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { predictTrend } from "@/lib/trends";
import { LoadingAnimation } from "@/components/LoadingAnimation";

export default function Predictions() {
  const [keyword, setKeyword] = useState("");

  const { data: prediction, refetch, isFetching } = useQuery({
    queryKey: ["prediction", keyword],
    queryFn: () => predictTrend(keyword),
    enabled: false
  });

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">ML Predictions</h1>

      <div className="flex gap-4 mb-8">
        <Input
          placeholder="Enter keyword to predict"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button onClick={() => refetch()}>Predict</Button>
      </div>

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