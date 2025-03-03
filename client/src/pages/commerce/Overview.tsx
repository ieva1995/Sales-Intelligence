import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CommerceOverview() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold tracking-tight">Commerce Overview</h2>
      <Card>
        <CardHeader>
          <CardTitle>Business Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            View your business performance and key metrics.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
