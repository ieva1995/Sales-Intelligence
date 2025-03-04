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
import Templates from "@/pages/library/templates";
import Meetings from "@/pages/library/meetings";
import Files from "@/pages/library/files";
import Documents from "@/pages/library/documents";
import TrendsExplorer from "@/pages/library/trends";
import Playbooks from "@/pages/library/playbooks";
import Snippets from "@/pages/library/snippets";
import Coaching from "@/pages/library/coaching";
import Login from "@/pages/login";
import Settings from "@/pages/settings";
import SmartProposal from "@/pages/features/smart-proposal";
import DealPredictor from "@/pages/features/deal-predictor";
import WhisperBot from "@/pages/features/whisper-bot";
import StealthAudit from "@/pages/features/stealth-audit";
import SmartTools from "@/pages/features/smart-tools";
import EnterpriseTurbo from "@/pages/features/enterprise-turbo";
import Contacts from "@/pages/contacts";
import Workflows from "@/pages/workflows";
import Reports from "@/pages/reports";
import Analytics from "@/pages/analytics";
import Sidebar from "@/components/Sidebar";
import Header from "./components/Header";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Router() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 md:hidden z-50"
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
            <Route path="/trend-analysis" component={TrendAnalysis} />
            <Route path="/predictions" component={Predictions} />
            <Route path="/crm" component={CRM} />
            <Route path="/marketing" component={Marketing} />
            <Route path="/content" component={Content} />
            <Route path="/commerce" component={Commerce} />
            <Route path="/commerce/overview" component={CommerceOverview} />
            <Route path="/automations" component={Automations} />
            <Route path="/reporting" component={Reporting} />
            <Route path="/data" component={DataManagement} />

            {/* Library Routes */}
            <Route path="/library" component={Library} />
            <Route path="/library/templates" component={Templates} />
            <Route path="/library/meetings" component={Meetings} />
            <Route path="/library/files" component={Files} />
            <Route path="/library/documents" component={Documents} />
            <Route path="/library/trends" component={TrendsExplorer} />
            <Route path="/library/playbooks" component={Playbooks} />
            <Route path="/library/snippets" component={Snippets} />
            <Route path="/library/coaching" component={Coaching} />

            <Route path="/settings" component={Settings} />
            <Route path="/settings/login" component={Login} />
            <Route path="/contacts" component={Contacts} />
            <Route path="/workflows" component={Workflows} />
            <Route path="/reports" component={Reports} />
            <Route path="/analytics" component={Analytics} />

            {/* Premium Features */}
            <Route path="/features/smart-tools" component={SmartTools} />
            <Route path="/features/enterprise-turbo" component={EnterpriseTurbo} />
            <Route path="/features/deal-predictor" component={DealPredictor} />
            <Route path="/features/smart-proposal" component={SmartProposal} />
            <Route path="/features/whisper-bot" component={WhisperBot} />
            <Route path="/features/stealth-audit" component={StealthAudit} />

            <Route component={NotFound} />
          </Switch>
        </div>
      </main>
    </div>
  );
}