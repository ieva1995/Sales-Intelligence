import { useLocation } from "wouter";
import { useState } from "react";
import { Button } from "./ui/button";
import { 
  Sparkles, 
  Rocket,
  PieChart,
  Bot,
  Monitor
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const premiumFeatures = [
  { href: "/features/smart-tools", icon: Sparkles, label: "Advanced Sales Tools" },
  { href: "/features/enterprise-turbo", icon: Rocket, label: "Enterprise Turbo" },
  { href: "/features/analytics-suite", icon: PieChart, label: "Analytics Suite" },
  { href: "/features/autonomous-sales-engine", icon: Bot, label: "S.L.A.S.E" },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [location] = useLocation();

  return (
    <div className="h-full w-64 bg-sidebar border-r border-slate-800">
      <nav className="flex flex-col gap-2 p-4">
        {premiumFeatures.map((feature) => (
          <Button
            key={feature.href}
            variant={location === feature.href ? "secondary" : "ghost"}
            className="w-full justify-start gap-2"
            asChild
          >
            <a href={feature.href}>
              <feature.icon className="h-4 w-4" />
              {feature.label}
            </a>
          </Button>
        ))}
      </nav>
    </div>
  );
}