import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { SiGmail, SiGooglecalendar, SiZoom, SiSlack, SiFacebook, SiGooglemeet, SiMailchimp } from "react-icons/si";

const tools = [
  { icon: SiGmail, name: "Gmail" },
  { icon: SiGooglecalendar, name: "Google Calendar" },
  { icon: SiZoom, name: "Zoom" },
  { icon: SiSlack, name: "Slack" },
  { icon: SiFacebook, name: "Meta Ads" },
  { icon: SiGooglemeet, name: "Google Meet" },
  { icon: SiMailchimp, name: "Mailchimp" },
];

export default function Marketing() {
  const [selectedTools, setSelectedTools] = useState<string[]>([]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Marketing Automation</h1>
        <p className="text-muted-foreground">Connect your marketing tools to automate workflows.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Most Relevant Apps to Automate Marketing</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tools.map((tool) => (
              <div
                key={tool.name}
                className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                onClick={() => {
                  if (selectedTools.includes(tool.name)) {
                    setSelectedTools(selectedTools.filter(t => t !== tool.name));
                  } else {
                    setSelectedTools([...selectedTools, tool.name]);
                  }
                }}
              >
                <Checkbox
                  checked={selectedTools.includes(tool.name)}
                  onCheckedChange={() => {}}
                />
                <tool.icon className="h-6 w-6" />
                <span className="font-medium">{tool.name}</span>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Button className="w-full" disabled={selectedTools.length === 0}>
              Next
            </Button>
            <Button variant="link" className="w-full mt-2">
              Skip and explore apps later
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
