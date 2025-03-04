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
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
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
import { useState } from 'react';

function Header() {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <header className="header relative z-40">
      <div className="flex items-center justify-between h-full px-4 md:pl-72">
        {/* Hide search on mobile by default */}
        <div className="hidden md:flex items-center">
          <div className="relative w-[240px]">
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors ${
                isSearchFocused ? 'text-white' : 'text-green-300'
              }`} />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-10 h-9 rounded-full bg-green-500/20 border-green-600/20 text-white placeholder:text-green-300 focus:bg-green-500/30 focus:border-green-500/30"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </div>
          </div>
        </div>

        {/* Mobile search button */}
        <button
          className="md:hidden text-gray-400 hover:text-white"
          onClick={() => setIsSearchFocused(true)}
        >
          <Search className="h-5 w-5" />
        </button>

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

      {/* Mobile search overlay */}
      {isSearchFocused && (
        <>
          <div 
            className="fixed inset-0 bg-white/5 backdrop-blur-sm z-30" 
            onClick={() => setIsSearchFocused(false)} 
          />
          <div className="fixed inset-x-4 top-20 z-40 md:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-300" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full pl-10 h-9 rounded-full bg-green-500/20 border-green-600/20 text-white placeholder:text-green-300 focus:bg-green-500/30 focus:border-green-500/30"
                autoFocus
              />
            </div>
          </div>
        </>
      )}
    </header>
  );
}

function Router() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header />
      <main className="main-content">
        <div className="page-container">
          <Switch>
            <Route path="/" component={Dashboard} />
            <Route path="/crm" component={CRM} />
            <Route path="/marketing" component={Marketing} />
            <Route path="/content" component={Content} />
            <Route path="/commerce" component={Commerce} />
            <Route path="/commerce/overview" component={CommerceOverview} />
            <Route path="/automations" component={Automations} />
            <Route path="/reporting" component={Reporting} />
            <Route path="/data" component={DataManagement} />
            <Route path="/library" component={Library} />
            <Route path="/settings" component={Settings} />
            <Route path="/settings/login" component={Login} />
            <Route path="/trend-analysis" component={TrendAnalysis} />
            <Route path="/predictions" component={Predictions} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;