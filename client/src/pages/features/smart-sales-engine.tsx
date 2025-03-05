import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  Brain, 
  TrendingUp, 
  Target, 
  Users, 
  Eye, 
  ShieldAlert, 
  Zap, 
  BarChart3,
  RefreshCw,
  SearchCode,
  Heart,
  Globe,
  ChevronRight,
  Check,
  AlertTriangle
} from "lucide-react";
import axios from 'axios';

// Types for the S.L.A.S.E system
interface DeepLearningMetrics {
  modelVersion: string;
  dataPointsProcessed: number;
  accuracyScore: number;
  lastTrainingDate: string;
  topPerformingStrategies: string[];
  insightsGenerated: string[];
}

interface SalesStrategy {
  id: string;
  customerSegment: string;
  probability: number;
  estimatedValue: number;
  generatedStrategy: string;
  status: 'new' | 'in-progress' | 'converted' | 'lost';
  createdAt: string;
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
  generatedAt: string;
}

interface CustomerBehavior {
  searchTerms: string[];
  visitedPages: string[];
  timeOnSite: number;
  interactions: string[];
  emotionalSentiment?: 'positive' | 'neutral' | 'negative';
}

interface EmotionalTrigger {
  triggerType: 'scarcity' | 'social_proof' | 'urgency' | 'authority' | 'reciprocity' | 'commitment' | 'custom';
  message: string;
  discount?: number;
  expiryTime?: string;
}

interface CompetitorIntelligence {
  competitorName: string;
  keywordTrends: { keyword: string; trend: 'up' | 'down' | 'stable'; volume: number }[];
  stockLevels?: { product: string; stock: 'high' | 'medium' | 'low' | 'out_of_stock' }[];
  priceChanges?: { product: string; oldPrice: number; newPrice: number; changeDate: string }[];
  marketingCampaigns?: { name: string; platform: string; estimatedBudget: string; startDate?: string }[];
  collectedAt: string;
}

interface CrossPlatformBehavior {
  platform: 'google' | 'instagram' | 'tiktok' | 'facebook' | 'linkedin' | 'twitter' | 'other';
  keywords: string[];
  interactions: string[];
  timeSpent: number;
  conversionIntent: number;
}

export default function SmartSalesEngine() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('deep-learning');
  const [isLoading, setIsLoading] = useState(false);
  const [isTraining, setIsTraining] = useState(false);
  const [metrics, setMetrics] = useState<DeepLearningMetrics | null>(null);
  const [strategyTarget, setStrategyTarget] = useState('Enterprise SaaS Decision Makers');
  const [predictiveStrategy, setPredictiveStrategy] = useState<PredictiveStrategy | null>(null);
  const [competitorNames, setCompetitorNames] = useState(['Microsoft', 'Salesforce', 'Oracle']);
  const [competitorIntelligence, setCompetitorIntelligence] = useState<CompetitorIntelligence[]>([]);
  const [customerBehavior, setCustomerBehavior] = useState<CustomerBehavior>({
    searchTerms: ['enterprise sales software', 'AI sales tools'],
    visitedPages: ['/pricing', '/features', '/enterprise'],
    timeOnSite: 420,
    interactions: ['downloaded whitepaper', 'viewed demo video', 'checked pricing'],
    emotionalSentiment: 'positive'
  });
  const [emotionalTrigger, setEmotionalTrigger] = useState<EmotionalTrigger | null>(null);
  const [sampleBehaviors, setSampleBehaviors] = useState<CrossPlatformBehavior[]>([
    {
      platform: 'linkedin',
      keywords: ['sales automation', 'enterprise software'],
      interactions: ['viewed company page', 'clicked on product ad'],
      timeSpent: 180,
      conversionIntent: 75
    },
    {
      platform: 'google',
      keywords: ['best sales software', 'sales ai tools'],
      interactions: ['searched competitor products', 'compared pricing'],
      timeSpent: 240,
      conversionIntent: 60
    }
  ]);
  const [crossPlatformAnalysis, setCrossPlatformAnalysis] = useState<{
    conversionIntent: number;
    recommendedPlatform: string;
    recommendedAction: string;
  } | null>(null);

  // Fetch deep learning metrics on load
  useEffect(() => {
    fetchDeepLearningMetrics();
  }, []);

  // Fetch deep learning metrics
  const fetchDeepLearningMetrics = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/api/autonomous-sales/deep-learning-metrics');
      setMetrics(response.data.metrics);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching deep learning metrics:', error);
      toast({
        title: "Error",
        description: "Failed to fetch deep learning metrics",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  // Train the deep learning core
  const trainDeepLearningCore = async () => {
    try {
      setIsTraining(true);
      const response = await axios.post('/api/autonomous-sales/train');
      setMetrics(response.data.metrics);
      toast({
        title: "Training Complete",
        description: "Deep learning core has been successfully trained",
        variant: "default"
      });
      setIsTraining(false);
    } catch (error) {
      console.error('Error training deep learning core:', error);
      toast({
        title: "Error",
        description: "Failed to train deep learning core",
        variant: "destructive"
      });
      setIsTraining(false);
    }
  };

  // Generate predictive sales strategy
  const generatePredictiveStrategy = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post('/api/autonomous-sales/predictive-strategy', {
        targetAudience: strategyTarget
      });
      setPredictiveStrategy(response.data.strategy);
      toast({
        title: "Strategy Generated",
        description: "Predictive sales strategy has been generated",
        variant: "default"
      });
      setIsLoading(false);
    } catch (error) {
      console.error('Error generating predictive strategy:', error);
      toast({
        title: "Error",
        description: "Failed to generate predictive strategy",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  // Gather competitor intelligence
  const gatherCompetitorIntelligence = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post('/api/autonomous-sales/competitor-intelligence', {
        competitors: competitorNames
      });
      setCompetitorIntelligence(response.data.intelligence);
      toast({
        title: "Intelligence Gathered",
        description: "Competitor intelligence has been gathered",
        variant: "default"
      });
      setIsLoading(false);
    } catch (error) {
      console.error('Error gathering competitor intelligence:', error);
      toast({
        title: "Error",
        description: "Failed to gather competitor intelligence",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  // Generate emotional trigger
  const generateEmotionalTrigger = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post('/api/autonomous-sales/emotional-trigger', customerBehavior);
      setEmotionalTrigger(response.data.trigger);
      
      if (response.data.trigger) {
        toast({
          title: "Trigger Generated",
          description: "Emotional trigger has been generated based on customer behavior",
          variant: "default"
        });
      } else {
        toast({
          title: "No Trigger Generated",
          description: "Customer behavior does not warrant an emotional trigger at this time",
          variant: "default"
        });
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error generating emotional trigger:', error);
      toast({
        title: "Error",
        description: "Failed to generate emotional trigger",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  // Track cross-platform behavior
  const trackCrossPlatformBehavior = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post('/api/autonomous-sales/cross-platform', {
        userId: 'user-123',
        behaviors: sampleBehaviors
      });
      setCrossPlatformAnalysis(response.data.analysis);
      toast({
        title: "Analysis Complete",
        description: "Cross-platform behavior has been analyzed",
        variant: "default"
      });
      setIsLoading(false);
    } catch (error) {
      console.error('Error tracking cross-platform behavior:', error);
      toast({
        title: "Error",
        description: "Failed to analyze cross-platform behavior",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center">
          <Brain className="h-8 w-8 mr-3 text-blue-500" />
          <div>
            <h1 className="text-3xl font-bold">S.L.A.S.E - Self-Learning Autonomous Sales Engine</h1>
            <p className="text-slate-500">
              An AI-driven system that autonomously generates and optimizes sales strategies
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Brain className="h-5 w-5 mr-2 text-blue-500" />
                Deep Learning Core
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600">Self-training AI that learns from interactions and market data</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <ShieldAlert className="h-5 w-5 mr-2 text-purple-500" />
                GhostGuard Cybersecurity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600">Advanced protection with behavioral monitoring and honeypots</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Eye className="h-5 w-5 mr-2 text-amber-500" />
                Dark Intelligence
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600">Stealth market and competitor insights gathering system</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="deep-learning" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="deep-learning" className="flex items-center">
              <Brain className="h-4 w-4 mr-2" />
              Deep Learning
            </TabsTrigger>
            <TabsTrigger value="predictive-strategies" className="flex items-center">
              <Target className="h-4 w-4 mr-2" />
              Predictive Strategies
            </TabsTrigger>
            <TabsTrigger value="competitor-intelligence" className="flex items-center">
              <SearchCode className="h-4 w-4 mr-2" />
              Competitor Intelligence
            </TabsTrigger>
            <TabsTrigger value="emotional-triggers" className="flex items-center">
              <Heart className="h-4 w-4 mr-2" />
              Emotional Triggers
            </TabsTrigger>
            <TabsTrigger value="cross-platform" className="flex items-center">
              <Globe className="h-4 w-4 mr-2" />
              Cross-Platform
            </TabsTrigger>
          </TabsList>

          {/* Deep Learning Tab */}
          <TabsContent value="deep-learning" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Brain className="h-5 w-5 mr-2 text-blue-500" />
                    Deep Learning Metrics
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={trainDeepLearningCore} 
                    disabled={isTraining}
                    className="flex items-center"
                  >
                    {isTraining ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Training...
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
                  Real-time metrics for the self-learning AI model
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <RefreshCw className="h-8 w-8 animate-spin text-blue-500" />
                  </div>
                ) : metrics ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <p className="text-sm text-slate-500">Model Version</p>
                        <p className="text-xl font-semibold">{metrics.modelVersion}</p>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <p className="text-sm text-slate-500">Data Points Processed</p>
                        <p className="text-xl font-semibold">{metrics.dataPointsProcessed.toLocaleString()}</p>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <p className="text-sm text-slate-500">Last Training</p>
                        <p className="text-xl font-semibold">{new Date(metrics.lastTrainingDate).toLocaleString()}</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">Accuracy Score</h3>
                      <div className="flex items-center">
                        <Progress value={metrics.accuracyScore * 100} className="h-2" />
                        <span className="ml-2 text-sm font-medium">{(metrics.accuracyScore * 100).toFixed(1)}%</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">Top Performing Strategies</h3>
                      <ul className="space-y-2">
                        {metrics.topPerformingStrategies.map((strategy, index) => (
                          <li key={index} className="flex items-center">
                            <Check className="h-4 w-4 mr-2 text-green-500" />
                            <span>{strategy}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">Latest Insights</h3>
                      <ul className="space-y-2">
                        {metrics.insightsGenerated.map((insight, index) => (
                          <li key={index} className="bg-blue-50 p-3 rounded border-l-4 border-blue-500">
                            <div className="flex items-start">
                              <TrendingUp className="h-4 w-4 mr-2 mt-1 text-blue-500" />
                              <span>{insight}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p>No metrics available. Click "Train Model" to start.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Predictive Strategies Tab */}
          <TabsContent value="predictive-strategies" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2 text-purple-500" />
                  Predictive Sales Strategy Generator
                </CardTitle>
                <CardDescription>
                  Generate personalized sales strategies based on target audience and market data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium">Target Audience</label>
                    <div className="flex space-x-2">
                      <Input 
                        placeholder="e.g. Enterprise SaaS Decision Makers" 
                        value={strategyTarget}
                        onChange={(e) => setStrategyTarget(e.target.value)}
                        className="flex-1"
                      />
                      <Button 
                        onClick={generatePredictiveStrategy} 
                        disabled={isLoading || !strategyTarget}
                      >
                        {isLoading ? (
                          <RefreshCw className="h-4 w-4 animate-spin" />
                        ) : (
                          "Generate Strategy"
                        )}
                      </Button>
                    </div>
                  </div>

                  {predictiveStrategy && (
                    <div className="mt-6 space-y-4">
                      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-lg border border-purple-200">
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-semibold text-purple-900">
                            Strategy for: {predictiveStrategy.targetAudience}
                          </h3>
                          <Badge variant="outline" className="bg-white">
                            {predictiveStrategy.suggestedTiming}
                          </Badge>
                        </div>
                        
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium text-purple-800">Promotion Type</h4>
                            <p className="mt-1">{predictiveStrategy.promotionType}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-purple-800">Pricing Strategy</h4>
                            <p className="mt-1">{predictiveStrategy.pricingStrategy}</p>
                          </div>
                        </div>

                        <div className="mt-4">
                          <h4 className="text-sm font-medium text-purple-800">Content Ideas</h4>
                          <ul className="mt-2 space-y-2">
                            {predictiveStrategy.contentIdeas.map((idea, index) => (
                              <li key={index} className="flex items-center">
                                <ChevronRight className="h-4 w-4 mr-2 text-purple-500" />
                                <span>{idea}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium text-purple-800">Est. Conversion Rate</h4>
                            <p className="mt-1 font-semibold">
                              {(predictiveStrategy.estimatedConversionRate * 100).toFixed(1)}%
                            </p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-purple-800">Confidence Score</h4>
                            <div className="flex items-center mt-1">
                              <Progress value={predictiveStrategy.confidenceScore * 100} className="h-2 flex-1" />
                              <span className="ml-2 text-sm font-medium">
                                {(predictiveStrategy.confidenceScore * 100).toFixed(0)}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Competitor Intelligence Tab */}
          <TabsContent value="competitor-intelligence" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="h-5 w-5 mr-2 text-amber-500" />
                  Dark Intelligence Layer
                </CardTitle>
                <CardDescription>
                  Stealth competitor analysis and market intelligence gathering
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex flex-col space-y-2">
                      <label className="text-sm font-medium">Competitor Names</label>
                      <div className="flex space-x-2">
                        <Input 
                          placeholder="e.g. Microsoft, Salesforce, Oracle" 
                          value={competitorNames.join(', ')}
                          onChange={(e) => setCompetitorNames(e.target.value.split(',').map(name => name.trim()))}
                          className="flex-1"
                        />
                        <Button 
                          onClick={gatherCompetitorIntelligence} 
                          disabled={isLoading || competitorNames.length === 0}
                        >
                          {isLoading ? (
                            <RefreshCw className="h-4 w-4 animate-spin" />
                          ) : (
                            "Gather Intelligence"
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {competitorIntelligence.length > 0 && (
                    <div className="mt-6 space-y-6">
                      {competitorIntelligence.map((competitor, index) => (
                        <div key={index} className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                          <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-amber-900">
                              {competitor.competitorName}
                            </h3>
                            <Badge variant="outline" className="bg-white text-xs">
                              Data from {new Date(competitor.collectedAt).toLocaleDateString()}
                            </Badge>
                          </div>
                          
                          <div className="mt-4">
                            <h4 className="text-sm font-medium text-amber-800">Keyword Trends</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                              {competitor.keywordTrends.map((trend, idx) => (
                                <div key={idx} className="bg-white p-2 rounded border border-amber-100 flex items-center justify-between">
                                  <span className="text-sm">{trend.keyword}</span>
                                  <Badge 
                                    className={
                                      trend.trend === 'up' ? 'bg-green-100 text-green-800' : 
                                      trend.trend === 'down' ? 'bg-red-100 text-red-800' : 
                                      'bg-gray-100 text-gray-800'
                                    }
                                  >
                                    {trend.trend}
                                  </Badge>
                                </div>
                              ))}
                            </div>
                          </div>

                          {competitor.stockLevels && (
                            <div className="mt-4">
                              <h4 className="text-sm font-medium text-amber-800">Product Stock Levels</h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                                {competitor.stockLevels.map((stock, idx) => (
                                  <div key={idx} className="bg-white p-2 rounded border border-amber-100 flex items-center justify-between">
                                    <span className="text-sm truncate">{stock.product}</span>
                                    <Badge 
                                      className={
                                        stock.stock === 'high' ? 'bg-green-100 text-green-800' : 
                                        stock.stock === 'medium' ? 'bg-blue-100 text-blue-800' : 
                                        stock.stock === 'low' ? 'bg-amber-100 text-amber-800' : 
                                        'bg-red-100 text-red-800'
                                      }
                                    >
                                      {stock.stock}
                                    </Badge>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {competitor.priceChanges && competitor.priceChanges.length > 0 && (
                            <div className="mt-4">
                              <h4 className="text-sm font-medium text-amber-800">Recent Price Changes</h4>
                              <div className="space-y-2 mt-2">
                                {competitor.priceChanges.map((price, idx) => (
                                  <div key={idx} className="bg-white p-2 rounded border border-amber-100">
                                    <div className="flex justify-between">
                                      <span className="text-sm font-medium">{price.product}</span>
                                      <span className="text-xs text-slate-500">
                                        {new Date(price.changeDate).toLocaleDateString()}
                                      </span>
                                    </div>
                                    <div className="flex items-center mt-1">
                                      <span className="text-sm line-through text-slate-500">
                                        ${price.oldPrice.toFixed(2)}
                                      </span>
                                      <ChevronRight className="h-3 w-3 mx-1 text-amber-500" />
                                      <span className="text-sm font-medium">
                                        ${price.newPrice.toFixed(2)}
                                      </span>
                                      <Badge className={`ml-2 ${price.newPrice > price.oldPrice ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                        {price.newPrice > price.oldPrice ? 
                                          `+${(((price.newPrice - price.oldPrice) / price.oldPrice) * 100).toFixed(1)}%` : 
                                          `-${(((price.oldPrice - price.newPrice) / price.oldPrice) * 100).toFixed(1)}%`}
                                      </Badge>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {competitor.marketingCampaigns && competitor.marketingCampaigns.length > 0 && (
                            <div className="mt-4">
                              <h4 className="text-sm font-medium text-amber-800">Marketing Campaigns</h4>
                              <div className="space-y-2 mt-2">
                                {competitor.marketingCampaigns.map((campaign, idx) => (
                                  <div key={idx} className="bg-white p-2 rounded border border-amber-100">
                                    <div className="flex justify-between">
                                      <span className="text-sm font-medium">{campaign.name}</span>
                                      <Badge variant="outline">{campaign.platform}</Badge>
                                    </div>
                                    <div className="flex justify-between mt-1">
                                      <span className="text-xs text-slate-500">
                                        Est. Budget: {campaign.estimatedBudget}
                                      </span>
                                      {campaign.startDate && (
                                        <span className="text-xs text-slate-500">
                                          Started: {new Date(campaign.startDate).toLocaleDateString()}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Emotional Triggers Tab */}
          <TabsContent value="emotional-triggers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-red-500" />
                  Emotional Sentiment Boosting
                </CardTitle>
                <CardDescription>
                  Analyzes user behavior to detect purchase readiness and trigger personalized offers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium mb-2">Sample Customer Behavior</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-slate-500">Search Terms</p>
                        <p className="text-sm">{customerBehavior.searchTerms.join(', ')}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Visited Pages</p>
                        <p className="text-sm">{customerBehavior.visitedPages.join(', ')}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Time on Site</p>
                        <p className="text-sm">{customerBehavior.timeOnSite} seconds</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Interactions</p>
                        <p className="text-sm">{customerBehavior.interactions.join(', ')}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Emotional Sentiment</p>
                        <Badge className={
                          customerBehavior.emotionalSentiment === 'positive' ? 'bg-green-100 text-green-800' : 
                          customerBehavior.emotionalSentiment === 'negative' ? 'bg-red-100 text-red-800' : 
                          'bg-slate-100 text-slate-800'
                        }>
                          {customerBehavior.emotionalSentiment}
                        </Badge>
                      </div>
                    </div>

                    <div className="mt-4">
                      <Button 
                        onClick={generateEmotionalTrigger} 
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <RefreshCw className="h-4 w-4 animate-spin" />
                        ) : (
                          "Generate Emotional Trigger"
                        )}
                      </Button>
                    </div>
                  </div>

                  {emotionalTrigger && (
                    <div className="mt-4">
                      <div className="bg-gradient-to-r from-red-50 to-pink-50 p-4 rounded-lg border border-red-200">
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-semibold text-red-900 flex items-center">
                            <Heart className="h-5 w-5 mr-2 text-red-500" />
                            Emotional Trigger Generated
                          </h3>
                          <Badge variant="outline" className="bg-white capitalize">
                            {emotionalTrigger.triggerType}
                          </Badge>
                        </div>
                        
                        <div className="mt-4 p-4 bg-white rounded-lg border border-red-100">
                          <p className="text-lg font-medium">{emotionalTrigger.message}</p>
                          
                          {emotionalTrigger.discount && (
                            <div className="mt-3 inline-block">
                              <Badge className="bg-red-500 text-white">
                                {emotionalTrigger.discount}% OFF
                              </Badge>
                            </div>
                          )}
                          
                          {emotionalTrigger.expiryTime && (
                            <p className="mt-2 text-sm text-slate-500">
                              Expires: {new Date(emotionalTrigger.expiryTime).toLocaleString()}
                            </p>
                          )}
                        </div>
                        
                        <div className="mt-4 p-2 bg-amber-50 border-l-4 border-amber-400 rounded flex items-center">
                          <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                          <p className="text-sm text-amber-800">
                            This trigger has a high probability of converting this customer based on their behavior
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Cross-Platform Tab */}
          <TabsContent value="cross-platform" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2 text-green-500" />
                  Cross-Platform Behavioral Tracking
                </CardTitle>
                <CardDescription>
                  Monitors user behavior across platforms and adapts strategies accordingly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium mb-2">Sample User Behaviors Across Platforms</h3>
                    
                    <div className="space-y-3">
                      {sampleBehaviors.map((behavior, index) => (
                        <div key={index} className="bg-white p-3 rounded border border-green-100">
                          <div className="flex justify-between items-center">
                            <h4 className="text-sm font-medium capitalize">{behavior.platform}</h4>
                            <Badge className="bg-blue-100 text-blue-800">
                              {behavior.conversionIntent}% Intent
                            </Badge>
                          </div>
                          
                          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div>
                              <p className="text-xs text-slate-500">Keywords</p>
                              <p className="text-sm">{behavior.keywords.join(', ')}</p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500">Interactions</p>
                              <p className="text-sm">{behavior.interactions.join(', ')}</p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500">Time Spent</p>
                              <p className="text-sm">{behavior.timeSpent} seconds</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4">
                      <Button 
                        onClick={trackCrossPlatformBehavior} 
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <RefreshCw className="h-4 w-4 animate-spin" />
                        ) : (
                          "Analyze Cross-Platform Behavior"
                        )}
                      </Button>
                    </div>
                  </div>

                  {crossPlatformAnalysis && (
                    <div className="mt-4">
                      <div className="bg-gradient-to-r from-green-50 to-teal-50 p-4 rounded-lg border border-green-200">
                        <h3 className="text-lg font-semibold text-green-900 flex items-center">
                          <BarChart3 className="h-5 w-5 mr-2 text-green-500" />
                          Cross-Platform Analysis Results
                        </h3>
                        
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-white p-3 rounded-lg border border-green-100">
                            <p className="text-xs text-slate-500">Overall Conversion Intent</p>
                            <div className="flex items-center mt-1">
                              <Progress 
                                value={crossPlatformAnalysis.conversionIntent} 
                                className="h-2 flex-1" 
                              />
                              <span className="ml-2 text-sm font-medium">
                                {crossPlatformAnalysis.conversionIntent}%
                              </span>
                            </div>
                          </div>
                          
                          <div className="bg-white p-3 rounded-lg border border-green-100">
                            <p className="text-xs text-slate-500">Recommended Platform</p>
                            <p className="text-lg font-medium capitalize">
                              {crossPlatformAnalysis.recommendedPlatform}
                            </p>
                          </div>
                          
                          <div className="bg-white p-3 rounded-lg border border-green-100">
                            <p className="text-xs text-slate-500">Recommended Action</p>
                            <p className="text-sm font-medium">
                              {crossPlatformAnalysis.recommendedAction}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
