import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Zap,
  Bot,
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
    icon: Bot,
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Hero Section with Gradient */}
      <div className="relative overflow-hidden bg-gradient-to-r from-yellow-600 to-red-600 py-16">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <Zap className="h-12 w-12 text-white" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Enterprise Turbo Sales Machine
            </h1>
          </div>
          <p className="text-xl text-center text-white/80 max-w-3xl mx-auto">
            Premium enterprise-grade automation tools to transform your sales operations
          </p>
        </div>
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]" />
      </div>

      {/* Pricing Section */}
      <div className="container mx-auto px-4 -mt-8">
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Enterprise Pricing Plans</h2>
            <p className="text-xl text-white/80">
              Scale your sales automation with our enterprise-grade solutions
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
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Available Automation Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {automationTools.map((tool) => (
            <Card key={tool.title} className="bg-white/10 border-white/20">
              <CardHeader className="bg-white/5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <tool.icon className="h-6 w-6 text-yellow-400" />
                    </div>
                    <div>
                      <CardTitle className="text-white">{tool.title}</CardTitle>
                      <CardDescription className="text-white/70">{tool.description}</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {Object.entries(tool.metrics).map(([key, value]) => (
                    <div key={key} className="text-center p-3 bg-white/5 rounded-lg">
                      <div className="text-lg font-bold text-yellow-400">{value}</div>
                      <div className="text-sm text-white/60 capitalize">{key}</div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between space-x-4">
                  <Link href={tool.route} className="flex-1">
                    <Button variant="outline" className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20">
                      <Settings className="mr-2 h-4 w-4" />
                      Configure
                    </Button>
                  </Link>
                  <Button
                    className="flex-1 bg-yellow-600 hover:bg-yellow-700"
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

      {/* Benefits Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-white/5 rounded-2xl p-8">
          <div className="flex items-center space-x-3 mb-8">
            <Shield className="h-8 w-8 text-yellow-400" />
            <h2 className="text-2xl font-bold text-white">Enterprise Benefits</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white/5 rounded-xl">
              <h3 className="font-semibold text-white mb-2">Dedicated Support</h3>
              <p className="text-white/70">24/7 priority support with dedicated success manager</p>
            </div>
            <div className="p-6 bg-white/5 rounded-xl">
              <h3 className="font-semibold text-white mb-2">Custom Integration</h3>
              <p className="text-white/70">Custom API integration with your existing tools</p>
            </div>
            <div className="p-6 bg-white/5 rounded-xl">
              <h3 className="font-semibold text-white mb-2">Advanced Security</h3>
              <p className="text-white/70">Enterprise-grade security and compliance</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}