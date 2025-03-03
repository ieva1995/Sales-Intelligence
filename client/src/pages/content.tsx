import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ContentMenu from "@/components/ContentMenu";

export default function Content() {
  return (
    <div className="flex">
      {/* Content Menu */}
      <div className="w-64 flex-shrink-0">
        <ContentMenu />
      </div>

      {/* Main Content */}
      <div className="flex-grow space-y-8 pl-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Content Management</h1>
          <p className="text-muted-foreground">Create and manage your content across different channels.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Get Started with Content Creation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Choose from the menu on the left to start creating and managing your content.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
