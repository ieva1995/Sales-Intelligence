import { useState } from 'react';
import { Link } from 'wouter';
import { cn } from "@/lib/utils";
import { ChevronUp } from "lucide-react";

interface ContentMenuItem {
  label: string;
  href: string;
  hasSubmenu?: boolean;
}

const menuItems: ContentMenuItem[] = [
  { label: "Website Pages", href: "/content/website-pages" },
  { label: "Landing Pages", href: "/content/landing-pages" },
  { label: "Blog", href: "/content/blog" },
  { label: "Podcasts", href: "/content/podcasts", hasSubmenu: true },
  { label: "Case Studies", href: "/content/case-studies", hasSubmenu: true },
  { label: "Embeds", href: "/content/embeds", hasSubmenu: true },
  { label: "Knowledge Base", href: "/content/knowledge-base", hasSubmenu: true },
  { label: "Customer Portal", href: "/content/customer-portal", hasSubmenu: true },
  { label: "Remix", href: "/content/remix", hasSubmenu: true },
  { label: "SEO", href: "/content/seo", hasSubmenu: true },
  { label: "Memberships", href: "/content/memberships", hasSubmenu: true },
  { label: "Design Manager", href: "/content/design-manager" },
];

export default function ContentMenu() {
  const [isOpen, setIsOpen] = useState(false);

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
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div className="py-2">
          {menuItems.map((item) => (
            <Link 
              key={item.label} 
              href={item.href}
              onClick={() => setIsOpen(false)}
            >
              <a className="block px-6 py-3 text-gray-100 hover:bg-slate-600 hover:text-white transition-colors flex items-center justify-between">
                {item.label}
                {item.hasSubmenu && (
                  <ChevronUp className="h-4 w-4 text-gray-400" />
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
