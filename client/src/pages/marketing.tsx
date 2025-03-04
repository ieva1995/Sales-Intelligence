import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const marketingItems = [
  { label: "Campaigns", href: "/marketing/campaigns" },
  { label: "Email", href: "/marketing/email" },
  { label: "Social", href: "/marketing/social" },
  { label: "Ads", href: "/marketing/ads" },
  { label: "Events", href: "/marketing/events" },
  { label: "Forms", href: "/marketing/forms" },
  { label: "Buyer Intent", href: "/marketing/buyer-intent" },
  { label: "Lead Scoring", href: "/marketing/lead-scoring" },
];

export default function Marketing() {
  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Marketing</h1>
        <p className="text-muted-foreground">Manage your marketing campaigns and automation.</p>
      </div>

      <Card className="bg-slate-800">
        {marketingItems.map((item) => (
          <Link key={item.label} href={item.href}>
            <a className={cn(
              "block px-6 py-5 mt-[1px] text-gray-100 transition-all duration-200 hover:bg-slate-700/50",
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