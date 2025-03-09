import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { 
  Book, Search, Filter, Plus, Play, 
  Download, Share2, FileText, Check,
  Clock, Users
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Playbook {
  id: number;
  title: string;
  category: string;
  status: "active" | "draft" | "archived";
  usageCount: number;
  lastUsed: string;
  completion: number;
  author: string;
}

export default function Playbooks() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlaybook, setSelectedPlaybook] = useState<Playbook | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  
  const [playbooks] = useState<Playbook[]>([
    {
      id: 1,
      title: "Enterprise Sales Process",
      category: "Sales",
      status: "active",
      usageCount: 245,
      lastUsed: "2025-03-04",
      completion: 92,
      author: "Sales Team"
    },
    {
      id: 2,
      title: "Client Onboarding",
      category: "Operations",
      status: "active",
      usageCount: 189,
      lastUsed: "2025-03-04",
      completion: 88,
      author: "Customer Success"
    },
    {
      id: 3,
      title: "Technical Discovery",
      category: "Technical",
      status: "draft",
      usageCount: 56,
      lastUsed: "2025-03-03",
      completion: 45,
      author: "Solutions Team"
    }
  ]);

  const getStatusColor = (status: Playbook['status']) => {
    const colors = {
      active: "bg-green-500/20 text-green-400",
      draft: "bg-yellow-500/20 text-yellow-400",
      archived: "bg-gray-500/20 text-gray-400"
    };
    return colors[status];
  };

  const handlePlaybookAction = (action: string, playbook: Playbook) => {
    const actions = {
      preview: "Opening preview for",
      download: "Downloading",
      share: "Sharing",
      start: "Starting"
    };

    toast({
      title: `${actions[action as keyof typeof actions]} ${playbook.title}`,
      description: `Action started for ${playbook.title}`
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Playbooks</h1>
          <p className="text-muted-foreground">Standardized processes and best practices</p>
        </div>
        <Button 
          className="bg-blue-600"
          onClick={() => {
            toast({
              title: "Create Playbook",
              description: "Opening playbook editor..."
            });
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Playbook
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-blue-500/10 border-0">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <Book className="h-8 w-8 text-blue-500" />
              <div>
                <h3 className="text-2xl font-bold">24</h3>
                <p className="text-sm text-muted-foreground">Active Playbooks</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-500/10 border-0">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <Check className="h-8 w-8 text-green-500" />
              <div>
                <h3 className="text-2xl font-bold">89%</h3>
                <p className="text-sm text-muted-foreground">Completion Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-500/10 border-0">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <Users className="h-8 w-8 text-purple-500" />
              <div>
                <h3 className="text-2xl font-bold">1.2k</h3>
                <p className="text-sm text-muted-foreground">Total Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              placeholder="Search playbooks..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Playbooks List */}
      <Card className="border-0 bg-slate-800">
        <CardHeader>
          <CardTitle>Available Playbooks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {playbooks.map((playbook) => (
              <div
                key={playbook.id}
                className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700/70 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <Book className="h-5 w-5 text-blue-400" />
                  <div>
                    <h4 className="font-medium">{playbook.title}</h4>
                    <p className="text-sm text-gray-400">{playbook.category}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right text-sm">
                    <p>{playbook.usageCount} uses</p>
                    <p className="text-gray-400">Last: {playbook.lastUsed}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs ${getStatusColor(playbook.status)}`}>
                    {playbook.status.toUpperCase()}
                  </span>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handlePlaybookAction('preview', playbook)}
                    >
                      <FileText className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handlePlaybookAction('download', playbook)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handlePlaybookAction('share', playbook)}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button
                      className="bg-blue-500"
                      size="sm"
                      onClick={() => handlePlaybookAction('start', playbook)}
                    >
                      <Play className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedPlaybook?.title}</DialogTitle>
            <DialogDescription>
              Playbook preview and details
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-white/5 rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium">{selectedPlaybook?.title}</h3>
                  <p className="text-sm text-gray-400">Category: {selectedPlaybook?.category}</p>
                </div>
                <Button size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Author: {selectedPlaybook?.author}</p>
                <p className="text-sm text-gray-400">Used {selectedPlaybook?.usageCount} times</p>
                <p className="text-sm text-gray-400">Last used: {selectedPlaybook?.lastUsed}</p>
                <p className="text-sm text-gray-400">Completion rate: {selectedPlaybook?.completion}%</p>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsPreviewOpen(false)}>
                Close
              </Button>
              <Button onClick={() => {
                handlePlaybookAction('start', selectedPlaybook!);
                setIsPreviewOpen(false);
              }}>
                Start Playbook
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
