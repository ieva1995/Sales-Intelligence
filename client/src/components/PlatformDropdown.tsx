import React from "react";
import { Link } from "wouter";
import { 
  MessageCircle, 
  PieChart, 
  BarChart, 
  LineChart, 
  Activity, 
  Zap, 
  Milestone, 
  ClipboardCheck, 
  UserPlus 
} from "lucide-react";

const PlatformDropdown = () => {
  const menuItems = [
    {
      title: "What is SalesBoost?",
      icon: <MessageCircle className="h-5 w-5 text-indigo-500" />,
      path: "/platform/about"
    },
    {
      title: "Pipeline Management",
      icon: <PieChart className="h-5 w-5 text-indigo-500" />,
      path: "/platform/pipeline"
    },
    {
      title: "Sales Forecasting",
      icon: <BarChart className="h-5 w-5 text-indigo-500" />,
      path: "/platform/forecasting"
    },
    {
      title: "Deal Insights",
      icon: <Activity className="h-5 w-5 text-indigo-500" />,
      path: "/platform/insights"
    },
    {
      title: "Revenue Intelligence Software",
      icon: <LineChart className="h-5 w-5 text-indigo-500" />,
      path: "/platform/revenue"
    },
    {
      title: "Conversation Intelligence",
      icon: <Zap className="h-5 w-5 text-indigo-500" />,
      path: "/platform/conversation"
    },
    {
      title: "Mutual Action Plans",
      icon: <Milestone className="h-5 w-5 text-indigo-500" />,
      path: "/platform/action-plans"
    },
    {
      title: "Deal Management",
      icon: <ClipboardCheck className="h-5 w-5 text-indigo-500" />,
      path: "/platform/deal-management"
    },
    {
      title: "Rep Coaching",
      icon: <UserPlus className="h-5 w-5 text-indigo-500" />,
      path: "/platform/coaching"
    }
  ];

  return (
    <div className="absolute left-0 mt-1 w-80 bg-white rounded-md shadow-lg overflow-hidden z-50 transform origin-top-left transition-all duration-150 ease-in-out">
      <div className="py-2">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.path}
            className="flex items-center px-4 py-3 hover:bg-indigo-50 transition-colors group"
          >
            <div className="mr-3">{item.icon}</div>
            <span className="text-sm text-slate-800 font-medium group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-all">{item.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PlatformDropdown;