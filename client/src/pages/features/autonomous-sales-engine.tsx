import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import {
  Brain,
  ShieldCheck,
  Zap,
  Eye,
  Search,
  BarChart2,
  Lock,
  Key,
  Fingerprint,
  AlertTriangle,
  Clock,
  RefreshCw,
  Code,
  MessageSquare,
  Users,
  Globe,
  LineChart,
  PenTool,
  Network,
  Database
} from "lucide-react";

export default function AutonomousSalesEngine() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("slase");
  const [systemStatus, setSystemStatus] = useState({
    engineHealth: 92,
    learningActive: true,
    securityStatus: "Active",
    threatLevel: "Low",
    totalStrategies: 29,
    activeStrategies: 8,
    lastTraining: "2 hours ago",
    lastThreatDetection: "17 minutes ago",
    conversionImprovement: 43,
    systemUptime: 99.97,
  });

  const [masterControlDialog, setMasterControlDialog] = useState(false);
  const [biometricScanDialog, setBiometricScanDialog] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanComplete, setScanComplete] = useState(false);

  // Simulate biometric scan
  const startBiometricScan = () => {
    setScanProgress(0);
    setScanComplete(false);

    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setScanComplete(true);
          return 100;
        }
        return prev + 5;
      });
    }, 120);
  };

  // Handle authorization access
  const handleAuthorize = () => {
    setBiometricScanDialog(false);
    setMasterControlDialog(true);

    toast({
      title: "Access Granted",
      description: "Biometric verification successful",
    });
  };

  // Handle time lock activation
  const activateTimeLock = (hours: number) => {
    toast({
      title: "Time Lock Activated",
      description: `System locked for ${hours} hours`,
      variant: "destructive",
    });
    setMasterControlDialog(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-800 to-indigo-900 py-16">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
              S.L.A.S.E + GhostGuard AI
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Self-Learning Autonomous Sales Engine with Advanced Cybersecurity Protection
            </p>
          </div>
        </div>
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]" />
      </div>

      {/* System Status */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-slate-800/60 backdrop-blur-lg border border-slate-700/50 rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="mr-4 p-3 bg-blue-500/20 rounded-lg">
                <Brain className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">System Status</h2>
                <p className="text-gray-400">Autonomous Engine Health and Performance</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Button
                variant="outline"
                className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
                onClick={() => {
                  toast({
                    title: "Model Training Initiated",
                    description: "AI learning cycle in progress",
                  });
                }}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Train Model
              </Button>
              <Button
                variant="outline"
                className="border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/10"
                onClick={() => setBiometricScanDialog(true)}
              >
                <Key className="mr-2 h-4 w-4" />
                Master Controls
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-slate-800/40 border-slate-700/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Engine Health</p>
                    <p className="text-2xl font-bold text-white">{systemStatus.engineHealth}%</p>
                  </div>
                  <div className={`p-2 rounded-full ${systemStatus.engineHealth > 90 ? 'bg-green-500/20' : 'bg-yellow-500/20'}`}>
                    <Brain className={`h-5 w-5 ${systemStatus.engineHealth > 90 ? 'text-green-400' : 'text-yellow-400'}`} />
                  </div>
                </div>
                <Progress
                  value={systemStatus.engineHealth}
                  className="mt-2 h-1.5 bg-slate-700"
                />
              </CardContent>
            </Card>

            <Card className="bg-slate-800/40 border-slate-700/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Security Status</p>
                    <p className="text-2xl font-bold text-white">{systemStatus.securityStatus}</p>
                  </div>
                  <div className="p-2 rounded-full bg-green-500/20">
                    <ShieldCheck className="h-5 w-5 text-green-400" />
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-400">Threat Level: <span className="text-green-400 font-medium">{systemStatus.threatLevel}</span></p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/40 border-slate-700/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Active Strategies</p>
                    <p className="text-2xl font-bold text-white">{systemStatus.activeStrategies}</p>
                  </div>
                  <div className="p-2 rounded-full bg-blue-500/20">
                    <LineChart className="h-5 w-5 text-blue-400" />
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-400">Total: <span className="text-blue-400 font-medium">{systemStatus.totalStrategies}</span></p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/40 border-slate-700/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Conversion Uplift</p>
                    <p className="text-2xl font-bold text-green-400">+{systemStatus.conversionImprovement}%</p>
                  </div>
                  <div className="p-2 rounded-full bg-green-500/20">
                    <BarChart2 className="h-5 w-5 text-green-400" />
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-400">System Uptime: <span className="text-blue-400 font-medium">{systemStatus.systemUptime}%</span></p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Tabs Interface */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto">
            <TabsTrigger value="slase" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
              <Brain className="mr-2 h-4 w-4" />
              S.L.A.S.E
            </TabsTrigger>
            <TabsTrigger value="ghostguard" className="data-[state=active]:bg-indigo-500/20 data-[state=active]:text-indigo-400">
              <ShieldCheck className="mr-2 h-4 w-4" />
              GhostGuard AI
            </TabsTrigger>
          </TabsList>

          {/* S.L.A.S.E Tab Content */}
          <TabsContent value="slase" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* AI Learning Core */}
              <Card className="bg-gradient-to-br from-slate-800 to-slate-900/80 border border-slate-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="mr-2 h-5 w-5 text-blue-400" />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                      Deep Learning Core
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="learning-mode" className="text-sm text-gray-400">Learning Mode</Label>
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="learning-mode" 
                        checked={systemStatus.learningActive}
                        onCheckedChange={(checked) => setSystemStatus({...systemStatus, learningActive: checked})}
                      />
                      <span className="text-sm font-medium text-white">
                        {systemStatus.learningActive ? "Active" : "Paused"}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-700/30 rounded-lg space-y-3">
                    <h4 className="text-sm font-medium text-blue-400">Learning Sources</h4>
                    <div className="space-y-2">
                      {[
                        { name: "Customer Interactions", enabled: true, icon: Users },
                        { name: "Competitor Websites", enabled: true, icon: Globe },
                        { name: "Google Search Trends", enabled: true, icon: Search },
                        { name: "Social Media Activity", enabled: true, icon: MessageSquare },
                      ].map((source, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <source.icon className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-300">{source.name}</span>
                          </div>
                          <Switch checked={source.enabled} />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-blue-950/20 rounded-lg border border-blue-900/30">
                    <h4 className="text-sm font-medium text-blue-400 mb-2">Model Insights</h4>
                    <p className="text-sm text-gray-300 mb-3">Last training: {systemStatus.lastTraining}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Pattern Recognition</span>
                        <span className="text-white">87%</span>
                      </div>
                      <Progress value={87} className="h-1 bg-slate-700" />

                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Data Processing</span>
                        <span className="text-white">92%</span>
                      </div>
                      <Progress value={92} className="h-1 bg-slate-700" />

                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Learning Rate</span>
                        <span className="text-white">78%</span>
                      </div>
                      <Progress value={78} className="h-1 bg-slate-700" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Predictive Strategy Generator */}
              <Card className="bg-gradient-to-br from-slate-800 to-slate-900/80 border border-slate-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="mr-2 h-5 w-5 text-yellow-400" />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-amber-400">
                      Predictive Sales Strategy Generator
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="strategy-generation" className="text-sm text-gray-400">Auto-Generation</Label>
                    <div className="flex items-center space-x-2">
                      <Switch id="strategy-generation" defaultChecked />
                      <span className="text-sm font-medium text-white">
                        Enabled
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-amber-950/20 rounded-lg border border-amber-900/30 space-y-3">
                    <h4 className="text-sm font-medium text-yellow-400">Active Strategies</h4>
                    <div className="space-y-3">
                      {[
                        { name: "High-Intent Visitor Engagement", impact: "High", confidence: 92 },
                        { name: "Cross-Sell Product Recommendation", impact: "Medium", confidence: 87 },
                        { name: "Abandoned Cart Recovery", impact: "High", confidence: 95 },
                        { name: "Price Sensitivity Detection", impact: "Medium", confidence: 83 },
                      ].map((strategy, index) => (
                        <div key={index} className="p-3 bg-slate-800/50 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="text-sm font-medium text-white">{strategy.name}</h5>
                            <span className={`px-2 py-0.5 text-xs rounded-full ${
                              strategy.impact === 'High' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                            }`}>
                              {strategy.impact} Impact
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-400">AI Confidence</span>
                            <span className="text-xs text-yellow-400">{strategy.confidence}%</span>
                          </div>
                          <Progress value={strategy.confidence} className="h-1 mt-1 bg-slate-700" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white hover:from-amber-600 hover:to-yellow-600"
                    onClick={() => {
                      toast({
                        title: "New Strategy Generated",
                        description: "Emotion-based pricing strategy activated",
                      });
                    }}
                  >
                    <Zap className="mr-2 h-4 w-4" />
                    Generate New Strategy
                  </Button>
                </CardContent>
              </Card>

              {/* Cross-Platform Tracking */}
              <Card className="bg-gradient-to-br from-slate-800 to-slate-900/80 border border-slate-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Eye className="mr-2 h-5 w-5 text-purple-400" />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                      Cross-Platform Behavioral Tracking
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-purple-950/20 rounded-lg border border-purple-900/30 space-y-3">
                    <h4 className="text-sm font-medium text-purple-400">Behavior Patterns</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { platform: "Google", value: 84, icon: Search },
                        { platform: "Instagram", value: 67, icon: Globe },
                        { platform: "TikTok", value: 72, icon: Globe },
                        { platform: "Direct", value: 93, icon: Network },
                      ].map((platform, index) => (
                        <div key={index} className="p-3 bg-slate-800/50 rounded-lg">
                          <div className="flex items-center mb-2">
                            <platform.icon className="h-3 w-3 text-gray-400 mr-2" />
                            <h5 className="text-xs font-medium text-white">{platform.platform}</h5>
                          </div>
                          <div className="flex items-end justify-between">
                            <Progress value={platform.value} className="h-1 w-full bg-slate-700 mr-2" />
                            <span className="text-xs text-purple-400">{platform.value}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-slate-700/30 rounded-lg space-y-3">
                    <h4 className="text-sm font-medium text-purple-400">Customer Journey Mapping</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Search className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-300">Search Analysis</span>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <MessageSquare className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-300">Social Media Tracking</span>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <LineChart className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-300">Competitor Interaction</span>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-300">Demographic Analysis</span>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Emotional Sentiment Boosting */}
              <Card className="bg-gradient-to-br from-slate-800 to-slate-900/80 border border-slate-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PenTool className="mr-2 h-5 w-5 text-green-400" />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-400">
                      Emotional Sentiment Boosting
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="neural-copywriting" className="text-sm text-gray-400">Neural Copywriting</Label>
                    <div className="flex items-center space-x-2">
                      <Switch id="neural-copywriting" defaultChecked />
                      <span className="text-sm font-medium text-white">Active</span>
                    </div>
                  </div>

                  <div className="p-4 bg-green-950/20 rounded-lg border border-green-900/30 space-y-4">
                    <h4 className="text-sm font-medium text-green-400">Sentiment Detection</h4>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Current Visitor Sentiment</span>
                        <span className="text-white">Curious</span>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { label: "Positive", value: 32 },
                          { label: "Neutral", value: 18 },
                          { label: "Curious", value: 42 },
                          { label: "Hesitant", value: 28 },
                          { label: "Excited", value: 22 },
                          { label: "Concerned", value: 15 },
                        ].map((sentiment, index) => (
                          <div key={index} className="flex flex-col items-center p-2 bg-slate-800/40 rounded-lg">
                            <span className="text-xs text-gray-400">{sentiment.label}</span>
                            <span className="text-sm font-medium text-green-400">{sentiment.value}%</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h5 className="text-xs font-medium text-green-400">Active Optimizations</h5>
                      <div className="p-3 bg-slate-800/50 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center">
                            <PenTool className="h-3 w-3 text-green-400 mr-2" />
                            <h5 className="text-xs font-medium text-white">Product Description Enhancement</h5>
                          </div>
                          <span className="px-2 py-0.5 text-xs rounded-full bg-green-500/20 text-green-400">Live</span>
                        </div>
                        <p className="text-xs text-gray-400">AI optimized copy performed 37% better than original</p>
                      </div>

                      <div className="p-3 bg-slate-800/50 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center">
                            <PenTool className="h-3 w-3 text-green-400 mr-2" />
                            <h5 className="text-xs font-medium text-white">Call-to-Action Personalization</h5>
                          </div>
                          <span className="px-2 py-0.5 text-xs rounded-full bg-green-500/20 text-green-400">Live</span>
                        </div>
                        <p className="text-xs text-gray-400">Dynamic CTA based on emotional state: +29% click-through</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* GhostGuard AI Tab Content */}
          <TabsContent value="ghostguard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* AI Behavioral Firewalls */}
              <Card className="bg-gradient-to-br from-slate-800 to-slate-900/80 border border-slate-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ShieldCheck className="mr-2 h-5 w-5 text-indigo-400" />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-blue-400">
                      AI Behavioral Firewalls
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-indigo-950/20 rounded-lg border border-indigo-900/30 space-y-3">
                    <h4 className="text-sm font-medium text-indigo-400">Threat Detection</h4>
                    <div className="space-y-3">
                      {[
                        { type: "Pattern Anomalies", count: 14, level: "Low" },
                        { type: "Access Violations", count: 3, level: "Medium" },
                        { type: "Injection Attempts", count: 2, level: "High" },
                      ].map((threat, index) => (
                        <div key={index} className="p-3 bg-slate-800/50 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="text-sm font-medium text-white">{threat.type}</h5>
                            <span className={`px-2 py-0.5 text-xs rounded-full ${
                              threat.level === 'High' ? 'bg-red-500/20 text-red-400' : 
                              threat.level === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-blue-500/20 text-blue-400'
                            }`}>
                              {threat.level}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-400">Detected Incidents</span>
                            <span className="text-xs text-indigo-400">{threat.count}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="security-level" className="text-sm text-gray-400">Security Level</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        id="security-level"
                        defaultValue={[80]}
                        max={100}
                        step={10}
                        className="w-[120px]"
                      />
                      <span className="text-sm font-medium text-white">High (80%)</span>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-700/30 rounded-lg space-y-2">
                    <h4 className="text-sm font-medium text-indigo-400 mb-2">Active Protection</h4>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <ShieldCheck className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-300">Behavioral Analysis</span>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Database className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-300">Data Leak Prevention</span>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Lock className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-300">Access Control</span>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Deep Fake Honeytraps */}
              <Card className="bg-gradient-to-br from-slate-800 to-slate-900/80 border border-slate-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Eye className="mr-2 h-5 w-5 text-red-400" />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-rose-400">
                      Deep Fake Honeytraps
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-red-950/20 rounded-lg border border-red-900/30 space-y-3">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-sm font-medium text-red-400">Honeytrap Status</h4>
                      <span className="px-2 py-0.5 text-xs rounded-full bg-green-500/20 text-green-400">Active</span>
                    </div>

                    <div className="space-y-3">
                      {[
                        { name: "Fake Admin Dashboard", status: "Deployed", triggers: 3 },
                        { name: "Decoy Customer Accounts", status: "Deployed", triggers: 7 },
                        { name: "Legacy API Endpoint", status: "Deployed", triggers: 12 },
                        { name: "Sensitive Data Repository", status: "Deployed", triggers: 2 },
                      ].map((trap, index) => (
                        <div key={index} className="p-3 bg-slate-800/50 rounded-lg flex justify-between items-center">
                          <div>
                            <h5 className="text-sm font-medium text-white">{trap.name}</h5>
                            <div className="flex items-center mt-1">
                              <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                              <span className="text-xs text-gray-400">{trap.status}</span></div>
                          </div>
                          <div className="text-right">
                            <span className="text-xs text-gray-400">Triggers</span>
                            <p className="text-sm font-medium text-red-400">{trap.triggers}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="honeytrap-deployment" className="text-sm text-gray-400">Active Deployment</Label>
                    <div className="flex items-center space-x-2">
                      <Switch id="honeytrap-deployment" defaultChecked />
                      <span className="text-sm font-medium text-white">
                        Enabled
                      </span>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-gradient-to-r from-red-500 to-rose-500 text-white hover:from-red-600 hover:to-rose-600"
                    onClick={() => {
                      toast({
                        title: "New Honeytrap Deployed",
                        description: "Fake customer database decoy activated",
                      });
                    }}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Deploy New Honeytrap
                  </Button>
                </CardContent>
              </Card>

              {/* Self-Destruct Protocol */}
              <Card className="bg-gradient-to-br from-slate-800 to-slate-900/80 border border-slate-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="mr-2 h-5 w-5 text-red-400" />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-rose-400">
                      Self-Destruct Protocol
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-red-950/20 rounded-lg border border-red-900/30 space-y-3">
                    <h4 className="text-sm font-medium text-red-400">Critical Threat Response</h4>
                    <p className="text-sm text-gray-300">Auto-wipe sensitive data and analytics patterns in case of critical attacks.</p>

                    <div className="space-y-3 mt-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <AlertTriangle className="h-4 w-4 text-yellow-400 mr-2" />
                          <span className="text-sm text-gray-300">Auto-Destruct Sensitive Data</span>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Database className="h-4 w-4 text-yellow-400 mr-2" />
                          <span className="text-sm text-gray-300">Purge Pattern Memory</span>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Lock className="h-4 w-4 text-yellow-400 mr-2" />
                          <span className="text-sm text-gray-300">Quantum Encryption Lock</span>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-800/40 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-sm font-medium text-red-400">Threat Level Indicators</h4>
                      <span className="px-2 py-0.5 text-xs rounded-full bg-green-500/20 text-green-400">Normal</span>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">Infiltration Attempts</span>
                          <span className="text-white">0%</span>
                        </div>
                        <Progress value={0} className="h-1 bg-slate-700" />
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">Data Extraction Patterns</span>
                          <span className="text-white">2%</span>
                        </div>
                        <Progress value={2} className="h-1 bg-slate-700" />
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">Critical Vulnerability Probes</span>
                          <span className="text-white">1%</span>
                        </div>
                        <Progress value={1} className="h-1 bg-slate-700" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Zero Trust Architecture */}
              <Card className="bg-gradient-to-br from-slate-800 to-slate-900/80 border border-slate-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Fingerprint className="mr-2 h-5 w-5 text-cyan-400" />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
                      Zero Trust Architecture
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-cyan-950/20 rounded-lg border border-cyan-900/30 space-y-3">
                    <h4 className="text-sm font-medium text-cyan-400">Verification Status</h4>
                    <p className="text-sm text-gray-300">Every system request must pass multi-factor verification.</p>

                    <div className="grid grid-cols-2 gap-3 mt-3">
                      {[
                        { name: "API Requests", verified: 328, total: 328, percentage: 100 },
                        { name: "Database Calls", verified: 1042, total: 1042, percentage: 100 },
                        { name: "Admin Actions", verified: 47, total: 47, percentage: 100 },
                        { name: "Model Updates", verified: 12, total: 12, percentage: 100 },
                      ].map((item, index) => (
                        <div key={index} className="p-3 bg-slate-800/50 rounded-lg">
                          <h5 className="text-xs font-medium text-white mb-2">{item.name}</h5>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-gray-400">Verified</span>
                            <span className="text-cyan-400">{item.verified}/{item.total}</span>
                          </div>
                          <Progress value={item.percentage} className="h-1 bg-slate-700" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-slate-700/30 rounded-lg space-y-3">
                    <h4 className="text-sm font-medium text-cyan-400">Polymorphic Code Status</h4>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-300">Last Encryption Cycle</span>
                      <span className="text-sm text-cyan-400">Today, 14:32</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-300">Next Cycle</span>
                      <span className="text-sm text-cyan-400">1h 28m</span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full mt-2 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                      onClick={() => {
                        toast({
                          title: "Force Encryption Cycle",
                          description: "System code is rewriting itself now",
                        });
                      }}
                    >
                      <Code className="mr-2 h-4 w-4" />
                      Force Encryption Cycle
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Biometric Scan Dialog */}
      <Dialog open={biometricScanDialog} onOpenChange={setBiometricScanDialog}>
        <DialogContent className="bg-slate-900 border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-white">Biometric Authentication Required</DialogTitle>
            <DialogDescription className="text-gray-400">
              Master controls require advanced security verification.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="flex justify-center">
              <div className="w-32 h-32 rounded-full bg-slate-800 flex items-center justify-center relative overflow-hidden">
                <Fingerprint className="w-16 h-16 text-indigo-400" />
                {scanProgress > 0 && (
                  <div className="absolute inset-0 bg-indigo-400/20 flex items-center justify-center">
                    <svg className="w-24 h-24" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="rgba(129, 140, 248, 0.2)"
                        strokeWidth="8"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="rgba(129, 140, 248, 0.8)"
                        strokeWidth="8"
                        strokeDasharray={`${scanProgress * 2.83} 283`}
                        style={{ transformOrigin: "center", transform: "rotate(-90deg)" }}
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>
            <Progress value={scanProgress} className="h-2 bg-slate-700" />
            {scanComplete ? (
              <div className="text-center space-y-4">
                <p className="text-green-400">Biometric scan complete. Identity verified.</p>
                <Button onClick={handleAuthorize} className="bg-indigo-600 hover:bg-indigo-700">
                  Access Master Controls
                </Button>
              </div>
            ) : (
              <div className="text-center">
                <Button
                  onClick={startBiometricScan}
                  className="bg-indigo-600 hover:bg-indigo-700"
                  disabled={scanProgress > 0 && scanProgress < 100}
                >
                  {scanProgress > 0 && scanProgress < 100 ? (
                    <span className="flex items-center">
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Scanning... ({scanProgress}%)
                    </span>
                  ) : (
                    "Start Biometric Scan"
                  )}
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Master Control Dialog */}
      <Dialog open={masterControlDialog} onOpenChange={setMasterControlDialog}>
        <DialogContent className="bg-slate-900 border-slate-700 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white">S.L.A.S.E Master Control Panel</DialogTitle>
            <DialogDescription className="text-gray-400">
              Critical system control options. Use with extreme caution.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <Card className="bg-red-900/20 border-red-800/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center text-red-400">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  System Override Controls
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Lock className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-300">AI Learning Override</span>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Database className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-300">Force Data Purge</span>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <AlertTriangle className="h-4 w-4 text-red-400 mr-2" />
                    <span className="text-sm text-red-300">Self-Destruct Protocol</span>
                  </div>
                  <Switch />
                </div>

                <Button variant="destructive" size="sm" className="w-full mt-2">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Execute Override
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-amber-900/20 border-amber-800/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center text-amber-400">
                  <Clock className="h-4 w-4 mr-2" />
                  Time Lock Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-xs text-gray-400">Temporarily disable system for security purposes.</p>

                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-amber-500/30 text-amber-400 hover:bg-amber-500/10"
                    onClick={() => activateTimeLock(1)}
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    Lock for 1 Hour
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-amber-500/30 text-amber-400 hover:bg-amber-500/10"
                    onClick={() => activateTimeLock(8)}
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    Lock for 8 Hours
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-amber-500/30 text-amber-400 hover:bg-amber-500/10"
                    onClick={() => activateTimeLock(24)}
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    Lock for 24 Hours
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-indigo-900/20 border-indigo-800/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center text-indigo-400">
                  <Fingerprint className="h-4 w-4 mr-2" />
                  Biometric Access Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Fingerprint className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-300">Primary Biometric</span>
                  </div>
                  <span className="text-sm text-indigo-400">Active</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Fingerprint className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-300">Backup Biometric</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-indigo-400 h-8 px-2">
                    Register
                  </Button>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-2 border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/10"
                >
                  <Key className="h-4 w-4 mr-2" />
                  Reset Biometric Keys
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-green-900/20 border-green-800/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center text-green-400">
                  <Database className="h-4 w-4 mr-2" />
                  Quantum Backup Vault
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Last Backup</span>
                  <span className="text-green-400">Today, 12:42</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Backup Count</span>
                  <span className="text-green-400">12</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Encryption</span>
                  <span className="text-green-400">AES-512</span>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-2 border-green-500/30 text-green-400 hover:bg-green-500/10"
                  onClick={() => {
                    toast({
                      title: "Quantum Backup Initiated",
                      description: "Creating encrypted system image",
                    });
                    setMasterControlDialog(false);
                  }}
                >
                  <Database className="h-4 w-4 mr-2" />
                  Create Quantum Backup
                </Button>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}