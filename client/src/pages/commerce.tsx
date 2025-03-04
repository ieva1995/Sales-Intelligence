import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Commerce() {
  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Commerce</h1>
        <p className="text-muted-foreground">Manage your business transactions and payments</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Welcome to Commerce</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Select an option from the menu to start managing your commerce operations.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}