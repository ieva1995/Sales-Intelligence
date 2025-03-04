import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import {
  TrendingUp,
  ShoppingBag,
  DollarSign,
  Users,
  BarChart2,
  Package,
  AlertCircle,
  RefreshCw,
  Check,
  CreditCard,
  BarChart as BarChartIcon,
  Activity,
  FileSpreadsheet,
  ShieldAlert,
  Lock
} from "lucide-react";
import { getShopifyPerformance } from "@/lib/shopify";

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
          The performance dashboard contains sensitive store data that is only accessible to administrators.
        </p>
        <div className="flex items-center text-amber-500 bg-amber-900/20 px-4 py-2 rounded-lg">
          <Lock className="h-5 w-5 mr-2" />
          <p className="text-sm">Contact an administrator if you need access to this information.</p>
        </div>
      </div>
    </div>
  );
};

// Sample data for charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#4CAF50'];

export default function ShopifyPerformance() {
  const { toast } = useToast();
  const { isAdmin } = useAuth(); // Get admin status
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

  // Dashboard metrics state
  const [metrics, setMetrics] = useState({
    totalRevenue: "0.00",
    orderCount: 0,
    averageOrderValue: "0.00",
    conversionRate: "0.00",
    customerCount: 0,
    topProducts: [] as any[],
    salesByDay: [] as any[],
    salesByMonth: [] as any[],
    salesByChannel: [] as any[],
    customerAcquisition: [] as any[],
    inventoryHealth: [] as any[],
    // Financial metrics
    financialMetrics: {
      mrr: 5250.00,
      arr: 63000.00,
      arpu: 47.50,
      clv: 845.50,
      cac: 32.40,
      grossMargin: 73.5,
      cacPayback: 3.2
    },
    // Growth metrics
    growthMetrics: {
      customerGrowthRate: 12.8,
      churnRate: 4.2,
      nrr: 108.5,
      leadConversionRate: 3.25,
      trialToPaidRate: 42.0
    },
    // Engagement metrics
    engagementMetrics: {
      dau: 85,
      mau: 310,
      featureAdoptionRate: 68.0,
      averageSessionDuration: 8.5,
      csat: 4.3
    }
  });

  // Function to fetch and process Shopify data
  const fetchPerformanceData = async () => {
    try {
      setLoading(true);

      // Fetch performance data from Shopify API
      const performanceData = await getShopifyPerformance();

      // Update metrics state with fetched data
      setMetrics(performanceData);
      setError(null);
    } catch (err: any) {
      console.error("Error fetching performance data:", err);
      setError(err.message);
      toast({
        title: "Error loading performance data",
        description: err.message,
        variant: "destructive"
      });

      // Load sample data if we can't fetch real data
      loadSampleData();
    } finally {
      setLoading(false);
    }
  };

  // Generate sample data for demonstration
  const loadSampleData = () => {
    setMetrics(generateSampleData());
  };

  // Generate sample data for demonstration
  const generateSampleData = () => {
    // Sample daily sales data (last 30 days)
    const salesByDay = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      return {
        date: date.toISOString().split('T')[0],
        sales: Math.floor(Math.random() * (10000 - 2000) + 2000) / 100,
        orders: Math.floor(Math.random() * 10) + 1
      };
    });

    // Sample monthly sales data (last 12 months)
    const salesByMonth = Array.from({ length: 12 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - (11 - i));
      const monthName = date.toLocaleString('default', { month: 'short' });
      return {
        month: monthName,
        sales: Math.floor(Math.random() * (50000 - 10000) + 10000) / 100,
        orders: Math.floor(Math.random() * 100) + 20
      };
    });

    // Sample sales by channel
    const salesByChannel = [
      { name: 'Online Store', value: 68 },
      { name: 'Social Media', value: 12 },
      { name: 'Marketplace', value: 8 },
      { name: 'Direct', value: 7 },
      { name: 'Wholesale', value: 5 }
    ];

    // Sample customer acquisition
    const customerAcquisition = [
      { name: 'Organic Search', value: 35 },
      { name: 'Direct', value: 20 },
      { name: 'Social Media', value: 18 },
      { name: 'Referral', value: 12 },
      { name: 'Email', value: 10 },
      { name: 'Other', value: 5 }
    ];

    // Sample top products
    const topProducts = [
      { id: 1, name: 'Enterprise Sales Platform', sales: 12500, orders: 25, inventory: 18 },
      { id: 2, name: 'Sales Intelligence Pro', sales: 8750, orders: 17, inventory: 12 },
      { id: 3, name: 'Enterprise Turbo Add-on', sales: 4500, orders: 9, inventory: 25 },
      { id: 4, name: 'CRM Power Integration', sales: 3250, orders: 6, inventory: 8 },
      { id: 5, name: 'Advanced Analytics Package', sales: 2250, orders: 4, inventory: 15 }
    ];

    // Sample inventory health
    const inventoryHealth = [
      { name: 'In Stock', value: 68 },
      { name: 'Low Stock', value: 22 },
      { name: 'Out of Stock', value: 10 }
    ];

    // Calculate metrics from sample data
    const totalRevenue = salesByDay.reduce((sum, day) => sum + day.sales, 0).toFixed(2);
    const orderCount = salesByDay.reduce((sum, day) => sum + day.orders, 0);
    const averageOrderValue = (parseFloat(totalRevenue) / orderCount).toFixed(2);

    // Financial metrics
    const financialMetrics = {
      mrr: 5250.00,
      arr: 63000.00,
      arpu: 47.50,
      clv: 845.50,
      cac: 32.40,
      grossMargin: 73.5,
      cacPayback: 3.2
    };

    // Growth metrics
    const growthMetrics = {
      customerGrowthRate: 12.8,
      churnRate: 4.2,
      nrr: 108.5,
      leadConversionRate: 3.25,
      trialToPaidRate: 42.0
    };

    // Engagement metrics
    const engagementMetrics = {
      dau: 85,
      mau: 310,
      featureAdoptionRate: 68.0,
      averageSessionDuration: 8.5,
      csat: 4.3
    };

    return {
      totalRevenue,
      orderCount,
      averageOrderValue,
      conversionRate: '3.25',
      customerCount: 42,
      topProducts,
      salesByDay,
      salesByMonth,
      salesByChannel,
      customerAcquisition,
      inventoryHealth,
      financialMetrics,
      growthMetrics,
      engagementMetrics
    };
  };

  // Fetch data on component mount, only if user is admin
  useEffect(() => {
    if (isAdmin) {
      fetchPerformanceData();
    }
  }, [isAdmin]);

  // If user is not an admin, render the access denied component
  if (!isAdmin) {
    return <AccessDenied />;
  }

  // Only admin users can view the performance dashboard below
  return (
    <div className="bg-slate-900 text-white space-y-8 p-6"> {/* Dark background and padding */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Store Performance Dashboard</h1>
        <Button onClick={fetchPerformanceData} disabled={loading}>
          {loading ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Data
            </>
          )}
        </Button>
      </div>

      {error && (
        <div className="bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 p-4 rounded-md flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          <div>
            <p className="font-medium">Failed to load performance data</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Key Metrics Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"> {/* Increased gap */}
        {[
          { title: "Total Revenue", value: `$${metrics.totalRevenue}`, icon: <DollarSign />, bg: "blue" },
          { title: "Orders", value: metrics.orderCount.toString(), icon: <ShoppingBag />, bg: "green" },
          { title: "Customers", value: metrics.customerCount.toString(), icon: <Users />, bg: "purple" },
          { title: "Average Order Value", value: `$${metrics.averageOrderValue}`, icon: <TrendingUp />, bg: "amber" },
        ].map((item, index) => (
          <Card key={index} className={`bg-${item.bg}-50 dark:bg-${item.bg}-500/5 border border-${item.bg}-100 dark:border-${item.bg}-500/10`}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className={`text-${item.bg}-500 bg-${item.bg}-100 dark:bg-${item.bg}-900/20 p-2 rounded-full`}>
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{item.title}</p>
                  <h3 className="text-2xl font-bold">{item.value}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Dashboard Content */}
      <Tabs defaultValue="overview" className="space-y-8">
        <TabsList className="border dark:border-gray-800 px-2 h-12">
          <TabsTrigger value="overview" onClick={() => setActiveTab("overview")} className="h-10">
            <BarChart2 className="mr-2 h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="sales" onClick={() => setActiveTab("sales")} className="h-10">
            <DollarSign className="mr-2 h-4 w-4" />
            Sales
          </TabsTrigger>
          <TabsTrigger value="products" onClick={() => setActiveTab("products")} className="h-10">
            <Package className="mr-2 h-4 w-4" />
            Products
          </TabsTrigger>
          <TabsTrigger value="customers" onClick={() => setActiveTab("customers")} className="h-10">
            <Users className="mr-2 h-4 w-4" />
            Customers
          </TabsTrigger>
          <TabsTrigger value="financial" onClick={() => setActiveTab("financial")} className="h-10">
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Financial
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-slate-800 text-white border-0"> {/* Darker card background */}
              <CardHeader className="pb-2">
                <CardTitle>Sales Trend (30 Days)</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={metrics.salesByDay}
                      margin={{ top: 15, right: 10, left: 10, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis
                        dataKey="date"
                        stroke="#888"
                        tickFormatter={(value) => {
                          const date = new Date(value);
                          return `${date.getMonth() + 1}/${date.getDate()}`;
                        }}
                      />
                      <YAxis stroke="#888" />
                      <Tooltip
                        formatter={(value) => [`$${value}`, 'Revenue']}
                        labelFormatter={(label) => {
                          const date = new Date(label);
                          return date.toLocaleDateString();
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="sales"
                        name="Revenue"
                        stroke="#4CAF50"
                        activeDot={{ r: 8 }}
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-8">
              <Card className="bg-slate-800 text-white border-0">
                <CardHeader className="pb-2">
                  <CardTitle>Sales Distribution by Channel</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={metrics.salesByChannel}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {metrics.salesByChannel.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value}%`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 text-white border-0">
                <CardHeader className="pb-2">
                  <CardTitle>Inventory Status</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-[150px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={metrics.inventoryHealth}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={60}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {metrics.inventoryHealth.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value}%`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card className="bg-slate-800 text-white border-0">
            <CardHeader className="pb-2">
              <CardTitle>Top Selling Products</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4">
                {metrics.topProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-3 bg-gray-700 rounded-lg"
                  >
                    <div>
                      <h4 className="font-medium text-white">{product.name}</h4>
                      <div className="flex items-center mt-1 space-x-4 text-sm text-gray-400">
                        <span>{product.orders} orders</span>
                        <span>·</span>
                        <span>{product.inventory} in stock</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-green-400">${product.sales.toFixed(2)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>


        {/* Sales Tab */}
        <TabsContent value="sales" className="space-y-8">
          <Card className="bg-slate-800 text-white border-0">
            <CardHeader className="pb-2">
              <CardTitle>Monthly Sales (12 Months)</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={metrics.salesByMonth}
                    margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="month" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                    <Legend />
                    <Bar dataKey="sales" name="Revenue" fill="#4CAF50" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-slate-800 text-white border-0">
              <CardHeader className="pb-2">
                <CardTitle>Sales Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">Conversion Rate</span>
                      <span className="font-medium">{metrics.conversionRate}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-800 rounded-full">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${Math.min(parseFloat(metrics.conversionRate) * 5, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">Average Order Value</span>
                      <span className="font-medium">${metrics.averageOrderValue}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-800 rounded-full">
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${Math.min((parseFloat(metrics.averageOrderValue) / 100) * 20, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">Repeat Purchase Rate</span>
                      <span className="font-medium">28%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-800 rounded-full">
                      <div
                        className="h-full bg-purple-500 rounded-full"
                        style={{ width: '28%' }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">Cart Abandonment Rate</span>
                      <span className="font-medium">64%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-800 rounded-full">
                      <div
                        className="h-full bg-red-500 rounded-full"
                        style={{ width: '64%' }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 text-white border-0">
              <CardHeader className="pb-2">
                <CardTitle>Sales by Channel</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={metrics.salesByChannel}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis type="number" stroke="#888" />
                      <YAxis dataKey="name" type="category" stroke="#888" width={100} />
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Bar dataKey="value" name="Percentage" radius={[0, 4, 4, 0]}>
                        {metrics.salesByChannel.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Products Tab */}
        <TabsContent value="products" className="space-y-8">
          <Card className="bg-slate-800 text-white border-0">
            <CardHeader className="pb-2">
              <CardTitle>Product Performance</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-3 px-4">Product</th>
                        <th className="text-right py-3 px-4">Sales</th>
                        <th className="text-right py-3 px-4">Orders</th>
                        <th className="text-right py-3 px-4">Inventory</th>
                        <th className="text-right py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {metrics.topProducts.map((product) => (
                        <tr key={product.id} className="border-b border-gray-700 hover:bg-gray-700">
                          <td className="py-3 px-4">{product.name}</td>
                          <td className="py-3 px-4 text-right text-green-400">${product.sales.toFixed(2)}</td>
                          <td className="py-3 px-4 text-right">{product.orders}</td>
                          <td className="py-3 px-4 text-right">{product.inventory}</td>
                          <td className="py-3 px-4 text-right">
                            <span className={`px-2 py-1 rounded text-xs ${
                              product.inventory > 10
                                ? 'bg-green-500/20 text-green-400'
                                : product.inventory > 5
                                  ? 'bg-yellow-500/20 text-yellow-400'
                                  : 'bg-red-500/20 text-red-400'
                            }`}>
                              {product.inventory > 10
                                ? 'In Stock'
                                : product.inventory > 5
                                  ? 'Low Stock'
                                  : 'Critical Stock'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-slate-800 text-white border-0">
              <CardHeader className="pb-2">
                <CardTitle>Inventory Status</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={metrics.inventoryHealth}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {metrics.inventoryHealth.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 text-white border-0">
              <CardHeader className="pb-2">
                <CardTitle>Inventory Insights</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div className="p-4 bg-gray-700 rounded-lg">
                    <h4 className="font-medium text-white mb-1">Inventory Turnover</h4>
                    <p className="text-sm text-gray-300 mb-2">How quickly products are selling relative to average inventory</p>
                    <div className="flex items-center">
                      <div className="text-xl font-bold text-blue-400 mr-2">4.2x</div>
                      <TrendingUp className="h-4 w-4 text-green-400" />
                      <span className="text-sm text-green-400 ml-1">+0.3 from last month</span>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-700 rounded-lg">
                    <h4 className="font-medium text-white mb-1">Days of Inventory</h4>
                    <p className="text-sm text-gray-300 mb-2">Average time to sell through current inventory</p>
                    <div className="flex items-center">
                      <div className="text-xl font-bold text-blue-400 mr-2">32 days</div>
                      <TrendingUp className="h-4 w-4 text-green-400" />
                      <span className="text-sm text-green-400 ml-1">-3 days from last month</span>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-700 rounded-lg">
                    <h4 className="font-medium text-white mb-1">Stockout Rate</h4>
                    <p className="text-sm text-gray-300 mb-2">Percentage of products currently out of stock</p>
                    <div className="flex items-center">
                      <div className="text-xl font-bold text-blue-400 mr-2">7.5%</div>
                      <TrendingUp className="h-4 w-4 text-red-400 transform rotate-180" />
                      <span className="text-sm text-red-400 ml-1">+1.2% from last month</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Customers Tab */}
        <TabsContent value="customers" className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-slate-800 text-white border-0">
              <CardHeader className="pb-2">
                <CardTitle>Customer Acquisition Channels</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={metrics.customerAcquisition}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {metrics.customerAcquisition.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 text-white border-0">
              <CardHeader className="pb-2">
                <CardTitle>Customer Metrics</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div className="p-4 bg-gray-700 rounded-lg">
                    <h4 className="font-medium text-white mb-1">Customer Lifetime Value</h4>
                    <p className="text-sm text-gray-300 mb-2">Average revenue generated by a customer over their relationship</p>
                    <div className="flex items-center">
                      <div className="text-xl font-bold text-blue-400 mr-2">$845.50</div>
                      <TrendingUp className="h-4 w-4 text-green-400" />
                      <span className="text-sm text-green-400 ml-1">+$35.20 from last month</span>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-700 rounded-lg">
                    <h4 className="font-medium text-white mb-1">Repeat Purchase Rate</h4>
                    <p className="text-sm text-gray-300 mb-2">Percentage of customers who make more than one purchase</p>
                    <div className="flex items-center">
                      <div className="text-xl font-bold text-blue-400 mr-2">28.5%</div>
                      <TrendingUp className="h-4 w-4 text-green-400" />
                      <span className="text-sm text-green-400 ml-1">+2.1% from last month</span>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-700 rounded-lg">
                    <h4 className="font-medium text-white mb-1">Customer Acquisition Cost</h4>
                    <p className="text-sm text-gray-300 mb-2">Average cost to acquire a new customer</p>
                    <div className="flex items-center">
                      <div className="text-xl font-bold text-blue-400 mr-2">$32.40</div>
                      <TrendingUp className="h-4 w-4 text-red-400 transform rotate-180" />
                      <span className="text-sm text-green-400 ml-1">-$1.85 from last month</span>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-700 rounded-lg">
                    <h4 className="font-medium text-white mb-1">Customer Retention Rate</h4>
                    <p className="text-sm text-gray-300 mb-2">Percentage of customers who remain active</p>
                    <div className="flex items-center">
                      <div className="text-xl font-bold text-blue-400 mr-2">72.3%</div>
                      <TrendingUp className="h-4 w-4 text-green-400" />
                      <span className="text-sm text-green-400 ml-1">+1.4% from last month</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Financial Metrics Tab */}
        <TabsContent value="financial" className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="bg-slate-800 text-white border-0 col-span-3">
              <CardHeader className="pb-2">
                <CardTitle>Financial & Revenue Metrics</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 bg-gray-700 rounded-lg">
                    <h4 className="font-medium text-white mb-1">Monthly Recurring Revenue (MRR)</h4>
                    <p className="text-sm text-gray-300 mb-2">Total predictable monthly revenue</p>
                    <div className="flex items-center">
                      <div className="text-xl font-bold text-blue-400 mr-2">${metrics.financialMetrics.mrr.toFixed(2)}</div>
                      <TrendingUp className="h-4 w-4 text-green-400" />
                      <span className="text-sm text-green-400 ml-1">+5.2% from last month</span>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-700 rounded-lg">
                    <h4 className="font-medium text-white mb-1">Annual Recurring Revenue (ARR)</h4>
                    <p className="text-sm text-gray-300 mb-2">Yearly revenue based on subscriptions</p>
                    <div className="flex items-center">
                      <div className="text-xl font-bold text-blue-400 mr-2">${metrics.financialMetrics.arr.toFixed(2)}</div>
                      <TrendingUp className="h-4 w-4 text-green-400" />
                      <span className="text-sm text-green-400 ml-1">+4.8% from last quarter</span>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-700 rounded-lg">
                    <h4 className="font-medium text-white mb-1">Average Revenue Per User (ARPU)</h4>
                    <p className="text-sm text-gray-300 mb-2">MRR divided by total number of customers</p>
                    <div className="flex items-center">
                      <div className="text-xl font-bold text-blue-400 mr-2">${metrics.financialMetrics.arpu.toFixed(2)}</div>
                      <TrendingUp className="h-4 w-4 text-green-400" />
                      <span className="text-sm text-green-400 ml-1">+$3.25 from last month</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 text-white border-0">
              <CardHeader className="pb-2">
                <CardTitle>Customer Lifetime Value</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { quarter: 'Q1', value: metrics.financialMetrics.clv - 145 },
                        { quarter: 'Q2', value: metrics.financialMetrics.clv - 75 },
                        { quarter: 'Q3', value: metrics.financialMetrics.clv - 25 },
                        { quarter: 'Q4', value: metrics.financialMetrics.clv }
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis dataKey="quarter" stroke="#888" />
                      <YAxis stroke="#888" />
                      <Tooltip formatter={(value) => [`$${value}`, 'CLV']} />
                      <Bar dataKey="value" name="CLV" fill="#8884d8" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4">
                  <h4 className="font-medium text-white mb-1">Customer Lifetime Value (CLV)</h4>
                  <p className="text-sm text-gray-300 mb-2">Predicted revenue from a customer over their lifetime</p>
                  <div className="flex items-center">
                    <div className="text-xl font-bold text-blue-400 mr-2">${metrics.financialMetrics.clv.toFixed(2)}</div>
                    <TrendingUp className="h-4 w-4 text-green-400" />
                    <span className="text-sm text-green-400 ml-1">+$35.20 from last quarter</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 text-white border-0">
              <CardHeader className="pb-2">
                <CardTitle>CAC & Gross Margin</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div className="p-4 bg-gray-700 rounded-lg">
                    <h4 className="font-medium text-white mb-1">Customer Acquisition Cost (CAC)</h4>
                    <p className="text-sm text-gray-300 mb-2">Total cost to acquire a new customer</p>
                    <div className="flex items-center">
                      <div className="text-xl font-bold text-blue-400 mr-2">${metrics.financialMetrics.cac.toFixed(2)}</div>
                      <TrendingUp className="h-4 w-4 text-red-400 transform rotate-180" />
                      <span className="text-sm text-green-400 ml-1">-$1.85 from last month</span>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-700 rounded-lg">
                    <h4 className="font-medium text-white mb-1">Gross Margin</h4>
                    <p className="text-sm text-gray-300 mb-2">(Total Revenue - Cost of Goods Sold) ÷ Total Revenue</p>
                    <div className="flex items-center">
                      <div className="text-xl font-bold text-blue-400 mr-2">{metrics.financialMetrics.grossMargin.toFixed(1)}%</div>
                      <TrendingUp className="h-4 w-4 text-green-400" />
                      <span className="text-sm text-green-400 ml-1">+1.2% from last month</span>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-700 rounded-lg">
                    <h4 className="font-medium text-white mb-1">CAC Payback Period</h4>
                    <p className="text-sm text-gray-300 mb-2">Time to recover the customer acquisition cost</p>
                    <div className="flex items-center">
                      <div className="text-xl font-bold text-blue-400 mr-2">{metrics.financialMetrics.cacPayback.toFixed(1)} months</div>
                      <TrendingUp className="h-4 w-4 text-red-400 transform rotate-180" />
                      <span className="text-sm text-green-400 ml-1">-0.3 months from last quarter</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 text-white border-0">
              <CardHeader className="pb-2">
                <CardTitle>Growth & Customer Metrics</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">Customer Growth Rate</span>
                      <span className="font-medium">{metrics.growthMetrics.customerGrowthRate.toFixed(1)}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-800 rounded-full">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${Math.min(metrics.growthMetrics.customerGrowthRate * 5, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">Customer Churn Rate</span>
                      <span className="font-medium">{metrics.growthMetrics.churnRate.toFixed(1)}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-800 rounded-full">
                      <div
                        className="h-full bg-red-500 rounded-full"
                        style={{ width: `${Math.min(metrics.growthMetrics.churnRate * 10, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">Net Revenue Retention (NRR)</span>
                      <span className="font-medium">{metrics.growthMetrics.nrr.toFixed(1)}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-800 rounded-full">
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${Math.min(metrics.growthMetrics.nrr - 50, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">Lead Conversion Rate</span>
                      <span className="font-medium">{metrics.growthMetrics.leadConversionRate.toFixed(1)}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-800 rounded-full">
                      <div
                        className="h-full bg-purple-500 rounded-full"
                        style={{ width: `${Math.min(metrics.growthMetrics.leadConversionRate * 10, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">Trial-to-Paid Conversion Rate</span>
                      <span className="font-medium">{metrics.growthMetrics.trialToPaidRate.toFixed(1)}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-800 rounded-full">
                      <div
                        className="h-full bg-amber-500 rounded-full"
                        style={{ width: `${Math.min(metrics.growthMetrics.trialToPaidRate, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 text-white border-0">
              <CardHeader className="pb-2">
                <CardTitle>Engagement & Usage Metrics</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div className="p-4 bg-gray-700 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-white">Daily Active Users (DAU)</h4>
                      <div className="text-xl font-bold text-blue-400">{metrics.engagementMetrics.dau}</div>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-white">Monthly Active Users (MAU)</h4>
                      <div className="text-xl font-bold text-blue-400">{metrics.engagementMetrics.mau}</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium text-white">DAU/MAU Ratio (Stickiness)</h4>
                      <div className="text-xl font-bold text-blue-400">{(metrics.engagementMetrics.dau / metrics.engagementMetrics.mau * 100).toFixed(1)}%</div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-700 rounded-lg">
                    <h4 className="font-medium text-white mb-1">Feature Adoption Rate</h4>
                    <p className="text-sm text-gray-300 mb-2">Percentage of users actively using specific features</p>
                    <div className="flex items-center">
                      <div className="text-xl font-bold text-blue-400 mr-2">{metrics.engagementMetrics.featureAdoptionRate.toFixed(1)}%</div>
                      <TrendingUp className="h-4 w-4 text-green-400" />
                      <span className="text-sm text-green-400 ml-1">+5.3% from last month</span>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-700 rounded-lg">
                    <h4 className="font-medium text-white mb-1">Average Session Duration</h4>
                    <p className="text-sm text-gray-300 mb-2">How long users engage with the platform</p>
                    <div className="flex items-center">
                      <div className="text-xl font-bold text-blue-400 mr-2">{metrics.engagementMetrics.averageSessionDuration.toFixed(1)} min</div>
                      <TrendingUp className="h-4 w-4 text-green-400" />
                      <span className="text-sm text-green-400 ml-1">+1.2 min from last month</span>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-700 rounded-lg">
                    <h4 className="font-medium text-white mb-1">Customer Satisfaction Score (CSAT)</h4>
                    <p className="text-sm text-gray-300 mb-2">Customer feedback on satisfaction after interactions</p>
                    <div className="flex items-center">
                      <div className="text-xl font-bold text-blue-400 mr-2">{metrics.engagementMetrics.csat.toFixed(1)}/5</div>
                      <TrendingUp className="h-4 w-4 text-green-400" />
                      <span className="text-sm text-green-400 ml-1">+0.2 from last quarter</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}