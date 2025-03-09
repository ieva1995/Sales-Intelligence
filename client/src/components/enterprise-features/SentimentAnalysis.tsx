import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { BarChart2, PieChart, TrendingUp, LineChart, Filter, Clock, Download, RefreshCw } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export default function SentimentAnalysis() {
  const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [timeframe, setTimeframe] = useState("last30days");
  const [source, setSource] = useState("all");
  
  const handleRefreshData = () => {
    setIsRefreshing(true);
    
    // Simulate data refresh
    setTimeout(() => {
      setIsRefreshing(false);
      
      toast({
        title: "Data Refreshed",
        description: "Sentiment data has been updated"
      });
    }, 1500);
  };
  
  const handleDownloadData = () => {
    toast({
      title: "Data Downloaded",
      description: "Sentiment data has been downloaded"
    });
  };
  
  return (
    <Card className="border-0 bg-slate-800/60">
      <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-500 p-4 sm:p-6">
        <div>
          <CardTitle className="text-white text-xl sm:text-2xl flex items-center">
            <BarChart2 className="mr-2 h-5 w-5" />
            Customer Sentiment Analysis Widget
          </CardTitle>
          <CardDescription className="text-purple-100">
            Analyze and visualize customer sentiment across all touchpoints
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="p-4 border-b border-slate-700 bg-slate-800 flex flex-wrap gap-3 justify-between">
          <div className="flex flex-wrap gap-3">
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="bg-slate-700 border-slate-600 w-36">
                <SelectValue placeholder="Time period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last7days">Last 7 Days</SelectItem>
                <SelectItem value="last30days">Last 30 Days</SelectItem>
                <SelectItem value="last90days">Last 90 Days</SelectItem>
                <SelectItem value="ytd">Year to Date</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={source} onValueChange={setSource}>
              <SelectTrigger className="bg-slate-700 border-slate-600 w-36">
                <SelectValue placeholder="Data source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                <SelectItem value="support">Support Tickets</SelectItem>
                <SelectItem value="surveys">Customer Surveys</SelectItem>
                <SelectItem value="social">Social Media</SelectItem>
                <SelectItem value="reviews">Product Reviews</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleRefreshData} disabled={isRefreshing}>
              {isRefreshing ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownloadData}>
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-4 bg-slate-700 rounded-none h-12">
            <TabsTrigger value="overview" className="data-[state=active]:bg-slate-600">
              Overview
            </TabsTrigger>
            <TabsTrigger value="trends" className="data-[state=active]:bg-slate-600">
              Trends
            </TabsTrigger>
            <TabsTrigger value="channels" className="data-[state=active]:bg-slate-600">
              Channels
            </TabsTrigger>
            <TabsTrigger value="topics" className="data-[state=active]:bg-slate-600">
              Key Topics
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="m-0 p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="bg-slate-700 border-slate-600">
                <CardContent className="p-4">
                  <p className="text-sm text-slate-400">Overall Sentiment</p>
                  <div className="mt-1 flex items-center">
                    <div className="text-2xl font-bold text-white">4.3</div>
                    <div className="text-sm font-medium text-slate-400 ml-1">/5</div>
                  </div>
                  <div className="flex items-center text-green-400 mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    <span className="text-xs">+0.2 from last period</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-700 border-slate-600">
                <CardContent className="p-4">
                  <p className="text-sm text-slate-400">Positive</p>
                  <div className="mt-1">
                    <div className="text-2xl font-bold text-green-400">68%</div>
                  </div>
                  <div className="flex items-center text-green-400 mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    <span className="text-xs">+5% from last period</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-700 border-slate-600">
                <CardContent className="p-4">
                  <p className="text-sm text-slate-400">Neutral</p>
                  <div className="mt-1">
                    <div className="text-2xl font-bold text-blue-400">22%</div>
                  </div>
                  <div className="flex items-center text-red-400 mt-1">
                    <TrendingUp className="h-3 w-3 mr-1 rotate-180" />
                    <span className="text-xs">-3% from last period</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-700 border-slate-600">
                <CardContent className="p-4">
                  <p className="text-sm text-slate-400">Negative</p>
                  <div className="mt-1">
                    <div className="text-2xl font-bold text-red-400">10%</div>
                  </div>
                  <div className="flex items-center text-red-400 mt-1">
                    <TrendingUp className="h-3 w-3 mr-1 rotate-180" />
                    <span className="text-xs">-2% from last period</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Card className="bg-slate-700 border-slate-600">
                <CardHeader className="py-4 px-6">
                  <CardTitle className="text-base">Sentiment Distribution</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="h-[200px] flex items-center justify-center">
                    <PieChart className="h-24 w-24 text-slate-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-700 border-slate-600">
                <CardHeader className="py-4 px-6">
                  <CardTitle className="text-base">Sentiment Timeline</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="h-[200px] flex items-center justify-center">
                    <LineChart className="h-24 w-24 text-slate-500" />
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="bg-slate-700 border-slate-600">
              <CardHeader className="py-4 px-6">
                <CardTitle className="text-base">Customer Feedback Highlights</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-md">
                    <div className="flex justify-between">
                      <div className="text-sm font-medium text-green-400">Positive Feedback</div>
                      <div className="text-xs text-slate-400">2 days ago</div>
                    </div>
                    <p className="text-sm text-slate-300 mt-1">
                      "The customer service team went above and beyond to help me with my issue. I'm extremely satisfied with the support I received."
                    </p>
                    <div className="text-xs text-slate-400 mt-1">Support Ticket #4592</div>
                  </div>
                  
                  <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-md">
                    <div className="flex justify-between">
                      <div className="text-sm font-medium text-blue-400">Neutral Feedback</div>
                      <div className="text-xs text-slate-400">5 days ago</div>
                    </div>
                    <p className="text-sm text-slate-300 mt-1">
                      "The product meets my basic needs, but I wish it had more advanced features. Otherwise, it works as expected."
                    </p>
                    <div className="text-xs text-slate-400 mt-1">Product Review</div>
                  </div>
                  
                  <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-md">
                    <div className="flex justify-between">
                      <div className="text-sm font-medium text-red-400">Negative Feedback</div>
                      <div className="text-xs text-slate-400">1 week ago</div>
                    </div>
                    <p className="text-sm text-slate-300 mt-1">
                      "I experienced significant delays with my order. The shipping process needs improvement."
                    </p>
                    <div className="text-xs text-slate-400 mt-1">Customer Survey</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="trends" className="m-0 p-4 h-[600px]">
            <div className="flex items-center justify-center h-full text-slate-400">
              <div className="text-center">
                <LineChart className="h-16 w-16 mx-auto mb-4 text-slate-500" />
                <p>Sentiment trends visualization will be displayed here</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="channels" className="m-0 p-4 h-[600px]">
            <div className="flex items-center justify-center h-full text-slate-400">
              <div className="text-center">
                <BarChart2 className="h-16 w-16 mx-auto mb-4 text-slate-500" />
                <p>Channel analysis visualization will be displayed here</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="topics" className="m-0 p-4 h-[600px]">
            <div className="flex items-center justify-center h-full text-slate-400">
              <div className="text-center">
                <PieChart className="h-16 w-16 mx-auto mb-4 text-slate-500" />
                <p>Key topics analysis visualization will be displayed here</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
