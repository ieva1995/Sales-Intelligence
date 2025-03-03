import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { cn } from "@/lib/utils";
import { ChevronUp } from "lucide-react";

interface ContentMenuItem {
  label: string;
  href: string;
  hasSubmenu?: boolean;
  gradient?: string;
}

const menuItems: ContentMenuItem[] = [
  { label: "Website Pages", href: "/content/website-pages", gradient: "from-blue-500 to-blue-600" },
  { label: "Landing Pages", href: "/content/landing-pages", gradient: "from-green-500 to-green-600" },
  { label: "Blog", href: "/content/blog", gradient: "from-purple-500 to-purple-600" },
  { label: "Podcasts", href: "/content/podcasts", hasSubmenu: true, gradient: "from-pink-500 to-pink-600" },
  { label: "Case Studies", href: "/content/case-studies", hasSubmenu: true, gradient: "from-amber-500 to-amber-600" },
  { label: "Embeds", href: "/content/embeds", hasSubmenu: true, gradient: "from-red-500 to-red-600" },
  { label: "Knowledge Base", href: "/content/knowledge-base", hasSubmenu: true, gradient: "from-cyan-500 to-cyan-600" },
  { label: "Customer Portal", href: "/content/customer-portal", hasSubmenu: true, gradient: "from-indigo-500 to-indigo-600" },
  { label: "Remix", href: "/content/remix", hasSubmenu: true, gradient: "from-teal-500 to-teal-600" },
  { label: "SEO", href: "/content/seo", hasSubmenu: true, gradient: "from-violet-500 to-violet-600" },
  { label: "Memberships", href: "/content/memberships", hasSubmenu: true, gradient: "from-fuchsia-500 to-fuchsia-600" },
  { label: "Design Manager", href: "/content/design-manager", gradient: "from-rose-500 to-rose-600" },
];

export default function ContentMenu() {
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
        Content Menu
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