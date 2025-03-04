import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Marketing() {
  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Marketing</h1>
        <p className="text-muted-foreground">Manage your marketing campaigns and automation.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Welcome to Marketing</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Select an option from the menu to start managing your marketing activities.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}