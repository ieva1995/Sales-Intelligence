import { googleTrends } from 'google-trends-api';

export async function fetchTrendData(keyword: string) {
  // Mock data for demonstration
  const mockData = {
    timelineData: Array.from({ length: 30 }, (_, i) => ({
      time: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
      value: Math.floor(Math.random() * 100)
    }))
  };

  return mockData;
}

export async function predictTrend(keyword: string) {
  // Mock ML prediction
  return {
    predictedInterest: Math.floor(Math.random() * 100),
    confidence: Math.floor(Math.random() * 100)
  };
}
