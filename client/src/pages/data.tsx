import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const dataItems = [
  { label: "Integrations", href: "/data/integrations" },
  { label: "Custom Events", href: "/data/custom-events" },
  { label: "Data Quality", href: "/data/quality" },
  { label: "Datasets", href: "/data/datasets" },
  { label: "Data Model", href: "/data/model" },
  { label: "Data Enrichment", href: "/data/enrichment" },
];

export default function DataManagement() {
  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Data Management</h1>
        <p className="text-muted-foreground">Manage your data integrations and transformations</p>
      </div>

      <Card className="bg-slate-800">
        {dataItems.map((item) => (
          <Link key={item.label} href={item.href}>
            <a className={cn(
              "block px-6 py-5 text-gray-100 transition-all duration-200 hover:bg-slate-700/50",
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