import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SiGmail, SiGooglecalendar, SiZoom, SiSlack, SiFacebook, SiGooglemeet, SiMailchimp } from "react-icons/si";
import { Checkbox } from "@/components/ui/checkbox";
import MarketingMenu from "@/components/MarketingMenu";

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
    <div className="flex flex-col sm:flex-row gap-6">
      {/* Marketing Menu */}
      <div className="w-full sm:w-64 flex-shrink-0">
        <MarketingMenu />
      </div>

      {/* Main Content */}
      <div className="flex-grow space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Marketing Automation</h1>
          <p className="text-muted-foreground">Connect your marketing tools to automate workflows.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Most Relevant Apps to Automate Marketing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tools.map((tool) => {
                const isSelected = selectedTools.includes(tool.name);
                return (
                  <div
                    key={tool.name}
                    className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => {
                      if (isSelected) {
                        setSelectedTools(selectedTools.filter(t => t !== tool.name));
                      } else {
                        setSelectedTools([...selectedTools, tool.name]);
                      }
                    }}
                  >
                    <div className="flex items-center">
                      <Checkbox
                        id={`checkbox-${tool.name}`}
                        checked={isSelected}
                      />
                    </div>
                    <tool.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    <span className="font-medium text-sm sm:text-base">{tool.name}</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-6">
              <Button 
                className="w-full text-sm sm:text-base" 
                disabled={selectedTools.length === 0}
              >
                Next
              </Button>
              <Button 
                variant="link" 
                className="w-full mt-2 text-sm sm:text-base"
              >
                Skip and explore apps later
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}