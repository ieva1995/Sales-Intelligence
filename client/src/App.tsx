import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import TrendAnalysis from "@/pages/trend-analysis";
import Predictions from "@/pages/predictions";
import Sidebar from "@/components/Sidebar";

function Router() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Dashboard} />
          <Route path="/trend-analysis" component={TrendAnalysis} />
          <Route path="/predictions" component={Predictions} />
          <Route component={NotFound} />
        </Switch>
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
