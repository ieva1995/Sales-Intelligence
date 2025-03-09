import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { BarChart2, ShoppingBag, ExternalLink, ShieldAlert, Lock } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

// Access denied component for non-admin users
const AccessDenied = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col items-center justify-center text-center py-20">
        <div className="bg-red-900/20 p-4 rounded-full mb-4">
          <ShieldAlert className="h-16 w-16 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-red-500 mb-2">Access Restricted</h1>
        <p className="text-gray-400 max-w-md mb-6">
          The commerce section contains sensitive store data that is only accessible to administrators.
        </p>
        <div className="flex items-center text-amber-500 bg-amber-900/20 px-4 py-2 rounded-lg">
          <Lock className="h-5 w-5 mr-2" />
          <p className="text-sm">Contact an administrator if you need access to this information.</p>
        </div>
      </div>
    </div>
  );
};

export default function CommerceOverview() {
  const { isAdmin } = useAuth(); // Get admin status

  // If user is not an admin, render the access denied component
  if (!isAdmin) {
    return <AccessDenied />;
  }

  // Only admin users can view the commerce overview content below
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