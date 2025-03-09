import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  BarChart2,
  Mail,
  MessageSquare,
  Calendar,
  Users,
  Target,
  TrendingUp,
  Globe,
  Search,
  Filter,
  PlusCircle
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Campaign {
  id: number;
  name: string;
  type: "email" | "social" | "event" | "ads";
  status: "active" | "draft" | "completed" | "scheduled";
  reach: number;
  engagement: number;
  conversion: number;
  startDate: string;
  endDate: string;
}

const marketingItems = [
  { label: "Campaigns", href: "/marketing/campaigns", icon: Target },
  { label: "Email", href: "/marketing/email", icon: Mail },
  { label: "Social", href: "/marketing/social", icon: Globe },
  { label: "Ads", href: "/marketing/ads", icon: TrendingUp },
  { label: "Events", href: "/marketing/events", icon: Calendar },
  { label: "Forms", href: "/marketing/forms", icon: MessageSquare },
  { label: "Buyer Intent", href: "/marketing/buyer-intent", icon: Users },
  { label: "Lead Scoring", href: "/marketing/lead-scoring", icon: BarChart2 },
];

export default function Marketing() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeDialog, setActiveDialog] = useState<string | null>(null);
  const [campaigns] = useState<Campaign[]>([
    {
      id: 1,
      name: "Q1 Product Launch",
      type: "email",
      status: "active",
      reach: 25000,
      engagement: 42,
      conversion: 3.8,
      startDate: "2025-03-01",
      endDate: "2025-03-31"
    },
    {
      id: 2,
      name: "Enterprise Webinar Series",
      type: "event",
      status: "scheduled",
      reach: 5000,
      engagement: 68,
      conversion: 12.5,
      startDate: "2025-03-15",
      endDate: "2025-04-15"
    },
    {
      id: 3,
      name: "Social Media Awareness",
      type: "social",
      status: "active",
      reach: 150000,
      engagement: 28,
      conversion: 2.1,
      startDate: "2025-03-01",
      endDate: "2025-05-31"
    }
  ]);

  const getStatusColor = (status: Campaign['status']) => {
    const colors = {
      active: "bg-green-500/20 text-green-400",
      draft: "bg-gray-500/20 text-gray-400",
      completed: "bg-blue-500/20 text-blue-400",
      scheduled: "bg-yellow-500/20 text-yellow-400"
    };
    return colors[status];
  };

  const getTypeIcon = (type: Campaign['type']) => {
    const icons = {
      email: Mail,
      social: Globe,
      event: Calendar,
      ads: Target
    };
    return icons[type];
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Marketing Hub</h1>
          <p className="text-muted-foreground">Manage your marketing campaigns and automation</p>
        </div>
        <Button 
          className="bg-blue-600"
          onClick={() => setActiveDialog("new")}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          New Campaign
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-blue-500/10 border-0">
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <Target className="h-8 w-8 text-blue-500 mb-2" />
              <h3 className="text-2xl font-bold">14</h3>
              <p className="text-sm text-muted-foreground">Active Campaigns</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-500/10 border-0">
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <Users className="h-8 w-8 text-green-500 mb-2" />
              <h3 className="text-2xl font-bold">45.2k</h3>
              <p className="text-sm text-muted-foreground">Total Reach</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-500/10 border-0">
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <MessageSquare className="h-8 w-8 text-purple-500 mb-2" />
              <h3 className="text-2xl font-bold">32%</h3>
              <p className="text-sm text-muted-foreground">Engagement Rate</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-amber-500/10 border-0">
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <TrendingUp className="h-8 w-8 text-amber-500 mb-2" />
              <h3 className="text-2xl font-bold">8.5%</h3>
              <p className="text-sm text-muted-foreground">Conversion Rate</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              placeholder="Search campaigns..."
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

      {/* Marketing Tools Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {marketingItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.label} href={item.href}>
              <a className="block">
                <Card className="border-0 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <Icon className="h-5 w-5 text-blue-400" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                  </CardContent>
                </Card>
              </a>
            </Link>
          );
        })}
      </div>

      {/* Active Campaigns */}
      <Card className="border-0 bg-slate-800">
        <CardHeader>
          <CardTitle>Active Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {campaigns.map((campaign) => {
              const TypeIcon = getTypeIcon(campaign.type);
              return (
                <div
                  key={campaign.id}
                  className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700/70 transition-colors cursor-pointer"
                  onClick={() => {
                    toast({
                      title: "Opening Campaign",
                      description: `Viewing details for ${campaign.name}`
                    });
                  }}
                >
                  <div className="flex items-center space-x-4">
                    <TypeIcon className="h-5 w-5 text-blue-400" />
                    <div>
                      <h4 className="font-medium">{campaign.name}</h4>
                      <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <span>{campaign.startDate}</span>
                        <span>-</span>
                        <span>{campaign.endDate}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm font-medium">{campaign.reach.toLocaleString()} Reach</div>
                      <div className="text-xs text-green-400">{campaign.conversion}% CVR</div>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs ${getStatusColor(campaign.status)}`}>
                      {campaign.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}