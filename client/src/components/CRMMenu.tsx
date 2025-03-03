import { useState } from 'react';
import { Link } from 'wouter';
import { cn } from "@/lib/utils";

interface CRMMenuItem {
  label: string;
  href: string;
}

const menuItems: CRMMenuItem[] = [
  { label: "Contacts", href: "/crm/contacts" },
  { label: "Companies", href: "/crm/companies" },
  { label: "Deals", href: "/crm/deals" },
  { label: "Tickets", href: "/crm/tickets" },
  { label: "Lists", href: "/crm/lists" },
  { label: "Inbox", href: "/crm/inbox" },
  { label: "Calls", href: "/crm/calls" },
  { label: "Tasks", href: "/crm/tasks" },
];

export default function CRMMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-4 text-white bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        CRM Menu
      </button>

      {/* Menu Items */}
      <nav
        className={cn(
          "absolute left-0 bg-slate-700 text-white rounded-lg shadow-xl overflow-hidden w-48 transition-all duration-300 ease-in-out",
          // Mobile: Fade in/out
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