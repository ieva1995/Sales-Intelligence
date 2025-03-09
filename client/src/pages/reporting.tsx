import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const reportingItems = [
  { label: "Dashboards", href: "/reporting/dashboards" },
  { label: "Reports", href: "/reporting/reports" },
  { label: "Marketing Analytics", href: "/reporting/marketing-analytics" },
  { label: "Sales Analytics", href: "/reporting/sales-analytics" },
  { label: "Service Analytics", href: "/reporting/service-analytics" },
  { label: "Forecast", href: "/reporting/forecast" },
  { label: "Goals", href: "/reporting/goals" },
];

export default function Reporting() {
  return (
    <div className="p-4 sm:p-6">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Reporting</h1>
        <p className="text-sm sm:text-base text-muted-foreground">View and analyze your business performance</p>
      </div>

      <Card className="bg-slate-800">
        {reportingItems.map((item) => (
          <Link key={item.label} href={item.href}>
            <a className={cn(
              "block px-4 sm:px-6 py-4 sm:py-6 mt-[1px] text-gray-100 transition-all duration-200 hover:bg-slate-700/50",
              "text-xs sm:text-sm font-medium border-b border-slate-700/50 last:border-0"
            )}>
              {item.label}
            </a>
          </Link>
        ))}
      </Card>
    </div>
  );
}