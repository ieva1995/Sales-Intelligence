import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Zap,
  Robot,
  Workflow,
  GitBranch,
  LineChart,
  Settings,
  Shield,
  RefreshCw
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { PricingCard } from "@/components/ui/pricing-card";
import { createCheckoutSession } from "@/lib/stripe";

const automationTools = [
  {
    title: "Pipeline Automation",
    description: "Automated lead nurturing and deal progression",
    icon: GitBranch,
    metrics: {
      efficiency: "+75%",
      deals: "2.4x more",
      time: "-65%"
    },
    route: "/features/enterprise-turbo/pipeline"
  },
  {
    title: "Smart Workflow Engine",
    description: "Custom workflow automation for your sales process",
    icon: Workflow,
    metrics: {
      automated: "85%",
      errors: "-92%",
      speed: "3x faster"
    },
    route: "/features/enterprise-turbo/workflow"
  },
  {
    title: "AI Sales Assistant",
    description: "24/7 AI-powered sales support and customer engagement",
    icon: Robot,
    metrics: {
      response: "24/7",
      handling: "92%",
      satisfaction: "96%"
    },
    route: "/features/enterprise-turbo/ai-assistant"
  },
  {
    title: "Performance Analytics",
    description: "Real-time performance tracking and optimization",
    icon: LineChart,
    metrics: {
      insights: "Real-time",
      metrics: "50+",
      reports: "Automated"
    },
    route: "/features/enterprise-turbo/analytics"
  }
];

export default function EnterpriseTurbo() {
  const { toast } = useToast();
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const handleDeploy = (toolTitle: string) => {
    setActiveTool(toolTitle);
    toast({
      title: `Deploying ${toolTitle}`,
      description: "Setting up your automation workflow...",
    });
  };

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

  const pricingPlans = [
    {
      title: "Starter",
      price: "$499",
      description: "Essential automation for growing enterprises",
      priceId: "price_turbo_starter_monthly",
      features: [
        { text: "Pipeline Automation", included: true },
        { text: "Smart Workflow Engine", included: true },
        { text: "Basic AI Assistant", included: true },
        { text: "Standard Analytics", included: true },
        { text: "Up to 10 Users", included: true },
        { text: "5 Automated Workflows", included: true },
        { text: "Custom Integrations", included: false },
        { text: "Advanced Security", included: false },
        { text: "24/7 Support", included: false },
      ],
    },
    {
      title: "Business",
      price: "$999",
      description: "Advanced automation for established businesses",
      priceId: "price_turbo_business_monthly",
      popular: true,
      features: [
        { text: "All Starter Features", included: true },
        { text: "Advanced AI Assistant", included: true },
        { text: "Custom Integrations", included: true },
        { text: "Advanced Analytics", included: true },
        { text: "Unlimited Users", included: true },
        { text: "Unlimited Workflows", included: true },
        { text: "Priority Support", included: true },
        { text: "Team Training", included: true },
        { text: "ROI Tracking", included: true },
      ],
    },
    {
      title: "Enterprise",
      price: "Custom",
      description: "Custom automation solutions for large organizations",
      buttonText: "Contact Sales",
      features: [
        { text: "All Business Features", included: true },
        { text: "Custom Development", included: true },
        { text: "Dedicated Support Team", included: true },
        { text: "Enterprise SLA", included: true },
        { text: "Custom Security Policies", included: true },
        { text: "On-premise Deployment", included: true },
        { text: "Custom AI Training", included: true },
        { text: "Multi-Region Support", included: true },
        { text: "Compliance Management", included: true },
      ],
    },
  ];

  return (
    <div className="p-6 space-y-8">
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Zap className="h-8 w-8 text-yellow-500" />
          <h1 className="text-3xl font-bold">Enterprise Turbo Sales Machine</h1>
        </div>
        <p className="text-xl text-muted-foreground">
          Premium enterprise-grade automation tools to transform your sales operations
        </p>
      </div>

      {/* Pricing Section - Moved up for visibility */}
      <div className="py-12 bg-accent/5 rounded-lg">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Enterprise Pricing Plans</h2>
          <p className="text-muted-foreground mt-2 text-lg">
            Scale your sales automation with our enterprise-grade solutions
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
          {pricingPlans.map((plan) => (
            <PricingCard
              key={plan.title}
              {...plan}
              onSubscribe={handleSubscribe}
            />
          ))}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Available Automation Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {automationTools.map((tool) => (
            <Card key={tool.title} className="overflow-hidden border-2 border-accent">
              <CardHeader className="bg-accent/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <tool.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>{tool.title}</CardTitle>
                      <CardDescription>{tool.description}</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {Object.entries(tool.metrics).map(([key, value]) => (
                    <div key={key} className="text-center p-3 bg-accent/10 rounded-lg">
                      <div className="text-lg font-bold text-primary">{value}</div>
                      <div className="text-sm text-muted-foreground capitalize">{key}</div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between space-x-4">
                  <Link href={tool.route} className="flex-1">
                    <Button variant="outline" className="w-full">
                      <Settings className="mr-2 h-4 w-4" />
                      Configure
                    </Button>
                  </Link>
                  <Button
                    className="flex-1"
                    onClick={() => handleDeploy(tool.title)}
                    disabled={activeTool === tool.title}
                  >
                    {activeTool === tool.title ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Deploying...
                      </>
                    ) : (
                      <>
                        <Zap className="mr-2 h-4 w-4" />
                        Deploy Now
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-12 p-6 bg-accent/10 rounded-lg">
        <div className="flex items-center space-x-3 mb-4">
          <Shield className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-semibold">Enterprise Benefits</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4">
            <h3 className="font-semibold mb-2">Dedicated Support</h3>
            <p className="text-muted-foreground">24/7 priority support with dedicated success manager</p>
          </div>
          <div className="p-4">
            <h3 className="font-semibold mb-2">Custom Integration</h3>
            <p className="text-muted-foreground">Custom API integration with your existing tools</p>
          </div>
          <div className="p-4">
            <h3 className="font-semibold mb-2">Advanced Security</h3>
            <p className="text-muted-foreground">Enterprise-grade security and compliance</p>
          </div>
        </div>
      </div>
    </div>
  );
}