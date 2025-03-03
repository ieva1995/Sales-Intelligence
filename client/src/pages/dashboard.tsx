import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchTrendData } from "@/lib/trends";
import { Trend } from "@shared/schema";
import { ArrowUp, DollarSign, Package, Users, Mail, Phone, MessageSquare, Calendar } from "lucide-react";
import TrendChart from "@/components/TrendChart";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your business overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tasks Section */}
        <Card className="overflow-hidden border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600">
            <CardTitle className="text-xl text-white">Your tasks</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">HIGH PRIORITY</h3>
                <div className="text-3xl font-bold text-red-500">0</div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">ALL TASKS</h3>
                <div className="text-3xl font-bold text-blue-500">0</div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center text-sm p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <Mail className="h-5 w-5 mr-3 text-blue-400" />
                  <span className="font-medium">To-dos (0)</span>
                </div>
                <div className="flex items-center text-sm p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <Phone className="h-5 w-5 mr-3 text-green-400" />
                  <span className="font-medium">Calls (0)</span>
                </div>
                <div className="flex items-center text-sm p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <MessageSquare className="h-5 w-5 mr-3 text-purple-400" />
                  <span className="font-medium">Emails (0)</span>
                </div>
                <div className="flex items-center text-sm p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <Users className="h-5 w-5 mr-3 text-orange-400" />
                  <span className="font-medium">LinkedIn (0)</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sequence Activities */}
        <Card className="overflow-hidden border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600">
            <CardTitle className="text-xl text-white">Your sequence activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Package className="h-8 w-8 text-purple-500" />
              </div>
              <p className="text-gray-600 text-center font-medium">You don't have any sequences yet.</p>
              <Button variant="link" className="mt-2 text-purple-500 hover:text-purple-600">
                Manage sequences
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Schedule Section */}
        <Card className="overflow-hidden border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-500 to-green-600">
            <CardTitle className="text-xl text-white">Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Calendar className="h-8 w-8 text-green-500" />
              </div>
              <p className="text-gray-600 text-center font-medium">Connect your calendar to get ready for your next meeting</p>
              <Button className="mt-4 bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 transition-all">
                Connect your calendar in settings
              </Button>
            </div>
          </CardContent>
        </Card>

        {trendData && (
          <Card className="overflow-hidden border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-amber-500 to-amber-600">
              <CardTitle className="text-xl text-white">Trend Overview</CardTitle>
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