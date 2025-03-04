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

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const libraryItems = [
  { label: "Templates", href: "/library/templates" },
  { label: "Meetings Scheduler", href: "/library/meetings" },
  { label: "Files", href: "/library/files" },
  { label: "Documents", href: "/library/documents" },
  { label: "Google Trends Explorer", href: "/library/trends" },
  { label: "Playbooks", href: "/library/playbooks" },
  { label: "Snippets", href: "/library/snippets" },
  { label: "Coaching Playlists", href: "/library/coaching" },
];

const mainNavItems = [
  { href: "/", icon: BarChart2, label: "Dashboard" },
  { href: "/crm", icon: Users, label: "CRM" },
  { href: "/marketing", icon: MessageSquare, label: "Marketing" },
  { href: "/content", icon: FileText, label: "Content" },
  { href: "/commerce", icon: ShoppingBag, label: "Commerce" },
  { href: "/automations", icon: Zap, label: "Automations" },
  { href: "/reporting", icon: TrendingUp, label: "Reporting" },
  { href: "/data", icon: Database, label: "Data Management" },
  { href: "/library", icon: Library, label: "Library", submenuItems: libraryItems },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [location] = useLocation();

  return (
    <>
      <div
        className={cn(
          "fixed top-0 left-0 h-full w-64 bg-slate-800 shadow-lg z-40 transition-transform duration-200 ease-in-out overflow-y-auto",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
            SalesBoost AI
          </h2>
        </div>

        <nav className="space-y-1">
          {mainNavItems.map((item) => {
            const isActive = location === item.href;
            const isLibrary = item.label === "Library";
            const showSubmenu = isLibrary && (location.startsWith("/library") || isOpen);

            return (
              <div key={item.label}>
                <Link href={item.href}>
                  <a
                    className={cn(
                      "flex items-center px-6 py-3 text-sm font-medium",
                      isActive
                        ? "text-white bg-slate-700"
                        : "text-gray-300 hover:text-white hover:bg-slate-700/50"
                    )}
                    onClick={onClose}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    <span>{item.label}</span>
                  </a>
                </Link>

                {showSubmenu && item.submenuItems && (
                  <div className="pl-4 py-2 space-y-1">
                    {item.submenuItems.map((subItem) => (
                      <Link key={subItem.label} href={subItem.href}>
                        <a
                          className={cn(
                            "block px-6 py-2 text-sm",
                            location === subItem.href
                              ? "text-white bg-slate-700"
                              : "text-gray-300 hover:text-white hover:bg-slate-700/50"
                          )}
                          onClick={onClose}
                        >
                          {subItem.label}
                        </a>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <Link href="/settings">
            <a className="flex items-center px-3 py-2 text-sm font-medium text-gray-300 hover:bg-slate-700 hover:text-white rounded-md cursor-pointer">
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
          onClick={onClose}
        />
      )}
    </>
  );
}