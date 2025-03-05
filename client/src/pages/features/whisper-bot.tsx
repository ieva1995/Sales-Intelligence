import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Bot, Send, TrendingUp, MessageSquare, FileText, Activity,
  Globe, Bell, RefreshCw, CheckCircle, AlertTriangle, Search,
  Newspaper, BarChart, BookOpen, ArrowRight
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
  const [activeQuickAction, setActiveQuickAction] = useState<string | null>(null);
  const [connectionAttempts, setConnectionAttempts] = useState(0);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isOfflineMode, setIsOfflineMode] = useState(false);

  useEffect(() => {
    try {
      // Try to establish WebSocket connection, but continue to render app regardless
      if (connectionAttempts < 3) {
        // Wrap WebSocket connection in try-catch to prevent white screen
        try {
          connectWebSocket();
        } catch (err) {
          console.error("Failed to initialize WebSocket:", err);
          setIsOfflineMode(true);
          setConnectionError(true);
        }
      } else {
        // After 3 failed attempts, just use offline mode
        setIsOfflineMode(true);
        console.log("Max connection attempts reached, using offline mode");
      }
    } catch (error) {
      // Global error handler to ensure component continues to render
      console.error("Critical error in WhisperBot useEffect:", error);
      setIsOfflineMode(true);
      setConnectionError(true);
    }

    // Cleanup function
    return () => {
      if (socket) {
        try {
          console.log("Closing WebSocket connection");
          socket.close();
        } catch (error) {
          console.error("Error closing WebSocket:", error);
        }
      }
    };
  }, [connectionAttempts]);

  const connectWebSocket = () => {
    try {
      console.log("Attempting to connect to WebSocket");
      // Ensure correct protocol is used
      const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
      const wsUrl = `${protocol}//${window.location.host}/ws-feed`;
      console.log(`Connecting to WebSocket URL: ${wsUrl}`);

      // Create new WebSocket with error handling
      const newSocket = new WebSocket(wsUrl);

      let connectionTimeout = setTimeout(() => {
        console.warn("WebSocket connection timed out");
        setConnectionError(true);
        setIsOfflineMode(true);
        if (newSocket && newSocket.readyState !== WebSocket.CLOSED) {
          newSocket.close();
        }
      }, 5000); // 5 second timeout

      newSocket.onopen = () => {
        clearTimeout(connectionTimeout);
        console.log("WebSocket connection established");
        setIsConnected(true);
        setConnectionError(false);
        setSocket(newSocket);
        toast({
          title: "Connected",
          description: "Real-time intelligence feed active",
        });
      };

      newSocket.onmessage = (event) => {
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

      newSocket.onerror = (error) => {
        clearTimeout(connectionTimeout);
        console.error("WebSocket error:", error);
        setIsConnected(false);
        setConnectionError(true);
        setSocket(null);
        setIsOfflineMode(true);

        // Increment connection attempts counter
        setConnectionAttempts(prev => prev + 1);

        toast({
          title: "Connection Error",
          description: "Unable to connect to intelligence feed - using offline mode",
          variant: "destructive"
        });
      };

      newSocket.onclose = (event) => {
        clearTimeout(connectionTimeout);
        console.log(`WebSocket closed with code: ${event.code}, reason: ${event.reason || 'No reason provided'}`);
        setIsConnected(false);
        setSocket(null);

        if (!connectionError) {
          toast({
            title: "Disconnected",
            description: "Real-time intelligence feed disconnected",
          });
        }
      };
    } catch (error) {
      console.error("Error setting up WebSocket:", error);
      setConnectionError(true);
      setIsOfflineMode(true);

      toast({
        title: "Connection Setup Error",
        description: "Failed to initialize real-time feed - using offline mode",
        variant: "destructive"
      });
    }
  };

  const handleInsightAction = (insight: Insight) => {
    setSelectedInsight(insight);
    setIsDialogOpen(true);
  };

  const NewsAnalysis = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2 p-4 bg-blue-500/10 rounded-lg">
        <Newspaper className="h-5 w-5 text-blue-400" />
        <div>
          <h4 className="font-medium text-white">Latest Industry Updates</h4>
          <p className="text-sm text-gray-400">Real-time news analysis</p>
        </div>
      </div>
      <div className="space-y-2">
        {[
          {
            title: "AI Market Expansion",
            source: "Tech Weekly",
            sentiment: "Positive",
            impact: "High",
            summary: "Major tech companies increasing AI investments by 45%"
          },
          {
            title: "Cloud Security Trends",
            source: "CyberNews",
            sentiment: "Neutral",
            impact: "Medium",
            summary: "New security protocols reshaping cloud infrastructure"
          },
          {
            title: "Enterprise Software Growth",
            source: "Business Insights",
            sentiment: "Positive",
            impact: "High",
            summary: "Enterprise software market expected to grow 30% YoY"
          }
        ].map((news, index) => (
          <div key={index} className="p-4 bg-white/5 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <h5 className="font-medium text-white">{news.title}</h5>
              <span className={`px-2 py-1 text-xs rounded ${
                news.sentiment === 'Positive' ? 'bg-green-500/20 text-green-400' :
                  news.sentiment === 'Negative' ? 'bg-red-500/20 text-red-400' :
                    'bg-blue-500/20 text-blue-400'
              }`}>
                {news.sentiment}
              </span>
            </div>
            <p className="text-sm text-gray-400 mb-2">{news.summary}</p>
            <div className="flex justify-between text-xs text-gray-500">
              <span>{news.source}</span>
              <span>Impact: {news.impact}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const OpportunityAlerts = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2 p-4 bg-green-500/10 rounded-lg">
        <BarChart className="h-5 w-5 text-green-400" />
        <div>
          <h4 className="font-medium text-white">Active Opportunities</h4>
          <p className="text-sm text-gray-400">AI-detected market opportunities</p>
        </div>
      </div>
      <div className="space-y-2">
        {[
          {
            company: "TechCorp International",
            opportunity: "Cloud Migration",
            probability: "85%",
            value: "$2.5M",
            timeframe: "Immediate"
          },
          {
            company: "Global Systems Inc",
            opportunity: "Security Upgrade",
            probability: "75%",
            value: "$1.8M",
            timeframe: "30 days"
          },
          {
            company: "DataFlow Solutions",
            opportunity: "AI Implementation",
            probability: "92%",
            value: "$3.2M",
            timeframe: "Immediate"
          }
        ].map((opp, index) => (
          <div key={index} className="p-4 bg-white/5 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <h5 className="font-medium text-white">{opp.company}</h5>
              <span className="text-green-400 font-medium">{opp.probability}</span>
            </div>
            <p className="text-sm text-white mb-2">{opp.opportunity}</p>
            <div className="flex justify-between text-xs">
              <span className="text-green-400">{opp.value}</span>
              <span className={`px-2 py-1 rounded ${
                opp.timeframe === 'Immediate' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
              }`}>
                {opp.timeframe}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const AutoResponse = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2 p-4 bg-purple-500/10 rounded-lg">
        <BookOpen className="h-5 w-5 text-purple-400" />
        <div>
          <h4 className="font-medium text-white">Smart Response Suggestions</h4>
          <p className="text-sm text-gray-400">AI-powered communication templates</p>
        </div>
      </div>
      <div className="space-y-2">
        {[
          {
            type: "Initial Contact",
            context: "After AI detected interest in cloud services",
            suggestion: "I noticed your recent cloud infrastructure expansion. Our AI-driven solution has helped similar companies achieve 40% cost reduction.",
            tone: "Professional"
          },
          {
            type: "Follow Up",
            context: "Post technical discussion",
            suggestion: "Following our discussion about your security needs, I've prepared a custom implementation plan that addresses your specific concerns.",
            tone: "Technical"
          },
          {
            type: "Closing",
            context: "High intent signals detected",
            suggestion: "Based on our discussions, I've outlined a strategic roadmap for implementing our solution within your Q2 timeline.",
            tone: "Strategic"
          }
        ].map((response, index) => (
          <div key={index} className="p-4 bg-white/5 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <h5 className="font-medium text-white">{response.type}</h5>
              <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-400 rounded">
                {response.tone}
              </span>
            </div>
            <p className="text-xs text-gray-400 mb-2">{response.context}</p>
            <p className="text-sm text-white mb-2">{response.suggestion}</p>
            <Button
              className="w-full mt-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400"
              onClick={() => {
                toast({
                  title: "Response Copied",
                  description: "Smart response has been copied to clipboard"
                });
              }}
            >
              <Search className="h-4 w-4 mr-2" />
              Use Template
            </Button>
          </div>
        ))}
      </div>
    </div>
  );

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

      <div className="flex items-center space-x-2 mb-4">
        <div className={`h-2 w-2 rounded-full ${
          isConnected ? 'bg-green-500' :
            connectionError ? 'bg-red-500' : 'bg-yellow-500'
        }`} />
        <span className="text-sm text-gray-400">
          {isConnected ? 'Connected to intelligence feed' :
            isOfflineMode ? `Offline mode - using cached data` : 
            connectionError ? `Connection error - working in offline mode` : 'Connecting...'}
        </span>
        {connectionError && connectionAttempts < 3 && (
          <Button
            variant="outline"
            size="sm"
            className="ml-2 text-xs"
            onClick={() => {
              setConnectionAttempts(prev => prev + 1);
              toast({
                title: "Reconnecting",
                description: "Attempting to reconnect to intelligence feed..."
              });
            }}
          >
            <RefreshCw className="mr-1 h-3 w-3" /> Retry
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card
          className="bg-blue-500/10 border-0 cursor-pointer hover:bg-blue-500/20 transition-colors"
          onClick={() => setActiveQuickAction("news")}
        >
          <CardContent className="p-4 flex items-center space-x-4">
            <Bot className="h-8 w-8 text-blue-500" />
            <div>
              <h3 className="font-semibold text-lg">News Analysis</h3>
              <p className="text-sm text-muted-foreground">Scan industry updates</p>
            </div>
          </CardContent>
        </Card>

        <Card
          className="bg-green-500/10 border-0 cursor-pointer hover:bg-green-500/20 transition-colors"
          onClick={() => setActiveQuickAction("opportunities")}
        >
          <CardContent className="p-4 flex items-center space-x-4">
            <TrendingUp className="h-8 w-8 text-green-500" />
            <div>
              <h3 className="font-semibold text-lg">Opportunity Alerts</h3>
              <p className="text-sm text-muted-foreground">Real-time notifications</p>
            </div>
          </CardContent>
        </Card>

        <Card
          className="bg-purple-500/10 border-0 cursor-pointer hover:bg-purple-500/20 transition-colors"
          onClick={() => setActiveQuickAction("responses")}
        >
          <CardContent className="p-4 flex items-center space-x-4">
            <Send className="h-8 w-8 text-purple-500" />
            <div>
              <h3 className="font-semibold text-lg">Auto-Response</h3>
              <p className="text-sm text-muted-foreground">Smart suggestions</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={activeQuickAction === "news"} onOpenChange={() => setActiveQuickAction(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Industry News Analysis</DialogTitle>
            <DialogDescription>
              AI-powered analysis of latest industry developments
            </DialogDescription>
          </DialogHeader>
          <NewsAnalysis />
        </DialogContent>
      </Dialog>

      <Dialog open={activeQuickAction === "opportunities"} onOpenChange={() => setActiveQuickAction(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Real-time Opportunities</DialogTitle>
            <DialogDescription>
              AI-detected market opportunities and leads
            </DialogDescription>
          </DialogHeader>
          <OpportunityAlerts />
        </DialogContent>
      </Dialog>

      <Dialog open={activeQuickAction === "responses"} onOpenChange={() => setActiveQuickAction(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Smart Response Generator</DialogTitle>
            <DialogDescription>
              AI-generated response templates based on context
            </DialogDescription>
          </DialogHeader>
          <AutoResponse />
        </DialogContent>
      </Dialog>

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