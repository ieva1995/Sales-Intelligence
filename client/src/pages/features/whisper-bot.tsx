import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Bot, Send, TrendingUp, MessageSquare, FileText, Activity,
  Globe, Bell, RefreshCw, CheckCircle, AlertTriangle, Search,
  Newspaper, BarChart, BookOpen, ArrowRight, Zap, Filter
} from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { ConnectionStatus } from "@/components/ui/connection-status";
import { Skeleton } from "@/components/ui/skeleton";

interface Insight {
  company: string;
  insight: string;
  opportunity: string;
  date: string;
  priority: "high" | "medium" | "low";
  status?: "new" | "processing" | "actioned";
}

const DEFAULT_INSIGHTS: Insight[] = [
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
];

// Wrap WhisperBot in ErrorBoundary in a separate export function
export default function WhisperBotWrapper() {
  return (
    <ErrorBoundary>
      <WhisperBot />
    </ErrorBoundary>
  );
}

function WhisperBot() {
  const { toast } = useToast();
  // Use a ref to store our cached insights
  const cachedInsightsRef = useRef<Insight[]>(DEFAULT_INSIGHTS);
  const [insights, setInsights] = useState<Insight[]>(cachedInsightsRef.current);
  const [selectedInsight, setSelectedInsight] = useState<Insight | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  const [activeQuickAction, setActiveQuickAction] = useState<string | null>(null);
  const [connectionAttempts, setConnectionAttempts] = useState(0);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [reconnectTimer, setReconnectTimer] = useState<NodeJS.Timeout | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const MAX_CONNECTION_ATTEMPTS = 3;

  // Update cached insights whenever insights change
  useEffect(() => {
    cachedInsightsRef.current = insights;

    // Save to localStorage for persistent offline mode
    try {
      localStorage.setItem('whisper-bot-insights', JSON.stringify(insights));
    } catch (error) {
      console.error("Error saving insights to localStorage:", error);
    }
  }, [insights]);

  // Try to load saved insights from localStorage on first render
  useEffect(() => {
    try {
      const savedInsights = localStorage.getItem('whisper-bot-insights');
      if (savedInsights) {
        const parsedInsights = JSON.parse(savedInsights);
        if (Array.isArray(parsedInsights) && parsedInsights.length > 0) {
          setInsights(parsedInsights);
          cachedInsightsRef.current = parsedInsights;
        }
      }
    } catch (error) {
      console.error("Error loading saved insights:", error);
    }

    // Mark initialization as complete
    setTimeout(() => setIsInitializing(false), 500);
  }, []);

  // Create a memoized connection function to prevent excessive renders
  const connectWebSocket = useCallback(() => {
    try {
      // Clear any existing reconnect timer
      if (reconnectTimer) {
        clearTimeout(reconnectTimer);
        setReconnectTimer(null);
      }

      console.log("Attempting to connect to WebSocket");
      // Ensure correct protocol is used
      const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
      // Use dynamic host and port from the current page to handle port changes seamlessly
      const wsUrl = `${protocol}//${window.location.host}/ws-feed`;
      console.log(`Connecting to WebSocket URL: ${wsUrl}`);

      // Create new WebSocket with error handling
      const newSocket = new WebSocket(wsUrl);

      let connectionTimeout = setTimeout(() => {
        console.warn("WebSocket connection timed out");
        setConnectionError(true);
        setIsOfflineMode(true);
        if (newSocket && newSocket.readyState !== WebSocket.CLOSED) {
          try {
            newSocket.close();
          } catch (closeError) {
            console.error("Error closing socket on timeout:", closeError);
          }
        }

        // Notify user of offline mode in a non-intrusive way
        toast({
          title: "Connection Timeout",
          description: "Using cached data while trying to reconnect",
          variant: "default"
        });

        // Schedule a reconnection attempt with exponential backoff
        scheduleReconnect();
      }, 5000); // 5 second timeout

      newSocket.onopen = () => {
        clearTimeout(connectionTimeout);
        console.log("WebSocket connection established");
        setIsConnected(true);
        setConnectionError(false);
        setSocket(newSocket);
        setConnectionAttempts(0); // Reset attempts on successful connection
        setIsOfflineMode(false);

        toast({
          title: "Connected",
          description: "Real-time intelligence feed active",
        });
      };

      newSocket.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          if (message.type === 'news-update' && message.data) {
            setInsights(prevInsights => {
              const newInsight: Insight = {
                ...message.data,
                status: "new",
                date: "Just now"
              };

              // Check if we already have this insight to avoid duplicates
              const isDuplicate = prevInsights.some(
                insight => insight.company === newInsight.company && 
                           insight.insight === newInsight.insight
              );

              if (isDuplicate) return prevInsights;

              return [newInsight, ...prevInsights.slice(0, 9)];
            });

            toast({
              title: "New Intelligence Alert",
              description: `New insight detected for ${message.data.company}`,
            });
          }
        } catch (error) {
          console.error("Error processing WebSocket message:", error);
          // Continue with application flow despite message error
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

        // Only show toast if not in first attempt
        if (connectionAttempts > 0) {
          toast({
            title: "Connection Error",
            description: "Using cached data while offline",
            variant: "default"
          });
        }

        // Try to close the socket to clean up resources
        try {
          if (newSocket && newSocket.readyState !== WebSocket.CLOSED) {
            newSocket.close();
          }
        } catch (closeError) {
          console.error("Error closing socket after error:", closeError);
        }

        // Schedule a reconnection attempt with exponential backoff
        scheduleReconnect();
      };

      newSocket.onclose = (event) => {
        clearTimeout(connectionTimeout);
        console.log(`WebSocket closed with code: ${event.code}, reason: ${event.reason || 'No reason provided'}`);
        setIsConnected(false);
        setSocket(null);

        if (!connectionError) {
          // Only notify if disconnection wasn't due to an error
          toast({
            title: "Disconnected",
            description: "Intelligence feed disconnected - trying to reconnect",
            variant: "default"
          });

          // Only schedule reconnect if not already in error state
          scheduleReconnect();
        }
      };
    } catch (error) {
      console.error("Error setting up WebSocket:", error);
      setConnectionError(true);
      setIsOfflineMode(true);

      // Schedule a reconnection attempt with exponential backoff
      scheduleReconnect();
    }
  }, [toast, connectionAttempts, reconnectTimer]);

  // Function to schedule reconnection with exponential backoff
  const scheduleReconnect = useCallback(() => {
    if (connectionAttempts >= MAX_CONNECTION_ATTEMPTS) {
      console.log("Max reconnection attempts reached, staying in offline mode");
      return;
    }

    // Calculate backoff time: 2^attempts * 1000ms (1s, 2s, 4s)
    const backoffTime = Math.min(30000, Math.pow(2, connectionAttempts) * 1000);
    console.log(`Scheduling reconnection attempt in ${backoffTime}ms`);

    const timer = setTimeout(() => {
      console.log("Attempting to reconnect...");
      connectWebSocket();
    }, backoffTime);

    setReconnectTimer(timer);
  }, [connectionAttempts, connectWebSocket]);

  useEffect(() => {
    try {
      // Try to establish WebSocket connection, but continue to render app regardless
      if (connectionAttempts < MAX_CONNECTION_ATTEMPTS) {
        // Wrap WebSocket connection in try-catch to prevent white screen
        try {
          connectWebSocket();
        } catch (err) {
          console.error("Failed to initialize WebSocket:", err);
          setIsOfflineMode(true);
          setConnectionError(true);
        }
      } else {
        // After MAX_CONNECTION_ATTEMPTS failed attempts, just use offline mode
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

      // Clear any reconnect timer
      if (reconnectTimer) {
        clearTimeout(reconnectTimer);
      }
    };
  }, [connectWebSocket, connectionAttempts]);

  const handleInsightAction = (insight: Insight) => {
    setSelectedInsight(insight);
    setIsDialogOpen(true);
  };

  // Force reconnection attempt
  const handleManualReconnect = () => {
    setConnectionAttempts(0); // Reset the counter to allow full retry sequence
    connectWebSocket();

    toast({
      title: "Reconnecting",
      description: "Attempting to reconnect to intelligence feed..."
    });
  };

  // Simulate offline AI-generated insights
  const generateOfflineInsight = useCallback(() => {
    const companies = ["Acme Corp", "TechFusion", "Globex", "Initech", "Stark Industries", "Wayne Enterprises"];
    const insights = [
      "Released new product in cloud computing space", 
      "Acquired competitor in the AI market", 
      "Announced strategic partnership",
      "Reported quarterly earnings above expectations",
      "Launched sustainability initiative",
      "Restructuring operations in key markets"
    ];
    const opportunities = [
      "Integration services for new product adoption",
      "Consulting on merger/acquisition strategies",
      "Partnership extension opportunities",
      "Financial services upsell potential",
      "ESG compliance and reporting services",
      "Operational efficiency consulting"
    ];
    const priorities = ["high", "medium", "low"] as const;

    return {
      company: companies[Math.floor(Math.random() * companies.length)],
      insight: insights[Math.floor(Math.random() * insights.length)],
      opportunity: opportunities[Math.floor(Math.random() * opportunities.length)],
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      date: "Generated offline",
      status: "new"
    } as Insight;
  }, []);

  // Add a function to generate offline insights when in offline mode
  const addOfflineInsight = useCallback(() => {
    if (isOfflineMode) {
      const newInsight = generateOfflineInsight();
      setInsights(prev => [newInsight, ...prev.slice(0, 9)]);

      toast({
        title: "Offline Intelligence",
        description: `Generated insight for ${newInsight.company}`,
      });
    }
  }, [isOfflineMode, generateOfflineInsight, toast]);

  // Filter insights based on active filter
  const filteredInsights = activeFilter 
    ? insights.filter(insight => {
        if (activeFilter === 'high') return insight.priority === 'high';
        if (activeFilter === 'new') return insight.status === 'new';
        if (activeFilter === 'actioned') return insight.status === 'actioned';
        return true;
      })
    : insights;

  const NewsAnalysis = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2 p-4 bg-gradient-to-r from-blue-500/20 to-blue-500/10 rounded-lg">
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
          <div key={index} className="p-4 bg-white/5 hover:bg-white/10 transition-colors rounded-lg border border-white/5">
            <div className="flex justify-between items-start mb-2">
              <h5 className="font-medium text-white">{news.title}</h5>
              <span className={`px-2 py-1 text-xs rounded-full ${
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
      <div className="flex items-center gap-2 p-4 bg-gradient-to-r from-green-500/20 to-green-500/10 rounded-lg">
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
          <div key={index} className="p-4 bg-white/5 hover:bg-white/10 transition-colors rounded-lg border border-white/5">
            <div className="flex justify-between items-start mb-2">
              <h5 className="font-medium text-white">{opp.company}</h5>
              <span className="text-green-400 font-medium">{opp.probability}</span>
            </div>
            <p className="text-sm text-white mb-2">{opp.opportunity}</p>
            <div className="flex justify-between text-xs">
              <span className="text-green-400">{opp.value}</span>
              <span className={`px-2 py-1 rounded-full ${
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
      <div className="flex items-center gap-2 p-4 bg-gradient-to-r from-purple-500/20 to-purple-500/10 rounded-lg">
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
          <div key={index} className="p-4 bg-white/5 hover:bg-white/10 transition-colors rounded-lg border border-white/5">
            <div className="flex justify-between items-start mb-2">
              <h5 className="font-medium text-white">{response.type}</h5>
              <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full">
                {response.tone}
              </span>
            </div>
            <p className="text-xs text-gray-400 mb-2">{response.context}</p>
            <p className="text-sm text-white mb-2">{response.suggestion}</p>
            <Button
              className="w-full mt-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border border-purple-500/30"
              onClick={() => {
                try {
                  navigator.clipboard.writeText(response.suggestion);
                  toast({
                    title: "Response Copied",
                    description: "Smart response has been copied to clipboard"
                  });
                } catch (error) {
                  console.error("Clipboard error:", error);
                  toast({
                    title: "Clipboard Error",
                    description: "Unable to copy to clipboard",
                    variant: "destructive"
                  });
                }
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
        <DialogContent className="sm:max-w-[600px] bg-slate-900 border-slate-800">
          <DialogHeader>
            <DialogTitle className="text-xl">Intelligence Action Center</DialogTitle>
            <DialogDescription className="text-gray-400">
              Take action on intelligence for {selectedInsight.company}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="p-4 bg-gradient-to-r from-slate-800 to-slate-800/70 rounded-lg border border-slate-700/50">
              <h3 className="font-medium text-lg text-white">{selectedInsight.insight}</h3>
              <p className="text-sm text-gray-300 mt-1">{selectedInsight.opportunity}</p>
              <div className="flex items-center mt-2 space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs ${
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
                className="w-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30"
                onClick={() => {
                  // Update insight status in cached data
                  setInsights(prev => 
                    prev.map(item => 
                      item === selectedInsight 
                        ? {...item, status: "processing"} 
                        : item
                    )
                  );

                  toast({
                    title: "Creating Proposal",
                    description: "Generating AI-powered proposal..."
                  });
                  setIsDialogOpen(false);
                }}
              >
                <Zap className="mr-2 h-4 w-4" />
                Generate Proposal
              </Button>
              <Button
                className="w-full bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30"
                onClick={() => {
                  // Update insight status in cached data
                  setInsights(prev => 
                    prev.map(item => 
                      item === selectedInsight 
                        ? {...item, status: "actioned"} 
                        : item
                    )
                  );

                  toast({
                    title: "Contact Scheduled",
                    description: "Adding to outreach queue..."
                  });
                  setIsDialogOpen(false);
                }}
              >
                <Send className="mr-2 h-4 w-4" />
                Schedule Contact
              </Button>
              <Button
                className="w-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border border-purple-500/30"
                onClick={() => {
                  // Update insight status in cached data
                  setInsights(prev => 
                    prev.map(item => 
                      item === selectedInsight 
                        ? {...item, status: "processing"} 
                        : item
                    )
                  );

                  toast({
                    title: "Research Started",
                    description: "Initiating deep-dive analysis..."
                  });
                  setIsDialogOpen(false);
                }}
              >
                <Search className="mr-2 h-4 w-4" />
                Deep Research
              </Button>
              <Button
                className="w-full bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border border-yellow-500/30"
                onClick={() => {
                  toast({
                    title: "Alert Created",
                    description: "Setting up monitoring alert..."
                  });
                  setIsDialogOpen(false);
                }}
              >
                <Bell className="mr-2 h-4 w-4" />
                Set Alert
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  // Loading skeleton for initial content
  if (isInitializing) {
    return (
      <div className="p-4 sm:p-6 space-y-6">
        <div className="mb-6">
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
        </div>

        <Card className="border-0 bg-slate-800/50">
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-24" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Render a simple fallback UI if there's a critical error
  if (isOfflineMode && connectionAttempts >= MAX_CONNECTION_ATTEMPTS) {
    return (
      <div className="p-4 sm:p-6 space-y-6">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 text-transparent bg-clip-text">AI Whisper Bot</h1>
          <p className="text-muted-foreground">Working in offline mode - using cached data</p>
        </div>

        <div className="bg-gradient-to-r from-yellow-900/20 to-transparent rounded-lg p-4 mb-4 border border-yellow-900/30">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            <h3 className="font-medium text-white">Limited Connectivity Mode</h3>
          </div>
          <p className="text-sm text-gray-300 mb-3">
            You're currently working with cached data while offline. Some features may be limited.
          </p>
          <Button variant="outline" size="sm" onClick={handleManualReconnect}
            className="bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
            <RefreshCw className="mr-1 h-3 w-3" /> Try Reconnecting
          </Button>
        </div>

        <Card className="border-0 bg-gradient-to-b from-slate-800 to-slate-900 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Activity className="h-5 w-5 mr-2 text-blue-400" />
                Intelligence Feed (Offline)
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={addOfflineInsight}
                className="bg-blue-500/10 border-blue-500/30 text-blue-400 hover:bg-blue-500/20"
              >
                <Bot className="mr-1 h-3 w-3" /> Generate Insight
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {insights.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 bg-slate-700/50 hover:bg-slate-700/70 border border-slate-600/30 rounded-lg cursor-pointer transition-all duration-200 transform hover:translate-x-1"
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
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${
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

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 text-transparent bg-clip-text">AI Whisper Bot</h1>
        <p className="text-muted-foreground">Industry news analysis with targeted solution suggestions</p>
      </div>

      <ConnectionStatus 
        isConnected={isConnected}
        isOfflineMode={isOfflineMode}
        connectionError={connectionError}
        connectionAttempts={connectionAttempts}
        maxAttempts={MAX_CONNECTION_ATTEMPTS}
        onRetry={handleManualReconnect}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card
          className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 border-0 cursor-pointer hover:bg-blue-500/20 transition-colors shadow-lg"
          onClick={() => setActiveQuickAction("news")}
        >
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="bg-blue-500/20 p-3 rounded-lg">
              <Bot className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">News Analysis</h3>
              <p className="text-sm text-muted-foreground">Scan industry updates</p>
            </div>
          </CardContent>
        </Card>

        <Card
          className="bg-gradient-to-br from-green-500/20 to-green-500/5 border-0 cursor-pointer hover:bg-green-500/20 transition-colors shadow-lg"
          onClick={() => setActiveQuickAction("opportunities")}
        >
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="bg-green-500/20 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Opportunity Alerts</h3>
              <p className="text-sm text-muted-foreground">Real-time notifications</p>
            </div>
          </CardContent>
        </Card>

        <Card
          className="bg-gradient-to-br from-purple-500/20 to-purple-500/5 border-0 cursor-pointer hover:bg-purple-500/20 transition-colors shadow-lg"
          onClick={() => setActiveQuickAction("responses")}
        >
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="bg-purple-500/20 p-3 rounded-lg">
              <Send className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Auto-Response</h3>
              <p className="text-sm text-muted-foreground">Smart suggestions</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={activeQuickAction === "news"} onOpenChange={() => setActiveQuickAction(null)}>
        <DialogContent className="sm:max-w-[600px] bg-slate-900 border-slate-800">
          <DialogHeader>
            <DialogTitle className="text-xl">Industry News Analysis</DialogTitle>
            <DialogDescription className="text-gray-400">
              AI-powered analysis of latest industry developments
            </DialogDescription>
          </DialogHeader>
          <NewsAnalysis />
        </DialogContent>
      </Dialog>

      <Dialog open={activeQuickAction === "opportunities"} onOpenChange={() => setActiveQuickAction(null)}>
        <DialogContent className="sm:max-w-[600px] bg-slate-900 border-slate-800">
          <DialogHeader>
            <DialogTitle className="text-xl">Real-time Opportunities</DialogTitle>
            <DialogDescription className="text-gray-400">
              AI-detected market opportunities and leads
            </DialogDescription>
          </DialogHeader>
          <OpportunityAlerts />
        </DialogContent>
      </Dialog>

      <Dialog open={activeQuickAction === "responses"} onOpenChange={() => setActiveQuickAction(null)}>
        <DialogContent className="sm:max-w-[600px] bg-slate-900 border-slate-800">
          <DialogHeader>
            <DialogTitle className="text-xl">Smart Response Generator</DialogTitle>
            <DialogDescription className="text-gray-400">
              AI-generated response templates based on context
            </DialogDescription>
          </DialogHeader>
          <AutoResponse />
        </DialogContent>
      </Dialog>

      <Card className="border-0 bg-gradient-to-b from-slate-800 to-slate-900 shadow-xl">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Activity className="h-5 w-5 mr-2 text-blue-400" />
              Intelligence Feed
            </div>
            {isConnected ? (
              <div className="flex items-center text-sm text-gray-400">
                <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                Live Updates
              </div>
            ) : isOfflineMode && (
              <Button
                variant="outline"
                size="sm"
                onClick={addOfflineInsight}
                className="text-xs h-7 px-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border-blue-500/30"
              >
                <Bot className="h-3 w-3 mr-1" /> Generate Insight
              </Button>
            )}
          </CardTitle>

          {/* Filter options */}
          <div className="flex flex-wrap gap-2 pt-2">
            <Button 
              variant="outline" 
              size="sm"
              className={`text-xs px-3 py-1 h-auto ${!activeFilter ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-slate-800'}`}
              onClick={() => setActiveFilter(null)}
            >
              All
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className={`text-xs px-3 py-1 h-auto flex items-center ${activeFilter === 'high' ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-slate-800'}`}
              onClick={() => setActiveFilter(activeFilter === 'high' ? null : 'high')}
            >
              <Filter className="h-3 w-3 mr-1" /> High Priority
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className={`text-xs px-3 py-1 h-auto flex items-center ${activeFilter === 'new' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : 'bg-slate-800'}`}
              onClick={() => setActiveFilter(activeFilter === 'new' ? null : 'new')}
            >
              <AlertTriangle className="h-3 w-3 mr-1" /> New
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className={`text-xs px-3 py-1 h-auto flex items-center ${activeFilter === 'actioned' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-slate-800'}`}
              onClick={() => setActiveFilter(activeFilter === 'actioned' ? null : 'actioned')}
            >
              <CheckCircle className="h-3 w-3 mr-1" /> Actioned
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {filteredInsights.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="h-8 w-8 text-gray-500 mx-auto mb-2" />
              <p className="text-gray-400">No insights available{activeFilter ? ' for the selected filter' : ' yet'}</p>
              {isOfflineMode && !activeFilter && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addOfflineInsight}
                  className="mt-4 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border-blue-500/30"
                >
                  <Bot className="h-4 w-4 mr-2" /> Generate Sample Insight
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredInsights.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 bg-slate-700/50 hover:bg-slate-700/70 border border-slate-600/30 rounded-lg cursor-pointer transition-all duration-200 transform hover:translate-x-1"
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
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${
                      item.priority === 'high' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {item.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <ActionDialog />
    </div>
  );
}