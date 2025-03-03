import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DataManagementMenu from "@/components/DataManagementMenu";

export default function DataManagement() {
  return (
    <div className="flex">
      {/* Data Management Menu */}
      <div className="w-64 flex-shrink-0">
        <DataManagementMenu />
      </div>

      {/* Main Content */}
      <div className="flex-grow space-y-8 pl-6">
        <div>
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
    </div>
  );
}
