import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { FileText, Folder, Upload, Download, Search, Filter, MoreVertical, Trash2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface File {
  id: number;
  name: string;
  type: string;
  size: string;
  modified: string;
  shared: boolean;
}

export default function Files() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [files] = useState<File[]>([
    {
      id: 1,
      name: "Q1 Sales Report.pdf",
      type: "pdf",
      size: "2.4 MB",
      modified: "2025-03-04",
      shared: true
    },
    {
      id: 2,
      name: "Product Roadmap.xlsx",
      type: "excel",
      size: "1.8 MB",
      modified: "2025-03-03",
      shared: false
    },
    {
      id: 3,
      name: "Client Presentation.pptx",
      type: "powerpoint",
      size: "5.2 MB",
      modified: "2025-03-02",
      shared: true
    }
  ]);

  const handleFileAction = (action: string, file: File) => {
    const actions = {
      download: "Downloading",
      share: "Sharing",
      delete: "Deleting"
    };

    toast({
      title: `${actions[action as keyof typeof actions]} ${file.name}`,
      description: `Action started for ${file.name}`
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Files</h1>
          <p className="text-muted-foreground">Manage and organize your files</p>
        </div>
        <Button 
          className="bg-blue-600"
          onClick={() => setIsUploadOpen(true)}
        >
          <Upload className="mr-2 h-4 w-4" />
          Upload File
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-blue-500/10 border-0">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <FileText className="h-8 w-8 text-blue-500" />
              <div>
                <h3 className="text-2xl font-bold">128</h3>
                <p className="text-sm text-muted-foreground">Total Files</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-500/10 border-0">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <Folder className="h-8 w-8 text-green-500" />
              <div>
                <h3 className="text-2xl font-bold">12</h3>
                <p className="text-sm text-muted-foreground">Folders</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-500/10 border-0">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <Upload className="h-8 w-8 text-purple-500" />
              <div>
                <h3 className="text-2xl font-bold">2.4 GB</h3>
                <p className="text-sm text-muted-foreground">Storage Used</p>
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
              placeholder="Search files..."
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

      {/* Files List */}
      <Card className="border-0 bg-slate-800">
        <CardHeader>
          <CardTitle>Recent Files</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700/70 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <FileText className="h-5 w-5 text-blue-400" />
                  <div>
                    <h4 className="font-medium">{file.name}</h4>
                    <p className="text-sm text-gray-400">Modified: {file.modified}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-400">{file.size}</span>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleFileAction('download', file)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleFileAction('delete', file)}
                    >
                      <Trash2 className="h-4 w-4 text-red-400" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedFile(file);
                      }}
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upload Dialog */}
      <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Upload File</DialogTitle>
            <DialogDescription>
              Choose a file to upload to your library
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
              <Upload className="h-8 w-8 mx-auto mb-4 text-gray-400" />
              <p className="text-sm text-gray-400">
                Drag & drop files here or click to browse
              </p>
            </div>
            <Button
              className="w-full"
              onClick={() => {
                toast({
                  title: "Upload Started",
                  description: "Your file is being uploaded..."
                });
                setIsUploadOpen(false);
              }}
            >
              Upload File
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
