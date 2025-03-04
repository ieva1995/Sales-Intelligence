import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Download, Filter, PieChart, BarChart2, TrendingUp, 
  Calendar, FileText, Share2
} from "lucide-react";
import { useState } from "react";

interface Report {
  id: number;
  name: string;
  type: "sales" | "performance" | "engagement" | "forecast";
  lastGenerated: string;
  status: "ready" | "generating" | "scheduled";
}

export default function Reports() {
  const [reports] = useState<Report[]>([
    {
      id: 1,
      name: "Q1 Sales Performance",
      type: "sales",
      lastGenerated: "2024-03-04 10:30:00",
      status: "ready"
    },
    {
      id: 2,
      name: "Team Productivity Analysis",
      type: "performance",
      lastGenerated: "2024-03-04 09:15:00",
      status: "ready"
    },
    {
      id: 3,
      name: "Customer Engagement Metrics",
      type: "engagement",
      lastGenerated: "2024-03-04 08:45:00",
      status: "generating"
    },
    {
      id: 4,
      name: "Q2 Revenue Forecast",
      type: "forecast",
      lastGenerated: "2024-03-03 17:30:00",
      status: "scheduled"
    }
  ]);

  const handleGenerateReport = (name: string) => {
    console.log(`Generating report: ${name}`);
  };

  const handleDownloadReport = (name: string) => {
    console.log(`Downloading report: ${name}`);
  };

  const handleShareReport = (name: string) => {
    console.log(`Sharing report: ${name}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Reports</h1>
          <p className="text-muted-foreground">Generate and manage your sales reports</p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-blue-600">
            <FileText className="mr-2 h-4 w-4" />
            New Report
          </Button>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-blue-500/10 border-0">
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <PieChart className="h-8 w-8 text-blue-500 mb-2" />
              <h3 className="text-2xl font-bold">24</h3>
              <p className="text-sm text-muted-foreground">Reports Generated</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-500/10 border-0">
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <BarChart2 className="h-8 w-8 text-green-500 mb-2" />
              <h3 className="text-2xl font-bold">98%</h3>
              <p className="text-sm text-muted-foreground">Accuracy Rate</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-500/10 border-0">
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <TrendingUp className="h-8 w-8 text-purple-500 mb-2" />
              <h3 className="text-2xl font-bold">15</h3>
              <p className="text-sm text-muted-foreground">Active Schedules</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-amber-500/10 border-0">
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <Calendar className="h-8 w-8 text-amber-500 mb-2" />
              <h3 className="text-2xl font-bold">4.2s</h3>
              <p className="text-sm text-muted-foreground">Avg. Generation Time</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4">
        {reports.map((report) => (
          <Card key={report.id} className="hover:bg-gray-100/5 transition-colors">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{report.name}</h3>
                    <span className={`px-2 py-1 rounded text-xs ${
                      report.status === 'ready' ? 'bg-green-500/20 text-green-400' :
                      report.status === 'generating' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-amber-500/20 text-amber-400'
                    }`}>
                      {report.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar className="h-4 w-4" />
                    <span>Last Generated: {report.lastGenerated}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleGenerateReport(report.name)}
                  >
                    <FileText className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDownloadReport(report.name)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleShareReport(report.name)}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
