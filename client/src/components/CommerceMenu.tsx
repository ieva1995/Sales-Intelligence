import { useState } from 'react';
import { Link } from 'wouter';
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface CommerceMenuItem {
  label: string;
  href: string;
}

const menuItems: CommerceMenuItem[] = [
  { label: "Overview", href: "/commerce/overview" },
  { label: "Payments", href: "/commerce/payments" },
  { label: "Invoices", href: "/commerce/invoices" },
  { label: "Payment Links", href: "/commerce/payment-links" },
  { label: "Quotes", href: "/commerce/quotes" },
  { label: "Products", href: "/commerce/products" },
  { label: "Subscriptions", href: "/commerce/subscriptions" },
];

export default function CommerceMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div className="relative">
      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-4 text-white bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        Commerce Menu
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
              <a 
                className={cn(
                  "block px-6 py-3 text-gray-100 hover:bg-slate-600 hover:text-white transition-all duration-200",
                  "relative group flex items-center justify-between",
                  hoveredItem === item.label && "bg-slate-600"
                )}
                onMouseEnter={() => setHoveredItem(item.label)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <span>{item.label}</span>
                <ChevronRight 
                  className={cn(
                    "h-4 w-4 text-gray-400 transition-transform duration-200",
                    hoveredItem === item.label ? "translate-x-1 opacity-100" : "opacity-0"
                  )}
                />
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