import { useState } from 'react';
import { Link } from 'wouter';
import { cn } from "@/lib/utils";

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
      >
        <div className="py-2">
          {menuItems.map((item) => (
            <Link 
              key={item.label} 
              href={item.href}
              onClick={() => setIsOpen(false)}
            >
              <a className="block px-6 py-3 text-gray-100 hover:bg-slate-600 hover:text-white transition-colors">
                {item.label}
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