import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { FileText, Send, Clock, CheckCircle, TrendingUp, Users, MessageSquare, Plus } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Proposal {
  id: number;
  client: string;
  status: "draft" | "review" | "sent" | "approved" | "declined";
  type: "service" | "product" | "solution";
  amount: string;
  date: string;
  aiScore: number;
}

export default function SmartProposalGenerator() {
  const { toast } = useToast();
  const [activeDialog, setActiveDialog] = useState<string | null>(null);
  const [proposals] = useState<Proposal[]>([
    {
      id: 1,
      client: "TechCorp Solutions",
      status: "approved",
      type: "service",
      amount: "$45,000",
      date: "2025-03-04",
      aiScore: 92
    },
    {
      id: 2,
      client: "Global Innovations",
      status: "review",
      type: "solution",
      amount: "$28,500",
      date: "2025-03-03",
      aiScore: 88
    },
    {
      id: 3,
      client: "DataFlow Systems",
      status: "draft",
      type: "product",
      amount: "$15,750",
      date: "2025-03-02",
      aiScore: 85
    }
  ]);

  const getStatusColor = (status: Proposal['status']) => {
    const colors = {
      draft: "bg-blue-500/20 text-blue-400",
      review: "bg-yellow-500/20 text-yellow-400",
      sent: "bg-purple-500/20 text-purple-400",
      approved: "bg-green-500/20 text-green-400",
      declined: "bg-red-500/20 text-red-400"
    };
    return colors[status];
  };

  const AIInsights = () => (
    <div className="space-y-4">
      <div className="p-4 bg-blue-500/10 rounded-lg">
        <h4 className="font-medium text-blue-400 mb-2">Client Behavior Analysis</h4>
        <p className="text-sm text-gray-300">
          Based on recent interactions, this client shows high interest in cloud solutions and data security features.
        </p>
      </div>
      <div className="p-4 bg-green-500/10 rounded-lg">
        <h4 className="font-medium text-green-400 mb-2">Recommended Sections</h4>
        <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
          <li>Cloud Migration Case Studies</li>
          <li>Security Compliance Documentation</li>
          <li>ROI Calculator</li>
          <li>Implementation Timeline</li>
        </ul>
      </div>
      <div className="p-4 bg-purple-500/10 rounded-lg">
        <h4 className="font-medium text-purple-400 mb-2">Success Metrics</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-400">Similar Deals</p>
            <p className="text-xl font-bold text-white">82%</p>
            <p className="text-xs text-gray-400">Close Rate</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Expected ROI</p>
            <p className="text-xl font-bold text-green-400">3.5x</p>
            <p className="text-xs text-gray-400">Client Investment</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Smart Proposal Generator</h1>
          <p className="text-muted-foreground">AI-powered proposal creation based on client behavior</p>
        </div>
        <Button 
          className="bg-blue-600"
          onClick={() => setActiveDialog("new")}
        >
          <Plus className="mr-2 h-4 w-4" />
          New Proposal
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card 
          className="bg-blue-500/10 border-0 cursor-pointer hover:bg-blue-500/20 transition-colors"
          onClick={() => setActiveDialog("templates")}
        >
          <CardContent className="p-4 flex items-center space-x-4">
            <FileText className="h-8 w-8 text-blue-500" />
            <div>
              <h3 className="font-semibold text-lg">Templates</h3>
              <p className="text-sm text-muted-foreground">8 available</p>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="bg-green-500/10 border-0 cursor-pointer hover:bg-green-500/20 transition-colors"
          onClick={() => setActiveDialog("insights")}
        >
          <CardContent className="p-4 flex items-center space-x-4">
            <TrendingUp className="h-8 w-8 text-green-500" />
            <div>
              <h3 className="font-semibold text-lg">AI Insights</h3>
              <p className="text-sm text-muted-foreground">View Analysis</p>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="bg-purple-500/10 border-0 cursor-pointer hover:bg-purple-500/20 transition-colors"
          onClick={() => setActiveDialog("recent")}
        >
          <CardContent className="p-4 flex items-center space-x-4">
            <Clock className="h-8 w-8 text-purple-500" />
            <div>
              <h3 className="font-semibold text-lg">Recent</h3>
              <p className="text-sm text-muted-foreground">View History</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Proposals List */}
      <Card className="border-0 bg-slate-800">
        <CardHeader>
          <CardTitle>Recent Proposals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {proposals.map((proposal) => (
              <div key={proposal.id} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700/70 transition-colors cursor-pointer">
                <div className="flex items-center space-x-4">
                  <FileText className="h-5 w-5 text-blue-400" />
                  <div>
                    <h4 className="font-medium">{proposal.client}</h4>
                    <p className="text-sm text-gray-400">{proposal.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <span className="text-sm font-medium text-gray-200">{proposal.amount}</span>
                    <div className="text-xs text-green-400">AI Score: {proposal.aiScore}%</div>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(proposal.status)}`}>
                    {proposal.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Insights Dialog */}
      <Dialog open={activeDialog === "insights"} onOpenChange={() => setActiveDialog(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>AI-Powered Insights</DialogTitle>
            <DialogDescription>
              Smart analysis and recommendations for your proposal
            </DialogDescription>
          </DialogHeader>
          <AIInsights />
        </DialogContent>
      </Dialog>
    </div>
  );
}