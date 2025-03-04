import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

const crmItems = [
  { label: "Contacts", href: "/crm/contacts" },
  { label: "Companies", href: "/crm/companies" },
  { label: "Deals", href: "/crm/deals" },
  { label: "Tickets", href: "/crm/tickets" },
  { label: "Lists", href: "/crm/lists" },
  { label: "Inbox", href: "/crm/inbox" },
  { label: "Calls", href: "/crm/calls" },
  { label: "Tasks", href: "/crm/tasks" },
];

export default function CRM() {
  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">CRM</h1>
        <p className="text-muted-foreground">Manage your contacts and leads.</p>
      </div>

      <Card className="bg-slate-800">
        <div className="py-2">
          {crmItems.map((item) => (
            <Link key={item.label} href={item.href}>
              <a className={cn(
                "block px-6 py-6 mt-[1px] text-gray-100 transition-all duration-200 hover:bg-slate-700/50",
                "text-sm font-medium border-b border-slate-700/50 last:border-0"
              )}>
                {item.label}
              </a>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}