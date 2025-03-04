import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { BarChart2, ShoppingBag, ExternalLink } from "lucide-react";

export default function CommerceOverview() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold tracking-tight">Commerce Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Business Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              View your business performance and key metrics.
            </p>
            <Link href="/commerce/performance">
              <Button className="w-full">
                <BarChart2 className="mr-2 h-4 w-4" />
                View Performance Dashboard
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Shopify Integration</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Manage your Shopify store data, products, and customers.
            </p>
            <Link href="/commerce/shopify">
              <Button className="w-full">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Go to Shopify Dashboard
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Recent commerce activity will appear here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}