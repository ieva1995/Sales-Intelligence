import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { BarChart2, TrendingUp, Brain } from "lucide-react";

export default function Sidebar() {
  const [location] = useLocation();

  const navItems = [
    { href: "/", icon: BarChart2, label: "Dashboard" },
    { href: "/trend-analysis", icon: TrendingUp, label: "Trend Analysis" },
    { href: "/predictions", icon: Brain, label: "ML Predictions" },
  ];

  return (
    <div className="h-screen w-64 bg-sidebar border-r border-border">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-sidebar-foreground">SalesBoost AI</h2>
      </div>
      <nav className="space-y-1 px-3">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <a
              className={cn(
                "flex items-center px-3 py-2 rounded-md text-sm font-medium",
                location === item.href
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </a>
          </Link>
        ))}
      </nav>
    </div>
  );
}
