import { Switch, Route } from "wouter";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import TrendAnalysis from "@/pages/trend-analysis";
import Predictions from "@/pages/predictions";
import Marketing from "@/pages/marketing";
import CRM from "@/pages/crm";
import Content from "@/pages/content";
import Commerce from "@/pages/commerce";
import CommerceOverview from "@/pages/commerce/Overview";
import Automations from "@/pages/automations";
import Reporting from "@/pages/reporting";
import DataManagement from "@/pages/data";
import Library from "@/pages/library";
import TrendsExplorer from "@/pages/library/trends";
import Login from "@/pages/login";
import Settings from "@/pages/settings";
import SmartProposal from "@/pages/features/smart-proposal";
import Sidebar from "@/components/Sidebar";
import Header from "./components/Header";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Router() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 md:hidden z-50 text-black"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu className="h-6 w-6" />
      </Button>

      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <Header />
      <main className="main-content">
        <div className="page-container max-w-[1200px] mx-auto p-4 sm:p-6 md:p-8">
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
            <Route path="/library/trends" component={TrendsExplorer} />
            <Route path="/settings" component={Settings} />
            <Route path="/settings/login" component={Login} />
            <Route path="/trend-analysis" component={TrendAnalysis} />
            <Route path="/predictions" component={Predictions} />

            {/* AI-Powered Feature Routes */}
            <Route path="/features/smart-proposal" component={SmartProposal} />
            <Route path="/features/deal-predictor" component={() => <div>Deal Predictor - Coming Soon</div>} />
            <Route path="/features/configurator" component={() => <div>Product Configurator - Coming Soon</div>} />
            <Route path="/features/upsell" component={() => <div>Upsell Brain - Coming Soon</div>} />
            <Route path="/features/heatmap" component={() => <div>Intent Heatmap - Coming Soon</div>} />
            <Route path="/features/case-studies" component={() => <div>Case Study Finder - Coming Soon</div>} />
            <Route path="/features/loyalty" component={() => <div>Loyalty Discounts - Coming Soon</div>} />
            <Route path="/features/sales-agent" component={() => <div>Silent Sales Agent - Coming Soon</div>} />
            <Route path="/features/simulator" component={() => <div>POC Simulator - Coming Soon</div>} />
            <Route path="/features/reputation" component={() => <div>Digital Reputation Score - Coming Soon</div>} />

            <Route component={NotFound} />
          </Switch>
        </div>
      </main>
    </div>
  );
}