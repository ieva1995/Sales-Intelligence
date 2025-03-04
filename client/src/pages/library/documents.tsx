import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { 
  FileText, Search, Filter, Plus, Eye, 
  Download, Share2, Edit, Clock, Users
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Document {
  id: number;
  title: string;
  type: "contract" | "proposal" | "report" | "presentation";
  status: "draft" | "review" | "final";
  lastEdited: string;
  author: string;
  collaborators: number;
}

export default function Documents() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  
  const [documents] = useState<Document[]>([
    {
      id: 1,
      title: "Enterprise Solution Proposal",
      type: "proposal",
      status: "review",
      lastEdited: "2025-03-04",
      author: "John Smith",
      collaborators: 3
    },
    {
      id: 2,
      title: "Q1 2025 Performance Report",
      type: "report",
      status: "final",
      lastEdited: "2025-03-03",
      author: "Sarah Johnson",
      collaborators: 5
    },
    {
      id: 3,
      title: "Service Level Agreement",
      type: "contract",
      status: "draft",
      lastEdited: "2025-03-02",
      author: "Michael Brown",
      collaborators: 2
    }
  ]);

  const getStatusColor = (status: Document['status']) => {
    const colors = {
      draft: "bg-blue-500/20 text-blue-400",
      review: "bg-yellow-500/20 text-yellow-400",
      final: "bg-green-500/20 text-green-400"
    };
    return colors[status];
  };

  const handleDocAction = (action: string, doc: Document) => {
    const actions = {
      preview: "Opening preview for",
      download: "Downloading",
      share: "Sharing",
      edit: "Opening editor for"
    };

    toast({
      title: `${actions[action as keyof typeof actions]} ${doc.title}`,
      description: `Action started for ${doc.title}`
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Documents</h1>
          <p className="text-muted-foreground">Create and manage your documents</p>
        </div>
        <Button 
          className="bg-blue-600"
          onClick={() => {
            toast({
              title: "New Document",
              description: "Opening document editor..."
            });
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          New Document
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-blue-500/10 border-0">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <FileText className="h-8 w-8 text-blue-500" />
              <div>
                <h3 className="text-2xl font-bold">24</h3>
                <p className="text-sm text-muted-foreground">Total Documents</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-500/10 border-0">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <Clock className="h-8 w-8 text-green-500" />
              <div>
                <h3 className="text-2xl font-bold">8</h3>
                <p className="text-sm text-muted-foreground">Recent Edits</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-500/10 border-0">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <Users className="h-8 w-8 text-purple-500" />
              <div>
                <h3 className="text-2xl font-bold">12</h3>
                <p className="text-sm text-muted-foreground">Shared</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-yellow-500/10 border-0">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <Edit className="h-8 w-8 text-yellow-500" />
              <div>
                <h3 className="text-2xl font-bold">5</h3>
                <p className="text-sm text-muted-foreground">In Review</p>
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
              placeholder="Search documents..."
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

      {/* Documents List */}
      <Card className="border-0 bg-slate-800">
        <CardHeader>
          <CardTitle>Recent Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700/70 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <FileText className="h-5 w-5 text-blue-400" />
                  <div>
                    <h4 className="font-medium">{doc.title}</h4>
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <span>{doc.author}</span>
                      <span>•</span>
                      <span>Last edited: {doc.lastEdited}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-2 py-1 rounded text-xs ${getStatusColor(doc.status)}`}>
                    {doc.status.toUpperCase()}
                  </span>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDocAction('preview', doc)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDocAction('download', doc)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDocAction('share', doc)}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDocAction('edit', doc)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
