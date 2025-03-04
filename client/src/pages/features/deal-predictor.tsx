import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, MessageSquare, CalendarClock, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DealPredictor() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-4 sm:p-6">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-8">
        <div className="relative z-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">AI Deal Predictor</h1>
          <p className="text-white/80">Predict deal success and get intelligent follow-up suggestions</p>
        </div>
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]" />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="bg-blue-500/10 border-white/10">
          <CardContent className="p-4 flex items-center space-x-4">
            <PieChart className="h-8 w-8 text-blue-500" />
            <div>
              <h3 className="font-semibold text-lg text-white">Success Rate</h3>
              <p className="text-2xl font-bold text-blue-500">76%</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-500/10 border-white/10">
          <CardContent className="p-4 flex items-center space-x-4">
            <MessageSquare className="h-8 w-8 text-green-500" />
            <div>
              <h3 className="font-semibold text-lg text-white">Communication Score</h3>
              <p className="text-2xl font-bold text-green-500">8.5/10</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-500/10 border-white/10">
          <CardContent className="p-4 flex items-center space-x-4">
            <CalendarClock className="h-8 w-8 text-purple-500" />
            <div>
              <h3 className="font-semibold text-lg text-white">Time to Close</h3>
              <p className="text-2xl font-bold text-purple-500">14 days</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Deal Analysis */}
      <Card className="border-white/10 bg-white/5 backdrop-blur-xl mb-8">
        <CardHeader>
          <CardTitle className="text-white">Deal Analysis</CardTitle>
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
      <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white">Engagement Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg">
              <TrendingUp className="h-5 w-5 text-blue-400" />
              <div>
                <h4 className="font-medium text-white">Initial Contact</h4>
                <p className="text-sm text-gray-400">First email response received within 30 minutes</p>
              </div>
              <span className="text-sm text-gray-400 ml-auto">2 weeks ago</span>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg">
              <TrendingUp className="h-5 w-5 text-green-400" />
              <div>
                <h4 className="font-medium text-white">Product Demo</h4>
                <p className="text-sm text-gray-400">45-minute demo with technical team</p>
              </div>
              <span className="text-sm text-gray-400 ml-auto">1 week ago</span>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg">
              <TrendingUp className="h-5 w-5 text-purple-400" />
              <div>
                <h4 className="font-medium text-white">Proposal Sent</h4>
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