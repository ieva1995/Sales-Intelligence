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
  Star
} from "lucide-react";
import { Link } from "wouter";

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  href: string;
  isNew?: boolean;
}

const FeatureCard = ({ icon: Icon, title, description, href, isNew }: FeatureCardProps) => (
  <Link href={href}>
    <a className="block">
      <Card className="p-6 bg-slate-800 hover:bg-slate-700/80 transition-colors relative overflow-hidden group">
        <div className="flex items-start space-x-4">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <Icon className="h-6 w-6 text-blue-500" />
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors">{title}</h3>
            <p className="text-sm text-gray-400">{description}</p>
          </div>
        </div>
        {isNew && (
          <span className="absolute top-2 right-2 px-2 py-1 text-xs font-medium bg-blue-500/20 text-blue-400 rounded-full">
            New
          </span>
        )}
      </Card>
    </a>
  </Link>
);

const features = [
  {
    icon: FileText,
    title: "Smart Proposal Generator",
    description: "AI-powered proposals based on client behavior and RFP documents",
    href: "/features/smart-proposal",
    isNew: true
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

export default function DashboardFeatures() {
  return (
    <div className="mt-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">AI-Powered Features</h2>
        <p className="text-gray-400">Advanced tools to boost your sales performance</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </div>
  );
}