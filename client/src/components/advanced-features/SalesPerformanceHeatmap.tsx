import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Settings,
  Download,
  RefreshCw,
  Filter,
  Eye
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Define types for our data
interface HeatmapCell {
  x: number;
  y: number;
  value: number;
  label: string;
}

interface HeatmapData {
  xLabels: string[];
  yLabels: string[];
  cells: HeatmapCell[];
  maxValue: number;
  minValue: number;
}

// Available dimensions for the heatmap
const dimensionOptions = [
  { value: "day_hour", label: "Day of Week × Hour" },
  { value: "product_channel", label: "Product × Channel" },
  { value: "category_region", label: "Category × Region" },
  { value: "month_product", label: "Month × Product" }
];

// Available metrics for the heatmap
const metricOptions = [
  { value: "sales", label: "Sales Volume" },
  { value: "revenue", label: "Revenue" },
  { value: "conversion", label: "Conversion Rate" },
  { value: "aov", label: "Average Order Value" }
];

// Color themes for the heatmap
const colorThemes = [
  { value: "blue", label: "Blue Scale", colors: ["#E3F2FD", "#90CAF9", "#42A5F5", "#1E88E5", "#0D47A1"] },
  { value: "green", label: "Green Scale", colors: ["#E8F5E9", "#A5D6A7", "#66BB6A", "#43A047", "#1B5E20"] },
  { value: "purple", label: "Purple Scale", colors: ["#F3E5F5", "#CE93D8", "#AB47BC", "#8E24AA", "#4A148C"] },
  { value: "fire", label: "Fire Scale", colors: ["#FFEBEE", "#FFCDD2", "#EF9A9A", "#E57373", "#C62828"] },
  { value: "contrast", label: "High Contrast", colors: ["#1A237E", "#311B92", "#4527A0", "#B71C1C", "#F57F17"] }
];

// Generate sample data based on dimension selection
const generateHeatmapData = (dimension: string, metric: string): HeatmapData => {
  let xLabels: string[] = [];
  let yLabels: string[] = [];
  
  // Set up dimensions
  if (dimension === "day_hour") {
    xLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    yLabels = Array.from({ length: 12 }, (_, i) => `${(i + 9) % 12 || 12}${i < 3 ? 'am' : 'pm'}`);
  } else if (dimension === "product_channel") {
    xLabels = ["Product A", "Product B", "Product C", "Product D", "Product E"];
    yLabels = ["Web", "Mobile", "Social", "Email", "Marketplace"];
  } else if (dimension === "category_region") {
    xLabels = ["Electronics", "Clothing", "Home", "Beauty", "Sports"];
    yLabels = ["North", "East", "South", "West", "Central"];
  } else if (dimension === "month_product") {
    xLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    yLabels = ["Product A", "Product B", "Product C", "Product D"];
  }
  
  // Generate random cells
  const cells: HeatmapCell[] = [];
  let maxValue = 0;
  let minValue = Infinity;
  
  for (let x = 0; x < xLabels.length; x++) {
    for (let y = 0; y < yLabels.length; y++) {
      // Generate value based on metric and add some patterns
      let baseValue = 0;
      
      if (dimension === "day_hour") {
        // Higher values during business hours on weekdays
        const isWeekend = x >= 5; // Sat, Sun
        const isBusinessHour = y >= 1 && y <= 8; // 10am to 5pm
        baseValue = isBusinessHour ? 50 + Math.random() * 50 : 20 + Math.random() * 30;
        baseValue = isWeekend ? baseValue * 0.7 : baseValue;
      } else if (dimension === "product_channel") {
        // Product B and D perform better on mobile and social
        if ((x === 1 || x === 3) && (y === 1 || y === 2)) {
          baseValue = 70 + Math.random() * 30;
        } else {
          baseValue = 30 + Math.random() * 40;
        }
      } else if (dimension === "category_region") {
        // Electronics does well in North and West, Clothing in East
        if ((x === 0 && (y === 0 || y === 3)) || (x === 1 && y === 1)) {
          baseValue = 65 + Math.random() * 35;
        } else {
          baseValue = 25 + Math.random() * 50;
        }
      } else if (dimension === "month_product") {
        // Seasonal patterns
        const seasonality = Math.sin((x / 12) * Math.PI * 2) * 30 + 50;
        baseValue = seasonality + Math.random() * 20;
      }
      
      // Adjust value based on metric
      let value = baseValue;
      if (metric === "revenue") {
        value = baseValue * (10 + Math.random() * 5);
      } else if (metric === "conversion") {
        value = (baseValue / 100) * 5 + Math.random() * 2;
      } else if (metric === "aov") {
        value = 50 + (baseValue / 100) * 100 + Math.random() * 20;
      }
      
      // Format label based on metric
      let label = value.toFixed(0);
      if (metric === "revenue") {
        label = `$${value.toFixed(0)}`;
      } else if (metric === "conversion") {
        label = `${value.toFixed(1)}%`;
      } else if (metric === "aov") {
        label = `$${value.toFixed(0)}`;
      }
      
      cells.push({ x, y, value, label });
      
      maxValue = Math.max(maxValue, value);
      minValue = Math.min(minValue, value);
    }
  }
  
  return { xLabels, yLabels, cells, maxValue, minValue };
};

export default function SalesPerformanceHeatmap() {
  const { toast } = useToast();
  const [selectedDimension, setSelectedDimension] = useState("day_hour");
  const [selectedMetric, setSelectedMetric] = useState("sales");
  const [colorTheme, setColorTheme] = useState("blue");
  const [showLabels, setShowLabels] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [heatmapData, setHeatmapData] = useState<HeatmapData | null>(null);

  // Fetch data when selections change
  useEffect(() => {
    fetchHeatmapData();
  }, [selectedDimension, selectedMetric]);

  const fetchHeatmapData = () => {
    setIsLoading(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      const data = generateHeatmapData(selectedDimension, selectedMetric);
      setHeatmapData(data);
      setIsLoading(false);
    }, 800);
  };

  const handleExport = () => {
    toast({
      title: "Exporting heatmap data",
      description: "Your data is being prepared for download",
    });
    
    // In a real app, this would trigger a file download
    setTimeout(() => {
      toast({
        title: "Export complete",
        description: "Your heatmap data has been exported successfully",
      });
    }, 1500);
  };

  const handleRefresh = () => {
    fetchHeatmapData();
    toast({
      title: "Data refreshed",
      description: "Heatmap data has been updated",
    });
  };

  const getColorForValue = (value: number) => {
    if (!heatmapData) return colorThemes[0].colors[0];
    
    const theme = colorThemes.find(t => t.value === colorTheme) || colorThemes[0];
    const { minValue, maxValue } = heatmapData;
    const range = maxValue - minValue;
    
    // Normalize value to 0-1 range
    const normalizedValue = range === 0 ? 0.5 : (value - minValue) / range;
    
    // Get the color index (0-4)
    const colorIndex = Math.min(Math.floor(normalizedValue * theme.colors.length), theme.colors.length - 1);
    
    return theme.colors[colorIndex];
  };

  const dimensionLabel = dimensionOptions.find(d => d.value === selectedDimension)?.label;
  const metricLabel = metricOptions.find(m => m.value === selectedMetric)?.label;
  
  return (
    <Card className="overflow-hidden border-0 bg-slate-800/60">
      <CardHeader className="bg-gradient-to-r from-green-600 to-green-400 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <CardTitle className="text-white text-xl sm:text-2xl">
              Customizable Sales Performance Heatmap
            </CardTitle>
            <CardDescription className="text-green-100">
              Visualize {metricLabel} patterns by {dimensionLabel}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              onClick={() => setShowSettings(!showSettings)}
            >
              <Settings className="h-4 w-4 mr-2" />
              Customize
            </Button>
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
        {showSettings && (
          <div className="p-4 sm:p-6 bg-slate-700 border-b border-slate-600">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="text-sm text-slate-300 mb-1 block">Dimensions</label>
                <select
                  className="w-full bg-slate-600 border border-slate-500 rounded-md py-2 px-3 text-white"
                  value={selectedDimension}
                  onChange={(e) => setSelectedDimension(e.target.value)}
                >
                  {dimensionOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm text-slate-300 mb-1 block">Metric</label>
                <select
                  className="w-full bg-slate-600 border border-slate-500 rounded-md py-2 px-3 text-white"
                  value={selectedMetric}
                  onChange={(e) => setSelectedMetric(e.target.value)}
                >
                  {metricOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm text-slate-300 mb-1 block">Color Theme</label>
                <select
                  className="w-full bg-slate-600 border border-slate-500 rounded-md py-2 px-3 text-white"
                  value={colorTheme}
                  onChange={(e) => setColorTheme(e.target.value)}
                >
                  {colorThemes.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm text-slate-300 mb-1 block">Display Options</label>
                <div className="flex items-center mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className={`flex items-center mr-2 ${showLabels ? 'bg-slate-500' : 'bg-slate-600'}`}
                    onClick={() => setShowLabels(!showLabels)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    {showLabels ? 'Hide Values' : 'Show Values'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="p-4 sm:p-6">
          {isLoading ? (
            <div className="h-[400px] w-full flex items-center justify-center">
              <RefreshCw className="h-8 w-8 animate-spin text-green-400" />
            </div>
          ) : heatmapData ? (
            <div>
              <div className="overflow-x-auto">
                <div className="min-w-[600px]">
                  {/* X-axis labels (top) */}
                  <div className="flex pl-20 mb-2">
                    {heatmapData.xLabels.map((label, index) => (
                      <div 
                        key={index} 
                        className="flex-1 text-center text-xs text-slate-400 font-medium"
                      >
                        {label}
                      </div>
                    ))}
                  </div>
                  
                  {/* Grid with Y-axis labels */}
                  <div>
                    {heatmapData.yLabels.map((yLabel, yIndex) => (
                      <div key={yIndex} className="flex items-center">
                        {/* Y-axis label */}
                        <div className="w-20 pr-4 text-right text-xs text-slate-400 font-medium">
                          {yLabel}
                        </div>
                        
                        {/* Cells for this row */}
                        <div className="flex flex-1">
                          {heatmapData.xLabels.map((_, xIndex) => {
                            const cell = heatmapData.cells.find(c => c.x === xIndex && c.y === yIndex);
                            return (
                              <div 
                                key={xIndex} 
                                className="flex-1 aspect-square border border-slate-700 flex items-center justify-center"
                                style={{ backgroundColor: cell ? getColorForValue(cell.value) : '#ffffff' }}
                              >
                                {cell && showLabels && (
                                  <span className="text-xs font-medium text-black">{cell.label}</span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Legend */}
                  <div className="mt-6 flex items-center justify-center">
                    <div className="flex">
                      {colorThemes.find(t => t.value === colorTheme)?.colors.map((color, index) => (
                        <div 
                          key={index} 
                          className="w-12 h-6 flex items-center justify-center text-xs text-black font-medium"
                          style={{ backgroundColor: color }}
                        >
                          {index === 0 && 'Low'}
                          {index === 4 && 'High'}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-[400px] w-full flex items-center justify-center text-slate-400">
              No data available
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
