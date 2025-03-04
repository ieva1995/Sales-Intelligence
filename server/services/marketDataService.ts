import axios from 'axios';

interface NewsItem {
  title: string;
  description: string;
  url: string;
  source: string;
  publishedAt: string;
}

interface CompanyInsight {
  company: string;
  insight: string;
  opportunity: string;
  priority: "high" | "medium" | "low";
  date: string;
}

export class MarketDataService {
  private newsApiKey = process.env.NEWS_API_KEY;
  private alphaVantageKey = process.env.ALPHA_VANTAGE_API_KEY;
  private fmpKey = process.env.FMP_API_KEY;

  async getLatestNews(): Promise<NewsItem[]> {
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?category=business&language=en&apiKey=${this.newsApiKey}`
      );
      return response.data.articles.map((article: any) => ({
        title: article.title,
        description: article.description,
        url: article.url,
        source: article.source.name,
        publishedAt: article.publishedAt
      }));
    } catch (error) {
      console.error('Error fetching news:', error);
      throw new Error('Failed to fetch latest news');
    }
  }

  async getCompanyInsights(symbol: string): Promise<CompanyInsight[]> {
    try {
      // Get company news from FMP
      const newsResponse = await axios.get(
        `https://financialmodelingprep.com/api/v3/stock_news?tickers=${symbol}&limit=5&apikey=${this.fmpKey}`
      );

      // Get company profile for additional context
      const profileResponse = await axios.get(
        `https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${this.fmpKey}`
      );

      const companyName = profileResponse.data[0]?.companyName || symbol;

      return newsResponse.data.map((news: any) => {
        // Determine priority based on sentiment and impact
        const priority = this.analyzePriority(news.sentiment);

        return {
          company: companyName,
          insight: news.title,
          opportunity: this.generateOpportunity(news.text, companyName),
          priority,
          date: new Date(news.publishedAt).toISOString()
        };
      });
    } catch (error) {
      console.error('Error fetching company insights:', error);
      throw new Error('Failed to fetch company insights');
    }
  }

  async getMarketData(symbol: string) {
    try {
      const response = await axios.get(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${this.alphaVantageKey}`
      );
      return response.data['Global Quote'];
    } catch (error) {
      console.error('Error fetching market data:', error);
      throw new Error('Failed to fetch market data');
    }
  }

  private analyzePriority(sentiment: string): "high" | "medium" | "low" {
    switch (sentiment?.toLowerCase()) {
      case 'positive':
        return "high";
      case 'neutral':
        return "medium";
      default:
        return "low";
    }
  }

  private generateOpportunity(text: string, companyName: string): string {
    // Simple opportunity generation based on news content
    if (text.includes('expansion') || text.includes('growth')) {
      return `Growth partnership opportunity with ${companyName}`;
    } else if (text.includes('technology') || text.includes('digital')) {
      return `Digital transformation solutions for ${companyName}`;
    } else if (text.includes('challenge') || text.includes('problem')) {
      return `Strategic consulting services for ${companyName}`;
    }
    return `Business development opportunity with ${companyName}`;
  }
}

export const marketDataService = new MarketDataService();
