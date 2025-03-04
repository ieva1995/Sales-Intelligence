import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Send, TrendingUp, MessageSquare, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WhisperBot() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">AI Whisper Bot</h1>
        <p className="text-muted-foreground">Industry news analysis with targeted solution suggestions</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-blue-500/10 border-0">
          <CardContent className="p-4 flex items-center space-x-4">
            <Bot className="h-8 w-8 text-blue-500" />
            <div>
              <h3 className="font-semibold text-lg">News Analysis</h3>
              <p className="text-sm text-muted-foreground">Scan industry updates</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-500/10 border-0">
          <CardContent className="p-4 flex items-center space-x-4">
            <TrendingUp className="h-8 w-8 text-green-500" />
            <div>
              <h3 className="font-semibold text-lg">Opportunity Alerts</h3>
              <p className="text-sm text-muted-foreground">Real-time notifications</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-500/10 border-0">
          <CardContent className="p-4 flex items-center space-x-4">
            <Send className="h-8 w-8 text-purple-500" />
            <div>
              <h3 className="font-semibold text-lg">Auto-Response</h3>
              <p className="text-sm text-muted-foreground">Smart suggestions</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Features Overview */}
      <Card className="border-0 bg-slate-800">
        <CardHeader>
          <CardTitle>Features Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-500/10 rounded-lg">
              <h4 className="font-medium text-blue-400 mb-2">Intelligent News Monitoring</h4>
              <p className="text-sm text-gray-300">Continuously scans industry news, LinkedIn updates, and market trends to identify potential opportunities.</p>
            </div>
            
            <div className="p-4 bg-green-500/10 rounded-lg">
              <h4 className="font-medium text-green-400 mb-2">Smart Solution Matching</h4>
              <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                <li>Analyzes company challenges mentioned in news</li>
                <li>Maps your solutions to their problems</li>
                <li>Generates personalized outreach suggestions</li>
              </ul>
            </div>

            <div className="p-4 bg-purple-500/10 rounded-lg">
              <h4 className="font-medium text-purple-400 mb-2">Proactive Engagement</h4>
              <div className="space-y-2">
                <Button className="w-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-400">
                  Start News Analysis
                </Button>
                <Button className="w-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-400">
                  View Opportunities
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Insights */}
      <Card className="border-0 bg-slate-800">
        <CardHeader>
          <CardTitle>Recent Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                company: "Tech Innovators Inc",
                insight: "Announced digital transformation initiative",
                opportunity: "Cloud migration solutions",
                date: "2 hours ago"
              },
              {
                company: "Global Systems Ltd",
                insight: "Published report on security challenges",
                opportunity: "Security assessment services",
                date: "5 hours ago"
              },
              {
                company: "Future Dynamics",
                insight: "Expanding operations in APAC",
                opportunity: "Regional scaling solutions",
                date: "1 day ago"
              }
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <MessageSquare className="h-5 w-5 text-blue-400" />
                  <div>
                    <h4 className="font-medium">{item.company}</h4>
                    <p className="text-sm text-gray-400">{item.insight}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-green-400">{item.opportunity}</p>
                  <p className="text-xs text-gray-400">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
