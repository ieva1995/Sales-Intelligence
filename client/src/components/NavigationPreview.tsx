import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Preview data structure
export interface PreviewData {
  title: string;
  description: string;
  icon?: React.ReactNode;
  stats?: Array<{
    label: string;
    value: string;
    trend?: "up" | "down" | "neutral";
  }>;
  imageSrc?: string;
}

// Default previews for different sections
export const navigationPreviews: Record<string, PreviewData> = {
  dashboard: {
    title: "Dashboard",
    description: "Your personalized overview of sales performance and insights",
    stats: [
      { label: "Sales Today", value: "$12,486", trend: "up" },
      { label: "Conversion Rate", value: "24.8%", trend: "up" },
      { label: "Active Customers", value: "1,249", trend: "neutral" }
    ]
  },
  commerce: {
    title: "Commerce",
    description: "Manage your e-commerce operations and store performance",
    stats: [
      { label: "Orders", value: "327", trend: "up" },
      { label: "Revenue", value: "$34,219", trend: "up" },
      { label: "Avg. Order Value", value: "$104.65", trend: "up" }
    ]
  },
  analytics: {
    title: "Analytics",
    description: "Detailed analysis of your business metrics and trends",
    stats: [
      { label: "Pageviews", value: "42,189", trend: "up" },
      { label: "Bounce Rate", value: "32.4%", trend: "down" },
      { label: "Session Duration", value: "3:24", trend: "up" }
    ]
  },
  marketing: {
    title: "Marketing",
    description: "Campaign management and performance tracking",
    stats: [
      { label: "Active Campaigns", value: "8", trend: "neutral" },
      { label: "Click Rate", value: "4.2%", trend: "up" },
      { label: "Lead Cost", value: "$13.42", trend: "down" }
    ]
  },
  content: {
    title: "Content",
    description: "Manage and optimize your content strategy",
    stats: [
      { label: "Published", value: "143", trend: "up" },
      { label: "Engagement", value: "28.7%", trend: "up" },
      { label: "Content ROI", value: "3.6x", trend: "up" }
    ]
  },
  library: {
    title: "Library",
    description: "Access sales resources, templates, and documents",
    stats: [
      { label: "Documents", value: "425", trend: "up" },
      { label: "Templates", value: "56", trend: "neutral" },
      { label: "Recent Uploads", value: "12", trend: "up" }
    ]
  }
};

interface NavigationPreviewProps {
  path: string;
  isVisible: boolean;
  position?: { x: number; y: number };
}

const NavigationPreview = ({ path, isVisible, position }: NavigationPreviewProps) => {
  // Extract the main section from the path
  const section = path.split("/")[1] || "dashboard";
  const previewData = navigationPreviews[section] || {
    title: "SalesBoost AI",
    description: "Navigate to view detailed information and analytics",
    stats: [
      { label: "Features", value: "20+", trend: "up" },
      { label: "Integrations", value: "15", trend: "neutral" },
      { label: "Productivity", value: "+45%", trend: "up" }
    ]
  };

  // Animation variants
  const previewVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 5 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      } 
    },
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      y: 5,
      transition: { 
        duration: 0.2 
      } 
    }
  };

  // Handle trend colors and icons
  const getTrendColor = (trend?: "up" | "down" | "neutral") => {
    if (trend === "up") return "text-green-400";
    if (trend === "down") return "text-red-400";
    return "text-blue-400";
  };

  const getTrendIcon = (trend?: "up" | "down" | "neutral") => {
    if (trend === "up") return "↑";
    if (trend === "down") return "↓";
    return "→";
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="absolute z-50 w-72 bg-slate-800 rounded-lg shadow-xl border border-slate-700 overflow-hidden"
          style={{
            top: position?.y ? position.y + 10 : "auto",
            left: position?.x ? position.x + 10 : "auto",
          }}
          variants={previewVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="p-4">
            <h3 className="text-lg font-semibold text-white mb-1">{previewData.title}</h3>
            <p className="text-sm text-gray-400 mb-4">{previewData.description}</p>
            
            {previewData.stats && (
              <div className="grid grid-cols-3 gap-2 mt-2">
                {previewData.stats.map((stat, index) => (
                  <div key={index} className="bg-slate-700/50 rounded-md p-2">
                    <p className="text-xs text-gray-400">{stat.label}</p>
                    <div className="flex items-center">
                      <span className="text-white font-medium">{stat.value}</span>
                      {stat.trend && (
                        <span className={`ml-1 text-xs ${getTrendColor(stat.trend)}`}>
                          {getTrendIcon(stat.trend)}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 h-1.5 w-full"></div>
          <div className="px-4 py-2 bg-slate-700/50 text-xs text-slate-400">
            Click to navigate
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NavigationPreview;
