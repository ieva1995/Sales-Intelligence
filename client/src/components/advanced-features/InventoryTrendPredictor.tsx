import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} from "recharts";
import { 
  BrainCircuit, 
  Package, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  BarChart2, 
  RotateCw,
  InfoIcon,
  RefreshCw,
  Zap,
  Download,
  Calendar
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface InventoryItem {
  id: number;
  name: string;
  sku: string;
  currentStock: number;
  reorderPoint: number;
  minimumOrder: number;
  dailyUsageRate: number;
  price: number;
  cost: number;
  category: string;
  supplier: string;
  leadTimeDays: number;
}

interface InventoryPrediction {
  productId: number;
  productName: string;
  currentStock: number;
  reorderPoint: number;
  daysUntilReorder: number;
  predictedStockouts: boolean;
  suggestedAction: string;
  riskLevel: 'low' | 'medium' | 'high';
  forecastData: {
    day: number;
    date: string;
    predictedStock: number;
    demandTrend: number;
    predictedDemand: number;
    isOutOfStock: boolean;
  }[];
  aiInsights: string[];
}

// Sample products for the dropdown
const inventoryProducts = [
  { id: 1, name: "Enterprise Sales Platform", sku: "ESP-001", category: "Software" },
  { id: 2, name: "Sales Intelligence Pro", sku: "SIP-002", category: "Software" },
  { id: 3, name: "Enterprise Turbo Add-on", sku: "ETA-003", category: "Add-on" },
  { id: 4, name: "CRM Power Integration", sku: "CPI-004", category: "Integration" },
  { id: 5, name: "Advanced Analytics Package", sku: "AAP-005", category: "Service" },
  { id: 6, name: "Sales Dashboard Pro", sku: "SDP-006", category: "Software" },
  { id: 7, name: "Enterprise API Access", sku: "EAA-007", category: "Access" },
  { id: 8, name: "Premium Support Package", sku: "PSP-008", category: "Service" }
];

// Sample inventory data generator
const generateInventoryData = (productId: number): InventoryPrediction => {
  // Base inventory parameters
  const currentStock = Math.floor(Math.random() * 100) + 20;
  const reorderPoint = Math.floor(currentStock * 0.3);
  const dailyUsageRate = Math.random() * 5 + 1;
  const forecastDays = 30;
  
  // Calculate days until reorder
  const daysUntilReorder = Math.floor((currentStock - reorderPoint) / dailyUsageRate);
  
  // Generate daily forecast data
  const forecastData = [];
  let stockLevel = currentStock;
  let willHaveStockout = false;
  
  for (let day = 0; day < forecastDays; day++) {
    // Add some randomness to daily usage
    const dailyVariation = (Math.random() * 0.4) - 0.2; // -20% to +20%
    const adjustedDailyUsage = dailyUsageRate * (1 + dailyVariation);
    
    // Calculate stock for this day
    stockLevel = Math.max(0, stockLevel - adjustedDailyUsage);
    
    // Check if we'll have a stockout
    const isOutOfStock = stockLevel <= 0;
    if (isOutOfStock) willHaveStockout = true;
    
    // Date for this forecast day
    const forecastDate = new Date();
    forecastDate.setDate(forecastDate.getDate() + day);
    
    // Add to forecast data
    forecastData.push({
      day,
      date: forecastDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      predictedStock: Math.round(stockLevel * 10) / 10,
      demandTrend: 1 + (Math.sin(day / 7) * 0.2), // Cyclical demand trend
      predictedDemand: Math.round(adjustedDailyUsage * 10) / 10,
      isOutOfStock
    });
  }
  
  // Determine risk level
  let riskLevel: 'low' | 'medium' | 'high';
  if (daysUntilReorder > 14) {
    riskLevel = 'low';
  } else if (daysUntilReorder > 7) {
    riskLevel = 'medium';
  } else {
    riskLevel = 'high';
  }
  
  // Generate insights
  const insights = [];
  
  // Based on risk level
  if (riskLevel === 'high') {
    insights.push("Urgent: Stock levels critically low. Reorder immediately to avoid stockouts.");
  } else if (riskLevel === 'medium') {
    insights.push("Warning: Stock is depleting faster than average. Consider placing an order soon.");
  } else {
    insights.push("Stock levels are healthy. No immediate action required.");
  }
  
  // Based on usage patterns
  if (Math.random() > 0.5) {
    insights.push("Detected increasing usage trend. Consider adjusting your reorder point up by 15%.");
  } else {
    insights.push("Usage pattern is stable with predictable demand.");
  }
  
  // Seasonality insight
  if (Math.random() > 0.7) {
    insights.push("Seasonal peak demand anticipated in the next 30 days based on historical patterns.");
  }
  
  // Suggested action
  let suggestedAction = "";
  if (willHaveStockout) {
    suggestedAction = "Place an order immediately to prevent stockout";
  } else if (daysUntilReorder < 7) {
    suggestedAction = "Place an order within the next 3 days";
  } else if (daysUntilReorder < 14) {
    suggestedAction = "Plan to reorder within 2 weeks";
  } else {
    suggestedAction = "No action needed at this time";
  }
  
  return {
    productId,
    productName: inventoryProducts.find(p => p.id === productId)?.name || "Unknown Product",
    currentStock,
    reorderPoint,
    daysUntilReorder,
    predictedStockouts: willHaveStockout,
    suggestedAction,
    riskLevel,
    forecastData,
    aiInsights: insights
  };
};

export default function InventoryTrendPredictor() {
  const { toast } = useToast();
  const [selectedProductId, setSelectedProductId] = useState(1);
  const [activeTab, setActiveTab] = useState("forecast");
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [prediction, setPrediction] = useState<InventoryPrediction | null>(null);

  // Fetch prediction when product selection changes
  useEffect(() => {
    fetchPrediction();
  }, [selectedProductId]);

  const fetchPrediction = () => {
    setIsLoading(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      const data = generateInventoryData(selectedProductId);
      setPrediction(data);
      setIsLoading(false);
    }, 800);
  };

  const runAIAnalysis = () => {
    setIsAnalyzing(true);
    toast({
      title: "AI Analysis Running",
      description: "Analyzing inventory patterns and market trends...",
    });
    
    // Simulate AI processing
    setTimeout(() => {
      setIsAnalyzing(false);
      fetchPrediction(); // Refresh prediction with "new" AI insights
      
      toast({
        title: "AI Analysis Complete",
        description: "New insights and recommendations available",
      });
    }, 2500);
  };

  const handleExport = () => {
    toast({
      title: "Exporting inventory forecast",
      description: "Your data is being prepared for download",
    });
    
    // In a real app, this would trigger a file download
    setTimeout(() => {
      toast({
        title: "Export complete",
        description: "Your forecast data has been exported successfully",
      });
    }, 1500);
  };

  const getRiskBadge = (risk: 'low' | 'medium' | 'high') => {
    if (risk === 'low') {
      return <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">Low Risk</span>;
    } else if (risk === 'medium') {
      return <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs">Medium Risk</span>;
    } else {
      return <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs">High Risk</span>;
    }
  };
  
  return (
    <Card className="overflow-hidden border-0 bg-slate-800/60">
      <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-500 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <CardTitle className="text-white text-xl sm:text-2xl flex items-center">
              <BrainCircuit className="mr-2 h-5 w-5" />
              AI-Powered Inventory Trend Predictor
            </CardTitle>
            <CardDescription className="text-purple-100">
              Predictive analytics for inventory management
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              onClick={runAIAnalysis}
              disabled={isAnalyzing}
            >
              {isAnalyzing ? (
                <RotateCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Zap className="h-4 w-4 mr-2" />
              )}
              Run AI Analysis
            </Button>
            <Button 
              variant="outline" 
              className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              onClick={handleExport}
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="p-4 sm:p-6 bg-slate-700 border-b border-slate-600">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-slate-300 mb-1 block">Select Product</label>
              <select
                className="w-full bg-slate-600 border border-slate-500 rounded-md py-2 px-3 text-white"
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(Number(e.target.value))}
              >
                {inventoryProducts.map(product => (
                  <option key={product.id} value={product.id}>
                    {product.name} ({product.sku})
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <Button 
                variant="outline" 
                className="bg-slate-600 border-slate-500 text-white hover:bg-slate-500"
                onClick={fetchPrediction}
                disabled={isLoading}
              >
                {isLoading ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4 mr-2" />
                )}
                Refresh Forecast
              </Button>
            </div>
          </div>
        </div>
        
        {isLoading ? (
          <div className="h-[400px] w-full flex items-center justify-center">
            <div className="text-center">
              <RefreshCw className="h-8 w-8 animate-spin text-purple-400 mx-auto mb-4" />
              <p className="text-slate-400">Loading prediction data...</p>
            </div>
          </div>
        ) : prediction ? (
          <>
            {/* Summary Cards */}
            <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-slate-700 border-slate-600">
                <CardContent className="p-4">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-xs text-slate-400">Current Stock</p>
                      <h3 className="text-xl font-bold text-white mt-1">{prediction.currentStock}</h3>
                      <p className="text-xs text-slate-400 mt-1">Reorder Point: {prediction.reorderPoint}</p>
                    </div>
                    <div className="p-2 bg-indigo-500/10 rounded-full h-10 w-10 flex items-center justify-center">
                      <Package className="h-5 w-5 text-indigo-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-700 border-slate-600">
                <CardContent className="p-4">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-xs text-slate-400">Days Until Reorder</p>
                      <h3 className="text-xl font-bold text-white mt-1">{prediction.daysUntilReorder}</h3>
                      <div className="mt-1">
                        {getRiskBadge(prediction.riskLevel)}
                      </div>
                    </div>
                    <div className="p-2 bg-indigo-500/10 rounded-full h-10 w-10 flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-indigo-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-700 border-slate-600">
                <CardContent className="p-4">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-xs text-slate-400">Predicted Stockouts</p>
                      <h3 className="text-xl font-bold text-white mt-1">
                        {prediction.predictedStockouts ? "Yes" : "No"}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">
                        {prediction.predictedStockouts 
                          ? "Action required" 
                          : "No action needed"}
                      </p>
                    </div>
                    <div className="p-2 bg-indigo-500/10 rounded-full h-10 w-10 flex items-center justify-center">
                      {prediction.predictedStockouts ? (
                        <AlertTriangle className="h-5 w-5 text-red-400" />
                      ) : (
                        <TrendingUp className="h-5 w-5 text-green-400" />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-700 border-slate-600">
                <CardContent className="p-4">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-xs text-slate-400">AI Recommendation</p>
                      <p className="text-sm font-medium text-white mt-1 line-clamp-2">
                        {prediction.suggestedAction}
                      </p>
                    </div>
                    <div className="p-2 bg-indigo-500/10 rounded-full h-10 w-10 flex items-center justify-center">
                      <BrainCircuit className="h-5 w-5 text-indigo-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Tabs defaultValue="forecast" className="w-full" value={activeTab} onValueChange={setActiveTab}>
              <div className="px-4 sm:px-6 border-b border-slate-700">
                <TabsList className="bg-slate-700 mb-0">
                  <TabsTrigger value="forecast" className="data-[state=active]:bg-indigo-500">
                    <BarChart2 className="h-4 w-4 mr-2" />
                    Stock Forecast
                  </TabsTrigger>
                  <TabsTrigger value="insights" className="data-[state=active]:bg-indigo-500">
                    <InfoIcon className="h-4 w-4 mr-2" />
                    AI Insights
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="forecast" className="p-0 m-0">
                <div className="p-4 sm:p-6">
                  <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={prediction.forecastData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                        <XAxis 
                          dataKey="date" 
                          stroke="#888"
                          tick={{ fontSize: 12 }}
                        />
                        <YAxis 
                          stroke="#888"
                          tick={{ fontSize: 12 }}
                        />
                        <Tooltip 
                          formatter={(value) => [value, 'Stock Level']}
                          labelFormatter={(label) => `Date: ${label}`}
                        />
                        <Legend />
                        <ReferenceLine 
                          y={prediction.reorderPoint} 
                          label="Reorder Point" 
                          stroke="#ffa500" 
                          strokeDasharray="3 3" 
                        />
                        <Area
                          type="monotone"
                          dataKey="predictedStock"
                          name="Predicted Stock"
                          stroke="#8884d8"
                          fill="#8884d8"
                          fillOpacity={0.3}
                          isAnimationActive={true}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="insights" className="p-0 m-0">
                <div className="p-4 sm:p-6">
                  <div className="bg-slate-700 rounded-lg p-4 border border-slate-600 mb-4">
                    <h3 className="text-white text-lg mb-2 flex items-center">
                      <BrainCircuit className="h-5 w-5 mr-2 text-indigo-400" />
                      AI-Generated Insights
                    </h3>
                    <ul className="space-y-3">
                      {prediction.aiInsights.map((insight, index) => (
                        <li key={index} className="flex">
                          <div className="mr-3 flex-shrink-0 mt-1">
                            <InfoIcon className="h-4 w-4 text-indigo-400" />
                          </div>
                          <p className="text-slate-300 text-sm">{insight}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
                    <h3 className="text-white text-lg mb-2 flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2 text-green-400" />
                      Demand Analysis
                    </h3>
                    <div className="h-[200px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={prediction.forecastData}
                          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                          <XAxis dataKey="date" stroke="#888" />
                          <YAxis stroke="#888" />
                          <Tooltip />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="predictedDemand" 
                            name="Daily Demand"
                            stroke="#82ca9d" 
                            activeDot={{ r: 8 }} 
                          />
                          <Line 
                            type="monotone" 
                            dataKey="demandTrend" 
                            name="Demand Trend"
                            stroke="#ffc658" 
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </>
        ) : (
          <div className="h-[400px] w-full flex items-center justify-center text-slate-400">
            <div className="text-center">
              <Package className="h-12 w-12 text-slate-500 mx-auto mb-4" />
              <p>Select a product to view inventory predictions</p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="bg-slate-800 border-t border-slate-700 p-4">
        <div className="text-xs text-slate-400 flex items-center">
          <BrainCircuit className="h-4 w-4 mr-2 text-indigo-400" />
          Powered by AI predictive algorithms analyzing historical inventory and sales patterns
        </div>
      </CardFooter>
    </Card>
  );
}
