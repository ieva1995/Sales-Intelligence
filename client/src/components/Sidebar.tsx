import { useState } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  BarChart2,
  ShoppingBag,
  Users,
  Package,
  DollarSign,
  TrendingUp,
  Brain,
  Menu,
  X,
  Settings,
  MessageSquare,
  Inbox,
  FileText,
  Database,
  Library,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/", icon: BarChart2, label: "Dashboard" },
    { href: "/crm", icon: Users, label: "CRM" },
    { href: "/marketing", icon: MessageSquare, label: "Marketing" },
    { href: "/content", icon: FileText, label: "Content" },
    { href: "/sales", icon: ShoppingBag, label: "Commerce" },
    { href: "/automations", icon: Zap, label: "Automations" },
    { href: "/reporting", icon: TrendingUp, label: "Reporting" },
    { href: "/data", icon: Database, label: "Data Management" },
    { href: "/library", icon: Library, label: "Library" },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 md:hidden z-50 text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Sidebar */}
      <div
        className={cn(
          "sidebar",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white">SalesBoost AI</h2>
        </div>

        <nav className="space-y-1 px-3">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex items-center px-3 py-2 rounded-md text-sm font-medium cursor-pointer",
                  location === item.href
                    ? "bg-gray-700 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                )}
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </div>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <Link href="/settings">
            <div className="flex items-center px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-md cursor-pointer">
              <Settings className="mr-3 h-5 w-5" />
              Settings
            </div>
          </Link>
        </div>
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