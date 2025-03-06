import { useState, useEffect } from "react";
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
  Command,
  ShoppingCart,
  MessageSquare,
  Settings,
  FileText,
  Star,
  Sparkles
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
import { SiTensorflow, SiOpenai, SiGooglecloud, SiAmazon } from "react-icons/si";

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
  triggerType: string;
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
  keywordTrends: Array<{ keyword: string; trend: string; volume: number }>;
  stockLevels: Array<{ product: string; stock: string }>;
  priceChanges: Array<{ product: string; oldPrice: number; newPrice: number; changeDate: string }>;
  collectedAt: string;
}

// AI-Powered Tool interface
interface AiTool {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  isNew?: boolean;
  isEnterprise?: boolean;
}

export default function SmartSalesEngine() {
  console.log("SmartSalesEngine component rendering"); // Diagnostic log

  try {
    const { toast } = useToast();
    const [activeTab, setActiveTab] = useState<string>("overview");
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

    // AI-Powered Tools
    const [aiTools, setAiTools] = useState<AiTool[]>([
      {
        id: "tool-1",
        name: "AI Product Recommendations",
        description: "Increase sales with AI-powered cross-sell and upsell suggestions",
        icon: <ShoppingCart className="h-6 w-6 text-blue-500" />,
        isNew: true
      },
      {
        id: "tool-2",
        name: "Smart Proposal Generator",
        description: "AI-powered proposals based on client behavior and RFP criteria",
        icon: <FileText className="h-6 w-6 text-blue-500" />
      },
      {
        id: "tool-3",
        name: "AI Deal Predictor",
        description: "Predict deal success and get smart follow-up suggestions",
        icon: <BarChart3 className="h-6 w-6 text-blue-500" />
      },
      {
        id: "tool-4",
        name: "Interactive Configurator",
        description: "Customize products with real-time pricing and ROI calculations",
        icon: <Settings className="h-6 w-6 text-blue-500" />
      },
      {
        id: "tool-5",
        name: "Automated Upsell Brain",
        description: "Smart add-on suggestions based on similar client purchases",
        icon: <Brain className="h-6 w-6 text-blue-500" />
      },
      {
        id: "tool-6",
        name: "Intent Heatmap",
        description: "Track potential client engagement with visual interest mapping",
        icon: <Activity className="h-6 w-6 text-blue-500" />
      },
      {
        id: "tool-7",
        name: "AI Case Study Finder",
        description: "Auto-recommend relevant case studies and whitepapers",
        icon: <SearchCode className="h-6 w-6 text-blue-500" />
      },
      {
        id: "tool-8",
        name: "Invisible Loyalty Discounts",
        description: "Automatic discounts based on customer loyalty scores",
        icon: <Star className="h-6 w-6 text-blue-500" />
      },
      {
        id: "tool-9",
        name: "Silent Sales Agent",
        description: "Context-aware AI follow-up system",
        icon: <MessageSquare className="h-6 w-6 text-blue-500" />
      },
      {
        id: "tool-10",
        name: "POC Simulator",
        description: "Interactive product performance simulator",
        icon: <LineChart className="h-6 w-6 text-blue-500" />
      },
      {
        id: "tool-11",
        name: "Digital Reputation Score",
        description: "Score-based dynamic pricing system",
        icon: <Shield className="h-6 w-6 text-blue-500" />
      },
      {
        id: "tool-12",
        name: "Predictive Inventory AI",
        description: "Forecast inventory needs based on sales patterns and market trends",
        icon: <Database className="h-6 w-6 text-blue-500" />,
        isNew: true,
        isEnterprise: true
      },
      {
        id: "tool-13",
        name: "AI Whisper Bot",
        description: "Industry news analysis with targeted solution suggestions",
        icon: <Bot className="h-6 w-6 text-blue-500" />,
        isEnterprise: true
      },
      {
        id: "tool-14",
        name: "Stealth Audit Tool",
        description: "Automated system analysis with instant problem recommendations",
        icon: <SearchCode className="h-6 w-6 text-blue-500" />,
        isEnterprise: true
      },
      {
        id: "tool-15",
        name: "Auto Warm-Up Campaign",
        description: "Hyper-personalized decision-maker outreach system",
        icon: <Sparkles className="h-6 w-6 text-blue-500" />,
        isEnterprise: true
      }
    ]);

    // Enterprise Tools Section
    const [enterpriseTools, setEnterpriseTools] = useState<AiTool[]>([]);

    // Filter enterprise tools
    useEffect(() => {
      const enterprise = aiTools.filter(tool => tool.isEnterprise);
      setEnterpriseTools(enterprise);
    }, [aiTools]);

    // Load initial deep learning metrics
    useEffect(() => {
      console.log("SmartSalesEngine useEffect running"); // Diagnostic log
      fetchDeepLearningMetrics();
    }, []);

    // Fetch deep learning metrics
    const fetchDeepLearningMetrics = async () => {
      console.log("Fetching deep learning metrics"); // Diagnostic log
      try {
        setIsLoading(true);

        // Use mock data for demonstration
        const mockMetrics = {
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
        };

        setDeepLearningMetrics(mockMetrics);
        console.log("Deep learning metrics set successfully", mockMetrics); // Diagnostic log
      } catch (error) {
        console.error('Error fetching deep learning metrics:', error);
        toast({
          title: "Error",
          description: "Failed to fetch deep learning metrics. Using sample data.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    // Train deep learning core
    const trainDeepLearningCore = async () => {
      console.log("Training deep learning core"); // Diagnostic log
      try {
        setIsTraining(true);

        // Simulate API call with mock data
        setTimeout(() => {
          const updatedMetrics = {
            modelVersion: "S.L.A.S.E-1.1",
            dataPointsProcessed: 17652,
            accuracyScore: 0.92,
            lastTrainingDate: new Date(),
            topPerformingStrategies: [
              "Value proposition focus for enterprise",
              "Limited-time discount for hesitant customers",
              "Competitor comparison for researchers",
              "ROI calculator for financial decision makers"
            ],
            insightsGenerated: [
              "Email campaigns perform 32% better when sent on Tuesday mornings",
              "Product demos convert 2.5x better than static landing pages",
              "Feature-focused messaging resonates more with technical decision-makers",
              "Follow-up sequences with 4 touchpoints have 28% higher conversion"
            ]
          };

          setDeepLearningMetrics(updatedMetrics);
          setIsTraining(false);

          toast({
            title: "Training Complete",
            description: `Model version ${updatedMetrics.modelVersion} trained successfully with ${updatedMetrics.dataPointsProcessed.toLocaleString()} data points.`,
            variant: "default"
          });
        }, 2000);
      } catch (error) {
        console.error('Error training deep learning core:', error);
        toast({
          title: "Training Error",
          description: "Failed to train deep learning core. Please try again.",
          variant: "destructive"
        });
        setIsTraining(false);
      }
    };

    // Generate predictive strategy
    const generatePredictiveStrategy = async () => {
      console.log("Generating predictive strategy"); // Diagnostic log
      try {
        setIsLoading(true);

        // Simulate API call with mock data
        setTimeout(() => {
          const strategy = {
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
            suggestedTiming: 'thisMonth' as 'thisMonth',
            generatedAt: new Date()
          };

          setPredictiveStrategy(strategy);
          setIsLoading(false);

          toast({
            title: "Strategy Generated",
            description: "Predictive sales strategy generated successfully.",
            variant: "default"
          });
        }, 1500);
      } catch (error) {
        console.error('Error generating predictive strategy:', error);
        toast({
          title: "Generation Error",
          description: "Failed to generate predictive strategy. Using sample data.",
          variant: "destructive"
        });
        setIsLoading(false);
      }
    };

    // Generate emotional trigger
    const generateEmotionalTrigger = async () => {
      console.log("Generating emotional trigger"); // Diagnostic log
      try {
        setIsLoading(true);

        // Simulate API call with mock data
        setTimeout(() => {
          const trigger = {
            triggerType: 'urgency',
            message: "Your custom quote expires in 24 hours",
            discount: 10,
            expiryTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
          };

          setEmotionalTrigger(trigger);
          setIsLoading(false);

          toast({
            title: "Trigger Generated",
            description: "Emotional trigger generated successfully.",
            variant: "default"
          });
        }, 1500);
      } catch (error) {
        console.error('Error generating emotional trigger:', error);
        toast({
          title: "Generation Error",
          description: "Failed to generate emotional trigger. Using sample data.",
          variant: "destructive"
        });
        setIsLoading(false);
      }
    };

    // Gather competitor intelligence
    const gatherCompetitorIntelligence = async () => {
      console.log("Gathering competitor intelligence"); // Diagnostic log
      try {
        setIsLoading(true);

        // Simulate API call with mock data
        setTimeout(() => {
          const intelligence = competitors.map(name => ({
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
          }));

          setCompetitorData(intelligence);
          setIsLoading(false);

          toast({
            title: "Intelligence Gathered",
            description: "Competitor intelligence gathered successfully.",
            variant: "default"
          });
        }, 1500);
      } catch (error) {
        console.error('Error gathering competitor intelligence:', error);
        toast({
          title: "Intelligence Error",
          description: "Failed to gather competitor intelligence. Using sample data.",
          variant: "destructive"
        });
        setIsLoading(false);
      }
    };

    // Track cross-platform behavior
    const trackCrossPlatformBehavior = async () => {
      console.log("Tracking cross-platform behavior"); // Diagnostic log
      try {
        setIsLoading(true);

        // Simulate API call with mock data
        setTimeout(() => {
          const analysis = {
            conversionIntent: 58,
            recommendedPlatform: 'linkedin',
            recommendedAction: 'Targeted promotional email with limited-time discount'
          };

          setCrossPlatformAnalysis(analysis);
          setIsLoading(false);

          toast({
            title: "Analysis Complete",
            description: "Cross-platform behavior analyzed successfully.",
            variant: "default"
          });
        }, 1500);
      } catch (error) {
        console.error('Error analyzing cross-platform behavior:', error);
        toast({
          title: "Analysis Error",
          description: "Failed to analyze cross-platform behavior. Using sample data.",
          variant: "destructive"
        });
        setIsLoading(false);
      }
    };

    console.log("SmartSalesEngine rendering JSX"); // Diagnostic log

    // Mobile-optimized view for narrow screens
    const isMobileView = typeof window !== 'undefined' && window.innerWidth < 768;

    // Mobile version of the component
    if (isMobileView) {
      return (
        <div className="pb-14">
          <div className="px-4 py-6">
            <div className="flex flex-col space-y-2">
              <h1 className="text-2xl font-bold flex items-center">
                <Brain className="h-7 w-7 mr-2 text-blue-500" />
                S.L.A.S.E (Self-Learning Autonomous Sales Engine)
              </h1>
              <p className="text-sm text-slate-400">
                An advanced AI system that autonomously generates and optimizes sales strategies with built-in cybersecurity.
              </p>
            </div>

            <div className="flex justify-between mt-6 mb-4">
              <div className="flex-1 px-3 py-2 text-center border-b-2 border-blue-500">
                <Bot className="h-5 w-5 mx-auto mb-1" />
                <span className="text-xs">Overview</span>
              </div>
              <div className="flex-1 px-3 py-2 text-center border-b-2 border-transparent opacity-70">
                <Network className="h-5 w-5 mx-auto mb-1" />
                <span className="text-xs">Deep Learning</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl border border-slate-700 bg-slate-800/50 overflow-hidden">
                <div className="px-4 py-4">
                  <h2 className="text-lg font-semibold flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-emerald-500" />
                    GhostGuard AI Protection
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">
                    Advanced cybersecurity system with behavioral analysis and honeytraps
                  </p>
                </div>

                <div className="px-4 pb-4 space-y-2">
                  <div className="flex items-center justify-between py-2 border-t border-slate-700">
                    <div className="flex items-center text-sm">
                      <Lock className="h-4 w-4 mr-2 text-emerald-500" />
                      Zero Trust Architecture
                    </div>
                    <Badge className="bg-emerald-900 text-emerald-300">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between py-2 border-t border-slate-700">
                    <div className="flex items-center text-sm">
                      <Server className="h-4 w-4 mr-2 text-emerald-500" />
                      Honeypot Traps
                    </div>
                    <Badge className="bg-blue-900 text-blue-300">Monitoring</Badge>
                  </div>
                  <div className="flex items-center justify-between py-2 border-t border-slate-700">
                    <div className="flex items-center text-sm">
                      <Activity className="h-4 w-4 mr-2 text-emerald-500" />
                      Behavioral Firewall
                    </div>
                    <Badge className="bg-emerald-900 text-emerald-300">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between py-2 border-t border-slate-700">
                    <div className="flex items-center text-sm">
                      <Command className="h-4 w-4 mr-2 text-emerald-500" />
                      Polymorphic Encryption
                    </div>
                    <Badge className="bg-amber-900 text-amber-300">Standby</Badge>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-700 bg-slate-800/50 overflow-hidden">
                <div className="px-4 py-4">
                  <h2 className="text-lg font-semibold flex items-center">
                    <Brain className="h-5 w-5 mr-2 text-purple-500" />
                    Autonomous Sales Engine
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">
                    Self-learning AI optimizes sales strategies in real-time
                  </p>
                </div>

                <div className="p-4 space-y-4">
                  <div className="bg-slate-800 rounded-lg p-3">
                    <div className="flex items-center mb-1">
                      <Network className="h-4 w-4 mr-2 text-blue-400" />
                      <span className="text-sm font-medium">Deep Learning</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-xs text-slate-400">Accuracy</span>
                      <span>87%</span>
                    </div>
                  </div>

                  <div className="bg-slate-800 rounded-lg p-3">
                    <div className="flex items-center mb-1">
                      <SearchCode className="h-4 w-4 mr-2 text-emerald-400" />
                      <span className="text-sm font-medium">Intelligence</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-xs text-slate-400">Coverage</span>
                      <span>3 Competitors</span>
                    </div>
                  </div>

                  <div className="bg-slate-800 rounded-lg p-3">
                    <div className="flex items-center mb-1">
                      <Globe className="h-4 w-4 mr-2 text-amber-400" />
                      <span className="text-sm font-medium">Cross-Platform</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-xs text-slate-400">Channels</span>
                      <span>6 Platforms</span>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    Explore Capabilities
                  </Button>
                </div>
              </div>

              <div className="mt-6">
                <h2 className="text-xl font-bold mb-4">AI-Powered Features</h2>
                <p className="text-sm text-slate-400 mb-4">Advanced tools to boost your sales performance</p>

                <div className="grid grid-cols-1 gap-3">
                  {aiTools.slice(0, 6).map(tool => (
                    <div key={tool.id} className="bg-slate-800 rounded-lg p-4">
                      <div className="flex items-start">
                        <div className="mr-3 mt-1">
                          {tool.icon}
                        </div>
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-semibold">{tool.name}</h3>
                            {tool.isNew && (
                              <Badge className="ml-2 bg-blue-900 text-blue-300 text-xs">New</Badge>
                            )}
                          </div>
                          <p className="text-sm text-slate-400 mt-1">{tool.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="mt-2">
                    <Button variant="outline" className="w-full">
                      View All Features
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Desktop/tablet version
    return (
      <div className="container mx-auto px-6 py-8 max-w-[1200px]">
        <div className="flex flex-col space-y-4 mb-6">
          <h1 className="text-3xl font-bold tracking-tight flex items-center">
            <Brain className="h-8 w-8 mr-3 text-blue-500" />
            S.L.A.S.E (Self-Learning Autonomous Sales Engine)
          </h1>
          <p className="text-slate-400 text-lg">
            An advanced AI system that autonomously generates and optimizes sales strategies with built-in cybersecurity.
          </p>
        </div>

        <div className="space-y-6">
          <Tabs
            defaultValue="overview"
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2 p-1">
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
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="shadow-md border-slate-700">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl flex items-center">
                      <Shield className="h-5 w-5 mr-2 text-emerald-500" />
                      GhostGuard AI Protection
                    </CardTitle>
                    <CardDescription>
                      Advanced cybersecurity system with behavioral analysis and honeytraps
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm">
                          <Lock className="h-4 w-4 mr-2 text-emerald-500" />
                          Zero Trust Architecture
                        </div>
                        <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800">
                          Active
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm">
                          <Server className="h-4 w-4 mr-2 text-emerald-500" />
                          Honeypot Traps
                        </div>
                        <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800">
                          Monitoring
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm">
                          <Activity className="h-4 w-4 mr-2 text-emerald-500" />
                          Behavioral Firewall
                        </div>
                        <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800">
                          Active
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm">
                          <Command className="h-4 w-4 mr-2 text-emerald-500" />
                          Polymorphic Encryption
                        </div>
                        <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800">
                          Standby
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-md border-slate-700">
                  <CardHeader className="pb-4">
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
                            <SearchCode className="h-4 w-4 mr-2 text-emerald-400" /><h3 className="text-sm font-medium">Intelligence</h3>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-400">Coverage</span>
                            <span className="text-sm">3 Competitors</span>
                          </div```</div>
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

                      <div className="pt-3">
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

              <Card className="shadow-md border-slate-700">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-blue-500" />
                    Predictive Sales Strategy Generator
                  </CardTitle>
                  <CardDescription>
                    Automatically generates personalized sales funnels and strategies based on data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-5">
                    <div className="md:col-span-3">
                      <Label htmlFor="targetAudience" className="text-sm font-medium mb-2 block">Target Audience</Label>
                      <Input
                        id="targetAudience"
                        value={targetAudience}
                        onChange={(e) => setTargetAudience(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div className="flex items-end">
                      <Button
                        onClick={generatePredictiveStrategy}
                        disabled={isLoading}
                        className="w-full"
                      >
                        {isLoading ? (
                          <>
                            <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Zap className="h-4 w-4 mr-2" />
                            Generate Strategy
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  {predictiveStrategy && (
                    <div className="bg-slate-800 rounded-lg p-5 space-y-5">
                      <div className="flex justify-between items-center border-b border-slate-700 pb-3">
                        <h3 className="text-lg font-semibold text-white">Strategy for {predictiveStrategy.targetAudience}</h3>
                        <Badge className="bg-blue-600">
                          {(predictiveStrategy.confidenceScore * 100).toFixed(0)}% Confidence
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-sm font-medium text-blue-400 mb-3">Recommended Content</h4>
                          <ul className="space-y-2">
                            {predictiveStrategy.contentIdeas.map((idea, index) => (
                              <li key={index} className="bg-slate-700 p-2 rounded-md flex items-center text-sm">
                                <span className="h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center mr-2 text-xs font-bold">
                                  {index + 1}
                                </span>
                                {idea}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium text-blue-400 mb-2">Promotion Strategy</h4>
                            <p className="bg-slate-700 p-3 rounded-md text-sm">{predictiveStrategy.promotionType}</p>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium text-blue-400 mb-2">Pricing Approach</h4>
                            <p className="bg-slate-700 p-3 rounded-md text-sm">{predictiveStrategy.pricingStrategy}</p>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium text-blue-400 mb-2">Estimated Metrics</h4>
                            <div className="bg-slate-700 p-3 rounded-md space-y-3">
                              <div>
                                <div className="flex justify-between text-xs text-slate-400 mb-1">
                                  <span>Conversion Rate</span>
                                  <span>{(predictiveStrategy.estimatedConversionRate * 100).toFixed(1)}%</span>
                                </div>
                                <Progress
                                  value={predictiveStrategy.estimatedConversionRate * 100}
                                  className="h-2"
                                />
                              </div>
                              <div className="flex items-center">
                                <span className="text-xs text-slate-400 mr-2">Suggested Timing:</span>
                                <Badge className="bg-blue-600">
                                  {predictiveStrategy.suggestedTiming === 'immediate' ? 'Immediate' :
                                    predictiveStrategy.suggestedTiming === 'thisWeek' ? 'This Week' :
                                    predictiveStrategy.suggestedTiming === 'thisMonth' ? 'This Month' : 'Next Quarter'}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* AI Powered Tools Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">AI-Powered Features</h2>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-blue-900 text-blue-200">
                      <SiOpenai className="mr-1" /> OpenAI
                    </Badge>
                    <Badge className="bg-purple-900 text-purple-200">
                      <SiTensorflow className="mr-1" /> TensorFlow
                    </Badge>
                  </div>
                </div>
                <p className="text-slate-400">Advanced tools to boost your sales performance</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {aiTools.filter(tool => !tool.isEnterprise).map(tool => (
                    <div
                      key={tool.id}
                      className="bg-slate-800 rounded-lg p-4 border border-slate-700 hover:border-blue-500 transition-all cursor-pointer"
                    >
                      <div className="flex items-start">
                        <div className="mr-3 mt-1">
                          {tool.icon}
                        </div>
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-semibold">{tool.name}</h3>
                            {tool.isNew && (
                              <Badge className="ml-2 bg-blue-900 text-blue-300 text-xs">New</Badge>
                            )}
                          </div>
                          <p className="text-sm text-slate-400 mt-1">{tool.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enterprise Tools Section */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Enterprise Turbo Sales Machine</h2>
                <p className="text-slate-400">Premium enterprise-grade automation tools</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {enterpriseTools.map(tool => (
                    <div
                      key={tool.id}
                      className="bg-slate-800 rounded-lg p-4 border border-slate-700 hover:border-purple-500 transition-all cursor-pointer"
                    >
                      <div className="flex items-start">
                        <div className="mr-3 mt-1">
                          {tool.icon}
                        </div>
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-semibold">{tool.name}</h3>
                            <Badge className="ml-2 bg-purple-900 text-purple-300 text-xs">Enterprise</Badge>
                            {tool.isNew && (
                              <Badge className="ml-1 bg-blue-900 text-blue-300 text-xs">New</Badge>
                            )}
                          </div>
                          <p className="text-sm text-slate-400 mt-1">{tool.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Deep Learning Tab */}
            <TabsContent value="deep-learning" className="space-y-6">
              <Card className="shadow-md border-slate-700">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Network className="h-5 w-5 mr-2 text-blue-500" />
                      Deep Learning Core
                    </div>
                    <Button
                      variant="outline"
                      onClick={trainDeepLearningCore}
                      disabled={isTraining}
                      className="relative overflow-hidden"
                    >
                      {isTraining ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                          Training Model...
                        </>
                      ) : (
                        <>
                          <Zap className="h-4 w-4 mr-2" />
                          Train Model
                        </>
                      )}
                    </Button>
                  </CardTitle>
                  <CardDescription>
                    Self-learning AI model that continuously improves sales strategies
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {isLoading && !deepLearningMetrics ? (
                    <div className="flex justify-center py-8">
                      <RefreshCw className="h-8 w-8 animate-spin text-blue-500" />
                    </div>
                  ) : deepLearningMetrics ? (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-blue-50 dark:bg-slate-800 p-4 rounded-lg">
                          <h3 className="text-sm font-medium text-blue-500 dark:text-blue-400 mb-1">Model Version</h3>
                          <p className="text-xl font-semibold">{deepLearningMetrics.modelVersion}</p>
                        </div>
                        <div className="bg-blue-50 dark:bg-slate-800 p-4 rounded-lg">
                          <h3 className="text-sm font-medium text-blue-500 dark:text-blue-400 mb-1">Data Points</h3>
                          <p className="text-xl font-semibold">{deepLearningMetrics.dataPointsProcessed.toLocaleString()}</p>
                        </div>
                        <div className="bg-blue-50 dark:bg-slate-800 p-4 rounded-lg">
                          <h3 className="text-sm font-medium text-blue-500 dark:text-blue-400 mb-1">Last Training</h3>
                          <p className="text-lg font-semibold">
                            {deepLearningMetrics.lastTrainingDate instanceof Date
                              ? deepLearningMetrics.lastTrainingDate.toLocaleString()
                              : new Date(deepLearningMetrics.lastTrainingDate).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium mb-2">Accuracy Score</h3>
                        <div className="flex items-center">
                          <Progress
                            value={deepLearningMetrics.accuracyScore * 100}
                            className="h-2 flex-1"
                          />
                          <span className="ml-2 text-sm font-medium">
                            {(deepLearningMetrics.accuracyScore * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-sm font-medium mb-3">Top Performing Strategies</h3>
                          <div className="space-y-2">
                            {deepLearningMetrics.topPerformingStrategies.map((strategy, index) => (
                              <div key={index} className="bg-blue-50 dark:bg-slate-800 p-3 rounded-lg flex">
                                <div className="mr-3 mt-0.5">
                                  <Badge className="bg-blue-500">{index + 1}</Badge>
                                </div>
                                <div>{strategy}</div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium mb-3">AI Insights Generated</h3>
                          <div className="space-y-2">
                            {deepLearningMetrics.insightsGenerated.map((insight, index) => (
                              <div key={index} className="bg-blue-50 dark:bg-slate-800 p-3 rounded-lg flex">
                                <div className="mr-3 mt-0.5">
                                  <Info className="h-4 w-4 text-blue-500" />
                                </div>
                                <div className="text-sm">{insight}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="py-8 text-center">
                      <AlertTriangle className="h-12 w-12 mx-auto text-amber-500 mb-4" />
                      <h3 className="text-lg font-medium mb-2">No Training Data</h3>
                      <p className="text-slate-400 mb-4">Train the deep learning model to see metrics and insights</p>
                      <Button onClick={trainDeepLearningCore}>
                        <Zap className="h-4 w-4 mr-2" />
                        Start Initial Training
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Dark Intelligence Tab */}
            <TabsContent value="dark-intelligence" className="space-y-6">
              <Card className="shadow-md border-slate-700">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <SearchCode className="h-5 w-5 mr-2 text-emerald-500" />
                    Competitor Intelligence
                  </CardTitle>
                  <CardDescription>
                    Monitor competitor activities, pricing changes, and market positioning
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-emerald-950 to-green-950 dark:bg-slate-800 p-5 rounded-lg border border-emerald-900 dark:border-slate-700">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                        <div>
                          <h3 className="text-sm font-medium text-emerald-400 mb-2">
                            Competitor Tracking
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {competitors.map((competitor, index) => (
                              <Badge key={index} variant="outline" className="bg-slate-900 border-emerald-700">
                                {competitor}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <Button
                            onClick={gatherCompetitorIntelligence}
                            disabled={isLoading}
                            className="w-full sm:w-auto"
                          >
                            {isLoading ? (
                              <>
                                <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                                Gathering...
                              </>
                            ) : (
                              <>
                                <SearchCode className="h-4 w-4 mr-2" />
                                Gather Intelligence
                              </>
                            )}
                          </Button>
                        </div>
                      </div>

                      {competitorData.length > 0 && (
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                          {competitorData.map((competitor, index) => (
                            <div key={index} className="bg-slate-900 rounded-lg border border-emerald-900 overflow-hidden">
                              <div className="p-3 bg-emerald-950 border-b border-emerald-900">
                                <h4 className="font-medium text-emerald-400 flex items-center">
                                  <Building className="h-4 w-4 mr-2" />
                                  {competitor.competitorName}
                                </h4>
                              </div>
                              <div className="p-3">
                                <div className="mb-3">
                                  <span className="text-xs uppercase tracking-wide text-emerald-500 font-semibold mb-2 block">
                                    Keyword Trends
                                  </span>
                                  <div className="space-y-1">
                                    {competitor.keywordTrends.map((trend, i) => (
                                      <div key={i} className="flex justify-between items-center text-sm">
                                        <span>{trend.keyword}</span>
                                        <div className="flex items-center">
                                          <span className="text-xs text-slate-400 mr-2">{trend.volume.toLocaleString()}</span>
                                          <Badge className={`
                                            ${trend.trend === 'up' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                                              trend.trend === 'down' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
                                              'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'}
                                          `}>
                                            {trend.trend}
                                          </Badge>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {competitor.stockLevels && competitor.stockLevels.length > 0 && (
                                  <div className="mb-3">
                                    <span className="text-xs uppercase tracking-wide text-emerald-500 font-semibold mb-2 block">
                                      Product Stock Levels
                                    </span>
                                    <div className="space-y-1">
                                      {competitor.stockLevels.map((stock, i) => (
                                        <div key={i} className="flex justify-between items-center text-sm">
                                          <span>{stock.product}</span>
                                          <Badge className={`
                                            ${stock.stock === 'high' ? 'bg-green-900 text-green-300' :
                                              stock.stock === 'medium' ? 'bg-blue-900 text-blue-300' :
                                              stock.stock === 'low' ? 'bg-amber-900 text-amber-300' :
                                              'bg-red-900 text-red-300'}
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
                                    <span className="text-xs uppercase tracking-wide text-emerald-500 font-semibold mb-2 block">
                                      Recent Price Changes
                                    </span>
                                    <div className="space-y-1">
                                      {competitor.priceChanges.map((price, i) => (
                                        <div key={i} className="flex justify-between items-center text-sm">
                                          <span>{price.product}</span>
                                          <div className="flex items-center text-xs">
                                            <span className="text-slate-500">${price.oldPrice}</span>
                                            <span className="mx-1">→</span>
                                            <span className={`font-medium ${price.newPrice > price.oldPrice ? 'text-red-400' : 'text-green-400'}`}>
                                              ${price.newPrice}
                                            </span>
                                            <span className="ml-2 text-slate-500">
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
            <TabsContent value="emotional-triggers" className="space-y-6">
              <Card className="shadow-md border-slate-700">
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
                  <div className="space-y-5">
                    <div className="bg-gradient-to-r from-pink-950 to-purple-950 p-5 rounded-lg">
                      <h3 className="text-sm font-medium text-pink-400 mb-4">Customer Behavior Analysis</h3>

                      <div className="bg-slate-900 rounded-lg border border-pink-900 p-4 mb-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <h4 className="text-sm font-medium text-pink-400 mb-2">Pages Visited</h4>
                            <div className="flex flex-wrap gap-1">
                              {customerBehavior.visitedPages.map((page, index) => (
                                <Badge key={index} variant="outline" className="bg-slate-800 border-pink-800">
                                  {page}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-pink-400 mb-2">Interactions</h4>
                            <div className="flex flex-wrap gap-1">
                              {customerBehavior.interactions.map((interaction, index) => (
                                <Badge key={index} variant="outline" className="bg-slate-800 border-pink-800">
                                  {interaction}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <h4 className="text-sm font-medium text-pink-400 mb-2">Time on Site</h4>
                            <p className="text-sm">{Math.floor(customerBehavior.timeOnSite / 60)}m {customerBehavior.timeOnSite % 60}s</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-pink-400 mb-2">Emotional Sentiment</h4>
                            <Badge className={`
                              ${customerBehavior.emotionalSentiment === 'positive' ? 'bg-green-900 text-green-300' :
                                customerBehavior.emotionalSentiment === 'negative' ? 'bg-red-900 text-red-300' :
                                'bg-blue-900 text-blue-300'}
                            `}>
                              {customerBehavior.emotionalSentiment}
                            </Badge>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-pink-400 mb-2">Device Type</h4>
                            <p className="text-sm capitalize">{customerBehavior.deviceType}</p>
                          </div>
                        </div>
                      </div>

                      <div className="mb-5">
                        <Button
                          onClick={generateEmotionalTrigger}
                          disabled={isLoading}
                          className="w-full sm:w-auto"
                        >
                          {isLoading ? (
                            <>
                              <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                              Generating...
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
                        <div className="bg-slate-900 rounded-lg border border-pink-900 overflow-hidden">
                          <div className="p-3 bg-pink-950 border-b border-pink-900">
                            <h4 className="font-medium text-pink-400 flex items-center">
                              <Heart className="h-4 w-4 mr-2 text-pink-500" />
                              Emotional Trigger Generated
                            </h4>
                          </div>
                          <div className="p-4">
                            <div className="mb-3">
                              <span className="text-xs uppercase tracking-wide text-pink-500 font-semibold">Trigger Type</span>
                              <div className="text-sm mt-1 capitalize">
                                {emotionalTrigger.triggerType.replace('_', ' ')}
                              </div>
                            </div>

                            <div className="mb-4">
                              <span className="text-xs uppercase tracking-wide text-pink-500 font-semibold">Message</span>
                              <div className="text-sm font-medium mt-1 p-3 bg-pink-950 rounded border border-pink-900">
                                {emotionalTrigger.message}
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              {emotionalTrigger.discount && (
                                <div>
                                  <span className="text-xs uppercase tracking-wide text-pink-500 font-semibold">Discount</span>
                                  <div className="text-sm mt-1">{emotionalTrigger.discount}%</div>
                                </div>
                              )}

                              {emotionalTrigger.expiryTime && (
                                <div>
                                  <span className="text-xs uppercase tracking-wide text-pink-500 font-semibold">Expires</span>
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
            <TabsContent value="cross-platform" className="space-y-6">
              <Card className="shadow-md border-slate-700">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Globe className="h-5 w-5 mr-2 text-blue-500" />
                    Cross-Platform Behavior Analysis
                  </CardTitle>
                  <CardDescription>
                    Track and analyze customer behavior across multiple digital platforms and touchpoints
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-5">
                    <div className="bg-gradient-to-r from-violet-950 to-indigo-950 p-5 rounded-lg">
                      <h3 className="text-sm font-medium text-indigo-400 mb-4">User Behavior Across Platforms</h3>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                        {sampleBehaviors.map((behavior, index) => (
                          <div key={index} className="bg-slate-900 rounded-lg border border-indigo-900 overflow-hidden">
                            <div className="p-3 bg-indigo-950 border-b border-indigo-900">
                              <h4 className="font-medium text-indigo-400 flex items-center capitalize">
                                <Globe className="h-4 w-4 mr-2 text-indigo-500" />
                                {behavior.platform}
                              </h4>
                            </div>
                            <div className="p-3">
                              <div className="mb-2">
                                <span className="text-xs text-slate-400">Keywords</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {behavior.keywords.map((keyword, i) => (
                                    <Badge key={i} variant="outline" className="text-xs bg-slate-800 border-indigo-900">
                                      {keyword}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <div className="mb-2">
                                <span className="text-xs text-slate-400">Interactions</span>
                                <div className="mt-1 text-sm">
                                  {behavior.interactions.join(', ')}
                                </div>
                              </div>
                              <div className="flex justify-between">
                                <div>
                                  <span className="text-xs text-slate-400">Time Spent</span>
                                  <div className="text-sm mt-1">{behavior.timeSpent}s</div>
                                </div>
                                <div>
                                  <span className="text-xs text-slate-400">Intent</span>
                                  <div className="text-sm mt-1">{behavior.conversionIntent}%</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-start mb-5">
                        <Button
                          onClick={trackCrossPlatformBehavior}
                          disabled={isLoading}
                          className="w-full sm:w-auto"
                        >
                          {isLoading ? (
                            <>
                              <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                              Analyzing...
                            </>
                          ) : (
                            <>
                              <Activity className="h-4 w-4 mr-2" />
                              Analyze Cross-Platform Data
                            </>
                          )}
                        </Button>
                      </div>

                      {crossPlatformAnalysis && (
                        <div className="bg-slate-900 rounded-lg border border-indigo-900 overflow-hidden">
                          <div className="p-3 bg-indigo-950 border-b border-indigo-900">
                            <h4 className="font-medium text-indigo-400 flex items-center">
                              <PieChart className="h-4 w-4 mr-2 text-indigo-500" />
                              Cross-Platform Analysis Results
                            </h4>
                          </div>
                          <div className="p-4">
                            <div className="mb-4">
                              <span className="text-xs uppercase tracking-wide text-indigo-500 font-semibold">Conversion Intent Score</span>
                              <div className="mt-2">
                                <div className="flex justify-between text-xs text-slate-400 mb-1">
                                  <span>Score</span>
                                  <span>{crossPlatformAnalysis.conversionIntent}%</span>
                                </div>
                                <Progress
                                  value={crossPlatformAnalysis.conversionIntent}
                                  className="h-2"
                                />
                              </div>
                            </div>

                            <div className="mb-3">
                              <span className="text-xs uppercase tracking-wide text-indigo-500 font-semibold">Recommended Platform</span>
                              <div className="bg-slate-800 mt-1 p-2 rounded-md">
                                <div className="flex items-center text-sm">
                                  <Badge className="bg-indigo-600 mr-2">{crossPlatformAnalysis.recommendedPlatform}</Badge>
                                  <span>Best platform for next engagement</span>
                                </div>
                              </div>
                            </div>

                            <div>
                              <span className="text-xs uppercase tracking-wide text-indigo-500 font-semibold">Recommended Action</span>
                              <div className="bg-slate-800 mt-1 p-2 rounded-md">
                                <p className="text-sm">{crossPlatformAnalysis.recommendedAction}</p>
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
  } catch (error) {
    console.error("Error rendering SmartSalesEngine component:", error);

    // Fallback error UI
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="bg-red-900/20 border border-red-800 rounded-lg p-6 text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Component Error</h2>
          <p className="text-slate-300 mb-4">
            There was an error rendering the S.L.A.S.E component. Please try refreshing the page.
          </p>
          <pre className="bg-slate-800 p-4 rounded text-left text-sm overflow-auto max-h-40">
            {error instanceof Error ? error.message : String(error)}
          </pre>
        </div>
      </div>
    );
  }
}