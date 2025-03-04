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
import Login from "@/pages/login";
import Settings from "@/pages/settings";
import Sidebar from "@/components/Sidebar";
import Header from "./components/Header";

export default function Router() {
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
