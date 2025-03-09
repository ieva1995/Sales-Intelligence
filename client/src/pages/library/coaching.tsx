import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { 
  BookOpen, Search, Filter, Plus, Play,
  Download, Share2, Clock, Users, CheckCircle,
  Book, ArrowRight, Pause
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Playlist {
  id: number;
  title: string;
  category: string;
  duration: string;
  progress: number;
  enrolled: number;
  status: "in_progress" | "completed" | "not_started";
  lastAccessed: string;
}

export default function Coaching() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const [playlists] = useState<Playlist[]>([
    {
      id: 1,
      title: "Enterprise Sales Mastery",
      category: "Sales",
      duration: "4h 30m",
      progress: 75,
      enrolled: 128,
      status: "in_progress",
      lastAccessed: "2025-03-04"
    },
    {
      id: 2,
      title: "Technical Discovery Skills",
      category: "Technical",
      duration: "3h 15m",
      progress: 100,
      enrolled: 92,
      status: "completed",
      lastAccessed: "2025-03-03"
    },
    {
      id: 3,
      title: "Negotiation Techniques",
      category: "Business",
      duration: "2h 45m",
      progress: 0,
      enrolled: 64,
      status: "not_started",
      lastAccessed: "2025-03-02"
    }
  ]);

  const getStatusColor = (status: Playlist['status']) => {
    const colors = {
      in_progress: "bg-blue-500/20 text-blue-400",
      completed: "bg-green-500/20 text-green-400",
      not_started: "bg-gray-500/20 text-gray-400"
    };
    return colors[status];
  };

  const handlePlaylistAction = (action: string, playlist: Playlist) => {
    const actions = {
      play: "Starting playlist",
      share: "Sharing playlist",
      download: "Downloading content"
    };

    toast({
      title: `${actions[action as keyof typeof actions]}: ${playlist.title}`,
      description: `Action initiated for ${playlist.title}`
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Coaching Playlists</h1>
          <p className="text-muted-foreground">Access curated learning pathways</p>
        </div>
        <Button 
          className="bg-blue-600"
          onClick={() => {
            toast({
              title: "Create Playlist",
              description: "Opening playlist creator..."
            });
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Playlist
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-blue-500/10 border-0">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <Book className="h-8 w-8 text-blue-500" />
              <div>
                <h3 className="text-2xl font-bold">12</h3>
                <p className="text-sm text-muted-foreground">Active Playlists</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-500/10 border-0">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div>
                <h3 className="text-2xl font-bold">85%</h3>
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
                <h3 className="text-2xl font-bold">450</h3>
                <p className="text-sm text-muted-foreground">Total Learners</p>
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
              placeholder="Search playlists..."
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

      {/* Playlists Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {playlists.map((playlist) => (
          <Card 
            key={playlist.id} 
            className="bg-slate-800 border-0 cursor-pointer hover:bg-slate-700/70 transition-colors"
            onClick={() => {
              setSelectedPlaylist(playlist);
              setIsPreviewOpen(true);
            }}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <BookOpen className="h-8 w-8 text-blue-400" />
                <span className={`px-2 py-1 rounded text-xs ${getStatusColor(playlist.status)}`}>
                  {playlist.status.split('_').join(' ').toUpperCase()}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold mb-2">{playlist.title}</h3>
              <p className="text-sm text-gray-400 mb-4">{playlist.category}</p>

              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Duration:</span>
                  <span>{playlist.duration}</span>
                </div>

                <div className="w-full h-2 bg-slate-600 rounded-full">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${playlist.progress}%` }}
                  />
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Progress:</span>
                  <span>{playlist.progress}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedPlaylist?.title}</DialogTitle>
            <DialogDescription>
              Playlist details and content
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-white/5 rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium">{selectedPlaylist?.title}</h3>
                  <p className="text-sm text-gray-400">Category: {selectedPlaylist?.category}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs ${selectedPlaylist && getStatusColor(selectedPlaylist.status)}`}>
                  {selectedPlaylist?.status.split('_').join(' ').toUpperCase()}
                </span>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Duration: {selectedPlaylist?.duration}</p>
                <p className="text-sm text-gray-400">Enrolled: {selectedPlaylist?.enrolled} learners</p>
                <p className="text-sm text-gray-400">Last accessed: {selectedPlaylist?.lastAccessed}</p>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsPreviewOpen(false)}>
                Close
              </Button>
              <Button
                className="bg-blue-600"
                onClick={() => {
                  handlePlaylistAction('play', selectedPlaylist!);
                  setIsPreviewOpen(false);
                }}
              >
                {selectedPlaylist?.status === 'in_progress' ? (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Continue
                  </>
                ) : selectedPlaylist?.status === 'completed' ? (
                  <>
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Review
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Start
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
