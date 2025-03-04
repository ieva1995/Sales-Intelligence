import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LibraryMenu from "@/components/LibraryMenu";

export default function Library() {
  return (
    <div className="flex flex-col sm:flex-row gap-6">
      {/* Library Menu */}
      <div className="w-full sm:w-64 flex-shrink-0">
        <LibraryMenu />
      </div>

      {/* Main Content */}
      <div className="flex-grow space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Library</h1>
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
    </div>
  );
}