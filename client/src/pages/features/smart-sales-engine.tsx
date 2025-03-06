import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  Globe, 
  SearchCode, 
  LineChart, 
  Zap, 
  Shield, 
  Settings, 
  Users, 
  Code, 
  Database
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

export default function SmartSalesEngine() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [learningProgress, setLearningProgress] = useState(67);

  // Simulate learning progress updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLearningProgress(prev => {
        const newValue = prev + Math.random() * 2;
        return newValue > 100 ? 100 : newValue;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Handle AI engine reset
  const handleResetEngine = () => {
    setIsLoading(true);
    toast({
      title: "Engine Reset Initiated",
      description: "S.L.A.S.E is resetting its learning parameters...",
    });

    // Simulate reset process
    setTimeout(() => {
      setLearningProgress(0);
      setIsLoading(false);
      toast({
        title: "Engine Reset Complete",
        description: "S.L.A.S.E has been reset and is ready for new learning.",
      });
    }, 3000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 space-y-4">
        <div className="flex items-center space-x-4">
          <Brain className="h-10 w-10 text-blue-500" />
          <div>
            <h1 className="text-3xl font-bold">
              Self-Learning Autonomous Sales Engine (S.L.A.S.E)
            </h1>
            <p className="text-gray-400">
              Advanced AI-powered sales optimization and autonomous learning
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-blue-900/20 text-blue-400 border-blue-800">
            Version 2.4.1
          </Badge>
          <Badge variant="outline" className="bg-green-900/20 text-green-400 border-green-800">
            Active
          </Badge>
          <Badge variant="outline" className="bg-amber-900/20 text-amber-400 border-amber-800">
            Learning: {learningProgress.toFixed(1)}%
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="intelligence">Intelligence</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-blue-500" />
                  <CardTitle>Learning Progress</CardTitle>
                </div>
                <CardDescription>
                  Autonomous sales pattern acquisition
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm text-gray-400">{learningProgress.toFixed(1)}%</span>
                    </div>
                    <Progress value={learningProgress} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-800 p-3 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Code className="h-4 w-4 mr-2 text-emerald-400" />
                        <h3 className="text-sm font-medium">Models</h3>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-400">Active</span>
                        <span className="text-sm">7 Models</span>
                      </div>
                    </div>

                    <div className="bg-slate-800 p-3 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Database className="h-4 w-4 mr-2 text-purple-400" />
                        <h3 className="text-sm font-medium">Data Points</h3>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-400">Processed</span>
                        <span className="text-sm">1.2M</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center space-x-2">
                  <Globe className="h-5 w-5 text-green-500" />
                  <CardTitle>Global Capabilities</CardTitle>
                </div>
                <CardDescription>
                  Worldwide sales intelligence coverage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
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
                        <h3 className="text-sm font-medium">Global Reach</h3>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-400">Markets</span>
                        <span className="text-sm">12 Regions</span>
                      </div>
                    </div>

                    <div className="bg-slate-800 p-3 rounded-lg">
                      <div className="flex items-center mb-2">
                        <LineChart className="h-4 w-4 mr-2 text-blue-400" />
                        <h3 className="text-sm font-medium">Analytics</h3>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-400">Reports</span>
                        <span className="text-sm">24 Types</span>
                      </div>
                    </div>

                    <div className="bg-slate-800 p-3 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Users className="h-4 w-4 mr-2 text-indigo-400" />
                        <h3 className="text-sm font-medium">Teams</h3>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-400">Support</span>
                        <span className="text-sm">Unlimited</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                <CardTitle>Action Center</CardTitle>
              </div>
              <CardDescription>
                Manage your S.L.A.S.E operations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Zap className="mr-2 h-4 w-4" />
                  Run Analysis
                </Button>
                <Button variant="outline">
                  <Settings className="mr-2 h-4 w-4" />
                  Configure
                </Button>
                <Button variant="destructive" onClick={handleResetEngine} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Shield className="mr-2 h-4 w-4 animate-spin" />
                      Resetting...
                    </>
                  ) : (
                    <>
                      <Shield className="mr-2 h-4 w-4" />
                      Reset Engine
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="intelligence" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Intelligence Center</h2>
              <p className="text-gray-400 mb-4">
                The intelligence tab content would go here, including competitor analysis,
                market insights, and predictive analytics.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Engine Settings</h2>
              <p className="text-gray-400 mb-4">
                The settings tab content would go here, including configuration options,
                learning parameters, and system preferences.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Performance Metrics</h2>
              <p className="text-gray-400 mb-4">
                The metrics tab content would go here, including performance statistics,
                sales improvements, and ROI calculations.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}