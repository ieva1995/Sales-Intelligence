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
  Settings,
} from "lucide-react";

export default function Sidebar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const navItems = [
    { href: "/", icon: BarChart2, label: "Dashboard", gradient: "from-blue-500 to-blue-600" },
    { href: "/crm", icon: Users, label: "CRM", gradient: "from-green-500 to-green-600" },
    { href: "/marketing", icon: MessageSquare, label: "Marketing", gradient: "from-purple-500 to-purple-600" },
    { href: "/content", icon: FileText, label: "Content", gradient: "from-pink-500 to-pink-600" },
    { href: "/commerce", icon: ShoppingBag, label: "Commerce", gradient: "from-amber-500 to-amber-600" },
    { href: "/automations", icon: Zap, label: "Automations", gradient: "from-red-500 to-red-600" },
    { href: "/reporting", icon: TrendingUp, label: "Reporting", gradient: "from-cyan-500 to-cyan-600" },
    { href: "/data", icon: Database, label: "Data Management", gradient: "from-indigo-500 to-indigo-600" },
    { href: "/library", icon: Library, label: "Library", gradient: "from-teal-500 to-teal-600" },
  ];

  return (
    <>
      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 left-0 h-full w-64 bg-slate-700 shadow-lg z-40 transition-transform duration-200 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
            SalesBoost AI
          </h2>
        </div>

        <nav className="space-y-1 px-3">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <a
                className={cn(
                  "flex items-center px-3 py-2 rounded-md text-sm font-medium cursor-pointer",
                  "transition-all duration-200 transform hover:scale-102",
                  "relative overflow-hidden group",
                  location === item.href
                    ? `bg-gradient-to-r ${item.gradient} text-white`
                    : "text-gray-300 hover:text-white"
                )}
                onMouseEnter={() => setHoveredItem(item.label)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => setIsOpen(false)}
              >
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-r opacity-0 transition-opacity duration-200",
                  item.gradient,
                  (hoveredItem === item.label && location !== item.href) && "opacity-10"
                )} />
                <item.icon
                  className={cn(
                    "mr-3 h-5 w-5 transition-all duration-500",
                    location === item.href
                      ? "animate-[pulse_2s_ease-in-out_infinite]"
                      : "group-hover:animate-[pulse_2s_ease-in-out_infinite]"
                  )}
                />
                <span className="relative z-10">{item.label}</span>
              </a>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <Link href="/settings/login">
            <a className="flex items-center px-3 py-2 text-sm font-medium text-gray-300 hover:bg-slate-600 hover:text-white rounded-md cursor-pointer group transition-all duration-200">
              <Settings className="mr-3 h-5 w-5 transition-transform duration-200 group-hover:animate-[pulse_2s_ease-in-out_infinite]" />
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