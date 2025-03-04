import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, MessageSquare, CalendarClock, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DealPredictor() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">AI Deal Predictor</h1>
        <p className="text-muted-foreground">Predict deal success and get intelligent follow-up suggestions</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-blue-500/10 border-0">
          <CardContent className="p-4 flex items-center space-x-4">
            <PieChart className="h-8 w-8 text-blue-500" />
            <div>
              <h3 className="font-semibold text-lg">Success Rate</h3>
              <p className="text-2xl font-bold text-blue-500">76%</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-500/10 border-0">
          <CardContent className="p-4 flex items-center space-x-4">
            <MessageSquare className="h-8 w-8 text-green-500" />
            <div>
              <h3 className="font-semibold text-lg">Communication Score</h3>
              <p className="text-2xl font-bold text-green-500">8.5/10</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-500/10 border-0">
          <CardContent className="p-4 flex items-center space-x-4">
            <CalendarClock className="h-8 w-8 text-purple-500" />
            <div>
              <h3 className="font-semibold text-lg">Time to Close</h3>
              <p className="text-2xl font-bold text-purple-500">14 days</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Deal Analysis */}
      <Card className="border-0 bg-slate-800">
        <CardHeader>
          <CardTitle>Deal Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-500/10 rounded-lg">
              <h4 className="font-medium text-blue-400 mb-2">Communication Pattern Analysis</h4>
              <p className="text-sm text-gray-300">Based on email response times and engagement levels, this deal shows positive momentum. Client typically responds within 4 hours.</p>
            </div>
            
            <div className="p-4 bg-green-500/10 rounded-lg">
              <h4 className="font-medium text-green-400 mb-2">Success Indicators</h4>
              <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                <li>Multiple stakeholders engaged</li>
                <li>Technical requirements well-defined</li>
                <li>Budget discussions initiated</li>
                <li>Competitive analysis completed</li>
              </ul>
            </div>

            <div className="p-4 bg-yellow-500/10 rounded-lg">
              <h4 className="font-medium text-yellow-400 mb-2">Recommended Next Actions</h4>
              <div className="space-y-2">
                <Button className="w-full bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400">
                  Schedule Technical Demo
                </Button>
                <Button className="w-full bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400">
                  Send ROI Calculator
                </Button>
                <Button className="w-full bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400">
                  Share Case Studies
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Engagement Timeline */}
      <Card className="border-0 bg-slate-800">
        <CardHeader>
          <CardTitle>Engagement Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-slate-700/50 rounded-lg">
              <TrendingUp className="h-5 w-5 text-blue-400" />
              <div>
                <h4 className="font-medium">Initial Contact</h4>
                <p className="text-sm text-gray-400">First email response received within 30 minutes</p>
              </div>
              <span className="text-sm text-gray-400 ml-auto">2 weeks ago</span>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-slate-700/50 rounded-lg">
              <TrendingUp className="h-5 w-5 text-green-400" />
              <div>
                <h4 className="font-medium">Product Demo</h4>
                <p className="text-sm text-gray-400">45-minute demo with technical team</p>
              </div>
              <span className="text-sm text-gray-400 ml-auto">1 week ago</span>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-slate-700/50 rounded-lg">
              <TrendingUp className="h-5 w-5 text-purple-400" />
              <div>
                <h4 className="font-medium">Proposal Sent</h4>
                <p className="text-sm text-gray-400">Custom proposal based on requirements</p>
              </div>
              <span className="text-sm text-gray-400 ml-auto">2 days ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
