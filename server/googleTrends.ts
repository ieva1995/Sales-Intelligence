import googleTrends from 'google-trends-api';

export interface TrendOptions {
  keyword: string;
  startTime?: Date;
  endTime?: Date;
  geo?: string;
}

export async function interestOverTime(options: TrendOptions): Promise<string> {
  try {
    console.log('Fetching Google Trends data for:', options.keyword);
    const result = await googleTrends.interestOverTime({
      keyword: options.keyword,
      startTime: options.startTime,
      endTime: options.endTime,
      geo: options.geo || 'US' // Default to US if no region specified
    });

    // Log the raw response for debugging
    console.log('Raw Google Trends response:', result.slice(0, 200) + '...');

    // Verify we got valid JSON
    try {
      JSON.parse(result);
    } catch (e) {
      console.error('Invalid JSON response from Google Trends');
      throw new Error('Invalid response from Google Trends API');
    }

    return result;
  } catch (error) {
    console.error('Error fetching Google Trends data:', error);
    throw error;
  }
}

export async function relatedQueries(options: TrendOptions): Promise<string> {
  try {
    return await googleTrends.relatedQueries({
      keyword: options.keyword,
      startTime: options.startTime,
      endTime: options.endTime,
      geo: options.geo || 'US'
    });
  } catch (error) {
    console.error('Error fetching related queries:', error);
    throw error;
  }
}

export async function relatedTopics(options: TrendOptions): Promise<string> {
  try {
    return await googleTrends.relatedTopics({
      keyword: options.keyword,
      startTime: options.startTime,
      endTime: options.endTime,
      geo: options.geo || 'US'
    });
  } catch (error) {
    console.error('Error fetching related topics:', error);
    throw error;
  }
}