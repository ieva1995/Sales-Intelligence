import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchTrendData } from "@/lib/trends";
import { Trend } from "@shared/schema";
import { ArrowUp, DollarSign, Package, Users, Mail, Phone, MessageSquare, Calendar, TrendingUp, BarChart2 } from "lucide-react";
import TrendChart from "@/components/TrendChart";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const [activeTask, setActiveTask] = useState<string | null>(null);

  const { data: trends, isLoading } = useQuery<Trend[]>({
    queryKey: ["/api/trends"]
  });

  const { data: trendData } = useQuery({
    queryKey: ["trend-data"],
    queryFn: () => fetchTrendData("example"),
  });

  const metrics = [
    { title: "Total Revenue", value: "$45,231.89", change: "+20.1% from last month", trend: "up", color: "green" },
    { title: "Subscriptions", value: "2,350", change: "+180.1% from last month", trend: "up", color: "blue" },
    { title: "Active Now", value: "573", change: "+201 since last hour", trend: "up", color: "purple" },
    { title: "Sales Growth", value: "+12.5%", change: "+2.4% from last week", trend: "up", color: "amber" },
  ];

  const performanceMetrics = [
    { title: "Page Views", value: "2.4M", change: "+15% from last week" },
    { title: "Bounce Rate", value: "24%", change: "-2% from last week" },
    { title: "Average Session", value: "4m 13s", change: "+12% from last week" }
  ];

  const taskTypes = [
    { icon: Mail, label: 'To-dos', count: 0, color: 'blue' },
    { icon: Phone, label: 'Calls', count: 0, color: 'green' },
    { icon: MessageSquare, label: 'Emails', count: 0, color: 'purple' },
    { icon: Users, label: 'LinkedIn', count: 0, color: 'orange' }
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your business overview.</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, i) => (
          <Card key={i} className="overflow-hidden border-0 shadow-lg">
            <CardHeader className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">{metric.title}</p>
                  <h3 className="text-2xl font-bold mt-2">{metric.value}</h3>
                </div>
                <div className={`p-2 bg-${metric.color}-500/10 rounded-full`}>
                  <TrendingUp className={`h-4 w-4 text-${metric.color}-500`} />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className={`h-[60px] w-full bg-gradient-to-t from-${metric.color}-500/10 to-transparent`} />
              <div className="px-4 py-2 bg-muted/5">
                <p className={`text-xs text-${metric.color}-500 flex items-center`}>
                  <ArrowUp className="h-3 w-3 mr-1" />
                  {metric.change}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Overview and Task Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Performance Overview */}
        <Card className="lg:col-span-2 overflow-hidden border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
            <CardTitle className="text-lg text-white">Performance Overview</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="h-[240px] w-full">
              {trendData && (
                <TrendChart
                  data={trendData.timelineData}
                  title=""
                />
              )}
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6">
              {performanceMetrics.map((metric, i) => (
                <div key={i} className="text-center">
                  <p className="text-xl font-bold">{metric.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{metric.title}</p>
                  <p className="text-xs text-green-500 mt-1">{metric.change}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Task Distribution */}
        <Card className="overflow-hidden border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 p-4">
            <CardTitle className="text-lg text-white">Task Distribution</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-4">
              {taskTypes.map((task) => (
                <div key={task.label} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <task.icon className={`h-4 w-4 mr-2 text-${task.color}-500`} />
                    <span className="text-sm">{task.label}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-24 md:w-32 h-2 bg-gray-200 rounded-full mr-2">
                      <div 
                        className={`h-full bg-${task.color}-500 rounded-full`} 
                        style={{ width: '30%' }} 
                      />
                    </div>
                    <span className="text-sm font-medium min-w-[2ch]">{task.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity and Trends */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Recent Activity */}
        <Card className="overflow-hidden border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 p-4">
            <CardTitle className="text-lg text-white">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">No recent activities to display</p>
            </div>
          </CardContent>
        </Card>

        {/* Trend Analysis */}
        <Card className="overflow-hidden border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-amber-500 to-amber-600 p-4">
            <CardTitle className="text-lg text-white">Trend Analysis</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="h-[200px] w-full">
              {trendData && (
                <TrendChart
                  data={trendData.timelineData}
                  title=""
                />
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}