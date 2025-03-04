import { WebSocket } from "ws";
import { News, InsertNews } from "@shared/schema";
import { marketDataService } from "./marketDataService";

interface NewsUpdate {
  company: string;
  insight: string;
  opportunity: string;
  priority: "high" | "medium" | "low";
  date: string;
}

export class NewsService {
  private clients: Set<WebSocket> = new Set();
  private watchlist: string[] = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META']; // Example watchlist

  constructor() {
    this.startNewsPolling();
  }

  addClient(ws: WebSocket) {
    this.clients.add(ws);
    ws.on("close", () => this.clients.delete(ws));
  }

  private async startNewsPolling() {
    setInterval(async () => {
      try {
        const news = await this.fetchLatestNews();
        this.broadcastNews(news);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    }, 30000); // Poll every 30 seconds
  }

  private async fetchLatestNews(): Promise<NewsUpdate[]> {
    try {
      // Fetch insights for companies in watchlist
      const allInsights = await Promise.all(
        this.watchlist.map(symbol => marketDataService.getCompanyInsights(symbol))
      );

      // Flatten and sort by date
      return allInsights
        .flat()
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5); // Get latest 5 insights
    } catch (error) {
      console.error("Error fetching market news:", error);
      throw error;
    }
  }

  private broadcastNews(news: NewsUpdate[]) {
    const message = JSON.stringify({ type: 'news-update', data: news });
    this.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }
}

export const newsService = new NewsService();