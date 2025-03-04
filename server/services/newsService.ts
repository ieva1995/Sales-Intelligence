import OpenAI from "openai";
import { WebSocket } from "ws";
import { News, InsertNews } from "@shared/schema";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

interface NewsUpdate {
  company: string;
  insight: string;
  opportunity: string;
  priority: "high" | "medium" | "low";
  date: string;
}

export class NewsService {
  private clients: Set<WebSocket> = new Set();

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
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a market intelligence AI that analyzes companies and generates real-time insights. Generate 3 recent company insights with business opportunities in JSON format.",
        }
      ],
      response_format: { type: "json_object" },
    });

    if (!response.choices[0].message.content) {
      throw new Error("No content in OpenAI response");
    }

    const result = JSON.parse(response.choices[0].message.content);
    return result.insights.map((insight: any) => ({
      company: insight.company,
      insight: insight.announcement,
      opportunity: insight.opportunity,
      priority: insight.priority as "high" | "medium" | "low",
      date: new Date().toISOString()
    }));
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