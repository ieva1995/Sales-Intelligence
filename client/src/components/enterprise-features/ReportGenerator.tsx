import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FileText, Download, BarChart2, TrendingUp, PieChart, Calendar, Filter } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export default function ReportGenerator() {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportType, setReportType] = useState("performance");
  const [timeframe, setTimeframe] = useState("last30days");
  
  const handleGenerateReport = () => {
    setIsGenerating(true);
    
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      
      toast({
        title: "Report Generated",
        description: "Your performance report has been generated successfully"
      });
    }, 2000);
  };
  
  const handleDownloadReport = () => {
    toast({
      title: "Report Downloaded",
      description: "Your report has been downloaded"
    });
  };
  
  return (
    <Card className="border-0 bg-slate-800/60">
      <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-500 p-4 sm:p-6">
        <div>
          <CardTitle className="text-white text-xl sm:text-2xl flex items-center">
            <FileText className="mr-2 h-5 w-5" />
            One-Click Performance Report Generator
          </CardTitle>
          <CardDescription className="text-green-100">
            Generate comprehensive sales performance reports with a single click
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Report Configuration</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm text-slate-300 mb-1.5 block">Report Type</label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger className="bg-slate-700 border-slate-600">
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="performance">Sales Performance</SelectItem>
                    <SelectItem value="trends">Sales Trends</SelectItem>
                    <SelectItem value="benchmarks">Team Benchmarks</SelectItem>
                    <SelectItem value="forecast">Forecast & Projections</SelectItem>
                    <SelectItem value="custom">Custom Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm text-slate-300 mb-1.5 block">Time Period</label>
                <Select value={timeframe} onValueChange={setTimeframe}>
                  <SelectTrigger className="bg-slate-700 border-slate-600">
                    <SelectValue placeholder="Select time period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last7days">Last 7 Days</SelectItem>
                    <SelectItem value="last30days">Last 30 Days</SelectItem>
                    <SelectItem value="lastQuarter">Last Quarter</SelectItem>
                    <SelectItem value="ytd">Year to Date</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="pt-2">
                <Button onClick={handleGenerateReport} className="w-full bg-green-600 hover:bg-green-700" disabled={isGenerating}>
                  {isGenerating ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating...
                    </>
                  ) : (
                    <>
                      <FileText className="mr-2 h-4 w-4" />
                      Generate Report
                    </>
                  )}
                </Button>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium text-white mb-4">Saved Reports</h3>
              <div className="space-y-2">
                <div className="p-3 bg-slate-700 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-white text-sm">Q3 Performance Summary</h4>
                      <p className="text-xs text-slate-400">Generated: 2 days ago</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={handleDownloadReport}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="p-3 bg-slate-700 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-white text-sm">Monthly Team Benchmarks</h4>
                      <p className="text-xs text-slate-400">Generated: 1 week ago</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={handleDownloadReport}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="p-3 bg-slate-700 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-white text-sm">YTD Sales Analysis</h4>
                      <p className="text-xs text-slate-400">Generated: 3 weeks ago</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={handleDownloadReport}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-700 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-white">Report Preview</h3>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Calendar className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-slate-800 p-3 rounded-md">
                  <p className="text-xs text-slate-400">Total Revenue</p>
                  <p className="text-lg font-medium text-white">$342,576</p>
                  <div className="flex items-center text-xs text-green-400 mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +12.5%
                  </div>
                </div>
                
                <div className="bg-slate-800 p-3 rounded-md">
                  <p className="text-xs text-slate-400">Deals Closed</p>
                  <p className="text-lg font-medium text-white">47</p>
                  <div className="flex items-center text-xs text-green-400 mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +8.2%
                  </div>
                </div>
                
                <div className="bg-slate-800 p-3 rounded-md">
                  <p className="text-xs text-slate-400">Avg. Deal Size</p>
                  <p className="text-lg font-medium text-white">$7,289</p>
                  <div className="flex items-center text-xs text-green-400 mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +5.7%
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-800 p-4 rounded-md h-40 flex items-center justify-center">
                <BarChart2 className="h-10 w-10 text-slate-500" />
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-800 p-4 rounded-md h-32 flex items-center justify-center">
                  <PieChart className="h-8 w-8 text-slate-500" />
                </div>
                <div className="bg-slate-800 p-4 rounded-md h-32 flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-slate-500" />
                </div>
              </div>
              
              <Button className="w-full" onClick={handleDownloadReport}>
                <Download className="mr-2 h-4 w-4" />
                Download Report
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
