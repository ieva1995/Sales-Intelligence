import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  UserPlus, Search, Filter, MoreVertical, Mail, Phone, 
  Building, Star, Tags, Calendar 
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Contact {
  id: number;
  name: string;
  company: string;
  title: string;
  email: string;
  phone: string;
  tags: string[];
  status: "active" | "cold" | "warm" | "hot";
  lastContact: string;
}

export default function Contacts() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [contacts] = useState<Contact[]>([
    {
      id: 1,
      name: "John Smith",
      company: "Tech Solutions Inc",
      title: "CTO",
      email: "john@techsolutions.com",
      phone: "+1 (555) 123-4567",
      tags: ["Enterprise", "AI Interest"],
      status: "hot",
      lastContact: "2024-03-01"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      company: "Global Systems Ltd",
      title: "VP Engineering",
      email: "sarah@globalsystems.com",
      phone: "+1 (555) 987-6543",
      tags: ["Mid-Market", "Cloud Migration"],
      status: "warm",
      lastContact: "2024-02-28"
    },
    // Add more sample contacts
  ]);

  const handleContactAction = (action: string, contact: Contact) => {
    toast({
      title: `${action} - ${contact.name}`,
      description: `${action} action initiated for ${contact.name}`,
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Contacts</h1>
          <p className="text-muted-foreground">Manage your sales contacts and leads</p>
        </div>
        <Button className="bg-blue-600">
          <UserPlus className="mr-2 h-4 w-4" />
          Add Contact
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              placeholder="Search contacts..."
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
        {contacts.map((contact) => (
          <Card key={contact.id} className="hover:bg-gray-100/5 transition-colors">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{contact.name}</h3>
                    <span className={`px-2 py-1 rounded text-xs ${
                      contact.status === 'hot' ? 'bg-red-500/20 text-red-400' :
                      contact.status === 'warm' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {contact.status.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Building className="h-4 w-4" />
                      <span>{contact.company}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Star className="h-4 w-4" />
                      <span>{contact.title}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Mail className="h-4 w-4" />
                      <span>{contact.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Phone className="h-4 w-4" />
                      <span>{contact.phone}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Tags className="h-4 w-4 text-gray-400" />
                      <div className="flex gap-2">
                        {contact.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-700 rounded-full text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar className="h-4 w-4" />
                      <span>Last Contact: {contact.lastContact}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleContactAction("Email", contact)}
                  >
                    <Mail className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleContactAction("Call", contact)}
                  >
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleContactAction("More", contact)}
                  >
                    <MoreVertical className="h-4 w-4" />
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
