import { useState } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  BarChart2,
  Users,
  MessageSquare,
  FileText,
  ShoppingBag,
  Zap,
  TrendingUp,
  Database,
  Library,
  Settings,
  Sparkles,
  Rocket,
  PieChart,
  Brain,
} from "lucide-react";
import NavigationPreview from "./NavigationPreview";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const mainNavItems = [
  { href: "/dashboard", icon: BarChart2, label: "Dashboard" },
  { href: "/crm", icon: Users, label: "CRM" },
  { href: "/marketing", icon: MessageSquare, label: "Marketing" },
  { href: "/content", icon: FileText, label: "Content" },
  { href: "/commerce", icon: ShoppingBag, label: "Commerce" },
  { href: "/automations", icon: Zap, label: "Automations" },
  { href: "/reporting", icon: TrendingUp, label: "Reporting" },
  { href: "/data", icon: Database, label: "Data Management" },
  { href: "/library", icon: Library, label: "Library" },
];

const premiumFeatures = [
  { href: "/features/smart-tools", icon: Sparkles, label: "Advanced Sales Tools" },
  { href: "/features/enterprise-turbo", icon: Rocket, label: "Enterprise Turbo" },
  { href: "/features/analytics-suite", icon: PieChart, label: "Analytics Suite" },
  { href: "/features/smart-sales-engine", icon: Brain, label: "S.L.A.S.E" },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [location] = useLocation();
  const [activePreview, setActivePreview] = useState<string | null>(null);
  const [previewPosition, setPreviewPosition] = useState<{ x: number; y: number } | null>(null);

  // Handle mouse enter on navigation item
  const handleMouseEnter = (path: string, e: React.MouseEvent) => {
    setActivePreview(path);
    setPreviewPosition({ x: e.clientX, y: e.clientY });
  };

  // Handle mouse leave on navigation item
  const handleMouseLeave = () => {
    setActivePreview(null);
    setPreviewPosition(null);
  };

  // Handle mouse move to update preview position
  const handleMouseMove = (e: React.MouseEvent) => {
    if (activePreview) {
      setPreviewPosition({ x: e.clientX, y: e.clientY });
    }
  };

  return (
    <>
      <div
        className={cn(
          "fixed top-0 left-0 h-full w-64 bg-slate-800 shadow-lg z-40 transition-transform duration-200 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
        onMouseMove={handleMouseMove}
      >
        <div className="p-5 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
            SalesBoost AI
          </h2>
        </div>

        <nav className="space-y-5 sm:space-y-6">
          {/* Main Navigation */}
          <div className="space-y-1">
            {mainNavItems.map((item) => (
              <Link key={item.label} href={item.href}>
                <a
                  className={cn(
                    "flex items-center px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-medium transition-all duration-200",
                    location === item.href
                      ? "text-white bg-slate-700"
                      : "text-gray-300 hover:text-white hover:bg-slate-700/50"
                  )}
                  onClick={onClose}
                  onMouseEnter={(e) => handleMouseEnter(item.href, e)}
                  onMouseLeave={handleMouseLeave}
                >
                  <item.icon className="mr-3 sm:mr-4 h-5 w-5" />
                  <span>{item.label}</span>
                </a>
              </Link>
            ))}
          </div>

          {/* Premium Features Section */}
          <div>
            <div className="px-5 sm:px-6 py-2">
              <h3 className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
                Premium Features
              </h3>
            </div>
            <div className="space-y-1">
              {premiumFeatures.map((item) => (
                <Link key={item.label} href={item.href}>
                  <a
                    className={cn(
                      "flex items-center px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-medium transition-all duration-200",
                      location === item.href
                        ? "text-white bg-gradient-to-r from-blue-600 to-purple-600"
                        : "text-gray-300 hover:text-white hover:bg-slate-700/50"
                    )}
                    onClick={onClose}
                    onMouseEnter={(e) => handleMouseEnter(item.href, e)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <item.icon className="mr-3 sm:mr-4 h-5 w-5" />
                    <span>{item.label}</span>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
          <Link href="/settings">
            <a 
              className="flex items-center px-3 sm:px-4 py-2 sm:py-2.5 text-sm font-medium text-gray-300 hover:bg-slate-700 hover:text-white rounded-md cursor-pointer transition-all duration-200"
              onMouseEnter={(e) => handleMouseEnter("/settings", e)}
              onMouseLeave={handleMouseLeave}
            >
              <Settings className="mr-3 sm:mr-4 h-5 w-5" />
              Settings
            </a>
          </Link>
        </div>
      </div>

      {/* Navigation Preview */}
      <NavigationPreview 
        path={activePreview || ""}
        isVisible={!!activePreview}
        position={previewPosition || undefined}
      />

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={onClose}
        />
      )}
    </>
  );
}