import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Calendar, Clock, Users, Video, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Meeting {
  id: number;
  title: string;
  type: "demo" | "review" | "training" | "consultation";
  date: string;
  time: string;
  duration: string;
  attendees: number;
  status: "scheduled" | "completed" | "cancelled";
}

export default function Meetings() {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isNewMeetingOpen, setIsNewMeetingOpen] = useState(false);
  
  const [meetings] = useState<Meeting[]>([
    {
      id: 1,
      title: "Product Demo - Enterprise",
      type: "demo",
      date: "2025-03-05",
      time: "10:00 AM",
      duration: "1 hour",
      attendees: 5,
      status: "scheduled"
    },
    {
      id: 2,
      title: "Q1 Review Meeting",
      type: "review",
      date: "2025-03-05",
      time: "2:00 PM",
      duration: "45 mins",
      attendees: 8,
      status: "scheduled"
    },
    {
      id: 3,
      title: "Sales Training Session",
      type: "training",
      date: "2025-03-06",
      time: "11:00 AM",
      duration: "2 hours",
      attendees: 12,
      status: "scheduled"
    }
  ]);

  const getStatusColor = (status: Meeting['status']) => {
    const colors = {
      scheduled: "bg-green-500/20 text-green-400",
      completed: "bg-blue-500/20 text-blue-400",
      cancelled: "bg-red-500/20 text-red-400"
    };
    return colors[status];
  };

  const handleScheduleMeeting = () => {
    toast({
      title: "Meeting Scheduled",
      description: "New meeting has been added to your calendar"
    });
    setIsNewMeetingOpen(false);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Meetings Scheduler</h1>
          <p className="text-muted-foreground">Schedule and manage your meetings</p>
        </div>
        <Button 
          className="bg-blue-600"
          onClick={() => setIsNewMeetingOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          New Meeting
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-blue-500/10 border-0">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <Calendar className="h-8 w-8 text-blue-500" />
              <div>
                <h3 className="text-2xl font-bold">8</h3>
                <p className="text-sm text-muted-foreground">Today's Meetings</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-500/10 border-0">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <Clock className="h-8 w-8 text-green-500" />
              <div>
                <h3 className="text-2xl font-bold">12h</h3>
                <p className="text-sm text-muted-foreground">Meeting Hours</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-500/10 border-0">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <Users className="h-8 w-8 text-purple-500" />
              <div>
                <h3 className="text-2xl font-bold">45</h3>
                <p className="text-sm text-muted-foreground">Total Attendees</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Calendar Navigation */}
      <Card className="border-0 bg-slate-800">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Schedule</CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm">March 2025</span>
              <Button variant="outline" size="sm">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {meetings.map((meeting) => (
              <div
                key={meeting.id}
                className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700/70 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <Video className="h-5 w-5 text-blue-400" />
                  <div>
                    <h4 className="font-medium">{meeting.title}</h4>
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <span>{meeting.date}</span>
                      <span>•</span>
                      <span>{meeting.time}</span>
                      <span>•</span>
                      <span>{meeting.duration}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right text-sm">
                    <Users className="h-4 w-4 inline mr-1" />
                    <span>{meeting.attendees}</span>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs ${getStatusColor(meeting.status)}`}>
                    {meeting.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* New Meeting Dialog */}
      <Dialog open={isNewMeetingOpen} onOpenChange={setIsNewMeetingOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Schedule New Meeting</DialogTitle>
            <DialogDescription>
              Create a new meeting and invite attendees
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                Select Date
              </Button>
              <Button variant="outline" className="justify-start">
                <Clock className="mr-2 h-4 w-4" />
                Select Time
              </Button>
            </div>
            <Button
              className="w-full"
              onClick={handleScheduleMeeting}
            >
              Schedule Meeting
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
