import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  ArrowRight, 
  BarChart2, 
  TrendingUp, 
  Package, 
  Trophy, 
  Moon 
} from "lucide-react";

// Import our advanced feature components
import PerformanceComparisonTool from "@/components/advanced-features/PerformanceComparisonTool";
import SalesPerformanceHeatmap from "@/components/advanced-features/SalesPerformanceHeatmap";
import InventoryTrendPredictor from "@/components/advanced-features/InventoryTrendPredictor";
import SalesAchievementBadges from "@/components/advanced-features/SalesAchievementBadges";
import DarkModeToggle from "@/components/advanced-features/DarkModeToggle";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export default function AnalyticsSuite() {
  const { toast } = useToast();
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  
  const features = [
    {
      id: "performance-comparison",
      name: "Interactive Performance Comparison Tool",
      description: "Compare KPIs across time periods with interactive charts and insights",
      icon: BarChart2,
      color: "blue",
      component: <PerformanceComparisonTool />
    },
    {
      id: "sales-heatmap",
      name: "Customizable Sales Performance Heatmap",
      description: "Visualize sales patterns with customizable dimensions and metrics",
      icon: TrendingUp,
      color: "green",
      component: <SalesPerformanceHeatmap />
    },
    {
      id: "inventory-predictor",
      name: "AI-Powered Inventory Trend Predictor",
      description: "Predict inventory trends and optimize stock levels with AI",
      icon: Package,
      color: "purple",
      component: <InventoryTrendPredictor />
    },
    {
      id: "achievement-badges",
      name: "Gamified Sales Achievement Badges",
      description: "Unlock badges and rewards for sales excellence",
      icon: Trophy,
      color: "amber",
      component: <SalesAchievementBadges />
    },
    {
      id: "dark-mode",
      name: "Seamless Dark Mode Toggle",
      description: "Toggle between light and dark modes with smooth transitions",
      icon: Moon,
      color: "indigo",
      component: <DarkModeDemo />
    }
  ];

  const handleActivateFeature = (featureId: string) => {
    setActiveFeature(featureId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    const feature = features.find(f => f.id === featureId);
    if (feature) {
      toast({
        title: `${feature.name} Activated`,
        description: "Powered by SalesBoost AI analytics engine",
      });
    }
  };

  const handleBackToFeatures = () => {
    setActiveFeature(null);
  };

  const getFeatureComponent = () => {
    const feature = features.find(f => f.id === activeFeature);
    return feature ? feature.component : null;
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {activeFeature ? (
        <div>
          <Button 
            variant="ghost" 
            onClick={handleBackToFeatures}
            className="mb-4 text-sm hover:bg-slate-800"
          >
            &larr; Back to All Features
          </Button>
          
          {getFeatureComponent()}
        </div>
      ) : (
        <div>
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
              Advanced Analytics Suite
            </h1>
            <p className="text-slate-400 max-w-3xl">
              Discover our newest AI-powered analytics tools designed to optimize your sales performance, 
              inventory management, and customer insights.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <FeatureCard 
                key={feature.id}
                feature={feature}
                onActivate={() => handleActivateFeature(feature.id)}
              />
            ))}
          </div>
          
          <div className="mt-12 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl p-6 border border-blue-500/20">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white mb-1 flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-blue-400" />
                  Enterprise Analytics Package
                </h2>
                <p className="text-slate-400">
                  Get access to all premium analytics features and dedicated support
                </p>
              </div>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Upgrade Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface FeatureCardProps {
  feature: {
    id: string;
    name: string;
    description: string;
    icon: React.ElementType;
    color: string;
  };
  onActivate: () => void;
}

function FeatureCard({ feature, onActivate }: FeatureCardProps) {
  const getGradient = (color: string) => {
    switch (color) {
      case "blue": return "from-blue-600 to-blue-400";
      case "green": return "from-green-600 to-green-400";
      case "purple": return "from-purple-600 to-indigo-400";
      case "amber": return "from-amber-500 to-yellow-400";
      case "indigo": return "from-indigo-600 to-blue-400";
      default: return "from-slate-600 to-slate-400";
    }
  };
  
  return (
    <motion.div 
      className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-slate-600 transition-all duration-300 shadow-lg"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`bg-gradient-to-r ${getGradient(feature.color)} h-3`} />
      <div className="p-6">
        <div className="flex flex-col items-center text-center mb-6">
          <div className={`p-3 rounded-full bg-${feature.color}-500/10 mb-4`}>
            <feature.icon className={`h-8 w-8 text-${feature.color}-400`} />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">{feature.name}</h3>
          <p className="text-sm text-slate-400">{feature.description}</p>
        </div>
        
        <Button 
          onClick={onActivate}
          className="w-full bg-slate-700 hover:bg-slate-600"
        >
          Activate Feature
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
}

// Demo component for the Dark Mode Toggle feature
function DarkModeDemo() {
  return (
    <Card className="overflow-hidden border-0 bg-slate-800/60">
      <CardHeader className="bg-gradient-to-r from-indigo-600 to-blue-500 p-4 sm:p-6">
        <div>
          <CardTitle className="text-white text-xl sm:text-2xl flex items-center">
            <Moon className="mr-2 h-5 w-5" />
            Seamless Dark Mode Toggle
          </CardTitle>
          <CardDescription className="text-indigo-100">
            Toggle between light and dark modes with smooth transitions
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="flex flex-col items-center justify-center space-y-6">
              <h3 className="text-lg font-semibold text-white">Toggle Options</h3>
              
              <div className="space-y-4 w-full max-w-xs">
                <div className="bg-slate-700 p-4 rounded-lg flex items-center justify-between">
                  <span className="text-slate-300">Default Toggle</span>
                  <DarkModeToggle />
                </div>
                
                <div className="bg-slate-700 p-4 rounded-lg flex items-center justify-between">
                  <span className="text-slate-300">Without Label</span>
                  <DarkModeToggle showLabel={false} />
                </div>
                
                <div className="bg-slate-700 p-4 rounded-lg flex items-center justify-center">
                  <DarkModeToggle className="scale-125" />
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-tr from-slate-700 to-slate-600 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Theme Preview</h3>
              
              <div className="space-y-4">
                <Tabs defaultValue="dark" className="w-full">
                  <TabsList className="bg-slate-800">
                    <TabsTrigger value="light" className="data-[state=active]:bg-blue-500">Light</TabsTrigger>
                    <TabsTrigger value="dark" className="data-[state=active]:bg-blue-500">Dark</TabsTrigger>
                  </TabsList>
                  <TabsContent value="light" className="p-4 bg-white rounded-md mt-4">
                    <div className="text-slate-900">
                      <h4 className="font-medium mb-2">Light Mode Preview</h4>
                      <p className="text-sm text-slate-600">Your content looks bright and clear in light mode.</p>
                    </div>
                  </TabsContent>
                  <TabsContent value="dark" className="p-4 bg-slate-900 rounded-md mt-4">
                    <div className="text-white">
                      <h4 className="font-medium mb-2">Dark Mode Preview</h4>
                      <p className="text-sm text-slate-400">Your content looks sleek and elegant in dark mode.</p>
                    </div>
                  </TabsContent>
                </Tabs>
                
                <div className="p-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-md border border-blue-500/20">
                  <p className="text-sm text-white">
                    The theme toggle uses smooth transitions between modes, remembers user preferences, 
                    and supports system preferences as well.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
