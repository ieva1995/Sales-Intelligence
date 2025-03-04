import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { FileText, Plus, Search, Filter, BookOpen, Download, Share2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Template {
  id: number;
  name: string;
  category: string;
  type: "proposal" | "email" | "presentation" | "report";
  uses: number;
  lastUsed: string;
  author: string;
}

export default function Templates() {
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  
  const [templates] = useState<Template[]>([
    {
      id: 1,
      name: "Enterprise Solution Proposal",
      category: "Sales",
      type: "proposal",
      uses: 245,
      lastUsed: "2025-03-04",
      author: "Sales Team"
    },
    {
      id: 2,
      name: "Follow-up Email Sequence",
      category: "Email",
      type: "email",
      uses: 1205,
      lastUsed: "2025-03-04",
      author: "Marketing Team"
    },
    {
      id: 3,
      name: "Quarterly Business Review",
      category: "Reports",
      type: "presentation",
      uses: 89,
      lastUsed: "2025-03-03",
      author: "Account Management"
    }
  ]);

  const handleUseTemplate = (template: Template) => {
    toast({
      title: "Template Selected",
      description: `Using template: ${template.name}`
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Templates Library</h1>
          <p className="text-muted-foreground">Access and manage your document templates</p>
        </div>
        <Button className="bg-blue-600">
          <Plus className="mr-2 h-4 w-4" />
          Create Template
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-blue-500/10 border-0">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <FileText className="h-8 w-8 text-blue-500" />
              <div>
                <h3 className="font-semibold text-lg">All Templates</h3>
                <p className="text-sm text-muted-foreground">Browse the full library</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-500/10 border-0">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <BookOpen className="h-8 w-8 text-green-500" />
              <div>
                <h3 className="font-semibold text-lg">Recent</h3>
                <p className="text-sm text-muted-foreground">Recently used templates</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-500/10 border-0">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <Share2 className="h-8 w-8 text-purple-500" />
              <div>
                <h3 className="font-semibold text-lg">Shared</h3>
                <p className="text-sm text-muted-foreground">Shared with me</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Templates List */}
      <Card className="border-0 bg-slate-800">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Available Templates</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {templates.map((template) => (
              <div 
                key={template.id}
                className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700/70 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <FileText className="h-5 w-5 text-blue-400" />
                  <div>
                    <h4 className="font-medium">{template.name}</h4>
                    <p className="text-sm text-gray-400">{template.category}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right text-sm">
                    <p>{template.uses} uses</p>
                    <p className="text-gray-400">Last: {template.lastUsed}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setSelectedTemplate(template);
                        setIsPreviewOpen(true);
                      }}
                    >
                      Preview
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => handleUseTemplate(template)}
                    >
                      Use
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
            <DialogTitle>{selectedTemplate?.name}</DialogTitle>
            <DialogDescription>
              Template preview and details
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-white/5 rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium">{selectedTemplate?.name}</h3>
                  <p className="text-sm text-gray-400">Category: {selectedTemplate?.category}</p>
                </div>
                <Button size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Author: {selectedTemplate?.author}</p>
                <p className="text-sm text-gray-400">Used {selectedTemplate?.uses} times</p>
                <p className="text-sm text-gray-400">Last used: {selectedTemplate?.lastUsed}</p>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsPreviewOpen(false)}>
                Close
              </Button>
              <Button onClick={() => {
                handleUseTemplate(selectedTemplate!);
                setIsPreviewOpen(false);
              }}>
                Use Template
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
