import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CRM() {
  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">CRM</h1>
        <p className="text-muted-foreground">Manage your contacts and leads.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Welcome to CRM</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Select an option from the menu to start managing your customer relationships.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}