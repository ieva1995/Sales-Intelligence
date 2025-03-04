import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Reporting() {
  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Reporting</h1>
        <p className="text-muted-foreground">View and analyze your business performance</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Welcome to Reporting</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Select an option from the menu to start exploring your analytics and reports.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}