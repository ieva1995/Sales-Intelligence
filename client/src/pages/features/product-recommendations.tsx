import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  BarChart,
  Package,
  ShoppingCart,
  TrendingUp,
  Users,
  CreditCard,
  Search,
  Zap,
  RefreshCw,
  FileText,
  Layers,
  CheckCircle,
  Tag
} from "lucide-react";

// Types for our product recommendations
interface CustomerSegment {
  id: string;
  name: string;
  size: number;
  averageOrderValue: string;
  purchaseFrequency: string;
  topProducts: string[];
}

interface ProductRecommendation {
  id: string;
  productName: string;
  productId: string;
  price: string;
  conversionProbability: number;
  potentialRevenue: string;
  targetSegment: string;
  matchReason: string;
  aiConfidence: number;
}

export default function ProductRecommendations() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedRecommendation, setSelectedRecommendation] = useState<ProductRecommendation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isGeneratingRecommendations, setIsGeneratingRecommendations] = useState(false);

  // Mock data for customer segments
  const [customerSegments] = useState<CustomerSegment[]>([
    {
      id: "seg1",
      name: "High-Value Shoppers",
      size: 342,
      averageOrderValue: "$245.78",
      purchaseFrequency: "2.3 orders/month",
      topProducts: ["Premium Subscription", "Enterprise Plan", "Analytics Add-on"]
    },
    {
      id: "seg2",
      name: "New Customers (< 30 days)",
      size: 187,
      averageOrderValue: "$98.50",
      purchaseFrequency: "1.1 orders/month",
      topProducts: ["Starter Plan", "Basic Training", "Mobile App"]
    },
    {
      id: "seg3",
      name: "Regular Subscribers",
      size: 523,
      averageOrderValue: "$129.99",
      purchaseFrequency: "1.0 orders/month",
      topProducts: ["Pro Subscription", "Advanced Support", "Data Export Tool"]
    }
  ]);

  // Mock data for product recommendations
  const [recommendations] = useState<ProductRecommendation[]>([
    {
      id: "rec1",
      productName: "AI Sales Assistant Pro",
      productId: "PROD-2475",
      price: "$49.99/month",
      conversionProbability: 0.78,
      potentialRevenue: "$18,496.30",
      targetSegment: "High-Value Shoppers",
      matchReason: "93% of similar customers purchased within 30 days of buying Enterprise Plan",
      aiConfidence: 0.92
    },
    {
      id: "rec2",
      productName: "Sales Dashboard Premium",
      productId: "PROD-1835",
      price: "$29.99/month",
      conversionProbability: 0.65,
      potentialRevenue: "$11,575.14",
      targetSegment: "Regular Subscribers",
      matchReason: "Highly complementary to Pro Subscription based on usage patterns",
      aiConfidence: 0.87
    },
    {
      id: "rec3",
      productName: "Advanced Analytics Bundle",
      productId: "PROD-3491",
      price: "$99.99/month",
      conversionProbability: 0.53,
      potentialRevenue: "$27,897.22",
      targetSegment: "High-Value Shoppers",
      matchReason: "Purchase pattern indicates 5.3x higher interest in analytics features",
      aiConfidence: 0.79
    },
    {
      id: "rec4",
      productName: "Sales Training Course",
      productId: "PROD-4267",
      price: "$199.99 one-time",
      conversionProbability: 0.42,
      potentialRevenue: "$15,719.22",
      targetSegment: "New Customers (< 30 days)",
      matchReason: "First-time users show 3.2x higher interest in educational content",
      aiConfidence: 0.81
    },
    {
      id: "rec5",
      productName: "Customer Success Add-on",
      productId: "PROD-1092",
      price: "$19.99/month",
      conversionProbability: 0.71,
      potentialRevenue: "$7,436.28",
      targetSegment: "Regular Subscribers",
      matchReason: "Usage patterns show focus on customer relationship management",
      aiConfidence: 0.89
    }
  ]);

  // Filter recommendations based on search query and active filter
  const filteredRecommendations = recommendations.filter(rec => {
    const matchesSearch = 
      rec.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.targetSegment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.productId.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === "all") return matchesSearch;
    if (activeFilter === "high-probability") return matchesSearch && rec.conversionProbability >= 0.7;
    if (activeFilter === "high-value") return matchesSearch && parseFloat(rec.potentialRevenue.replace(/[^0-9.-]+/g, "")) >= 15000;
    
    return matchesSearch;
  });

  const handleGenerateRecommendations = () => {
    setIsGeneratingRecommendations(true);
    
    // Simulate API call to generate recommendations
    setTimeout(() => {
      setIsGeneratingRecommendations(false);
      toast({
        title: "Recommendations Generated",
        description: "New AI-powered product recommendations are ready",
      });
    }, 2500);
  };

  const handleRecommendationClick = (recommendation: ProductRecommendation) => {
    setSelectedRecommendation(recommendation);
    setIsDetailDialogOpen(true);
  };

  const handleCreateCampaign = () => {
    setIsLoading(true);
    
    // Simulate API call to create campaign
    setTimeout(() => {
      setIsLoading(false);
      setIsDetailDialogOpen(false);
      
      toast({
        title: "Campaign Created",
        description: `Campaign for ${selectedRecommendation?.productName} has been created successfully.`,
      });
    }, 1500);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">AI Product Recommendations</h1>
        <p className="text-muted-foreground">Boost sales with AI-driven product recommendations</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="bg-blue-500/10 border-blue-500/20">
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="p-2 rounded-full bg-blue-500/20">
              <ShoppingCart className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Potential Revenue</p>
              <h3 className="text-xl font-bold text-white">$81,124.16</h3>
              <p className="text-xs text-green-400">+24.3% from last month</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-green-500/10 border-green-500/20">
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="p-2 rounded-full bg-green-500/20">
              <CreditCard className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Avg. Conversion Rate</p>
              <h3 className="text-xl font-bold text-white">61.8%</h3>
              <p className="text-xs text-green-400">+7.2% from last month</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-purple-500/10 border-purple-500/20">
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="p-2 rounded-full bg-purple-500/20">
              <Users className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Customer Segments</p>
              <h3 className="text-xl font-bold text-white">{customerSegments.length}</h3>
              <p className="text-xs text-purple-400">{customerSegments.reduce((sum, seg) => sum + seg.size, 0)} customers</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-orange-500/10 border-orange-500/20">
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="p-2 rounded-full bg-orange-500/20">
              <Package className="h-5 w-5 text-orange-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Active Products</p>
              <h3 className="text-xl font-bold text-white">28</h3>
              <p className="text-xs text-orange-400">5 new this month</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search recommendations..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Button
            variant={activeFilter === "all" ? "default" : "outline"}
            onClick={() => setActiveFilter("all")}
            className={activeFilter === "all" ? "bg-blue-600" : ""}
          >
            All
          </Button>
          <Button
            variant={activeFilter === "high-probability" ? "default" : "outline"}
            onClick={() => setActiveFilter("high-probability")}
            className={activeFilter === "high-probability" ? "bg-green-600" : ""}
          >
            High Conversion
          </Button>
          <Button
            variant={activeFilter === "high-value" ? "default" : "outline"}
            onClick={() => setActiveFilter("high-value")}
            className={activeFilter === "high-value" ? "bg-purple-600" : ""}
          >
            High Value
          </Button>
        </div>

        <Button 
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
          onClick={handleGenerateRecommendations}
          disabled={isGeneratingRecommendations}
        >
          {isGeneratingRecommendations ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Zap className="mr-2 h-4 w-4" />
              Generate Recommendations
            </>
          )}
        </Button>
      </div>

      {/* Customer Segments */}
      <Card className="bg-slate-800 border-slate-700 mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2 text-blue-400" />
            Customer Segments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {customerSegments.map((segment) => (
              <Card key={segment.id} className="bg-slate-700 border-slate-600">
                <CardContent className="p-4">
                  <h3 className="font-medium text-white">{segment.name}</h3>
                  
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-400">Size</span>
                      <span className="text-xs text-white">{segment.size} customers</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-400">Avg. Order</span>
                      <span className="text-xs text-white">{segment.averageOrderValue}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-400">Frequency</span>
                      <span className="text-xs text-white">{segment.purchaseFrequency}</span>
                    </div>
                    
                    <div className="mt-3">
                      <p className="text-xs text-gray-400 mb-1">Top Products</p>
                      <div className="flex flex-wrap gap-1">
                        {segment.topProducts.map((product, idx) => (
                          <Badge key={idx} variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                            {product}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Product Recommendations */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-green-400" />
            AI-Powered Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredRecommendations.length === 0 ? (
            <div className="text-center py-8">
              <div className="rounded-full bg-slate-700 w-12 h-12 mx-auto flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-white">No recommendations found</h3>
              <p className="text-sm text-slate-400 mt-1">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredRecommendations.map((recommendation) => (
                <div 
                  key={recommendation.id}
                  className="p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors cursor-pointer"
                  onClick={() => handleRecommendationClick(recommendation)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-start gap-2">
                        <h3 className="font-medium text-white">{recommendation.productName}</h3>
                        <Badge variant="outline" className="bg-slate-600 text-slate-300 border-slate-500">
                          {recommendation.productId}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">Target: {recommendation.targetSegment}</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 items-center">
                      <div className="px-2 py-1 bg-slate-600 rounded-md">
                        <p className="text-xs text-gray-300">Conversion</p>
                        <p className="text-sm font-medium text-white">{(recommendation.conversionProbability * 100).toFixed(1)}%</p>
                      </div>
                      
                      <div className="px-2 py-1 bg-slate-600 rounded-md">
                        <p className="text-xs text-gray-300">Price</p>
                        <p className="text-sm font-medium text-white">{recommendation.price}</p>
                      </div>
                      
                      <div className="px-2 py-1 bg-green-500/20 rounded-md">
                        <p className="text-xs text-green-300">Potential Revenue</p>
                        <p className="text-sm font-medium text-green-400">{recommendation.potentialRevenue}</p>
                      </div>
                      
                      <Button size="sm" className="ml-2 bg-blue-600 hover:bg-blue-700">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recommendation Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          {selectedRecommendation && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-blue-500" />
                  {selectedRecommendation.productName}
                  <Badge className="ml-2 bg-slate-700 text-slate-300">
                    {selectedRecommendation.productId}
                  </Badge>
                </DialogTitle>
                <DialogDescription>
                  AI-powered product recommendation for {selectedRecommendation.targetSegment}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                {/* Recommendation Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-slate-800 p-3 rounded-lg">
                    <p className="text-xs text-gray-400">Conversion</p>
                    <p className="text-lg font-medium text-white">{(selectedRecommendation.conversionProbability * 100).toFixed(1)}%</p>
                  </div>
                  
                  <div className="bg-slate-800 p-3 rounded-lg">
                    <p className="text-xs text-gray-400">Price</p>
                    <p className="text-lg font-medium text-white">{selectedRecommendation.price}</p>
                  </div>
                  
                  <div className="bg-slate-800 p-3 rounded-lg">
                    <p className="text-xs text-gray-400">Revenue</p>
                    <p className="text-lg font-medium text-green-400">{selectedRecommendation.potentialRevenue}</p>
                  </div>
                  
                  <div className="bg-slate-800 p-3 rounded-lg">
                    <p className="text-xs text-gray-400">AI Confidence</p>
                    <p className="text-lg font-medium text-blue-400">{(selectedRecommendation.aiConfidence * 100).toFixed(1)}%</p>
                  </div>
                </div>

                {/* Match Reason */}
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Layers className="h-4 w-4 text-blue-400" />
                    <h3 className="font-medium text-white">Match Reason</h3>
                  </div>
                  <p className="text-sm text-gray-300">{selectedRecommendation.matchReason}</p>
                </div>

                {/* Campaign Actions */}
                <div className="space-y-4">
                  <div className="bg-slate-800 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <FileText className="h-4 w-4 text-purple-400" />
                      <h3 className="font-medium text-white">Campaign Actions</h3>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <p className="text-sm text-gray-300">Create targeted email campaign for {selectedRecommendation.targetSegment}</p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <p className="text-sm text-gray-300">Setup in-app recommendations for compatible customers</p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <p className="text-sm text-gray-300">Generate sales scripts for account managers</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={() => setIsDetailDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={handleCreateCampaign}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        "Create Campaign"
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
