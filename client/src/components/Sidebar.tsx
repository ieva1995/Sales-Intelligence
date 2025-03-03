import { useState } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  BarChart2,
  ShoppingBag,
  Users,
  MessageSquare,
  FileText,
  Zap,
  TrendingUp,
  Database,
  Library,
  Menu,
  X,
  Settings
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
    { href: "/commerce", icon: ShoppingBag, label: "Commerce" },
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
          "fixed top-0 left-0 h-full w-64 bg-slate-700 shadow-lg z-40 transition-transform duration-200 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white">SalesBoost AI</h2>
        </div>

        <nav className="space-y-1 px-3">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <a
                className={cn(
                  "flex items-center px-3 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors duration-200",
                  location === item.href
                    ? "bg-slate-600 text-white"
                    : "text-gray-300 hover:bg-slate-600 hover:text-white"
                )}
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </a>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <Link href="/settings">
            <a className="flex items-center px-3 py-2 text-sm font-medium text-gray-300 hover:bg-slate-600 hover:text-white rounded-md cursor-pointer">
              <Settings className="mr-3 h-5 w-5" />
              Settings
            </a>
          </Link>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}