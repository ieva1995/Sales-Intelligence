import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { getShopifyProducts, getShopifyOrders, getShopifyCustomers, authenticateWithShopify } from "@/lib/shopify";
import { useAuth } from "@/hooks/use-auth";
import {
  ShoppingBag,
  Users,
  CreditCard,
  AlertCircle,
  Package,
  RefreshCw,
  Check,
  Store,
  TrendingUp,
  DollarSign,
  BarChart2,
  ShieldAlert,
  Lock
} from "lucide-react";

interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  product_type: string;
  status: string;
  created_at: string;
  updated_at: string;
  published_at: string;
  vendor: string;
  variants: any[];
  options: any[];
  images: any[];
  image: {
    src: string;
  };
}

interface ShopifyOrder {
  id: string;
  name: string;
  customer: {
    first_name: string;
    last_name: string;
    email: string;
  };
  created_at: string;
  financial_status: string;
  fulfillment_status: string;
  total_price: string;
  line_items: any[];
}

interface ShopifyCustomer {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  orders_count: number;
  total_spent: string;
  created_at: string;
  addresses: any[];
}

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
          This section contains sensitive Shopify store data that is only accessible to administrators.
        </p>
        <div className="flex items-center text-amber-500 bg-amber-900/20 px-4 py-2 rounded-lg">
          <Lock className="h-5 w-5 mr-2" />
          <p className="text-sm">Contact an administrator if you need access to this information.</p>
        </div>
      </div>
    </div>
  );
};

export default function ShopifyDashboard() {
  const { toast } = useToast();
  const { user, isAdmin } = useAuth(); // Get authentication state and admin status
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [orders, setOrders] = useState<ShopifyOrder[]>([]);
  const [customers, setCustomers] = useState<ShopifyCustomer[]>([]);
  const [loading, setLoading] = useState({
    products: false,
    orders: false,
    customers: false
  });
  const [error, setError] = useState<Record<string, string | null>>({
    products: null,
    orders: null,
    customers: null
  });
  const [connectionStatus, setConnectionStatus] = useState<'connected'|'disconnected'|'loading'>('loading');
  const [usingSampleData, setUsingSampleData] = useState(false);

  // Function to fetch Shopify data
  const fetchShopifyData = async () => {
    console.log("Fetching Shopify data");
    setConnectionStatus('loading');
    setUsingSampleData(false);

    // Fetch products
    setLoading(prev => ({ ...prev, products: true }));
    try {
      console.log("Fetching Shopify products");
      const productsData = await getShopifyProducts();
      console.log("Products data received:", productsData ? productsData.length : 0);
      setProducts(productsData || []);
      setError(prev => ({ ...prev, products: null }));
      setConnectionStatus('connected');
    } catch (err: any) {
      console.error("Error fetching Shopify products:", err);
      setError(prev => ({ ...prev, products: err.message }));
      setConnectionStatus('disconnected');
      toast({
        title: "Error fetching products",
        description: err.message,
        variant: "destructive"
      });
    } finally {
      setLoading(prev => ({ ...prev, products: false }));
    }

    // Fetch orders
    setLoading(prev => ({ ...prev, orders: true }));
    try {
      console.log("Fetching Shopify orders");
      const ordersData = await getShopifyOrders();
      console.log("Orders data received:", ordersData ? ordersData.length : 0);
      setOrders(ordersData || []);
      setError(prev => ({ ...prev, orders: null }));
    } catch (err: any) {
      console.error("Error fetching Shopify orders:", err);
      setError(prev => ({ ...prev, orders: err.message }));
      toast({
        title: "Error fetching orders",
        description: err.message,
        variant: "destructive"
      });
    } finally {
      setLoading(prev => ({ ...prev, orders: false }));
    }

    // Fetch customers
    setLoading(prev => ({ ...prev, customers: true }));
    try {
      console.log("Fetching Shopify customers");
      const customersData = await getShopifyCustomers();
      console.log("Customers data received:", customersData ? customersData.length : 0);
      setCustomers(customersData || []);
      setError(prev => ({ ...prev, customers: null }));
    } catch (err: any) {
      console.error("Error fetching Shopify customers:", err);
      setError(prev => ({ ...prev, customers: err.message }));
      toast({
        title: "Error fetching customers",
        description: err.message,
        variant: "destructive"
      });
    } finally {
      setLoading(prev => ({ ...prev, customers: false }));
    }
  };

  // For demo purposes, use this sample data when real data can't be fetched
  const loadSampleData = () => {
    console.log("Loading sample Shopify data");
    setUsingSampleData(true);
    setConnectionStatus('disconnected');
    setProducts([
      {
        id: "1",
        title: "Enterprise Sales Platform",
        handle: "enterprise-sales-platform",
        product_type: "Software",
        status: "active",
        created_at: "2025-03-01",
        updated_at: "2025-03-04",
        published_at: "2025-03-01",
        vendor: "SalesBoost AI",
        variants: [],
        options: [],
        images: [],
        image: {
          src: "https://via.placeholder.com/150"
        }
      },
      {
        id: "2",
        title: "Sales Intelligence Pro",
        handle: "sales-intelligence-pro",
        product_type: "Service",
        status: "active",
        created_at: "2025-03-01",
        updated_at: "2025-03-04",
        published_at: "2025-03-01",
        vendor: "SalesBoost AI",
        variants: [],
        options: [],
        images: [],
        image: {
          src: "https://via.placeholder.com/150"
        }
      },
      {
        id: "3",
        title: "Enterprise Turbo Add-on",
        handle: "enterprise-turbo-addon",
        product_type: "Add-on",
        status: "active",
        created_at: "2025-03-01",
        updated_at: "2025-03-04",
        published_at: "2025-03-01",
        vendor: "SalesBoost AI",
        variants: [],
        options: [],
        images: [],
        image: {
          src: "https://via.placeholder.com/150"
        }
      }
    ]);

    setOrders([
      {
        id: "1001",
        name: "#1001",
        customer: {
          first_name: "John",
          last_name: "Smith",
          email: "john@example.com"
        },
        created_at: "2025-03-04",
        financial_status: "paid",
        fulfillment_status: "fulfilled",
        total_price: "999.00",
        line_items: []
      },
      {
        id: "1002",
        name: "#1002",
        customer: {
          first_name: "Sarah",
          last_name: "Johnson",
          email: "sarah@example.com"
        },
        created_at: "2025-03-03",
        financial_status: "paid",
        fulfillment_status: "fulfilled",
        total_price: "499.00",
        line_items: []
      },
      {
        id: "1003",
        name: "#1003",
        customer: {
          first_name: "Michael",
          last_name: "Davis",
          email: "michael@example.com"
        },
        created_at: "2025-03-02",
        financial_status: "pending",
        fulfillment_status: "unfulfilled",
        total_price: "1999.00",
        line_items: []
      }
    ]);

    setCustomers([
      {
        id: "101",
        first_name: "John",
        last_name: "Smith",
        email: "john@example.com",
        orders_count: 5,
        total_spent: "4995.00",
        created_at: "2025-01-15",
        addresses: []
      },
      {
        id: "102",
        first_name: "Sarah",
        last_name: "Johnson",
        email: "sarah@example.com",
        orders_count: 3,
        total_spent: "1497.00",
        created_at: "2025-02-01",
        addresses: []
      },
      {
        id: "103",
        first_name: "Michael",
        last_name: "Davis",
        email: "michael@example.com",
        orders_count: 1,
        total_spent: "1999.00",
        created_at: "2025-03-01",
        addresses: []
      }
    ]);

    toast({
      title: "Sample data loaded",
      description: "Using sample data for demonstration purposes",
    });
  };

  // Use useEffect to try to fetch data on component mount
  useEffect(() => {
    // Only fetch data if the user is an admin
    if (isAdmin) {
      console.log("ShopifyDashboard useEffect running");

      // Try to fetch real data first, if it fails we'll fall back to sample data
      fetchShopifyData().catch(error => {
        console.warn("Failed to fetch Shopify data, using sample data instead:", error);
        loadSampleData();
      });
    }
  }, [isAdmin]); // Only re-run when admin status changes

  // Get stats for summary cards
  const stats = {
    totalProducts: products.length,
    totalOrders: orders.length,
    totalCustomers: customers.length,
    totalRevenue: orders.reduce((acc, order) => acc + parseFloat(order.total_price), 0).toFixed(2)
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      active: "bg-green-500/20 text-green-400",
      draft: "bg-gray-500/20 text-gray-400",
      archived: "bg-red-500/20 text-red-400",
      paid: "bg-green-500/20 text-green-400",
      pending: "bg-yellow-500/20 text-yellow-400",
      refunded: "bg-red-500/20 text-red-400",
      fulfilled: "bg-green-500/20 text-green-400",
      unfulfilled: "bg-yellow-500/20 text-yellow-400",
      partially_fulfilled: "bg-blue-500/20 text-blue-400"
    };
    return colors[status] || "bg-gray-500/20 text-gray-400";
  };

  // If user is not an admin, render the access denied component
  if (!isAdmin) {
    return <AccessDenied />;
  }

  // Admin user content below - only shown if isAdmin is true
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Shopify Integration</h1>
          <p className="text-muted-foreground">View and manage your Shopify store data</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={loadSampleData}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Load Sample Data
          </Button>
          <Button onClick={() => authenticateWithShopify()}>
            <Store className="mr-2 h-4 w-4" />
            Connect Shopify
          </Button>
        </div>
      </div>

      {/* Connection Status */}
      {usingSampleData && (
        <div className="bg-amber-100 dark:bg-amber-800/20 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 px-4 py-3 rounded-md flex items-center">
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
          <div>
            <p className="font-medium">Using sample data</p>
            <p className="text-sm">You're viewing sample data. Connect your Shopify store to see real data.</p>
          </div>
        </div>
      )}

      {!usingSampleData && connectionStatus === 'disconnected' && (
        <div className="bg-red-100 dark:bg-red-800/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 px-4 py-3 rounded-md flex items-center">
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
          <div>
            <p className="font-medium">Connection failed</p>
            <p className="text-sm">Unable to connect to your Shopify store. Please check your credentials or try again.</p>
          </div>
        </div>
      )}

      {!usingSampleData && connectionStatus === 'connected' && (
        <div className="bg-green-100 dark:bg-green-800/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 px-4 py-3 rounded-md flex items-center">
          <Check className="h-5 w-5 mr-2 flex-shrink-0" />
          <div>
            <p className="font-medium">Connected to Shopify</p>
            <p className="text-sm">Successfully connected to your Shopify store.</p>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-blue-500/10 border-0">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <Package className="h-8 w-8 text-blue-500" />
              <div>
                <h3 className="text-2xl font-bold">{stats.totalProducts}</h3>
                <p className="text-sm text-muted-foreground">Total Products</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-500/10 border-0">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <ShoppingBag className="h-8 w-8 text-green-500" />
              <div>
                <h3 className="text-2xl font-bold">{stats.totalOrders}</h3>
                <p className="text-sm text-muted-foreground">Total Orders</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-500/10 border-0">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <Users className="h-8 w-8 text-purple-500" />
              <div>
                <h3 className="text-2xl font-bold">{stats.totalCustomers}</h3>
                <p className="text-sm text-muted-foreground">Total Customers</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-amber-500/10 border-0">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <DollarSign className="h-8 w-8 text-amber-500" />
              <div>
                <h3 className="text-2xl font-bold">${stats.totalRevenue}</h3>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="products" className="w-full">
        <TabsList>
          <TabsTrigger value="products">
            <Package className="mr-2 h-4 w-4" />
            Products
          </TabsTrigger>
          <TabsTrigger value="orders">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Orders
          </TabsTrigger>
          <TabsTrigger value="customers">
            <Users className="mr-2 h-4 w-4" />
            Customers
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart2 className="mr-2 h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-4">
          <Card className="border-0 bg-slate-800">
            <CardHeader>
              <CardTitle>Products ({products.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loading.products ? (
                  <div className="flex items-center justify-center py-10">
                    <RefreshCw className="h-8 w-8 animate-spin text-blue-500" />
                  </div>
                ) : error.products ? (
                  <div className="flex items-center justify-center py-10">
                    <AlertCircle className="h-8 w-8 text-red-500 mr-2" />
                    <span>Error loading products: {error.products}</span>
                  </div>
                ) : products.length === 0 ? (
                  <div className="flex items-center justify-center py-10">
                    <span>No products found</span>
                  </div>
                ) : (
                  products.map((product) => (
                    <div 
                      key={product.id}
                      className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700/70 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-md bg-white/10 overflow-hidden">
                          {product.image?.src ? (
                            <img src={product.image.src} alt={product.title} className="w-full h-full object-cover" />
                          ) : (
                            <Package className="h-full w-full p-2 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium">{product.title}</h4>
                          <p className="text-sm text-gray-400">{product.product_type}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className={`px-2 py-1 rounded text-xs ${getStatusColor(product.status)}`}>
                          {product.status.toUpperCase()}
                        </span>
                        <span className="text-sm text-gray-400">{new Date(product.updated_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <Card className="border-0 bg-slate-800">
            <CardHeader>
              <CardTitle>Orders ({orders.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loading.orders ? (
                  <div className="flex items-center justify-center py-10">
                    <RefreshCw className="h-8 w-8 animate-spin text-blue-500" />
                  </div>
                ) : error.orders ? (
                  <div className="flex items-center justify-center py-10">
                    <AlertCircle className="h-8 w-8 text-red-500 mr-2" />
                    <span>Error loading orders: {error.orders}</span>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="flex items-center justify-center py-10">
                    <span>No orders found</span>
                  </div>
                ) : (
                  orders.map((order) => (
                    <div 
                      key={order.id}
                      className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700/70 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <ShoppingBag className="h-5 w-5 text-blue-400" />
                        <div>
                          <h4 className="font-medium">{order.name}</h4>
                          <p className="text-sm text-gray-400">
                            {order.customer.first_name} {order.customer.last_name}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="font-medium">${parseFloat(order.total_price).toFixed(2)}</div>
                          <div className="text-sm text-gray-400">{new Date(order.created_at).toLocaleDateString()}</div>
                        </div>
                        <div className="flex space-x-2">
                          <span className={`px-2 py-1 rounded text-xs ${getStatusColor(order.financial_status)}`}>
                            {order.financial_status.toUpperCase()}
                          </span>
                          {order.fulfillment_status && (
                            <span className={`px-2 py-1 rounded text-xs ${getStatusColor(order.fulfillment_status)}`}>
                              {order.fulfillment_status.toUpperCase()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <Card className="border-0 bg-slate-800">
            <CardHeader>
              <CardTitle>Customers ({customers.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loading.customers ? (
                  <div className="flex items-center justify-center py-10">
                    <RefreshCw className="h-8 w-8 animate-spin text-blue-500" />
                  </div>
                ) : error.customers ? (
                  <div className="flex items-center justify-center py-10">
                    <AlertCircle className="h-8 w-8 text-red-500 mr-2" />
                    <span>Error loading customers: {error.customers}</span>
                  </div>
                ) : customers.length === 0 ? (
                  <div className="flex items-center justify-center py-10">
                    <span>No customers found</span>
                  </div>
                ) : (
                  customers.map((customer) => (
                    <div 
                      key={customer.id}
                      className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700/70 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <Users className="h-5 w-5 text-blue-400" />
                        <div>
                          <h4 className="font-medium">
                            {customer.first_name} {customer.last_name}
                          </h4>
                          <p className="text-sm text-gray-400">{customer.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="font-medium">{customer.orders_count} orders</div>
                          <div className="text-sm text-green-400">${parseFloat(customer.total_spent).toFixed(2)} spent</div>
                        </div>
                        <div className="text-sm text-gray-400">
                          {new Date(customer.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card className="border-0 bg-slate-800">
            <CardHeader>
              <CardTitle>Sales Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-white/5 rounded-lg p-4">
                    <h3 className="text-lg font-medium mb-4">Revenue Breakdown</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>Product Sales</span>
                        <span className="font-medium">${(parseFloat(stats.totalRevenue) * 0.85).toFixed(2)}</span>
                      </div>
                      <div className="w-full h-2 bg-slate-700 rounded-full">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: '85%' }}></div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span>Services</span>
                        <span className="font-medium">${(parseFloat(stats.totalRevenue) * 0.12).toFixed(2)}</span>
                      </div>
                      <div className="w-full h-2 bg-slate-700 rounded-full">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: '12%' }}></div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span>Add-ons</span>
                        <span className="font-medium">${(parseFloat(stats.totalRevenue) * 0.03).toFixed(2)}</span>
                      </div>
                      <div className="w-full h-2 bg-slate-700 rounded-full">
                        <div className="h-full bg-purple-500 rounded-full" style={{ width: '3%' }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4">
                    <h3 className="text-lg font-medium mb-4">Customer Metrics</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-blue-500/10 rounded-lg text-center">
                        <div className="text-2xl font-bold text-blue-400">
                          ${(parseFloat(stats.totalRevenue) / Math.max(1, stats.totalCustomers)).toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-400">Average Order Value</div>
                      </div>
                      <div className="p-3 bg-green-500/10 rounded-lg text-center">
                        <div className="text-2xl font-bold text-green-400">
                          {(stats.totalOrders / Math.max(1, stats.totalCustomers)).toFixed(1)}
                        </div>
                        <div className="text-sm text-gray-400">Orders per Customer</div>
                      </div>
                      <div className="p-3 bg-purple-500/10 rounded-lg text-center">
                        <div className="text-2xl font-bold text-purple-400">28%</div>
                        <div className="text-sm text-gray-400">Repeat Purchase Rate</div>
                      </div>
                      <div className="p-3 bg-amber-500/10 rounded-lg text-center">
                        <div className="text-2xl font-bold text-amber-400">$840</div>
                        <div className="text-sm text-gray-400">Customer Lifetime Value</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-4">Recent Performance</h3>
                  <div className="h-64 flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp className="h-16 w-16 mx-auto text-blue-500 mb-4" />
                      <p className="text-gray-400 mb-2">Analytics visualization will appear here</p>
                      <p className="text-sm text-gray-500">
                        Connect to your Shopify store to view real-time analytics
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <Button variant="outline" className="w-full" onClick={() => fetchShopifyData()}>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Update Data
                    </Button>
                    <Button className="w-full" onClick={() => authenticateWithShopify()}>
                      <Store className="mr-2 h-4 w-4" />
                      Connect Store
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}