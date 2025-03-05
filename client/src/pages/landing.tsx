import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <div className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white opacity-10 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent mb-6">
              Sales Intelligence<br />
              <span>Reimagined</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Transform your e-commerce go-to-market strategy with AI-powered analytics, integrated Shopify data, and intelligent sales tools.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-6 text-lg">
                Get Started
              </Button>
              <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-800 px-8 py-6 text-lg">
                Request Demo
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Features That Drive Results</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Our integrated platform provides everything your sales team needs to exceed targets.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-800 p-6 rounded-lg">
              <div className="h-12 w-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">AI-Powered Analytics</h3>
              <p className="text-slate-400">Leverage advanced AI algorithms to uncover insights from your sales data and predict future trends.</p>
            </div>
            <div className="bg-slate-800 p-6 rounded-lg">
              <div className="h-12 w-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Shopify Integration</h3>
              <p className="text-slate-400">Seamlessly connect your Shopify store data for real-time inventory, order, and customer insights.</p>
            </div>
            <div className="bg-slate-800 p-6 rounded-lg">
              <div className="h-12 w-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Team Collaboration</h3>
              <p className="text-slate-400">Enable your team to work together efficiently with shared dashboards and collaborative tools.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12 mb-12">
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-4">
                Discover the Sales<br />Execution Platform
              </h2>
              <p className="text-slate-400 max-w-sm text-sm">
                See how SalesBoost helps your reps hit their quota and grow into sales leaders.
              </p>
              <div className="mt-6">
                <Button
                  size="sm"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
                >
                  Learn more
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-sm text-slate-300 mb-4">Platform</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="/platform" className="text-slate-400 hover:text-white">Platform overview</a></li>
                <li><a href="/sales-ai" className="text-slate-400 hover:text-white">Sales AI</a></li>
                <li><a href="/analytics" className="text-slate-400 hover:text-white">Analytics</a></li>
                <li><a href="/integrations" className="text-slate-400 hover:text-white">Integrations</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-sm text-slate-300 mb-4">Solutions</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="/solutions/sales" className="text-slate-400 hover:text-white">Sales engagement</a></li>
                <li><a href="/solutions/deals" className="text-slate-400 hover:text-white">Deal management</a></li>
                <li><a href="/solutions/accounts" className="text-slate-400 hover:text-white">Account-based selling</a></li>
                <li><a href="/solutions/revenue" className="text-slate-400 hover:text-white">Revenue intelligence</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-sm text-slate-300 mb-4">Why SalesBoost</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="/why-salesboost" className="text-slate-400 hover:text-white">Why choose SalesBoost?</a></li>
                <li><a href="/stories" className="text-slate-400 hover:text-white">Customer stories</a></li>
                <li><a href="/services" className="text-slate-400 hover:text-white">Services</a></li>
                <li><a href="/security" className="text-slate-400 hover:text-white">Security</a></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-slate-800">
            <div className="flex items-center space-x-4 text-sm text-slate-400">
              <a href="/privacy" className="hover:text-white">Privacy Policy</a>
              <a href="/terms" className="hover:text-white">Terms of Service</a>
              <a href="/cookies" className="hover:text-white">Cookies</a>
            </div>
            <div className="mt-4 sm:mt-0 text-sm text-slate-400">
              © 2025 SalesBoost, Inc. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}