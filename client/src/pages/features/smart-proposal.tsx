import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Send, Clock, CheckCircle, TrendingUp, Users, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SmartProposalGenerator() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Smart Proposal Generator</h1>
        <p className="text-muted-foreground">AI-powered proposal creation based on client behavior</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-blue-500/10 border-0">
          <CardContent className="p-4 flex items-center space-x-4">
            <FileText className="h-8 w-8 text-blue-500" />
            <div>
              <h3 className="font-semibold text-lg">New Proposal</h3>
              <p className="text-sm text-muted-foreground">Create from scratch</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-500/10 border-0">
          <CardContent className="p-4 flex items-center space-x-4">
            <Send className="h-8 w-8 text-green-500" />
            <div>
              <h3 className="font-semibold text-lg">Templates</h3>
              <p className="text-sm text-muted-foreground">8 available</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-500/10 border-0">
          <CardContent className="p-4 flex items-center space-x-4">
            <Clock className="h-8 w-8 text-purple-500" />
            <div>
              <h3 className="font-semibold text-lg">Recent</h3>
              <p className="text-sm text-muted-foreground">View history</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Proposals */}
      <Card className="border-0 bg-slate-800">
        <CardHeader>
          <CardTitle>Recent Proposals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                client: "TechCorp Solutions",
                status: "Approved",
                date: "2025-03-04",
                amount: "$45,000"
              },
              {
                client: "Global Innovations",
                status: "Pending",
                date: "2025-03-03",
                amount: "$28,500"
              },
              {
                client: "DataFlow Systems",
                status: "Draft",
                date: "2025-03-02",
                amount: "$15,750"
              }
            ].map((proposal, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <FileText className="h-5 w-5 text-blue-400" />
                  <div>
                    <h4 className="font-medium">{proposal.client}</h4>
                    <p className="text-sm text-gray-400">{proposal.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-200">{proposal.amount}</span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    proposal.status === 'Approved' ? 'bg-green-500/20 text-green-400' :
                    proposal.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {proposal.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card className="border-0 bg-slate-800">
        <CardHeader>
          <CardTitle>AI Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-500/10 rounded-lg">
              <h4 className="font-medium text-blue-400 mb-2">Client Behavior Analysis</h4>
              <p className="text-sm text-gray-300">Based on recent interactions, this client shows high interest in cloud solutions and data security features.</p>
            </div>
            <div className="p-4 bg-green-500/10 rounded-lg">
              <h4 className="font-medium text-green-400 mb-2">Recommended Sections</h4>
              <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                <li>Cloud Migration Case Studies</li>
                <li>Security Compliance Documentation</li>
                <li>ROI Calculator</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}