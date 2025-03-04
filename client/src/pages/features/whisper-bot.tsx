import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Bot, Send, TrendingUp, MessageSquare, FileText, Activity,
  Globe, Bell, RefreshCw, CheckCircle, AlertTriangle
} from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface Insight {
  company: string;
  insight: string;
  opportunity: string;
  date: string;
  priority: "high" | "medium" | "low";
  status?: "new" | "processing" | "actioned";
}

export default function WhisperBot() {
  const { toast } = useToast();
  const [insights, setInsights] = useState<Insight[]>([
    {
      company: "Tech Innovators Inc",
      insight: "Announced digital transformation initiative",
      opportunity: "Cloud migration solutions",
      date: "2 hours ago",
      priority: "high",
      status: "new"
    },
    {
      company: "Global Systems Ltd",
      insight: "Published report on security challenges",
      opportunity: "Security assessment services",
      date: "5 hours ago",
      priority: "medium",
      status: "processing"
    },
    {
      company: "Future Dynamics",
      insight: "Expanding operations in APAC",
      opportunity: "Regional scaling solutions",
      date: "1 day ago",
      priority: "high",
      status: "actioned"
    }
  ]);

  const [selectedInsight, setSelectedInsight] = useState<Insight | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState(false);

  useEffect(() => {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    const socket = new WebSocket(wsUrl);

    socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        if (message.type === 'news-update') {
          setInsights(prevInsights => {
            const newInsight: Insight = {
              ...message.data,
              status: "new",
              date: "Just now"
            };
            return [newInsight, ...prevInsights.slice(0, 9)];
          });

          toast({
            title: "New Intelligence Alert",
            description: `New insight detected for ${message.data.company}`,
          });
        }
      } catch (error) {
        console.error("Error processing WebSocket message:", error);
      }
    };

    socket.onopen = () => {
      setIsConnected(true);
      setConnectionError(false);
      toast({
        title: "Connected",
        description: "Real-time intelligence feed active",
      });
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      setIsConnected(false);
      setConnectionError(true);
      toast({
        title: "Connection Error",
        description: "Unable to connect to intelligence feed",
        variant: "destructive"
      });
    };

    socket.onclose = () => {
      setIsConnected(false);
    };

    return () => {
      socket.close();
    };
  }, []);

  const handleQuickAction = (action: string) => {
    toast({
      title: `${action} Started`,
      description: `Initiating ${action.toLowerCase()} process...`,
    });
  };

  const handleInsightAction = (insight: Insight) => {
    setSelectedInsight(insight);
    setIsDialogOpen(true);
  };

  const ActionDialog = () => {
    if (!selectedInsight) return null;

    return (
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Intelligence Action Center</DialogTitle>
            <DialogDescription>
              Take action on intelligence for {selectedInsight.company}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="p-4 bg-white/5 rounded-lg">
              <h3 className="font-medium text-lg">{selectedInsight.insight}</h3>
              <p className="text-sm text-gray-400 mt-1">{selectedInsight.opportunity}</p>
              <div className="flex items-center mt-2 space-x-2">
                <span className={`px-2 py-1 rounded text-xs ${
                  selectedInsight.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                    'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {selectedInsight.priority.toUpperCase()}
                </span>
                <span className="text-xs text-gray-400">{selectedInsight.date}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                className="w-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-400"
                onClick={() => {
                  toast({
                    title: "Creating Proposal",
                    description: "Generating AI-powered proposal..."
                  });
                  setIsDialogOpen(false);
                }}
              >
                Generate Proposal
              </Button>
              <Button
                className="w-full bg-green-500/20 hover:bg-green-500/30 text-green-400"
                onClick={() => {
                  toast({
                    title: "Contact Scheduled",
                    description: "Adding to outreach queue..."
                  });
                  setIsDialogOpen(false);
                }}
              >
                Schedule Contact
              </Button>
              <Button
                className="w-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-400"
                onClick={() => {
                  toast({
                    title: "Research Started",
                    description: "Initiating deep-dive analysis..."
                  });
                  setIsDialogOpen(false);
                }}
              >
                Deep Research
              </Button>
              <Button
                className="w-full bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400"
                onClick={() => {
                  toast({
                    title: "Alert Created",
                    description: "Setting up monitoring alert..."
                  });
                  setIsDialogOpen(false);
                }}
              >
                Set Alert
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">AI Whisper Bot</h1>
        <p className="text-muted-foreground">Industry news analysis with targeted solution suggestions</p>
      </div>

      {/* Connection Status */}
      <div className="flex items-center space-x-2 mb-4">
        <div className={`h-2 w-2 rounded-full ${
          isConnected ? 'bg-green-500' :
            connectionError ? 'bg-red-500' : 'bg-yellow-500'
        }`} />
        <span className="text-sm text-gray-400">
          {isConnected ? 'Connected to intelligence feed' :
            connectionError ? 'Connection error' : 'Connecting...'}
        </span>
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

      {/* Recent Insights */}
      <Card className="border-0 bg-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Activity className="h-5 w-5 mr-2 text-blue-400" />
              Intelligence Feed
            </div>
            {isConnected && (
              <div className="flex items-center text-sm text-gray-400">
                <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                Live Updates
              </div>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {insights.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg cursor-pointer hover:bg-slate-700/70 transition-colors"
                onClick={() => handleInsightAction(item)}
              >
                <div className="flex items-center space-x-4">
                  {item.status === 'new' ? (
                    <AlertTriangle className="h-5 w-5 text-yellow-400" />
                  ) : item.status === 'actioned' ? (
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  ) : (
                    <MessageSquare className="h-5 w-5 text-blue-400" />
                  )}
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

      <ActionDialog />
    </div>
  );
}