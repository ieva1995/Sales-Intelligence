import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { cn } from "@/lib/utils";
import { ChevronDown, Menu } from "lucide-react";
import { SiGooglelens, SiGoogleanalytics } from "react-icons/si";

interface LibraryMenuItem {
  label: string;
  href: string;
  hasSubmenu?: boolean;
  gradient?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

const menuItems: LibraryMenuItem[] = [
  { label: "Templates", href: "/library/templates", gradient: "from-blue-500 to-blue-600" },
  { label: "Meetings Scheduler", href: "/library/meetings", gradient: "from-green-500 to-green-600" },
  { label: "Files", href: "/library/files", gradient: "from-purple-500 to-purple-600" },
  { label: "Documents", href: "/library/documents", gradient: "from-pink-500 to-pink-600" },
  { label: "Google Trends Explorer", href: "/library/trends", gradient: "from-orange-500 to-orange-600", icon: SiGoogleanalytics },
  { label: "Playbooks", href: "/library/playbooks", gradient: "from-amber-500 to-amber-600" },
  { label: "Snippets", href: "/library/snippets", gradient: "from-red-500 to-red-600" },
  { label: "Coaching Playlists", href: "/library/coaching", gradient: "from-cyan-500 to-cyan-600" },
];

export default function LibraryMenu() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div className="relative">
      {/* Mobile Menu Button */}
      <button
        className="md:hidden flex items-center gap-2 px-4 py-3 text-black bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors w-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu className="h-5 w-5" />
        <span>Library Menu</span>
        <ChevronDown className={cn(
          "ml-auto h-5 w-5 transition-transform duration-200",
          isOpen && "rotate-180"
        )} />
      </button>

      {/* Menu Items */}
      <nav
        className={cn(
          "absolute left-0 right-0 bg-slate-800 text-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 ease-in-out z-50",
          "md:relative md:w-full md:bg-slate-700",
          isOpen ? "opacity-100 visible translate-y-2" : "opacity-0 invisible -translate-y-2 md:opacity-100 md:visible md:translate-y-0"
        )}
      >
        <div className="py-2">
          {menuItems.map((item) => (
            <Link 
              key={item.label} 
              href={item.href}
              onClick={() => setIsOpen(false)}
            >
              <a 
                className={cn(
                  "block px-6 py-3 text-gray-100 transition-all duration-200",
                  "relative group flex items-center justify-between",
                  "hover:scale-105 transform",
                  location === item.href
                    ? `bg-gradient-to-r ${item.gradient} text-white`
                    : "hover:text-white"
                )}
                onMouseEnter={() => setHoveredItem(item.label)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-r opacity-0 transition-opacity duration-200",
                  item.gradient,
                  (hoveredItem === item.label && location !== item.href) && "opacity-10"
                )} />
                <div className="relative z-10 flex items-center gap-2">
                  {item.icon && <item.icon className="h-4 w-4" />}
                  <span>{item.label}</span>
                </div>
                {item.hasSubmenu && (
                  <ChevronDown 
                    className={cn(
                      "h-4 w-4 text-gray-400 transition-all duration-200",
                      hoveredItem === item.label ? "rotate-180" : ""
                    )}
                  />
                )}
              </a>
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}