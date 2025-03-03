import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CommerceMenu from "@/components/CommerceMenu";

export default function Commerce() {
  return (
    <div className="flex">
      {/* Commerce Menu */}
      <div className="w-64 flex-shrink-0">
        <CommerceMenu />
      </div>

      {/* Main Content */}
      <div className="flex-grow space-y-8 pl-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Commerce</h1>
          <p className="text-muted-foreground">Manage your business transactions and payments</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Welcome to Commerce</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Select an option from the menu to get started with managing your commerce operations.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}