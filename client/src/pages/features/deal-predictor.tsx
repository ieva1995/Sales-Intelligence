import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { PieChart, MessageSquare, CalendarClock, TrendingUp, Calendar, Calculator, FileText } from "lucide-react";
import { useState } from "react";

export default function DealPredictor() {
  const [isLoading, setIsLoading] = useState({
    demo: false,
    roi: false,
    cases: false
  });

  const [activeDialog, setActiveDialog] = useState<'demo' | 'roi' | 'cases' | null>(null);

  // Demo scheduling content
  const DemoScheduler = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2 p-4 bg-blue-500/10 rounded-lg">
        <Calendar className="h-5 w-5 text-blue-400" />
        <div>
          <h4 className="font-medium text-white">Available Time Slots</h4>
          <p className="text-sm text-gray-400">Select a convenient time for your demo</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Button variant="outline" className="w-full">Tomorrow 10:00 AM</Button>
        <Button variant="outline" className="w-full">Tomorrow 2:00 PM</Button>
        <Button variant="outline" className="w-full">Wednesday 11:00 AM</Button>
        <Button variant="outline" className="w-full">Thursday 3:00 PM</Button>
      </div>
    </div>
  );

  // ROI Calculator content
  const ROICalculator = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2 p-4 bg-green-500/10 rounded-lg">
        <Calculator className="h-5 w-5 text-green-400" />
        <div>
          <h4 className="font-medium text-white">ROI Analysis</h4>
          <p className="text-sm text-gray-400">Estimated return on investment</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 p-4 bg-white/5 rounded-lg">
        <div>
          <h5 className="text-sm text-gray-400">Current Revenue</h5>
          <p className="text-xl font-bold text-white">$100,000</p>
        </div>
        <div>
          <h5 className="text-sm text-gray-400">Projected Growth</h5>
          <p className="text-xl font-bold text-green-400">+45%</p>
        </div>
        <div>
          <h5 className="text-sm text-gray-400">Time to ROI</h5>
          <p className="text-xl font-bold text-white">3 months</p>
        </div>
        <div>
          <h5 className="text-sm text-gray-400">Annual Savings</h5>
          <p className="text-xl font-bold text-green-400">$50,000</p>
        </div>
      </div>
    </div>
  );

  // Case Studies content
  const CaseStudies = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2 p-4 bg-purple-500/10 rounded-lg">
        <FileText className="h-5 w-5 text-purple-400" />
        <div>
          <h4 className="font-medium text-white">Success Stories</h4>
          <p className="text-sm text-gray-400">Real results from our clients</p>
        </div>
      </div>
      <div className="space-y-2">
        {[
          {
            company: "TechCorp Inc.",
            metric: "2.5x Revenue Growth",
            description: "Achieved 150% growth in sales pipeline within 6 months"
          },
          {
            company: "Global Solutions Ltd.",
            metric: "40% Cost Reduction",
            description: "Streamlined sales process resulting in significant cost savings"
          },
          {
            company: "Innovation Labs",
            metric: "90% Close Rate",
            description: "Dramatically improved deal closure rate with AI insights"
          }
        ].map((study, index) => (
          <div key={index} className="p-4 bg-white/5 rounded-lg">
            <h5 className="font-medium text-white">{study.company}</h5>
            <p className="text-sm text-purple-400">{study.metric}</p>
            <p className="text-sm text-gray-400">{study.description}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 mb-6">
        <div className="relative z-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">AI Deal Predictor</h1>
          <p className="text-white/80">Predict deal success and get intelligent follow-up suggestions</p>
        </div>
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]" />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
      <Card className="border-white/10 bg-white/5 backdrop-blur-xl mb-6">
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
                <Button 
                  className="w-full bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400"
                  onClick={() => setActiveDialog('demo')}
                  disabled={isLoading.demo}
                >
                  Schedule Technical Demo
                </Button>
                <Button 
                  className="w-full bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400"
                  onClick={() => setActiveDialog('roi')}
                  disabled={isLoading.roi}
                >
                  View ROI Calculator
                </Button>
                <Button 
                  className="w-full bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400"
                  onClick={() => setActiveDialog('cases')}
                  disabled={isLoading.cases}
                >
                  View Case Studies
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <Dialog open={activeDialog === 'demo'} onOpenChange={() => setActiveDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule Technical Demo</DialogTitle>
            <DialogDescription>Select a time slot for your technical demonstration</DialogDescription>
          </DialogHeader>
          <DemoScheduler />
        </DialogContent>
      </Dialog>

      <Dialog open={activeDialog === 'roi'} onOpenChange={() => setActiveDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>ROI Calculator</DialogTitle>
            <DialogDescription>Analyze potential return on investment</DialogDescription>
          </DialogHeader>
          <ROICalculator />
        </DialogContent>
      </Dialog>

      <Dialog open={activeDialog === 'cases'} onOpenChange={() => setActiveDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Case Studies</DialogTitle>
            <DialogDescription>Learn from our success stories</DialogDescription>
          </DialogHeader>
          <CaseStudies />
        </DialogContent>
      </Dialog>

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