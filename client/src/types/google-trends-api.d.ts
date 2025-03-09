declare module 'google-trends-api' {
  interface TrendOptions {
    keyword: string;
    startTime?: Date;
    endTime?: Date;
    geo?: string;
  }

  interface GoogleTrendsAPI {
    interestOverTime(options: TrendOptions): Promise<string>;
    relatedQueries(options: TrendOptions): Promise<string>;
    relatedTopics(options: TrendOptions): Promise<string>;
  }

  const googleTrends: GoogleTrendsAPI;
  export default googleTrends;
}
