import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchTrendData } from "@/lib/trends";
import { Trend } from "@shared/schema";
import { ArrowUp, DollarSign, Package, Users, Mail, Phone, MessageSquare, Calendar } from "lucide-react";
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const taskTypes = [
    { icon: Mail, label: 'To-dos', count: 0, color: 'blue' },
    { icon: Phone, label: 'Calls', count: 0, color: 'green' },
    { icon: MessageSquare, label: 'Emails', count: 0, color: 'purple' },
    { icon: Users, label: 'LinkedIn', count: 0, color: 'orange' }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your business overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tasks Section */}
        <Card className="overflow-hidden border-0 shadow-lg group">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardTitle className="text-xl text-white relative z-10">Your tasks</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">HIGH PRIORITY</h3>
                <div className="text-3xl font-bold text-red-500 transform transition-transform hover:scale-105">0</div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">ALL TASKS</h3>
                <div className="text-3xl font-bold text-blue-500 transform transition-transform hover:scale-105">0</div>
              </div>
              <div className="space-y-3">
                {taskTypes.map((task) => (
                  <div
                    key={task.label}
                    className={cn(
                      "flex items-center text-sm p-3 rounded-lg transition-all duration-200 cursor-pointer",
                      "hover:bg-gray-50 hover:shadow-md transform hover:-translate-y-0.5",
                      activeTask === task.label ? `bg-${task.color}-50` : ""
                    )}
                    onClick={() => setActiveTask(task.label)}
                    onMouseEnter={() => setActiveTask(task.label)}
                    onMouseLeave={() => setActiveTask(null)}
                  >
                    <task.icon 
                      className={cn(
                        "h-5 w-5 mr-3",
                        `text-${task.color}-400`,
                        activeTask === task.label ? "animate-bounce" : ""
                      )}
                    />
                    <span className="font-medium">{task.label} ({task.count})</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sequence Activities */}
        <Card className="overflow-hidden border-0 shadow-lg group">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardTitle className="text-xl text-white relative z-10">Your sequence activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 transform transition-transform hover:scale-110 hover:rotate-12">
                <Package className="h-8 w-8 text-purple-500" />
              </div>
              <p className="text-gray-600 text-center font-medium">You don't have any sequences yet.</p>
              <Button 
                variant="link" 
                className="mt-2 text-purple-500 hover:text-purple-600 transition-colors hover:underline"
              >
                Manage sequences
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Schedule Section */}
        <Card className="overflow-hidden border-0 shadow-lg group">
          <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardTitle className="text-xl text-white relative z-10">Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 transform transition-transform hover:scale-110 hover:rotate-12">
                <Calendar className="h-8 w-8 text-green-500" />
              </div>
              <p className="text-gray-600 text-center font-medium">Connect your calendar to get ready for your next meeting</p>
              <Button 
                className="mt-4 bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105"
              >
                Connect your calendar in settings
              </Button>
            </div>
          </CardContent>
        </Card>

        {trendData && (
          <Card className="overflow-hidden border-0 shadow-lg group">
            <CardHeader className="bg-gradient-to-r from-amber-500 to-amber-600 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardTitle className="text-xl text-white relative z-10">Trend Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <TrendChart
                data={trendData.timelineData}
                title=""
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}