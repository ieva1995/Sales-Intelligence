import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import TrendAnalysis from "@/pages/trend-analysis";
import Predictions from "@/pages/predictions";
import Marketing from "@/pages/marketing";
import CRM from "@/pages/crm";
import Sidebar from "@/components/Sidebar";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import Content from "@/pages/content";
import Commerce from "@/pages/commerce";
import CommerceOverview from "@/pages/commerce/Overview";
import Automations from "@/pages/automations";
import Reporting from "@/pages/reporting";
import DataManagement from "@/pages/data";
import Library from "@/pages/library";
import Login from "@/pages/login";
import Settings from "@/pages/settings";
import Router from "./Router";
import ChatButton from "@/components/AiChat/ChatButton";

function Header() {
  return (
    <header className="header relative z-40">
      <div className="flex items-center justify-end h-full px-4 md:pl-72">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="relative h-8 w-8 text-gray-400 hover:text-white"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
          </Button>
        </div>
      </div>
    </header>
  );
}


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <ChatButton />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;