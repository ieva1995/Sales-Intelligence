import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Send, TrendingUp, MessageSquare, FileText, Activity, Globe, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export default function WhisperBot() {
  const { toast } = useToast();
  const [insights, setInsights] = useState([
    {
      company: "Tech Innovators Inc",
      insight: "Announced digital transformation initiative",
      opportunity: "Cloud migration solutions",
      date: "2 hours ago",
      priority: "high"
    },
    {
      company: "Global Systems Ltd",
      insight: "Published report on security challenges",
      opportunity: "Security assessment services",
      date: "5 hours ago",
      priority: "medium"
    },
    {
      company: "Future Dynamics",
      insight: "Expanding operations in APAC",
      opportunity: "Regional scaling solutions",
      date: "1 day ago",
      priority: "high"
    }
  ]);

  const handleQuickAction = (action: string) => {
    toast({
      title: `${action} Initiated`,
      description: `Starting ${action.toLowerCase()} process...`,
    });
  };

  const handleConfigure = () => {
    toast({
      title: "Configure Sources",
      description: "Opening source configuration panel...",
    });
  };

  const handleAdjustAlerts = () => {
    toast({
      title: "Alert Settings",
      description: "Opening alert configuration panel...",
    });
  };

  const handleInsightClick = (company: string, opportunity: string) => {
    toast({
      title: `Opportunity: ${company}`,
      description: `Preparing ${opportunity} proposal...`,
    });
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">AI Whisper Bot</h1>
        <p className="text-muted-foreground">Industry news analysis with targeted solution suggestions</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-blue-500/10 border-0 cursor-pointer hover:bg-blue-500/20 transition-colors"
          onClick={() => handleQuickAction("News Analysis")}>
          <CardContent className="p-4 flex items-center space-x-4">
            <Bot className="h-8 w-8 text-blue-500" />
            <div>
              <h3 className="font-semibold text-lg">News Analysis</h3>
              <p className="text-sm text-muted-foreground">Scan industry updates</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-500/10 border-0 cursor-pointer hover:bg-green-500/20 transition-colors"
          onClick={() => handleQuickAction("Opportunity Detection")}>
          <CardContent className="p-4 flex items-center space-x-4">
            <TrendingUp className="h-8 w-8 text-green-500" />
            <div>
              <h3 className="font-semibold text-lg">Opportunity Alerts</h3>
              <p className="text-sm text-muted-foreground">Real-time notifications</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-500/10 border-0 cursor-pointer hover:bg-purple-500/20 transition-colors"
          onClick={() => handleQuickAction("Auto Response")}>
          <CardContent className="p-4 flex items-center space-x-4">
            <Send className="h-8 w-8 text-purple-500" />
            <div>
              <h3 className="font-semibold text-lg">Auto-Response</h3>
              <p className="text-sm text-muted-foreground">Smart suggestions</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monitoring Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 bg-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2 text-blue-400" />
              Live Monitoring
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Globe className="h-5 w-5 text-green-400" />
                  <div>
                    <h4 className="font-medium">Active Monitoring</h4>
                    <p className="text-sm text-gray-400">148 sources</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" onClick={handleConfigure}>
                  Configure
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Bell className="h-5 w-5 text-yellow-400" />
                  <div>
                    <h4 className="font-medium">Alert Settings</h4>
                    <p className="text-sm text-gray-400">Priority: High</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" onClick={handleAdjustAlerts}>
                  Adjust
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card className="border-0 bg-slate-800">
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-500/10 rounded-lg text-center cursor-pointer hover:bg-blue-500/20 transition-colors"
                onClick={() => toast({ title: "Accuracy Analytics", description: "Viewing accuracy metrics..." })}>
                <h3 className="text-2xl font-bold text-blue-400">97%</h3>
                <p className="text-sm text-gray-400">Accuracy Rate</p>
              </div>
              <div className="p-4 bg-green-500/10 rounded-lg text-center cursor-pointer hover:bg-green-500/20 transition-colors"
                onClick={() => toast({ title: "Analysis Volume", description: "Viewing analysis statistics..." })}>
                <h3 className="text-2xl font-bold text-green-400">2.3m</h3>
                <p className="text-sm text-gray-400">Articles Analyzed</p>
              </div>
              <div className="p-4 bg-purple-500/10 rounded-lg text-center cursor-pointer hover:bg-purple-500/20 transition-colors"
                onClick={() => toast({ title: "Opportunity Metrics", description: "Viewing opportunity data..." })}>
                <h3 className="text-2xl font-bold text-purple-400">5.2k</h3>
                <p className="text-sm text-gray-400">Opportunities Found</p>
              </div>
              <div className="p-4 bg-amber-500/10 rounded-lg text-center cursor-pointer hover:bg-amber-500/20 transition-colors"
                onClick={() => toast({ title: "Response Analytics", description: "Viewing response time data..." })}>
                <h3 className="text-2xl font-bold text-amber-400">1.8s</h3>
                <p className="text-sm text-gray-400">Response Time</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Insights */}
      <Card className="border-0 bg-slate-800">
        <CardHeader>
          <CardTitle>Recent Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {insights.map((item, i) => (
              <div 
                key={i} 
                className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg cursor-pointer hover:bg-slate-700/70 transition-colors"
                onClick={() => handleInsightClick(item.company, item.opportunity)}
              >
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
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs ${
                    item.priority === 'high' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {item.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}