import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { PricingCard } from "@/components/ui/pricing-card";
import { createCheckoutSession } from "@/lib/stripe";
import {
  TrendingUp,
  Target,
  PieChart,
  Users,
  Mail,
  ShieldCheck
} from "lucide-react";

const pricingPlans = [
  {
    title: "Basic",
    price: "$99",
    description: "Essential tools for growing sales teams",
    priceId: "price_basic_monthly",
    features: [
      { text: "Lead Scoring AI", included: true },
      { text: "Basic Customer Insights", included: true },
      { text: "Email Campaign Tools", included: true },
      { text: "5 AI-Generated Proposals/month", included: true },
      { text: "Standard Support (Email)", included: true },
      { text: "Basic Analytics Dashboard", included: true },
      { text: "Team Collaboration", included: false },
      { text: "Advanced Analytics", included: false },
      { text: "Custom Integrations", included: false },
    ],
  },
  {
    title: "Professional",
    price: "$299",
    description: "Advanced features for professional sales teams",
    priceId: "price_pro_monthly",
    popular: true,
    features: [
      { text: "All Basic Features", included: true },
      { text: "Unlimited AI Proposals", included: true },
      { text: "Advanced Analytics & Reports", included: true },
      { text: "Custom Integrations", included: true },
      { text: "Priority Support (24/7)", included: true },
      { text: "Team Collaboration Tools", included: true },
      { text: "API Access", included: true },
      { text: "Custom Training Sessions", included: true },
      { text: "Dedicated Account Manager", included: true },
    ],
  },
  {
    title: "Enterprise",
    price: "Custom",
    description: "Custom solutions for large organizations",
    buttonText: "Contact Sales",
    features: [
      { text: "All Professional Features", included: true },
      { text: "Custom Development", included: true },
      { text: "White-Label Options", included: true },
      { text: "Enterprise SLA", included: true },
      { text: "Dedicated Support Team", included: true },
      { text: "On-premise Deployment", included: true },
      { text: "Custom AI Model Training", included: true },
      { text: "Advanced Security Features", included: true },
      { text: "Unlimited Users & Data", included: true },
    ],
  },
];

const salesTools = [
  {
    title: "Lead Scoring AI",
    description: "Automatically score and prioritize leads based on behavior patterns and engagement metrics",
    icon: Target,
    route: "/features/smart-tools/lead-scoring",
    metrics: {
      accuracy: "94%",
      timesSaved: "3.5h/day",
      roi: "+28%"
    }
  },
  {
    title: "Customer Insights Engine",
    description: "Deep-dive analytics into customer behavior and purchase patterns",
    icon: PieChart,
    route: "/features/smart-tools/customer-insights",
    metrics: {
      dataPoints: "500K+",
      accuracy: "96%",
      insights: "Daily"
    }
  },
  {
    title: "Sales Forecast Predictor",
    description: "AI-powered sales forecasting with market trend analysis",
    icon: TrendingUp,
    route: "/features/smart-tools/forecast",
    metrics: {
      accuracy: "92%",
      horizon: "12 months",
      confidence: "High"
    }
  },
  {
    title: "Account Intelligence",
    description: "Real-time company and contact research with actionable insights",
    icon: Users,
    route: "/features/smart-tools/account-intel",
    metrics: {
      coverage: "Global",
      updates: "Real-time",
      sources: "50+"
    }
  },
  {
    title: "Smart Email Campaigns",
    description: "AI-optimized email sequences with perfect timing and content",
    icon: Mail,
    route: "/features/smart-tools/email-campaigns",
    metrics: {
      openRate: "+45%",
      response: "+62%",
      conversion: "+38%"
    }
  },
  {
    title: "Deal Risk Analyzer",
    description: "Identify and mitigate risks in your sales pipeline",
    icon: ShieldCheck,
    route: "/features/smart-tools/risk-analyzer",
    metrics: {
      prevention: "85%",
      savings: "$2.4M",
      accuracy: "93%"
    }
  }
];

export default function SalesTools() {
  const { toast } = useToast();

  const handleSubscribe = async (priceId: string) => {
    try {
      await createCheckoutSession(priceId);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process subscription. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Header Section with Gradient Background */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Advanced Sales Performance Tools
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Enterprise-grade tools to supercharge your sales performance and revenue generation
            </p>
          </div>
        </div>
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]" />
      </div>

      {/* Pricing Section */}
      <div className="container mx-auto px-4 -mt-8">
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Choose Your Plan</h2>
            <p className="text-xl text-white/80">
              Get started with our flexible pricing plans
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {pricingPlans.map((plan) => (
              <PricingCard
                key={plan.title}
                {...plan}
                onSubscribe={handleSubscribe}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Tools Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Available Tools & Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {salesTools.map((tool) => (
            <Link key={tool.title} href={tool.route}>
              <Card className="cursor-pointer hover:bg-white/5 transition-colors bg-white/10 border-white/20">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <tool.icon className="h-6 w-6 text-blue-400" />
                    <CardTitle className="text-white">{tool.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 mb-4">{tool.description}</p>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    {Object.entries(tool.metrics).map(([key, value]) => (
                      <div key={key} className="text-center p-2 bg-white/5 rounded-lg">
                        <div className="font-bold text-blue-400">{value}</div>
                        <div className="text-xs text-white/60">{key}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}