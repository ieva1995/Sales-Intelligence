import React from "react";
import { Link } from "wouter";
import { 
  Mail, 
  Users, 
  Clock, 
  PieChart, 
  BarChart, 
  ChartLine,
  LineChart,
  BarChart2 
} from "lucide-react";

const SolutionsDropdown = () => {
  const menuItems = [
    {
      title: "Sales Engagement",
      icon: <Mail className="h-5 w-5 text-indigo-500" />,
      path: "/solutions/sales-engagement"
    },
    {
      title: "Deal Management",
      icon: <PieChart className="h-5 w-5 text-indigo-500" />,
      path: "/solutions/deal-management"
    },
    {
      title: "Account-Based Selling",
      icon: <Users className="h-5 w-5 text-indigo-500" />,
      path: "/solutions/account-based-selling"
    },
    {
      title: "Revenue Intelligence",
      icon: <LineChart className="h-5 w-5 text-indigo-500" />,
      path: "/solutions/revenue-intelligence"
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

export default SolutionsDropdown;