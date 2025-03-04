import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { 
  Users, Search, Filter, Phone, Mail, Calendar, 
  MessageSquare, Clock, CheckCircle, AlertTriangle,
  BarChart2, DollarSign, Target, Plus, ArrowRight
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Lead {
  id: number;
  name: string;
  company: string;
  status: "new" | "contacted" | "qualified" | "proposal" | "negotiation" | "closed";
  value: number;
  lastContact: string;
  nextAction: string;
  probability: number;
  email?: string;
  phone?: string;
  notes?: string;
}

export default function CRM() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isLeadDialogOpen, setIsLeadDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);

  const [leads] = useState<Lead[]>([
    {
      id: 1,
      name: "John Smith",
      company: "Tech Solutions Inc",
      status: "qualified",
      value: 75000,
      lastContact: "2024-03-03",
      nextAction: "Follow-up call",
      probability: 75,
      email: "john@techsolutions.com",
      phone: "+1 (555) 123-4567",
      notes: "Interested in cloud migration solutions. Budget approved."
    },
    {
      id: 2,
      name: "Sarah Wilson",
      company: "Global Systems Ltd",
      status: "proposal",
      value: 120000,
      lastContact: "2024-03-04",
      nextAction: "Send proposal",
      probability: 60,
      email: "sarah@globalsystems.com",
      phone: "+1 (555) 987-6543",
      notes: "Needs comprehensive security assessment."
    },
    {
      id: 3,
      name: "Michael Brown",
      company: "Innovation Corp",
      status: "negotiation",
      value: 250000,
      lastContact: "2024-03-04",
      nextAction: "Contract review",
      probability: 90,
      email: "michael@innovationcorp.com",
      phone: "+1 (555) 456-7890",
      notes: "Final stages of contract negotiation."
    }
  ]);

  const getStatusColor = (status: Lead['status']) => {
    const colors = {
      new: "bg-blue-500/20 text-blue-400",
      contacted: "bg-yellow-500/20 text-yellow-400",
      qualified: "bg-purple-500/20 text-purple-400",
      proposal: "bg-green-500/20 text-green-400",
      negotiation: "bg-amber-500/20 text-amber-400",
      closed: "bg-gray-500/20 text-gray-400"
    };
    return colors[status];
  };

  const handleAction = (type: string, lead: Lead) => {
    const actions = {
      call: "Initiating call to",
      email: "Composing email for",
      message: "Opening chat with"
    };

    toast({
      title: `${actions[type as keyof typeof actions]} ${lead.name}`,
      description: `Action started for ${lead.company}`
    });
  };

  const LeadDetailsDialog = () => {
    if (!selectedLead) return null;

    return (
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Lead Details</DialogTitle>
            <DialogDescription>
              Comprehensive information about {selectedLead.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-white/5 rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{selectedLead.name}</h3>
                  <p className="text-gray-400">{selectedLead.company}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs ${getStatusColor(selectedLead.status)}`}>
                  {selectedLead.status.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-white">{selectedLead.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Phone</p>
                  <p className="text-white">{selectedLead.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Deal Value</p>
                  <p className="text-green-400">${selectedLead.value.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Probability</p>
                  <p className="text-blue-400">{selectedLead.probability}%</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-gray-400">Next Action</p>
                <p className="text-white">{selectedLead.nextAction}</p>
                <p className="text-sm text-gray-400 mt-4">Notes</p>
                <p className="text-white">{selectedLead.notes}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400"
                onClick={() => handleAction('call', selectedLead)}
              >
                <Phone className="h-4 w-4 mr-2" />
                Call
              </Button>
              <Button
                className="flex-1 bg-green-500/20 hover:bg-green-500/30 text-green-400"
                onClick={() => handleAction('email', selectedLead)}
              >
                <Mail className="h-4 w-4 mr-2" />
                Email
              </Button>
              <Button
                className="flex-1 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400"
                onClick={() => handleAction('message', selectedLead)}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Message
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">CRM Dashboard</h1>
          <p className="text-muted-foreground">Manage your leads and opportunities</p>
        </div>
        <Button 
          className="bg-blue-600"
          onClick={() => setIsLeadDialogOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Lead
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-blue-500/10 border-0">
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <Target className="h-8 w-8 text-blue-500 mb-2" />
              <h3 className="text-2xl font-bold">54</h3>
              <p className="text-sm text-muted-foreground">Active Leads</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-500/10 border-0">
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <DollarSign className="h-8 w-8 text-green-500 mb-2" />
              <h3 className="text-2xl font-bold">$1.2M</h3>
              <p className="text-sm text-muted-foreground">Pipeline Value</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-500/10 border-0">
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <CheckCircle className="h-8 w-8 text-purple-500 mb-2" />
              <h3 className="text-2xl font-bold">28</h3>
              <p className="text-sm text-muted-foreground">Won Deals</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-amber-500/10 border-0">
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <BarChart2 className="h-8 w-8 text-amber-500 mb-2" />
              <h3 className="text-2xl font-bold">67%</h3>
              <p className="text-sm text-muted-foreground">Win Rate</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              placeholder="Search leads..."
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

      <div className="grid gap-4">
        {leads.map((lead) => (
          <Card key={lead.id} className="hover:bg-gray-100/5 transition-colors">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{lead.name}</h3>
                    <span className={`px-2 py-1 rounded text-xs ${getStatusColor(lead.status)}`}>
                      {lead.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Users className="h-4 w-4" />
                      <span>{lead.company}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <DollarSign className="h-4 w-4" />
                      <span>${lead.value.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Clock className="h-4 w-4" />
                      <span>Last Contact: {lead.lastContact}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Target className="h-4 w-4" />
                      <span>Probability: {lead.probability}%</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar className="h-4 w-4" />
                    <span>Next Action: {lead.nextAction}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleAction('call', lead)}
                  >
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleAction('email', lead)}
                  >
                    <Mail className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleAction('message', lead)}
                  >
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedLead(lead);
                      setIsDetailsDialogOpen(true);
                    }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <LeadDetailsDialog />
    </div>
  );
}