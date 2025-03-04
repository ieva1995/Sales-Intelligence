import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DataManagement() {
  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Data Management</h1>
        <p className="text-muted-foreground">Manage your data integrations and transformations</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Welcome to Data Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Select an option from the menu to start managing your data operations.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}