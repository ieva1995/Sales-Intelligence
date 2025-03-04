import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchTrendData } from "@/lib/trends";
import { Trend } from "@shared/schema";
import { ArrowUp, Package, Users, Mail, Phone, MessageSquare, TrendingUp } from "lucide-react";
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
    { icon: Mail, label: 'To-dos', count: 0, color: 'gray' },
    { icon: Phone, label: 'Calls', count: 0, color: 'gray' },
    { icon: MessageSquare, label: 'Emails', count: 0, color: 'gray' },
    { icon: Users, label: 'LinkedIn', count: 0, color: 'gray' }
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-8">
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Overview */}
        <Card className="lg:col-span-2 overflow-hidden border-0 shadow-lg">
          <CardHeader className="bg-blue-500 p-4">
            <CardTitle className="text-lg text-white">Performance Overview</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="h-[300px] sm:h-[240px]"> {/* Adjusted height for mobile */}
              {trendData && (
                <TrendChart
                  data={trendData.timelineData}
                  title=""
                />
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 border-t pt-4">
              {performanceMetrics.map((metric, i) => (
                <div key={i} className="text-center p-2">
                  <h3 className="text-xl sm:text-2xl font-bold">{metric.value}</h3>
                  <p className="text-sm text-gray-500 mt-1">{metric.title}</p>
                  <p className={`text-xs ${metric.change.includes('-') ? 'text-red-500' : 'text-green-500'} mt-1`}>
                    {metric.change}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Task Distribution */}
        <Card className="overflow-hidden border-0 shadow-lg">
          <CardHeader className="bg-purple-500 p-4">
            <CardTitle className="text-lg text-white">Task Distribution</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {taskTypes.map((task) => (
                <div key={task.label} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <task.icon className="h-4 w-4 text-gray-400" />
                      <span>{task.label}</span>
                    </div>
                    <span className="font-medium">{task.count}</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gray-300 rounded-full" style={{ width: '0%' }} />
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