import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { cn } from "@/lib/utils";
import { ChevronUp } from "lucide-react";

interface MarketingMenuItem {
  label: string;
  href: string;
  hasSubmenu?: boolean;
  gradient?: string;
}

const menuItems: MarketingMenuItem[] = [
  { label: "Campaigns", href: "/marketing/campaigns", hasSubmenu: true, gradient: "from-blue-500 to-blue-600" },
  { label: "Email", href: "/marketing/email", gradient: "from-green-500 to-green-600" },
  { label: "Social", href: "/marketing/social", hasSubmenu: true, gradient: "from-purple-500 to-purple-600" },
  { label: "Ads", href: "/marketing/ads", gradient: "from-pink-500 to-pink-600" },
  { label: "Events", href: "/marketing/events", gradient: "from-amber-500 to-amber-600" },
  { label: "Forms", href: "/marketing/forms", gradient: "from-red-500 to-red-600" },
  { label: "Buyer Intent", href: "/marketing/buyer-intent", gradient: "from-cyan-500 to-cyan-600" },
  { label: "Lead Scoring", href: "/marketing/lead-scoring", hasSubmenu: true, gradient: "from-indigo-500 to-indigo-600" },
];

export default function MarketingMenu() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div className="relative">
      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-4 text-white bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        Marketing Menu
      </button>

      {/* Menu Items */}
      <nav
        className={cn(
          "absolute left-0 bg-slate-700 text-white rounded-lg shadow-xl overflow-hidden w-48 transition-all duration-300 ease-in-out",
          "md:relative md:w-full",
          isOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2 md:opacity-100 md:visible md:translate-y-0"
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
                <span className="relative z-10">{item.label}</span>
                {item.hasSubmenu && (
                  <ChevronUp 
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