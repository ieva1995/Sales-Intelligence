import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { 
  Code, Search, Filter, Plus, Copy,
  Download, Share2, Edit, Tag,
  CheckCircle, Clock
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Snippet {
  id: number;
  title: string;
  language: string;
  tags: string[];
  usageCount: number;
  lastUsed: string;
  content: string;
  author: string;
}

export default function Snippets() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSnippet, setSelectedSnippet] = useState<Snippet | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  
  const [snippets] = useState<Snippet[]>([
    {
      id: 1,
      title: "API Response Handler",
      language: "TypeScript",
      tags: ["api", "error-handling", "typescript"],
      usageCount: 128,
      lastUsed: "2025-03-04",
      content: `async function handleApiResponse(response: Response) {
  if (!response.ok) {
    throw new Error(\`API Error: \${response.status}\`);
  }
  return await response.json();
}`,
      author: "Dev Team"
    },
    {
      id: 2,
      title: "Data Validation",
      language: "JavaScript",
      tags: ["validation", "utilities"],
      usageCount: 89,
      lastUsed: "2025-03-04",
      content: `function validateData(data) {
  if (!data || typeof data !== 'object') {
    return false;
  }
  return true;
}`,
      author: "QA Team"
    },
    {
      id: 3,
      title: "Auth Middleware",
      language: "TypeScript",
      tags: ["auth", "middleware", "express"],
      usageCount: 67,
      lastUsed: "2025-03-03",
      content: `import { Request, Response, NextFunction } from 'express';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};`,
      author: "Security Team"
    }
  ]);

  const handleSnippetAction = (action: string, snippet: Snippet) => {
    const actions = {
      copy: "Copying snippet",
      download: "Downloading",
      share: "Sharing",
      edit: "Opening editor for"
    };

    if (action === 'copy') {
      navigator.clipboard.writeText(snippet.content).then(() => {
        toast({
          title: "Snippet Copied",
          description: "Code snippet has been copied to clipboard"
        });
      });
      return;
    }

    toast({
      title: `${actions[action as keyof typeof actions]} ${snippet.title}`,
      description: `Action started for ${snippet.title}`
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Code Snippets</h1>
          <p className="text-muted-foreground">Reusable code snippets and templates</p>
        </div>
        <Button 
          className="bg-blue-600"
          onClick={() => {
            toast({
              title: "Create Snippet",
              description: "Opening snippet editor..."
            });
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          New Snippet
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-blue-500/10 border-0">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <Code className="h-8 w-8 text-blue-500" />
              <div>
                <h3 className="text-2xl font-bold">156</h3>
                <p className="text-sm text-muted-foreground">Total Snippets</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-500/10 border-0">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div>
                <h3 className="text-2xl font-bold">2.4k</h3>
                <p className="text-sm text-muted-foreground">Uses This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-500/10 border-0">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <Tag className="h-8 w-8 text-purple-500" />
              <div>
                <h3 className="text-2xl font-bold">24</h3>
                <p className="text-sm text-muted-foreground">Categories</p>
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
              placeholder="Search snippets..."
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

      {/* Snippets List */}
      <Card className="border-0 bg-slate-800">
        <CardHeader>
          <CardTitle>Available Snippets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {snippets.map((snippet) => (
              <div
                key={snippet.id}
                className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700/70 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <Code className="h-5 w-5 text-blue-400" />
                  <div>
                    <h4 className="font-medium">{snippet.title}</h4>
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="text-purple-400">{snippet.language}</span>
                      <span className="text-gray-400">•</span>
                      <div className="flex gap-2">
                        {snippet.tags.map((tag) => (
                          <span key={tag} className="text-xs bg-white/10 px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right text-sm">
                    <p>{snippet.usageCount} uses</p>
                    <p className="text-gray-400">Last: {snippet.lastUsed}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSnippetAction('copy', snippet)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSnippetAction('download', snippet)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSnippetAction('share', snippet)}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSnippetAction('edit', snippet)}
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

      {/* Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedSnippet?.title}</DialogTitle>
            <DialogDescription>
              Code snippet preview and details
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-slate-900 rounded-lg">
              <pre className="text-sm overflow-x-auto">
                <code className="text-white">
                  {selectedSnippet?.content}
                </code>
              </pre>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsPreviewOpen(false)}>
                Close
              </Button>
              <Button onClick={() => {
                handleSnippetAction('copy', selectedSnippet!);
                setIsPreviewOpen(false);
              }}>
                Copy Code
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
