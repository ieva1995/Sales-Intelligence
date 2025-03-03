import { useState } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { BarChart2, TrendingUp, Brain, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/", icon: BarChart2, label: "Dashboard" },
    { href: "/trend-analysis", icon: TrendingUp, label: "Trend Analysis" },
    { href: "/predictions", icon: Brain, label: "ML Predictions" },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 md:hidden z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 transform md:translate-x-0 transition-transform duration-200 ease-in-out z-40",
          "bg-sidebar border-r border-border w-64",
          "md:static",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold text-sidebar-foreground">SalesBoost AI</h2>
        </div>
        <nav className="space-y-1 px-3">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex items-center px-3 py-2 rounded-md text-sm font-medium cursor-pointer",
                  location === item.href
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </div>
            </Link>
          ))}
        </nav>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}