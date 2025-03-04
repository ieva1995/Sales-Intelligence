import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, Users, DollarSign, Target, 
  BarChart2, PieChart, LineChart, Download,
  ChevronUp, ChevronDown, Calendar
} from "lucide-react";

export default function Analytics() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Real-time sales and performance metrics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Last 30 Days
          </Button>
          <Button className="bg-blue-600">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-green-500/10 border-0">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Revenue</p>
                <h3 className="text-2xl font-bold">$84,245</h3>
                <div className="flex items-center text-green-500">
                  <ChevronUp className="h-4 w-4" />
                  <span className="text-sm">12.5%</span>
                </div>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-500/10 border-0">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Customers</p>
                <h3 className="text-2xl font-bold">2,445</h3>
                <div className="flex items-center text-blue-500">
                  <ChevronUp className="h-4 w-4" />
                  <span className="text-sm">8.2%</span>
                </div>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-500/10 border-0">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Conversion Rate</p>
                <h3 className="text-2xl font-bold">3.42%</h3>
                <div className="flex items-center text-purple-500">
                  <ChevronUp className="h-4 w-4" />
                  <span className="text-sm">2.1%</span>
                </div>
              </div>
              <Target className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-500/10 border-0">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Churn Rate</p>
                <h3 className="text-2xl font-bold">1.21%</h3>
                <div className="flex items-center text-red-500">
                  <ChevronDown className="h-4 w-4" />
                  <span className="text-sm">0.5%</span>
                </div>
              </div>
              <TrendingUp className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 bg-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LineChart className="h-5 w-5 text-blue-400" />
              Revenue Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <p className="text-muted-foreground">Revenue chart will be rendered here</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-green-400" />
              Sales Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <p className="text-muted-foreground">Distribution chart will be rendered here</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart2 className="h-5 w-5 text-purple-400" />
              Customer Acquisition
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <p className="text-muted-foreground">Acquisition chart will be rendered here</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-amber-400" />
              Conversion Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <p className="text-muted-foreground">Conversion chart will be rendered here</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
