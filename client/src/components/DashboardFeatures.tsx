import { Card } from "@/components/ui/card";
import {
  FileText,
  Brain,
  Settings,
  TrendingUp,
  Activity,
  BookOpen,
  Gift,
  Mail,
  BarChart,
  Star,
  Bot,
  Search,
  Send,
  Building,
  Users,
  Calculator,
  Lock,
  Package,
  ShoppingCart
} from "lucide-react";
import { Link } from "wouter";

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  href: string;
  isNew?: boolean;
  isEnterprise?: boolean;
}

const FeatureCard = ({ icon: Icon, title, description, href, isNew, isEnterprise }: FeatureCardProps) => (
  <Link href={href}>
    <a className="block">
      <Card className="bg-slate-800 hover:bg-slate-700/80 transition-colors relative overflow-hidden group">
        <div className="flex items-start space-x-3 p-4 sm:p-6">
          <div className="p-1.5 sm:p-2 bg-blue-500/10 rounded-lg">
            <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
          </div>
          <div className="space-y-1 sm:space-y-2 flex-1 pr-16 sm:pr-20">
            <h3 className="text-xs sm:text-sm font-medium text-gray-100 group-hover:text-blue-400 transition-colors">{title}</h3>
            <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">{description}</p>
          </div>
        </div>
        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex gap-1 sm:gap-2">
          {isNew && (
            <span className="px-1 sm:px-1.5 py-0.5 text-[9px] sm:text-[10px] font-medium bg-blue-500/20 text-blue-400 rounded-full">
              New
            </span>
          )}
          {isEnterprise && (
            <span className="px-1 sm:px-1.5 py-0.5 text-[9px] sm:text-[10px] font-medium bg-purple-500/20 text-purple-400 rounded-full">
              Enterprise
            </span>
          )}
        </div>
      </Card>
    </a>
  </Link>
);

const features = [
  {
    icon: ShoppingCart,
    title: "AI Product Recommendations",
    description: "Increase sales with AI-powered cross-sell and upsell recommendations",
    href: "/features/product-recommendations",
    isNew: true
  },
  {
    icon: FileText,
    title: "Smart Proposal Generator",
    description: "AI-powered proposals based on client behavior and RFP documents",
    href: "/features/smart-proposal"
  },
  {
    icon: Brain,
    title: "AI Deal Predictor",
    description: "Predict deal success and get smart follow-up suggestions",
    href: "/features/deal-predictor"
  },
  {
    icon: Settings,
    title: "Interactive Configurator",
    description: "Customize products with real-time pricing and ROI estimates",
    href: "/features/configurator"
  },
  {
    icon: TrendingUp,
    title: "Automated Upsell Brain",
    description: "Smart add-on suggestions based on similar client purchases",
    href: "/features/upsell"
  },
  {
    icon: Activity,
    title: "Intent Heatmap",
    description: "Track potential client engagement with visual heatmaps",
    href: "/features/heatmap"
  },
  {
    icon: BookOpen,
    title: "AI Case Study Finder",
    description: "Auto-recommend relevant case studies and white papers",
    href: "/features/case-studies"
  },
  {
    icon: Gift,
    title: "Invisible Loyalty Discounts",
    description: "Automatic discounts based on customer loyalty",
    href: "/features/loyalty"
  },
  {
    icon: Mail,
    title: "Silent Sales Agent",
    description: "Context-aware AI follow-up system",
    href: "/features/sales-agent"
  },
  {
    icon: BarChart,
    title: "POC Simulator",
    description: "Interactive product performance simulator",
    href: "/features/simulator"
  },
  {
    icon: Star,
    title: "Digital Reputation Score",
    description: "Score-based dynamic pricing system",
    href: "/features/reputation"
  }
];

const enterpriseFeatures = [
  {
    icon: Package,
    title: "Predictive Inventory AI",
    description: "Forecast inventory needs based on sales patterns and market trends",
    href: "/features/predictive-inventory",
    isEnterprise: true,
    isNew: true
  },
  {
    icon: Bot,
    title: "AI Whisper Bot",
    description: "Industry news analysis with targeted solution suggestions",
    href: "/features/whisper-bot",
    isEnterprise: true
  },
  {
    icon: Search,
    title: "Stealth Audit Tool",
    description: "Automated system analysis with instant problem detection",
    href: "/features/stealth-audit",
    isEnterprise: true
  },
  {
    icon: Send,
    title: "Auto Warm-Up Campaign",
    description: "Hyper-personalized decision-maker outreach system",
    href: "/features/warm-up",
    isEnterprise: true
  },
  {
    icon: Building,
    title: "Corporate Leech System™",
    description: "Tender and job posting analysis with automated offers",
    href: "/features/corporate-leech",
    isEnterprise: true
  },
  {
    icon: Users,
    title: "Secret Champion Hunter",
    description: "AI-powered internal advocate identification system",
    href: "/features/champion-hunter",
    isEnterprise: true
  },
  {
    icon: Calculator,
    title: "Instant ROI Calculator",
    description: "Dynamic savings calculator for every landing page",
    href: "/features/roi-calculator",
    isEnterprise: true
  },
  {
    icon: Lock,
    title: "Private BETA System",
    description: "Exclusive access management for selected companies",
    href: "/features/beta-system",
    isEnterprise: true
  }
];

export default function DashboardFeatures() {
  return (
    <div className="mt-6 sm:mt-8 space-y-6 sm:space-y-8">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-white">AI-Powered Features</h2>
        <p className="text-xs sm:text-sm text-gray-400">Advanced tools to boost your sales performance</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>

      <div className="mb-4 sm:mb-6 mt-8 sm:mt-12">
        <h2 className="text-xl sm:text-2xl font-bold text-white">Enterprise Turbo Sales Machine</h2>
        <p className="text-xs sm:text-sm text-gray-400">Premium enterprise-grade automation tools</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {enterpriseFeatures.map((feature, index) => (
          <FeatureCard key={`enterprise-${index}`} {...feature} />
        ))}
      </div>
    </div>
  );
}