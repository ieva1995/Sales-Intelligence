import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, Users, DollarSign, Target, 
  BarChart2, PieChart, LineChart, Download,
  ChevronUp, ChevronDown, Calendar
} from "lucide-react";

export default function Analytics() {
  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Analytics Dashboard</h1>
          <p className="text-sm text-muted-foreground">Real-time sales and performance metrics</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="text-xs sm:text-sm w-1/2 sm:w-auto justify-center">
            <Calendar className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            <span>Last 30 Days</span>
          </Button>
          <Button className="bg-blue-600 text-xs sm:text-sm w-1/2 sm:w-auto justify-center">
            <Download className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            <span>Export Data</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="bg-green-500/10 border-0">
          <CardContent className="p-3 sm:p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Revenue</p>
                <h3 className="text-xl sm:text-2xl font-bold">$84,245</h3>
                <div className="flex items-center text-green-500">
                  <ChevronUp className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="text-xs sm:text-sm">12.5%</span>
                </div>
              </div>
              <DollarSign className="h-6 w-6 sm:h-8 sm:w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-500/10 border-0">
          <CardContent className="p-3 sm:p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Customers</p>
                <h3 className="text-xl sm:text-2xl font-bold">2,445</h3>
                <div className="flex items-center text-blue-500">
                  <ChevronUp className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="text-xs sm:text-sm">8.2%</span>
                </div>
              </div>
              <Users className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-500/10 border-0">
          <CardContent className="p-3 sm:p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Conversion Rate</p>
                <h3 className="text-xl sm:text-2xl font-bold">3.42%</h3>
                <div className="flex items-center text-purple-500">
                  <ChevronUp className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="text-xs sm:text-sm">2.1%</span>
                </div>
              </div>
              <Target className="h-6 w-6 sm:h-8 sm:w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-500/10 border-0">
          <CardContent className="p-3 sm:p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Churn Rate</p>
                <h3 className="text-xl sm:text-2xl font-bold">1.21%</h3>
                <div className="flex items-center text-red-500">
                  <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="text-xs sm:text-sm">0.5%</span>
                </div>
              </div>
              <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card className="border-0 bg-slate-800">
          <CardHeader className="p-3 sm:p-4">
            <CardTitle className="flex items-center gap-1 sm:gap-2 text-base sm:text-lg">
              <LineChart className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
              Revenue Trends
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 pt-0 sm:pt-0">
            <div className="h-[250px] sm:h-[300px] flex items-center justify-center">
              <p className="text-xs sm:text-sm text-muted-foreground">Revenue chart will be rendered here</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-slate-800">
          <CardHeader className="p-3 sm:p-4">
            <CardTitle className="flex items-center gap-1 sm:gap-2 text-base sm:text-lg">
              <PieChart className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
              Sales Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 pt-0 sm:pt-0">
            <div className="h-[250px] sm:h-[300px] flex items-center justify-center">
              <p className="text-xs sm:text-sm text-muted-foreground">Distribution chart will be rendered here</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-slate-800">
          <CardHeader className="p-3 sm:p-4">
            <CardTitle className="flex items-center gap-1 sm:gap-2 text-base sm:text-lg">
              <BarChart2 className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400" />
              Customer Acquisition
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 pt-0 sm:pt-0">
            <div className="h-[250px] sm:h-[300px] flex items-center justify-center">
              <p className="text-xs sm:text-sm text-muted-foreground">Acquisition chart will be rendered here</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-slate-800">
          <CardHeader className="p-3 sm:p-4">
            <CardTitle className="flex items-center gap-1 sm:gap-2 text-base sm:text-lg">
              <Target className="h-4 w-4 sm:h-5 sm:w-5 text-amber-400" />
              Conversion Analytics
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 pt-0 sm:pt-0">
            <div className="h-[250px] sm:h-[300px] flex items-center justify-center">
              <p className="text-xs sm:text-sm text-muted-foreground">Conversion chart will be rendered here</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}