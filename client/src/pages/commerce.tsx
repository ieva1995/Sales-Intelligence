import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const commerceItems = [
  { label: "Overview", href: "/commerce/overview" },
  { label: "Payments", href: "/commerce/payments" },
  { label: "Invoices", href: "/commerce/invoices" },
  { label: "Payment Links", href: "/commerce/payment-links" },
  { label: "Quotes", href: "/commerce/quotes" },
  { label: "Products", href: "/commerce/products" },
  { label: "Subscriptions", href: "/commerce/subscriptions" },
];

export default function Commerce() {
  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Commerce</h1>
        <p className="text-muted-foreground">Manage your business transactions and payments</p>
      </div>

      <Card className="bg-slate-800">
        {commerceItems.map((item) => (
          <Link key={item.label} href={item.href}>
            <a className={cn(
              "block px-6 py-6 mt-[1px] text-gray-100 transition-all duration-200 hover:bg-slate-700/50",
              "text-sm font-medium border-b border-slate-700/50 last:border-0"
            )}>
              {item.label}
            </a>
          </Link>
        ))}
      </Card>
    </div>
  );
}