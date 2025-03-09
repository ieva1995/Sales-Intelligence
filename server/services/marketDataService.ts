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
      if (!this.newsApiKey) {
        console.warn('NEWS_API_KEY not set, returning mock data');
        return this.getMockNews();
      }

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
      return this.getMockNews();
    }
  }

  async getCompanyInsights(symbol: string): Promise<CompanyInsight[]> {
    try {
      if (!this.fmpKey) {
        console.warn('FMP_API_KEY not set, returning mock data');
        return this.getMockInsights(symbol);
      }

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
      return this.getMockInsights(symbol);
    }
  }

  async getMarketData(symbol: string) {
    try {
      if (!this.alphaVantageKey) {
        console.warn('ALPHA_VANTAGE_API_KEY not set, returning mock data');
        return this.getMockMarketData(symbol);
      }

      const response = await axios.get(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${this.alphaVantageKey}`
      );
      return response.data['Global Quote'];
    } catch (error) {
      console.error('Error fetching market data:', error);
      return this.getMockMarketData(symbol);
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
    if (text && typeof text === 'string') {
      if (text.includes('expansion') || text.includes('growth')) {
        return `Growth partnership opportunity with ${companyName}`;
      } else if (text.includes('technology') || text.includes('digital')) {
        return `Digital transformation solutions for ${companyName}`;
      } else if (text.includes('challenge') || text.includes('problem')) {
        return `Strategic consulting services for ${companyName}`;
      }
    }
    return `Business development opportunity with ${companyName}`;
  }

  // Mock data generators for fallback when API calls fail
  private getMockNews(): NewsItem[] {
    return [
      {
        title: "Tech Giants Announce New AI Partnership",
        description: "Leading tech companies collaborate on ethical AI development standards",
        url: "https://example.com/tech-ai-partnership",
        source: "Tech Business News",
        publishedAt: new Date().toISOString()
      },
      {
        title: "Global Supply Chain Disruptions Ease",
        description: "Shipping costs decrease as logistics bottlenecks begin to clear",
        url: "https://example.com/supply-chain-news",
        source: "Global Commerce Report",
        publishedAt: new Date().toISOString()
      },
      {
        title: "New Regulations Impact E-commerce Sales",
        description: "How recent policy changes are reshaping online retail strategies",
        url: "https://example.com/ecommerce-regulations",
        source: "Digital Market Watch",
        publishedAt: new Date().toISOString()
      }
    ];
  }

  private getMockInsights(symbol: string): CompanyInsight[] {
    const companyName = symbol === 'AAPL' ? 'Apple' : 
                        symbol === 'MSFT' ? 'Microsoft' : 
                        symbol === 'GOOGL' ? 'Google' : 
                        symbol === 'META' ? 'Meta' : symbol;

    return [
      {
        company: companyName,
        insight: `${companyName} Announces Quarterly Earnings Above Expectations`,
        opportunity: `Growth partnership opportunity with ${companyName}`,
        priority: "high",
        date: new Date().toISOString()
      },
      {
        company: companyName,
        insight: `${companyName} Launches New Product Line`,
        opportunity: `Digital transformation solutions for ${companyName}`,
        priority: "medium",
        date: new Date().toISOString()
      },
      {
        company: companyName,
        insight: `${companyName} Faces Supply Chain Challenges`,
        opportunity: `Strategic consulting services for ${companyName}`,
        priority: "low",
        date: new Date().toISOString()
      }
    ];
  }

  private getMockMarketData(symbol: string) {
    return {
      "01. symbol": symbol,
      "02. open": "150.23",
      "03. high": "152.87",
      "04. low": "149.56",
      "05. price": "151.45",
      "06. volume": "25689043",
      "07. latest trading day": new Date().toISOString().split('T')[0],
      "08. previous close": "149.78",
      "09. change": "+1.67",
      "10. change percent": "+1.1151%"
    };
  }
}

export const marketDataService = new MarketDataService();