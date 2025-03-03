import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AutomationMenu from "@/components/AutomationMenu";

export default function Automations() {
  return (
    <div className="flex">
      {/* Automation Menu */}
      <div className="w-64 flex-shrink-0">
        <AutomationMenu />
      </div>

      {/* Main Content */}
      <div className="flex-grow space-y-8 pl-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Automations</h1>
          <p className="text-muted-foreground">Create and manage your automated workflows.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Get Started with Automations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Choose from the menu on the left to start creating and managing your automations.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
