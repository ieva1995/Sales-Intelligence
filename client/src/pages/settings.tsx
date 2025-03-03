import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");

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