import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Content() {
  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Content Management</h1>
        <p className="text-muted-foreground">Create and manage your content across different channels.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Welcome to Content Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Select an option from the menu to start creating and managing your content.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}