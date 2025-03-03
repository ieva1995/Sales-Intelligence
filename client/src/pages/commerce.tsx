import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CommerceMenu from "@/components/CommerceMenu";
import { ShoppingBag, CreditCard, DollarSign } from "lucide-react";

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
          <p className="text-muted-foreground">Manage your payments, products, and subscriptions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl flex items-center gap-2">
                <ShoppingBag className="h-6 w-6 text-blue-500" />
                Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Create and manage your product catalog
              </p>
              <Button variant="outline" className="w-full">
                Add Product
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl flex items-center gap-2">
                <CreditCard className="h-6 w-6 text-green-500" />
                Payments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Process payments and manage transactions
              </p>
              <Button variant="outline" className="w-full">
                View Transactions
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl flex items-center gap-2">
                <DollarSign className="h-6 w-6 text-purple-500" />
                Subscriptions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Set up and manage recurring payments
              </p>
              <Button variant="outline" className="w-full">
                Create Plan
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}