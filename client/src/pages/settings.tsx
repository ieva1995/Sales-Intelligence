import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Layers, Cloud, Box, Server } from "lucide-react";
import SaasIntegrations from "./integrations/saas";
import PaasIntegrations from "./integrations/paas";
import IaasIntegrations from "./integrations/iaas";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [integrationsType, setIntegrationsType] = useState("saas");
  const [searchQuery, setSearchQuery] = useState("");
  const [integrationsView, setIntegrationsView] = useState<'grid' | 'list'>('grid');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences and settings</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="calling">Calling</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Profile Image</Label>
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src="/placeholder-avatar.jpg" />
                      <AvatarFallback>User</AvatarFallback>
                    </Avatar>
                    <Input type="file" className="w-[200px]" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>First name</Label>
                  <Input placeholder="Enter your first name" />
                </div>

                <div className="space-y-2">
                  <Label>Last name</Label>
                  <Input placeholder="Enter your last name" />
                </div>

                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select defaultValue="english">
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Date, time, and number format</Label>
                  <Select defaultValue="us">
                    <SelectTrigger>
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="eu">European Union</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Phone number</Label>
                  <Input type="tel" placeholder="+1 (555) 000-0000" />
                </div>

                <div className="space-y-2">
                  <Label>Default Home Page</Label>
                  <Select defaultValue="dashboard">
                    <SelectTrigger>
                      <SelectValue placeholder="Select default page" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dashboard">Dashboard</SelectItem>
                      <SelectItem value="reports">Reports</SelectItem>
                      <SelectItem value="analytics">Analytics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <Label>Email Preferences</Label>
                <p className="text-sm text-muted-foreground">
                  Configure your email notification settings
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calling">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <Label>Calling Preferences</Label>
                <p className="text-sm text-muted-foreground">
                  Configure your calling notification settings
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <Label>Calendar Preferences</Label>
                <p className="text-sm text-muted-foreground">
                  Configure your calendar notification settings
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <Label>Tasks Preferences</Label>
                <p className="text-sm text-muted-foreground">
                  Configure your tasks notification settings
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <Card className="border-0 bg-gradient-to-r from-slate-800 to-slate-900">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">Integrations Hub</h2>
                  <p className="text-slate-400">Connect your favorite services and platforms</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                    <Input
                      type="search"
                      placeholder="Search integrations..."
                      className="pl-8 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 w-[250px]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={integrationsView} onValueChange={(value: 'grid' | 'list') => setIntegrationsView(value)}>
                    <SelectTrigger className="w-[120px] bg-slate-700 border-slate-600 text-white">
                      <SelectValue placeholder="View" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="grid">Grid View</SelectItem>
                      <SelectItem value="list">List View</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                <Badge 
                  variant={integrationsType === "saas" ? "default" : "outline"} 
                  className={`cursor-pointer px-3 py-1 ${integrationsType === "saas" ? "bg-blue-600 hover:bg-blue-700" : "hover:bg-slate-700"}`}
                  onClick={() => setIntegrationsType("saas")}
                >
                  <Layers className="h-4 w-4 mr-1" /> SaaS
                </Badge>
                <Badge 
                  variant={integrationsType === "paas" ? "default" : "outline"} 
                  className={`cursor-pointer px-3 py-1 ${integrationsType === "paas" ? "bg-green-600 hover:bg-green-700" : "hover:bg-slate-700"}`}
                  onClick={() => setIntegrationsType("paas")}
                >
                  <Cloud className="h-4 w-4 mr-1" /> PaaS
                </Badge>
                <Badge 
                  variant={integrationsType === "iaas" ? "default" : "outline"} 
                  className={`cursor-pointer px-3 py-1 ${integrationsType === "iaas" ? "bg-purple-600 hover:bg-purple-700" : "hover:bg-slate-700"}`}
                  onClick={() => setIntegrationsType("iaas")}
                >
                  <Server className="h-4 w-4 mr-1" /> IaaS
                </Badge>
              </div>

              {integrationsType === "saas" && <SaasIntegrations view={integrationsView} searchQuery={searchQuery} />}
              {integrationsType === "paas" && <PaasIntegrations view={integrationsView} searchQuery={searchQuery} />}
              {integrationsType === "iaas" && <IaasIntegrations view={integrationsView} searchQuery={searchQuery} />}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <Label>Security Preferences</Label>
                <p className="text-sm text-muted-foreground">
                  Configure your security settings
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}