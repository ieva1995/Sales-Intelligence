import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const automationItems = [
  { label: "Workflows", href: "/automations/workflows" },
  { label: "Sequences", href: "/automations/sequences" },
  { label: "Rules", href: "/automations/rules" },
  { label: "Webhooks", href: "/automations/webhooks" },
  { label: "Contact Actions", href: "/automations/contact-actions" },
  { label: "Custom Actions", href: "/automations/custom-actions" },
  { label: "API Triggers", href: "/automations/api-triggers" },
  { label: "Integration Actions", href: "/automations/integration-actions" },
];

export default function Automations() {
  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Automations</h1>
        <p className="text-muted-foreground">Create and manage your automated workflows.</p>
      </div>

      <Card className="bg-slate-800">
        {automationItems.map((item) => (
          <Link key={item.label} href={item.href}>
            <a className={cn(
              "block px-6 py-3 text-gray-100 transition-all duration-200 hover:bg-slate-700/50",
              "text-sm font-medium"
            )}>
              {item.label}
            </a>
          </Link>
        ))}
      </Card>
    </div>
  );
}