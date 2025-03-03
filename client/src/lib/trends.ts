import { apiRequest } from "./queryClient";

export async function fetchTrendData(keyword: string) {
  try {
    const res = await apiRequest('GET', `/api/trends-data/${encodeURIComponent(keyword)}`);
    return await res.json();
  } catch (error) {
    console.error('Error fetching Google Trends data:', error);
    throw new Error('Failed to fetch trend data');
  }
}

export async function predictTrend(keyword: string) {
  try {
    const res = await apiRequest('GET', `/api/trends-prediction/${encodeURIComponent(keyword)}`);
    return await res.json();
  } catch (error) {
    console.error('Error predicting trend:', error);
    throw new Error('Failed to predict trend');
  }
}