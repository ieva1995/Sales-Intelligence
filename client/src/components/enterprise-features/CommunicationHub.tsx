import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Users, MessageSquare, Send, Plus, Bell, Calendar, Activity } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export default function CommunicationHub() {
  const { toast } = useToast();
  const [message, setMessage] = useState('');
  
  const teamMembers = [
    { id: 1, name: 'Jamie Smith', avatar: '👩‍💼', role: 'Sales Lead', online: true },
    { id: 2, name: 'Michael Chen', avatar: '👨‍💼', role: 'Account Manager', online: true },
    { id: 3, name: 'Sofia Rodriguez', avatar: '👩‍💼', role: 'Sales Rep', online: false },
    { id: 4, name: 'Alex Johnson', avatar: '👨‍💼', role: 'Sales Rep', online: true },
    { id: 5, name: 'Taylor Kim', avatar: '👩‍💼', role: 'Customer Success', online: false },
  ];
  
  const channels = [
    { id: 1, name: 'Sales Team', unread: 3 },
    { id: 2, name: 'Enterprise Deals', unread: 0 },
    { id: 3, name: 'Customer Success', unread: 1 },
    { id: 4, name: 'Product Updates', unread: 0 },
  ];
  
  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    toast({
      title: "Message Sent",
      description: "Your message has been sent to the team"
    });
    
    setMessage('');
  };
  
  return (
    <Card className="border-0 bg-slate-800/60">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-500 p-4 sm:p-6">
        <div>
          <CardTitle className="text-white text-xl sm:text-2xl flex items-center">
            <Users className="mr-2 h-5 w-5" />
            Interactive Sales Team Communication Hub
          </CardTitle>
          <CardDescription className="text-blue-100">
            Connect and collaborate with your sales team in real-time
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="chat" className="w-full">
          <TabsList className="grid grid-cols-3 bg-slate-700 rounded-none">
            <TabsTrigger value="chat" className="data-[state=active]:bg-slate-600">
              <MessageSquare className="mr-2 h-4 w-4" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="team" className="data-[state=active]:bg-slate-600">
              <Users className="mr-2 h-4 w-4" />
              Team
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-slate-600">
              <Activity className="mr-2 h-4 w-4" />
              Activity
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat" className="p-0 m-0">
            <div className="grid md:grid-cols-4 h-[600px]">
              <div className="bg-slate-700 md:col-span-1 border-r border-slate-600 p-4 overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-white">Channels</h3>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-1">
                  {channels.map(channel => (
                    <Button
                      key={channel.id}
                      variant="ghost"
                      className="w-full justify-start font-normal"
                    >
                      <span className="truncate"># {channel.name}</span>
                      {channel.unread > 0 && (
                        <span className="ml-auto bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {channel.unread}
                        </span>
                      )}
                    </Button>
                  ))}
                </div>
                
                <div className="mt-6">
                  <h3 className="font-medium text-white mb-2">Direct Messages</h3>
                  <div className="space-y-1">
                    {teamMembers.map(member => (
                      <Button
                        key={member.id}
                        variant="ghost"
                        className="w-full justify-start font-normal"
                      >
                        <span className="mr-2">{member.avatar}</span>
                        <span className="truncate">{member.name}</span>
                        <span className={`ml-auto h-2 w-2 rounded-full ${member.online ? 'bg-green-500' : 'bg-slate-500'}`} />
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col md:col-span-3">
                <div className="p-4 border-b border-slate-600">
                  <h3 className="font-medium text-white flex items-center">
                    <span># Sales Team</span>
                    <span className="ml-2 text-xs text-slate-400">(5 members)</span>
                  </h3>
                </div>
                
                <div className="flex-1 p-4 overflow-y-auto">
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                        👨‍💼
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-white">Michael Chen</span>
                          <span className="text-xs text-slate-400">10:32 AM</span>
                        </div>
                        <p className="text-slate-300">Team, I've just closed the Enterprise deal with Acme Corp! 🎉</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white">
                        👩‍💼
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-white">Jamie Smith</span>
                          <span className="text-xs text-slate-400">10:34 AM</span>
                        </div>
                        <p className="text-slate-300">Congratulations Michael! That's a huge win for the quarter!</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                        👨‍💼
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-white">Alex Johnson</span>
                          <span className="text-xs text-slate-400">10:37 AM</span>
                        </div>
                        <p className="text-slate-300">Great job Michael! Can you share some strategies that worked for you with this client?</p>
                      </div>
                    </div>

                    <div className="pt-4 text-center text-xs text-slate-500">
                      Today, {new Date().toLocaleDateString()}
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border-t border-slate-600">
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Type your message..." 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="bg-slate-700"
                    />
                    <Button onClick={handleSendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="team" className="p-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map(member => (
                <Card key={member.id} className="bg-slate-700 border-slate-600">
                  <CardContent className="p-4">
                    <div className="flex gap-3 items-start">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl">
                        {member.avatar}
                      </div>
                      <div>
                        <h3 className="font-medium text-white">{member.name}</h3>
                        <p className="text-sm text-slate-400">{member.role}</p>
                        <div className="flex items-center mt-2">
                          <span className={`h-2 w-2 rounded-full ${member.online ? 'bg-green-500' : 'bg-slate-500'}`} />
                          <span className="text-xs ml-1 text-slate-400">{member.online ? 'Online' : 'Offline'}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between">
                      <Button variant="ghost" size="sm" className="text-xs">Message</Button>
                      <Button variant="ghost" size="sm" className="text-xs">Call</Button>
                      <Button variant="ghost" size="sm" className="text-xs">Schedule</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="activity" className="p-4">
            <div className="space-y-4">
              <div className="flex gap-3 items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  <Bell className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm text-slate-300">
                    <span className="font-medium text-white">Jamie Smith</span> created a new opportunity worth $75,000
                  </p>
                  <span className="text-xs text-slate-400">Today, 11:23 AM</span>
                </div>
              </div>
              
              <div className="flex gap-3 items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                  <Calendar className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm text-slate-300">
                    <span className="font-medium text-white">Team Meeting</span> scheduled for tomorrow at 10:00 AM
                  </p>
                  <span className="text-xs text-slate-400">Today, 10:45 AM</span>
                </div>
              </div>
              
              <div className="flex gap-3 items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white">
                  <Activity className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm text-slate-300">
                    <span className="font-medium text-white">Michael Chen</span> closed a deal with Acme Corp worth $150,000
                  </p>
                  <span className="text-xs text-slate-400">Today, 10:32 AM</span>
                </div>
              </div>
              
              <div className="flex gap-3 items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white">
                  <Bell className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm text-slate-300">
                    <span className="font-medium text-white">Sofia Rodriguez</span> reached 90% of quarterly target
                  </p>
                  <span className="text-xs text-slate-400">Yesterday, 4:15 PM</span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
