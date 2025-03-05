import { useState, useEffect } from "react";
import axios from "axios";
import {
  Brain,
  BarChart3,
  Network,
  Database,
  SearchCode,
  Heart,
  Bot,
  Users,
  LineChart,
  PieChart,
  Zap,
  RefreshCw,
  AlertTriangle,
  Shield,
  Globe,
  Building,
  Info,
  TrendingUp,
  Lock,
  Server,
  Activity,
  Command
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

// Types from the backend
interface CustomerBehavior {
  id: string;
  email?: string;
  visitedPages: string[];
  timeOnSite: number; // in seconds
  interactions: string[];
  searchTerms: string[];
  referralSource?: string;
  deviceType: string;
  location?: string;
  previousPurchases?: string[];
  cartItems?: string[];
  emotionalSentiment: 'positive' | 'neutral' | 'negative';
}

interface SalesOpportunity {
  id: string;
  customerProfile: string;
  proposedStrategy: string;
  estimatedConversionProbability: number;
  estimatedDealValue: number;
  aiConfidence: number;
}

interface PredictiveStrategy {
  id: string;
  targetAudience: string;
  contentIdeas: string[];
  promotionType: string;
  pricingStrategy: string;
  estimatedConversionRate: number;
  confidenceScore: number;
  suggestedTiming: 'immediate' | 'thisWeek' | 'thisMonth' | 'nextQuarter';
  generatedAt: Date;
}

interface DeepLearningMetrics {
  modelVersion: string;
  dataPointsProcessed: number;
  accuracyScore: number;
  lastTrainingDate: Date;
  topPerformingStrategies: string[];
  insightsGenerated: string[];
}

interface EmotionalTrigger {
  triggerType: 'scarcity' | 'social_proof' | 'urgency' | 'authority' | 'reciprocity' | 'commitment' | 'custom';
  message: string;
  discount?: number;
  expiryTime?: string;
}

interface CrossPlatformBehavior {
  platform: 'google' | 'instagram' | 'tiktok' | 'facebook' | 'linkedin' | 'twitter' | 'other';
  keywords: string[];
  interactions: string[];
  timeSpent: number;
  conversionIntent: number;
}

interface CompetitorIntelligence {
  competitorName: string;
  keywordTrends: { keyword: string; trend: 'up' | 'down' | 'stable'; volume: number }[];
  stockLevels?: { product: string; stock: 'high' | 'medium' | 'low' | 'out_of_stock' }[];
  priceChanges?: { product: string; oldPrice: number; newPrice: number; changeDate: string }[];
  marketingCampaigns?: { name: string; platform: string; estimatedBudget: string; startDate?: string }[];
  collectedAt: string;
}

export default function SmartSalesEngine() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(false);

  // Deep Learning State
  const [deepLearningMetrics, setDeepLearningMetrics] = useState<DeepLearningMetrics | null>(null);
  const [isTraining, setIsTraining] = useState(false);

  // Predictive Strategy State
  const [targetAudience, setTargetAudience] = useState("Enterprise B2B Software Buyers");
  const [predictiveStrategy, setPredictiveStrategy] = useState<PredictiveStrategy | null>(null);

  // Emotional Trigger State
  const [customerBehavior, setCustomerBehavior] = useState<CustomerBehavior>({
    id: "cust-" + Date.now(),
    visitedPages: ['/pricing', '/enterprise', '/demo', '/features'],
    timeOnSite: 256,
    interactions: ['clicked CTA', 'downloaded whitepaper', 'watched demo video'],
    searchTerms: ['enterprise solutions', 'scalable platform', 'pricing tiers'],
    deviceType: 'desktop',
    emotionalSentiment: 'neutral'
  });
  const [emotionalTrigger, setEmotionalTrigger] = useState<EmotionalTrigger | null>(null);

  // Dark Intelligence State
  const [competitors, setCompetitors] = useState<string[]>([
    "CompetitorCorp", "RivalSoft", "AlternateTech"
  ]);
  const [competitorData, setCompetitorData] = useState<CompetitorIntelligence[]>([]);

  // Cross-Platform Tracking State
  const [sampleBehaviors, setSampleBehaviors] = useState<CrossPlatformBehavior[]>([
    {
      platform: 'google',
      keywords: ['enterprise sales software', 'AI sales automation'],
      interactions: ['search', 'click on ad'],
      timeSpent: 45,
      conversionIntent: 35
    },
    {
      platform: 'linkedin',
      keywords: ['sales automation', 'enterprise solutions'],
      interactions: ['viewed profile', 'engaged with post'],
      timeSpent: 120,
      conversionIntent: 65
    },
    {
      platform: 'facebook',
      keywords: ['sales tools', 'business software'],
      interactions: ['visited page', 'watched video'],
      timeSpent: 90,
      conversionIntent: 40
    }
  ]);
  const [crossPlatformAnalysis, setCrossPlatformAnalysis] = useState<{
    conversionIntent: number,
    recommendedPlatform: string,
    recommendedAction: string
  } | null>(null);

  // Load initial deep learning metrics
  useEffect(() => {
    fetchDeepLearningMetrics();
  }, []);

  // Fetch deep learning metrics
  const fetchDeepLearningMetrics = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/api/autonomous-sales/deep-learning-metrics');
      setDeepLearningMetrics(response.data.metrics);
    } catch (error) {
      console.error('Error fetching deep learning metrics:', error);
      toast({
        title: "Error",
        description: "Failed to fetch deep learning metrics. Using sample data.",
        variant: "destructive"
      });

      // Use sample data as fallback
      setDeepLearningMetrics({
        modelVersion: "S.L.A.S.E-1.0",
        dataPointsProcessed: 15782,
        accuracyScore: 0.87,
        lastTrainingDate: new Date(),
        topPerformingStrategies: [
          "Value proposition focus for enterprise",
          "Limited-time discount for hesitant customers",
          "Competitor comparison for researchers"
        ],
        insightsGenerated: [
          "Email campaigns perform 32% better when sent on Tuesday mornings",
          "Product demos convert 2.5x better than static landing pages",
          "Feature-focused messaging resonates more with technical decision-makers"
        ]
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Train the deep learning core
  const trainDeepLearningCore = async () => {
    try {
      setIsTraining(true);
      const response = await axios.post('/api/autonomous-sales/train');
      setDeepLearningMetrics(response.data.metrics);

      toast({
        title: "Training Complete",
        description: `Model version ${response.data.metrics.modelVersion} trained successfully with ${response.data.metrics.dataPointsProcessed.toLocaleString()} data points.`,
        variant: "default"
      });
    } catch (error) {
      console.error('Error training deep learning core:', error);
      toast({
        title: "Training Error",
        description: "Failed to train deep learning core. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsTraining(false);
    }
  };

  // Generate predictive strategy
  const generatePredictiveStrategy = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post('/api/autonomous-sales/predictive-strategy', {
        targetAudience
      });

      setPredictiveStrategy(response.data.strategy);

      toast({
        title: "Strategy Generated",
        description: "Predictive sales strategy generated successfully.",
        variant: "default"
      });
    } catch (error) {
      console.error('Error generating predictive strategy:', error);
      toast({
        title: "Generation Error",
        description: "Failed to generate predictive strategy. Using sample data.",
        variant: "destructive"
      });

      // Use sample data as fallback
      setPredictiveStrategy({
        id: `pred-${Date.now()}`,
        targetAudience,
        contentIdeas: [
          'Industry benchmark report',
          'ROI calculator tool',
          'Case study video',
          'Interactive product demo',
          'Expert webinar recording'
        ],
        promotionType: 'Free trial with implementation support',
        pricingStrategy: 'Value-based pricing with ROI guarantee',
        estimatedConversionRate: 0.12,
        confidenceScore: 0.78,
        suggestedTiming: 'thisMonth',
        generatedAt: new Date()
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Generate emotional trigger
  const generateEmotionalTrigger = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post('/api/autonomous-sales/emotional-trigger', customerBehavior);

      if (response.data.trigger) {
        setEmotionalTrigger(response.data.trigger);

        toast({
          title: "Trigger Generated",
          description: "Emotional trigger generated successfully.",
          variant: "default"
        });
      } else {
        toast({
          title: "No Trigger",
          description: "Customer behavior does not meet the threshold for triggering an emotional offer.",
          variant: "default"
        });
      }
    } catch (error) {
      console.error('Error generating emotional trigger:', error);
      toast({
        title: "Generation Error",
        description: "Failed to generate emotional trigger. Using sample data.",
        variant: "destructive"
      });

      // Use sample data as fallback
      setEmotionalTrigger({
        triggerType: 'urgency',
        message: "Your custom quote expires in 24 hours",
        discount: 10,
        expiryTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Gather competitor intelligence
  const gatherCompetitorIntelligence = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post('/api/autonomous-sales/competitor-intelligence', {
        competitors
      });

      setCompetitorData(response.data.intelligence);

      toast({
        title: "Intelligence Gathered",
        description: "Competitor intelligence gathered successfully.",
        variant: "default"
      });
    } catch (error) {
      console.error('Error gathering competitor intelligence:', error);
      toast({
        title: "Intelligence Error",
        description: "Failed to gather competitor intelligence. Using sample data.",
        variant: "destructive"
      });

      // Use sample data as fallback
      setCompetitorData(competitors.map(name => ({
        competitorName: name,
        keywordTrends: [
          { keyword: 'sales AI', trend: 'up', volume: 8500 },
          { keyword: 'enterprise CRM', trend: 'stable', volume: 5200 },
          { keyword: 'sales automation', trend: 'up', volume: 9700 }
        ],
        stockLevels: [
          { product: 'Basic License', stock: 'high' },
          { product: 'Premium License', stock: 'medium' },
          { product: 'Enterprise Package', stock: 'low' }
        ],
        priceChanges: [
          { 
            product: 'Enterprise License', 
            oldPrice: 599, 
            newPrice: 649, 
            changeDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() 
          }
        ],
        collectedAt: new Date().toISOString()
      })));
    } finally {
      setIsLoading(false);
    }
  };

  // Track cross-platform behavior
  const trackCrossPlatformBehavior = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post('/api/autonomous-sales/cross-platform', {
        userId: "user-" + Date.now(),
        behaviors: sampleBehaviors
      });

      setCrossPlatformAnalysis(response.data.analysis);

      toast({
        title: "Analysis Complete",
        description: "Cross-platform behavior analyzed successfully.",
        variant: "default"
      });
    } catch (error) {
      console.error('Error analyzing cross-platform behavior:', error);
      toast({
        title: "Analysis Error",
        description: "Failed to analyze cross-platform behavior. Using sample data.",
        variant: "destructive"
      });

      // Use sample data as fallback
      setCrossPlatformAnalysis({
        conversionIntent: 58,
        recommendedPlatform: 'linkedin',
        recommendedAction: 'Targeted promotional email with limited-time discount'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight flex items-center">
          <Brain className="h-8 w-8 mr-2 text-blue-500" />
          S.L.A.S.E (Self-Learning Autonomous Sales Engine)
        </h1>
        <p className="text-slate-400">
          An advanced AI system that autonomously generates and optimizes sales strategies with built-in cybersecurity.
        </p>
      </div>

      <div className="space-y-4">
        <Tabs
          defaultValue="overview"
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
            <TabsTrigger value="overview" className="text-xs sm:text-sm">
              <Bot className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="deep-learning" className="text-xs sm:text-sm">
              <Network className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Deep Learning</span>
            </TabsTrigger>
            <TabsTrigger value="dark-intelligence" className="text-xs sm:text-sm">
              <SearchCode className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Dark Intelligence</span>
            </TabsTrigger>
            <TabsTrigger value="emotional-triggers" className="text-xs sm:text-sm">
              <Heart className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Emotional Triggers</span>
            </TabsTrigger>
            <TabsTrigger value="cross-platform" className="text-xs sm:text-sm">
              <Globe className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Cross-Platform</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-emerald-500" />
                    GhostGuard AI Protection
                  </CardTitle>
                  <CardDescription>
                    Advanced cybersecurity system with behavioral analysis and honeytraps
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm">
                        <Lock className="h-4 w-4 mr-2 text-emerald-500" />
                        Zero Trust Architecture
                      </div>
                      <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200">
                        Active
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm">
                        <Server className="h-4 w-4 mr-2 text-emerald-500" />
                        Honeypot Traps
                      </div>
                      <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200">
                        Monitoring
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm">
                        <Activity className="h-4 w-4 mr-2 text-emerald-500" />
                        Behavioral Firewall
                      </div>
                      <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200">
                        Active
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm">
                        <Command className="h-4 w-4 mr-2 text-emerald-500" />
                        Polymorphic Encryption
                      </div>
                      <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
                        Standby
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex items-center">
                    <Brain className="h-5 w-5 mr-2 text-purple-500" />
                    Autonomous Sales Engine
                  </CardTitle>
                  <CardDescription>
                    Self-learning AI optimizes sales strategies in real-time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="bg-slate-800 p-3 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Network className="h-4 w-4 mr-2 text-blue-400" />
                          <h3 className="text-sm font-medium">Deep Learning</h3>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-400">Accuracy</span>
                          <span className="text-sm">{(deepLearningMetrics?.accuracyScore || 0.85) * 100}%</span>
                        </div>
                      </div>
                      <div className="bg-slate-800 p-3 rounded-lg">
                        <div className="flex items-center mb-2">
                          <SearchCode className="h-4 w-4 mr-2 text-emerald-400" />
                          <h3 className="text-sm font-medium">Intelligence</h3>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-400">Coverage</span>
                          <span className="text-sm">3 Competitors</span>
                        </div>
                      </div>
                      <div className="bg-slate-800 p-3 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Globe className="h-4 w-4 mr-2 text-amber-400" />
                          <h3 className="text-sm font-medium">Cross-Platform</h3>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-400">Channels</span>
                          <span className="text-sm">6 Platforms</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <Button 
                        variant="outline" 
                        onClick={() => setActiveTab("deep-learning")}
                        className="w-full"
                      >
                        Explore Capabilities
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-blue-500" />
                  Predictive Sales Strategy Generator
                </CardTitle>
                <CardDescription>
                  Automatically generates personalized sales funnels and strategies based on data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="col-span-1 md:col-span-2">
                      <Label htmlFor="targetAudience">Target Audience</Label>
                      <div className="flex mt-1 space-x-2">
                        <Input
                          id="targetAudience"
                          value={targetAudience}
                          onChange={(e) => setTargetAudience(e.target.value)}
                          placeholder="Describe your target audience"
                          className="flex-1"
                        />
                        <Button 
                          onClick={generatePredictiveStrategy} 
                          disabled={isLoading || !targetAudience.trim()}
                        >
                          {isLoading ? (
                            <RefreshCw className="h-4 w-4 animate-spin" />
                          ) : (
                            "Generate Strategy"
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {predictiveStrategy && (
                    <div className="mt-4">
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-semibold text-blue-900">
                            Predictive Strategy for {predictiveStrategy.targetAudience}
                          </h3>
                          <div className="flex space-x-2">
                            <Badge className="bg-blue-100 text-blue-800">
                              {Math.round(predictiveStrategy.estimatedConversionRate * 100)}% Conv. Rate
                            </Badge>
                            <Badge className="bg-purple-100 text-purple-800">
                              {Math.round(predictiveStrategy.confidenceScore * 100)}% Confidence
                            </Badge>
                          </div>
                        </div>

                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-white p-4 rounded-lg border border-blue-100">
                            <h4 className="font-medium text-blue-800 mb-2">Recommended Content</h4>
                            <ul className="space-y-1">
                              {predictiveStrategy.contentIdeas.map((idea, index) => (
                                <li key={index} className="text-sm flex items-start">
                                  <Info className="h-4 w-4 mr-2 text-blue-500 mt-0.5 flex-shrink-0" />
                                  {idea}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <div className="bg-white p-4 rounded-lg border border-blue-100 mb-4">
                              <h4 className="font-medium text-blue-800 mb-2">Promotion Strategy</h4>
                              <p className="text-sm">{predictiveStrategy.promotionType}</p>
                            </div>

                            <div className="bg-white p-4 rounded-lg border border-blue-100">
                              <h4 className="font-medium text-blue-800 mb-2">Pricing Strategy</h4>
                              <p className="text-sm">{predictiveStrategy.pricingStrategy}</p>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 p-2 bg-amber-50 border-l-4 border-amber-400 rounded flex items-center">
                          <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                          <p className="text-sm text-amber-800">
                            Suggested timing: <span className="font-medium">{
                              predictiveStrategy.suggestedTiming === 'immediate' ? 'Immediate action required' :
                              predictiveStrategy.suggestedTiming === 'thisWeek' ? 'This week' :
                              predictiveStrategy.suggestedTiming === 'thisMonth' ? 'This month' : 'Next quarter'
                            }</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Deep Learning Tab */}
          <TabsContent value="deep-learning" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Network className="h-5 w-5 mr-2 text-blue-500" />
                  Deep Learning Core
                </CardTitle>
                <CardDescription>
                  Self-learning AI that continuously improves based on data and interactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {deepLearningMetrics ? (
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-lg border border-blue-100">
                          <h3 className="text-sm font-medium text-blue-900 mb-2">Model Information</h3>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs text-slate-500">Version</p>
                              <p className="text-sm font-medium">{deepLearningMetrics.modelVersion}</p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500">Accuracy Score</p>
                              <div className="flex items-center">
                                <Progress 
                                  value={deepLearningMetrics.accuracyScore * 100} 
                                  className="h-2 flex-1" 
                                />
                                <span className="ml-2 text-sm">
                                  {Math.round(deepLearningMetrics.accuracyScore * 100)}%
                                </span>
                              </div>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500">Data Points Processed</p>
                              <p className="text-sm">{deepLearningMetrics.dataPointsProcessed.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500">Last Training Date</p>
                              <p className="text-sm">
                                {new Date(deepLearningMetrics.lastTrainingDate).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg border border-blue-100">
                          <h3 className="text-sm font-medium text-blue-900 mb-2">Top Performing Strategies</h3>
                          <ul className="space-y-2">
                            {deepLearningMetrics.topPerformingStrategies.map((strategy, index) => (
                              <li key={index} className="text-sm flex items-start">
                                <TrendingUp className="h-4 w-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                                {strategy}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-white p-4 rounded-lg border border-blue-100">
                          <h3 className="text-sm font-medium text-blue-900 mb-2">AI Generated Insights</h3>
                          <ul className="space-y-2">
                            {deepLearningMetrics.insightsGenerated.map((insight, index) => (
                              <li key={index} className="text-sm flex items-start">
                                <Zap className="h-4 w-4 mr-2 text-amber-500 mt-0.5 flex-shrink-0" />
                                {insight}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-4">
                        <Button 
                          onClick={trainDeepLearningCore} 
                          disabled={isTraining}
                          className="relative overflow-hidden"
                        >
                          {isTraining ? (
                            <>
                              <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                              Training in Progress...
                            </>
                          ) : (
                            <>
                              <Network className="h-4 w-4 mr-2" />
                              Train Deep Learning Core
                            </>
                          )}
                        </Button>
                        <p className="text-xs text-slate-500 mt-2">
                          Training incorporates new customer interaction data, competitor analysis, and market trends to improve the model's accuracy.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-center items-center h-40">
                      <div className="flex flex-col items-center">
                        <RefreshCw className="h-8 w-8 animate-spin text-blue-500 mb-4" />
                        <p className="text-slate-400">Loading deep learning metrics...</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Dark Intelligence Tab */}
          <TabsContent value="dark-intelligence" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <SearchCode className="h-5 w-5 mr-2 text-emerald-500" />
                  Dark Intelligence Layer
                </CardTitle>
                <CardDescription>
                  Gathers competitive intelligence and market data using stealth techniques
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-emerald-900 mb-3">Competitor Intelligence Gathering</h3>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {competitors.map((competitor, index) => (
                        <Badge key={index} className="bg-white text-emerald-700 border border-emerald-200 px-3 py-1">
                          <Building className="h-3 w-3 mr-1.5 inline" />
                          {competitor}
                        </Badge>
                      ))}
                    </div>

                    <div className="mb-4">
                      <Button 
                        onClick={gatherCompetitorIntelligence} 
                        disabled={isLoading}
                        className="relative overflow-hidden"
                      >
                        {isLoading ? (
                          <>
                            <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                            Gathering Intelligence...
                          </>
                        ) : (
                          <>
                            <SearchCode className="h-4 w-4 mr-2" />
                            Gather Competitor Intelligence
                          </>
                        )}
                      </Button>
                    </div>

                    {competitorData.length > 0 && (
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {competitorData.map((competitor, index) => (
                          <div key={index} className="bg-white rounded-lg border border-emerald-100 overflow-hidden">
                            <div className="p-3 bg-emerald-50 border-b border-emerald-100">
                              <h4 className="font-medium text-emerald-800 flex items-center">
                                <Building className="h-4 w-4 mr-2" />
                                {competitor.competitorName}
                              </h4>
                            </div>
                            <div className="p-3">
                              <div className="mb-3">
                                <span className="text-xs uppercase tracking-wide text-emerald-700 font-semibold mb-2 block">
                                  Keyword Trends
                                </span>
                                <div className="space-y-1">
                                  {competitor.keywordTrends.map((kw, i) => (
                                    <div key={i} className="flex justify-between items-center text-sm">
                                      <span>{kw.keyword}</span>
                                      <div className="flex items-center">
                                        <span className={`text-xs ${kw.trend === 'up' ? 'text-green-600' : kw.trend === 'down' ? 'text-red-600' : 'text-blue-600'}`}>
                                          {kw.trend === 'up' ? '↑' : kw.trend === 'down' ? '↓' : '→'}
                                        </span>
                                        <span className="ml-2 text-xs text-slate-500">{kw.volume.toLocaleString()}</span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {competitor.stockLevels && competitor.stockLevels.length > 0 && (
                                <div className="mb-3">
                                  <span className="text-xs uppercase tracking-wide text-emerald-700 font-semibold mb-2 block">
                                    Product Stock Levels
                                  </span>
                                  <div className="space-y-1">
                                    {competitor.stockLevels.map((stock, i) => (
                                      <div key={i} className="flex justify-between items-center text-sm">
                                        <span>{stock.product}</span>
                                        <Badge className={`
                                          ${stock.stock === 'high' ? 'bg-green-100 text-green-800' : 
                                            stock.stock === 'medium' ? 'bg-blue-100 text-blue-800' : 
                                            stock.stock === 'low' ? 'bg-amber-100 text-amber-800' : 
                                            'bg-red-100 text-red-800'} 
                                          px-2 py-0.5 text-xs`}
                                        >
                                          {stock.stock}
                                        </Badge>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {competitor.priceChanges && competitor.priceChanges.length > 0 && (
                                <div>
                                  <span className="text-xs uppercase tracking-wide text-emerald-700 font-semibold mb-2 block">
                                    Recent Price Changes
                                  </span>
                                  <div className="space-y-1">
                                    {competitor.priceChanges.map((price, i) => (
                                      <div key={i} className="space-y-1">
                                        <div className="text-sm">{price.product}</div>
                                        <div className="flex items-center text-xs">
                                          <span className="text-slate-500">${price.oldPrice}</span>
                                          <span className="mx-1">→</span>
                                          <span className={`font-medium ${price.newPrice > price.oldPrice ? 'text-red-600' : 'text-green-600'}`}>
                                            ${price.newPrice}
                                          </span>
                                          <span className="ml-2 text-slate-400">
                                            ({new Date(price.changeDate).toLocaleDateString()})
                                          </span>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Emotional Triggers Tab */}
          <TabsContent value="emotional-triggers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-pink-500" />
                  Emotional Sentiment Analysis
                </CardTitle>
                <CardDescription>
                  Analyze customer behavior to detect purchase readiness and trigger personalized offers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-pink-900 mb-3">Customer Behavior Analysis</h3>

                    <div className="bg-white rounded-lg border border-pink-100 p-4 mb-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="text-sm font-medium text-pink-800 mb-2">Pages Visited</h4>
                          <div className="flex flex-wrap gap-1">
                            {customerBehavior.visitedPages.map((page, index) => (
                              <Badge key={index} variant="outline" className="bg-white">
                                {page}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-pink-800 mb-2">Interactions</h4>
                          <div className="flex flex-wrap gap-1">
                            {customerBehavior.interactions.map((interaction, index) => (
                              <Badge key={index} variant="outline" className="bg-white">
                                {interaction}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-pink-800 mb-2">Time on Site</h4>
                          <p className="text-sm">{Math.floor(customerBehavior.timeOnSite / 60)}m {customerBehavior.timeOnSite % 60}s</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-pink-800 mb-2">Emotional Sentiment</h4>
                          <Badge className={`
                            ${customerBehavior.emotionalSentiment === 'positive' ? 'bg-green-100 text-green-800' : 
                              customerBehavior.emotionalSentiment === 'negative' ? 'bg-red-100 text-red-800' : 
                              'bg-blue-100 text-blue-800'}
                          `}>
                            {customerBehavior.emotionalSentiment}
                          </Badge>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-pink-800 mb-2">Device Type</h4>
                          <p className="text-sm capitalize">{customerBehavior.deviceType}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <Button 
                        onClick={generateEmotionalTrigger} 
                        disabled={isLoading}
                        className="relative overflow-hidden"
                      >
                        {isLoading ? (
                          <>
                            <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                            Analyzing Emotions...
                          </>
                        ) : (
                          <>
                            <Heart className="h-4 w-4 mr-2" />
                            Generate Emotional Trigger
                          </>
                        )}
                      </Button>
                    </div>

                    {emotionalTrigger && (
                      <div className="bg-white rounded-lg border border-pink-200 overflow-hidden">
                        <div className="p-3 bg-pink-50 border-b border-pink-100">
                          <h4 className="font-medium text-pink-800 flex items-center">
                            <Heart className="h-4 w-4 mr-2 text-pink-500" />
                            Emotional Trigger Generated
                          </h4>
                        </div>
                        <div className="p-4">
                          <div className="mb-2">
                            <span className="text-xs uppercase tracking-wide text-pink-700 font-semibold">Trigger Type</span>
                            <div className="text-sm mt-1 capitalize">
                              {emotionalTrigger.triggerType.replace('_', ' ')}
                            </div>
                          </div>

                          <div className="mb-2">
                            <span className="text-xs uppercase tracking-wide text-pink-700 font-semibold">Message</span>
                            <div className="text-sm font-medium mt-1 p-2 bg-pink-50 rounded border border-pink-100">
                              {emotionalTrigger.message}
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            {emotionalTrigger.discount && (
                              <div>
                                <span className="text-xs uppercase tracking-wide text-pink-700 font-semibold">Discount</span>
                                <div className="text-sm mt-1">{emotionalTrigger.discount}%</div>
                              </div>
                            )}

                            {emotionalTrigger.expiryTime && (
                              <div>
                                <span className="text-xs uppercase tracking-wide text-pink-700 font-semibold">Expires</span>
                                <div className="text-sm mt-1">{new Date(emotionalTrigger.expiryTime).toLocaleString()}</div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Cross-Platform Tab */}
          <TabsContent value="cross-platform" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2 text-blue-500" />
                  Cross-Platform Behavioral Tracking
                </CardTitle>
                <CardDescription>
                  Monitor user behavior across different platforms and adapt strategies accordingly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-violet-50 to-indigo-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-indigo-900 mb-3">User Behavior Across Platforms</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      {sampleBehaviors.map((behavior, index) => (
                        <div key={index} className="bg-white rounded-lg border border-indigo-100 overflow-hidden">
                          <div className="p-3 bg-indigo-50 border-b border-indigo-100">
                            <h4 className="font-medium text-indigo-800 flex items-center capitalize">
                              <Globe className="h-4 w-4 mr-2 text-indigo-500" />
                              {behavior.platform}
                            </h4>
                          </div>
                          <div className="p-3">
                            <div className="mb-2">
                              <span className="text-xs text-slate-500">Keywords</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {behavior.keywords.map((keyword, i) => (
                                  <Badge key={i} variant="outline" className="text-xs bg-slate-50">
                                    {keyword}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="mb-2">
                              <span className="text-xs text-slate-500">Interactions</span>
                              <div className="mt-1 text-sm">
                                {behavior.interactions.join(', ')}
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <span className="text-xs text-slate-500">Time Spent</span>
                                <div className="mt-1 text-sm">{behavior.timeSpent} seconds</div>
                              </div>
                              <div>
                                <span className="text-xs text-slate-500">Conversion Intent</span>
                                <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2">
                                  <div 
                                    className={`h-1.5 rounded-full ${
                                      behavior.conversionIntent > 70 ? 'bg-green-500' : 
                                      behavior.conversionIntent > 40 ? 'bg-amber-500' : 'bg-blue-500'
                                    }`} 
                                    style={{ width: `${behavior.conversionIntent}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mb-4">
                      <Button 
                        onClick={trackCrossPlatformBehavior} 
                        disabled={isLoading}
                        className="relative overflow-hidden"
                      >
                        {isLoading ? (
                          <>
                            <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                            Analyzing Behavior...
                          </>
                        ) : (
                          <>
                            <Globe className="h-4 w-4 mr-2" />
                            Analyze Cross-Platform Behavior
                          </>
                        )}
                      </Button>
                    </div>

                    {crossPlatformAnalysis && (
                      <div className="bg-white rounded-lg border border-indigo-200 overflow-hidden">
                        <div className="p-3 bg-indigo-50 border-b border-indigo-100">
                          <h4 className="font-medium text-indigo-800 flex items-center">
                            <TrendingUp className="h-4 w-4 mr-2 text-indigo-500" />
                            Cross-Platform Analysis Results
                          </h4>
                        </div>
                        <div className="p-4">
                          <div className="mb-4">
                            <span className="text-xs uppercase tracking-wide text-indigo-700 font-semibold">Overall Conversion Intent</span>
                            <div className="mt-2">
                              <div className="flex items-center">
                                <Progress 
                                  value={crossPlatformAnalysis.conversionIntent} 
                                  className="h-2 flex-1"
                                />
                                <span className="ml-2 text-sm">
                                  {crossPlatformAnalysis.conversionIntent}%
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="mb-4">
                            <span className="text-xs uppercase tracking-wide text-indigo-700 font-semibold">Recommended Platform</span>
                            <div className="text-sm mt-1 font-medium capitalize">
                              {crossPlatformAnalysis.recommendedPlatform}
                            </div>
                          </div>

                          <div>
                            <span className="text-xs uppercase tracking-wide text-indigo-700 font-semibold">Recommended Action</span>
                            <div className="text-sm mt-1 p-2 bg-indigo-50 rounded border border-indigo-100">
                              {crossPlatformAnalysis.recommendedAction}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}