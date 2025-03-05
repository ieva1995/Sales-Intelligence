import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { 
  ComboBox, 
  ComboBoxTrigger, 
  ComboBoxInput, 
  ComboBoxContent, 
  ComboBoxItem 
} from "@/components/ui/combobox";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  ComposedChart
} from "recharts";
import { ArrowRight, Download, Calendar, RefreshCw, SlidersHorizontal, Layers } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type MetricType = "revenue" | "orders" | "conversion" | "aov" | "retention";
type PeriodType = "daily" | "weekly" | "monthly" | "quarterly";

interface ComparisonData {
  period: string;
  currentValue: number;
  previousValue: number;
  change: number;
}

// Sample comparison data generator
const generateComparisonData = (
  metric: MetricType, 
  period: PeriodType, 
  periodCount: number = 12
): ComparisonData[] => {
  const data: ComparisonData[] = [];
  const baselines: Record<MetricType, number> = {
    revenue: 10000,
    orders: 500,
    conversion: 3.5,
    aov: 75,
    retention: 85
  };
  
  const volatility: Record<MetricType, number> = {
    revenue: 0.2,
    orders: 0.15,
    conversion: 0.1,
    aov: 0.05,
    retention: 0.03
  };
  
  // Period labels
  const periodLabels = {
    daily: Array.from({ length: periodCount }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (periodCount - i - 1));
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }),
    weekly: Array.from({ length: periodCount }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (7 * (periodCount - i - 1)));
      return `Week ${i + 1}`;
    }),
    monthly: Array.from({ length: periodCount }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - (periodCount - i - 1));
      return date.toLocaleDateString('en-US', { month: 'short' });
    }),
    quarterly: ['Q1', 'Q2', 'Q3', 'Q4']
  };
  
  // Generate data
  const labels = periodLabels[period];
  const maxPeriods = Math.min(periodCount, labels.length);
  
  for (let i = 0; i < maxPeriods; i++) {
    const baseline = baselines[metric];
    const randomFactor = 1 + (Math.random() * 2 - 1) * volatility[metric];
    const growthFactor = 1 + (i / maxPeriods) * 0.5; // Slight growth trend
    
    const currentValue = Math.round(baseline * randomFactor * growthFactor * 100) / 100;
    const previousValue = Math.round(currentValue * (0.8 + Math.random() * 0.4) * 100) / 100;
    const change = Math.round((currentValue - previousValue) / previousValue * 1000) / 10;
    
    data.push({
      period: labels[i],
      currentValue,
      previousValue,
      change
    });
  }
  
  return data;
};

const metricOptions = [
  { value: "revenue", label: "Revenue" },
  { value: "orders", label: "Orders" },
  { value: "conversion", label: "Conversion Rate" },
  { value: "aov", label: "Average Order Value" },
  { value: "retention", label: "Customer Retention" }
];

const periodOptions = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" }
];

const dateRangeOptions = [
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
  { value: "6m", label: "Last 6 months" },
  { value: "1y", label: "Last year" },
  { value: "2y", label: "Last 2 years" }
];

export default function PerformanceComparisonTool() {
  const { toast } = useToast();
  const [selectedMetric, setSelectedMetric] = useState<MetricType>("revenue");
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>("monthly");
  const [selectedDateRange, setSelectedDateRange] = useState("90d");
  const [activeTab, setActiveTab] = useState("chart");
  const [isLoading, setIsLoading] = useState(false);
  const [comparisonData, setComparisonData] = useState<ComparisonData[]>([]);

  // Fetch data when selections change
  useEffect(() => {
    fetchComparisonData();
  }, [selectedMetric, selectedPeriod, selectedDateRange]);

  const fetchComparisonData = () => {
    setIsLoading(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      const periodCount = selectedDateRange === "30d" ? 30 
        : selectedDateRange === "90d" ? 12
        : selectedDateRange === "6m" ? 6
        : selectedDateRange === "1y" ? 12
        : 8;
      
      const data = generateComparisonData(selectedMetric, selectedPeriod, periodCount);
      setComparisonData(data);
      setIsLoading(false);
    }, 800);
  };

  const getMetricFormatted = (value: number) => {
    if (selectedMetric === "revenue") return `$${value.toLocaleString()}`;
    if (selectedMetric === "conversion" || selectedMetric === "retention") return `${value}%`;
    if (selectedMetric === "aov") return `$${value}`;
    return value.toLocaleString();
  };

  const handleExport = () => {
    toast({
      title: "Exporting comparison data",
      description: "Your data is being prepared for download",
    });
    
    // In a real app, this would trigger a file download
    setTimeout(() => {
      toast({
        title: "Export complete",
        description: "Your data has been exported successfully",
      });
    }, 1500);
  };

  const handleRefresh = () => {
    fetchComparisonData();
    toast({
      title: "Data refreshed",
      description: "Performance comparison data has been updated",
    });
  };

  const calculateOverallChange = () => {
    if (comparisonData.length === 0) return 0;
    
    const totalCurrent = comparisonData.reduce((sum, item) => sum + item.currentValue, 0);
    const totalPrevious = comparisonData.reduce((sum, item) => sum + item.previousValue, 0);
    
    return Math.round((totalCurrent - totalPrevious) / totalPrevious * 1000) / 10;
  };

  const overallChange = calculateOverallChange();
  const metricLabel = metricOptions.find(m => m.value === selectedMetric)?.label || "Metric";
  const periodLabel = periodOptions.find(p => p.value === selectedPeriod)?.label || "Period";
  
  return (
    <Card className="overflow-hidden border-0 bg-slate-800/60">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-500 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <CardTitle className="text-white text-xl sm:text-2xl">
              Interactive Performance Comparison
            </CardTitle>
            <CardDescription className="text-blue-100">
              Compare current and previous period performance metrics
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              onClick={handleRefresh}
              disabled={isLoading}
            >
              {isLoading ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4 mr-2" />
              )}
              Refresh
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
        <div className="p-4 sm:p-6 bg-slate-800 border-b border-slate-700">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-slate-400 mb-1 block">Metric</label>
              <select
                className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white"
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value as MetricType)}
              >
                {metricOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">Time Grouping</label>
              <select
                className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white"
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value as PeriodType)}
              >
                {periodOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">Date Range</label>
              <select
                className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white"
                value={selectedDateRange}
                onChange={(e) => setSelectedDateRange(e.target.value)}
              >
                {dateRangeOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="chart" className="w-full" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-between items-center px-4 sm:px-6 py-2 border-b border-slate-700">
            <TabsList className="bg-slate-700">
              <TabsTrigger value="chart" className="data-[state=active]:bg-blue-500">
                <Layers className="h-4 w-4 mr-2" />
                Comparison Chart
              </TabsTrigger>
              <TabsTrigger value="details" className="data-[state=active]:bg-blue-500">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Detailed Analysis
              </TabsTrigger>
            </TabsList>
            
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-slate-400" />
              <span className="text-xs text-slate-400">
                Comparing current vs previous period
              </span>
            </div>
          </div>
          
          <TabsContent value="chart" className="p-0 m-0">
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <p className="text-xs text-slate-400">Current Period</p>
                  <h3 className="text-xl font-bold text-white mt-1">
                    {getMetricFormatted(comparisonData.reduce((sum, item) => sum + item.currentValue, 0))}
                  </h3>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <p className="text-xs text-slate-400">Previous Period</p>
                  <h3 className="text-xl font-bold text-white mt-1">
                    {getMetricFormatted(comparisonData.reduce((sum, item) => sum + item.previousValue, 0))}
                  </h3>
                </div>
                <div className={`rounded-lg p-4 ${overallChange >= 0 ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                  <p className="text-xs text-slate-400">Change</p>
                  <h3 className={`text-xl font-bold mt-1 ${overallChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {overallChange >= 0 ? '+' : ''}{overallChange}%
                  </h3>
                </div>
              </div>
              
              <div className="h-[350px] w-full">
                {isLoading ? (
                  <div className="h-full w-full flex items-center justify-center">
                    <RefreshCw className="h-8 w-8 animate-spin text-blue-400" />
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                      data={comparisonData}
                      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis dataKey="period" stroke="#888" />
                      <YAxis stroke="#888" />
                      <Tooltip 
                        formatter={(value) => [getMetricFormatted(value as number), metricLabel]}
                        labelFormatter={(label) => `${periodLabel}: ${label}`}
                      />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="previousValue"
                        name="Previous Period"
                        fill="#4695D6"
                        stroke="#4695D6"
                        fillOpacity={0.2}
                      />
                      <Line
                        type="monotone"
                        dataKey="currentValue"
                        name="Current Period"
                        stroke="#5BE584"
                        activeDot={{ r: 8 }}
                        strokeWidth={3}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="details" className="p-0 m-0">
            <div className="p-4 sm:p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-4 font-semibold text-slate-400">Period</th>
                      <th className="text-right py-3 px-4 font-semibold text-slate-400">Current</th>
                      <th className="text-right py-3 px-4 font-semibold text-slate-400">Previous</th>
                      <th className="text-right py-3 px-4 font-semibold text-slate-400">Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((item, index) => (
                      <tr key={index} className="border-b border-slate-700 hover:bg-slate-700/50">
                        <td className="py-3 px-4 text-white">{item.period}</td>
                        <td className="py-3 px-4 text-right text-white">{getMetricFormatted(item.currentValue)}</td>
                        <td className="py-3 px-4 text-right text-white">{getMetricFormatted(item.previousValue)}</td>
                        <td className={`py-3 px-4 text-right font-medium ${
                          item.change >= 0 ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {item.change >= 0 ? '+' : ''}{item.change}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
