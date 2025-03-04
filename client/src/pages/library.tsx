import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Library() {
  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Library</h1>
        <p className="text-muted-foreground">Access your templates, documents, and resources</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Welcome to Library</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Select an option from the menu to start managing your resources.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}