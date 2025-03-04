import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Plus, Play, Pause, Settings, Clock, CheckCircle, 
  AlertTriangle, BarChart, ArrowRight 
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Workflow {
  id: number;
  name: string;
  description: string;
  status: "active" | "paused" | "draft";
  type: "email" | "lead" | "deal" | "task";
  metrics: {
    processed: number;
    success: number;
    failed: number;
  };
  lastRun: string;
}

export default function Workflows() {
  const { toast } = useToast();
  const [workflows] = useState<Workflow[]>([
    {
      id: 1,
      name: "Lead Nurture Sequence",
      description: "Automated email sequence for new leads",
      status: "active",
      type: "email",
      metrics: {
        processed: 1250,
        success: 1180,
        failed: 70
      },
      lastRun: "2024-03-04 09:30:00"
    },
    {
      id: 2,
      name: "Deal Follow-up",
      description: "Automated follow-up for stale deals",
      status: "active",
      type: "deal",
      metrics: {
        processed: 450,
        success: 425,
        failed: 25
      },
      lastRun: "2024-03-04 10:15:00"
    },
    // Add more sample workflows
  ]);

  const handleWorkflowAction = (action: string, workflow: Workflow) => {
    toast({
      title: `${action} - ${workflow.name}`,
      description: `${action} action completed for workflow: ${workflow.name}`,
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Workflows</h1>
          <p className="text-muted-foreground">Manage your automated sales processes</p>
        </div>
        <Button className="bg-blue-600">
          <Plus className="mr-2 h-4 w-4" />
          Create Workflow
        </Button>
      </div>

      <div className="grid gap-4">
        {workflows.map((workflow) => (
          <Card key={workflow.id} className="hover:bg-gray-100/5 transition-colors">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{workflow.name}</h3>
                    <span className={`px-2 py-1 rounded text-xs ${
                      workflow.status === 'active' ? 'bg-green-500/20 text-green-400' :
                      workflow.status === 'paused' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {workflow.status.toUpperCase()}
                    </span>
                  </div>
                  
                  <p className="text-gray-400 mb-4">{workflow.description}</p>

                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div className="p-3 bg-gray-800 rounded-lg">
                      <div className="text-sm text-gray-400">Processed</div>
                      <div className="text-xl font-semibold">{workflow.metrics.processed}</div>
                    </div>
                    <div className="p-3 bg-gray-800 rounded-lg">
                      <div className="text-sm text-gray-400">Success</div>
                      <div className="text-xl font-semibold text-green-400">
                        {workflow.metrics.success}
                      </div>
                    </div>
                    <div className="p-3 bg-gray-800 rounded-lg">
                      <div className="text-sm text-gray-400">Failed</div>
                      <div className="text-xl font-semibold text-red-400">
                        {workflow.metrics.failed}
                      </div>
                    </div>
                    <div className="p-3 bg-gray-800 rounded-lg">
                      <div className="text-sm text-gray-400">Success Rate</div>
                      <div className="text-xl font-semibold text-blue-400">
                        {Math.round((workflow.metrics.success / workflow.metrics.processed) * 100)}%
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock className="h-4 w-4" />
                    <span>Last Run: {workflow.lastRun}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {workflow.status === 'active' ? (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleWorkflowAction("Pause", workflow)}
                    >
                      <Pause className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleWorkflowAction("Start", workflow)}
                    >
                      <Play className="h-4 w-4" />
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleWorkflowAction("Configure", workflow)}
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleWorkflowAction("View Details", workflow)}
                  >
                    <ArrowRight className="h-4 w-4" />
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
