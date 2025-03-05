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
  private isPolling: boolean = false;
  private pollingInterval: NodeJS.Timeout | null = null;

  constructor() {
    console.log("NewsService initialized");
    this.startNewsPolling();
  }

  addClient(ws: WebSocket) {
    console.log("New WebSocket client connected");
    this.clients.add(ws);

    // Send initial data to newly connected client
    this.fetchLatestNews()
      .then(news => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ type: 'news-update', data: news[0] || this.getDefaultNews() }));
        }
      })
      .catch(error => {
        console.error("Error sending initial data:", error);
      });

    // Set up event listener for when client disconnects
    ws.on("close", (code, reason) => {
      console.log(`WebSocket client disconnected. Code: ${code}, Reason: ${reason || 'No reason provided'}`);
      this.clients.delete(ws);
    });

    ws.on("error", (error) => {
      console.error("WebSocket client error:", error);
      this.clients.delete(ws);
    });
  }

  private async startNewsPolling() {
    // Prevent multiple polling intervals
    if (this.isPolling) {
      return;
    }

    this.isPolling = true;
    console.log("Starting news polling service");

    this.pollingInterval = setInterval(async () => {
      try {
        // Only fetch news if there are connected clients
        if (this.clients.size > 0) {
          console.log(`Fetching news for ${this.clients.size} connected clients`);
          const news = await this.fetchLatestNews();
          if (news && news.length > 0) {
            this.broadcastNews(news);
          }
        }
      } catch (error) {
        console.error("Error in news polling:", error);
      }
    }, 30000); // Poll every 30 seconds
  }

  stopNewsPolling() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
      this.isPolling = false;
      console.log("News polling stopped");
    }
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
      return [this.getDefaultNews()]; // Return default news on error
    }
  }

  private broadcastNews(news: NewsUpdate[]) {
    const message = JSON.stringify({ type: 'news-update', data: news[0] || this.getDefaultNews() });

    console.log(`Broadcasting news to ${this.clients.size} clients`);
    let disconnectedClients = 0;

    this.clients.forEach(client => {
      try {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message);
        } else if (client.readyState === WebSocket.CLOSED || client.readyState === WebSocket.CLOSING) {
          disconnectedClients++;
          this.clients.delete(client);
        }
      } catch (error) {
        console.error("Error sending to client:", error);
        this.clients.delete(client);
        disconnectedClients++;
      }
    });

    if (disconnectedClients > 0) {
      console.log(`Removed ${disconnectedClients} disconnected clients`);
    }
  }

  // Provide default news item in case of API failures
  private getDefaultNews(): NewsUpdate {
    return {
      company: "AI Innovation Group",
      insight: "Latest advancements in AI assistant technology",
      opportunity: "AI integration services for enterprise workflows",
      priority: "medium",
      date: new Date().toISOString()
    };
  }
}

export const newsService = new NewsService();