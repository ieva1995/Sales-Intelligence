import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Building2, 
  Users, 
  Cog, 
  ChevronRight, 
  BarChart2, 
  LineChart,
  PieChart,
  TrendingUp,
  ArrowRight
} from "lucide-react";

interface LoginOptionProps {
  title: string;
  icon: React.ElementType;
}

// Component for the landing page before login
const LandingPage = () => {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:30px_30px] pointer-events-none"></div>

      {/* Header */}
      <header className="relative z-10 border-b border-slate-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mr-10">
              SalesBoost AI
            </h1>
            <nav className="hidden md:block">
              <ul className="flex space-x-8">
                <li><a href="#" className="text-gray-300 hover:text-white">Features</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Solutions</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Pricing</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Resources</a></li>
              </ul>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              className="text-gray-300 hover:text-white"
              onClick={() => setLocation('/login')}
            >
              Log In
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-500"
              onClick={() => setLocation('/login')}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-6">
                Maximize <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Sales Success</span> Through Data Insights
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Transform your sales strategy with AI-powered analytics and real-time performance tracking for enterprise teams.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button className="bg-blue-600 hover:bg-blue-500 h-12 px-6 text-base">
                  Request Demo
                </Button>
                <Button variant="outline" className="border-gray-700 text-white hover:bg-slate-800 h-12 px-6 text-base">
                  Learn More <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center mt-10">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-950 bg-slate-700 flex items-center justify-center overflow-hidden">
                      <span className="text-xs font-medium text-white">{i}</span>
                    </div>
                  ))}
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium">Trusted by 1000+ sales teams</p>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                    <span className="ml-2 text-sm text-gray-300">4.9/5 (2.3k reviews)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="rounded-lg shadow-lg bg-slate-800/50 border border-slate-700 overflow-hidden">
                <div className="p-2">
                  <div className="flex space-x-2 mb-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="rounded overflow-hidden">
                    <img 
                      src="/attached_assets/Screenshot 2025-03-04 at 7.44.33 PM.png" 
                      alt="Dashboard Preview" 
                      className="w-full"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        // Fallback to colored div with chart icons
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          const div = document.createElement('div');
                          div.className = 'bg-slate-800 h-72 flex items-center justify-center space-x-4';
                          div.innerHTML = `
                            <div class="p-4 bg-slate-700 rounded-lg"><BarChart2 class="h-8 w-8 text-blue-500" /></div>
                            <div class="p-4 bg-slate-700 rounded-lg"><LineChart class="h-8 w-8 text-green-500" /></div>
                            <div class="p-4 bg-slate-700 rounded-lg"><PieChart class="h-8 w-8 text-purple-500" /></div>
                          `;
                          parent.appendChild(div);
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 bg-slate-900/50 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Innovative Approach To Fuel Your Sales Success</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Leverage AI-powered insights to transform your sales strategy and drive unprecedented growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
              <div className="grid grid-cols-2 gap-4 mb-8">
                {["Data Insights", "AI Predictions", "Market Trends", "Customer Behavior", "Sales Analytics", "Performance Metrics"].map((item, i) => (
                  <div key={i} className="bg-slate-700 rounded-full px-3 py-1 text-sm inline-flex items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                    {item}
                  </div>
                ))}
              </div>

              <div className="p-4 bg-slate-700 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-slate-800 rounded-md px-3 py-1 text-sm">Analytics Dashboard</div>
                  <div className="flex space-x-1">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className={`w-2 h-2 rounded-full ${i === 1 ? 'bg-white' : 'bg-slate-600'}`}></div>
                    ))}
                  </div>
                </div>
                <div className="h-40 bg-slate-800 rounded-md flex items-center justify-center">
                  <BarChart2 className="w-12 h-12 text-blue-500 opacity-50" />
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex border border-slate-700 rounded-xl">
                <div className="h-auto w-1/3 bg-gradient-to-br from-blue-600 to-blue-400 rounded-l-xl flex items-center justify-center">
                  <TrendingUp className="h-12 w-12 text-white" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Ticket Sales View of Sales Progress to Date</h3>
                  <p className="text-gray-300">Real-time visualization of your team's performance metrics and KPIs.</p>
                  <Button variant="link" className="px-0 text-blue-400 mt-2">
                    View analytics <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex border border-slate-700 rounded-xl">
                <div className="h-auto w-1/3 bg-gradient-to-br from-green-600 to-green-400 rounded-l-xl flex items-center justify-center">
                  <LineChart className="h-12 w-12 text-white" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">A Creative Approach To Drive Sales Success</h3>
                  <p className="text-gray-300">Innovative strategies powered by AI to optimize your sales funnel.</p>
                  <Button variant="link" className="px-0 text-blue-400 mt-2">
                    Explore strategies <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Globally Preferred By 1000+ World-Class Brands.</h2>
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-8">
                <div className="flex items-start">
                  <div className="text-orange-400 text-4xl mr-4">❝</div>
                  <div>
                    <p className="text-gray-300 mb-4">
                      "SalesBoost AI transformed our enterprise sales process with predictive analytics that increased close rates by 38% in just 3 months."
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-slate-700 mr-3"></div>
                      <div>
                        <p className="font-medium">Sarah Johnson</p>
                        <p className="text-sm text-gray-400">VP of Sales, TechCorp Inc.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-10">
                <div>
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold text-white">+120</span>
                  </div>
                  <p className="text-gray-400 mt-2">Enterprise clients</p>
                </div>
                <div>
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold text-white">4.9</span>
                  </div>
                  <p className="text-gray-400 mt-2">Customer rating</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6">Revolutionizing Your Innovative Sales Strategy</h3>
              <div className="space-y-6">
                {[
                  "Sign Up Your Account",
                  "Transforming Your Sales Approach",
                  "Accessing More Top-Notch Sales",
                  "Increasing Your Sales Data Plan"
                ].map((step, i) => (
                  <div key={i} className="flex">
                    <div className="mr-5">
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-medium text-white">
                        {i + 1}
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-lg">{step}</p>
                      <div className="mt-2 flex space-x-2">
                        <div className="w-2 h-2 rounded-full bg-gray-600"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-600"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-600"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-slate-800 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">Are you interested with SalesBrite?</h2>
              <p className="text-gray-300">Get started with our enterprise sales solution today.</p>
            </div>
            <Button className="mt-6 md:mt-0 bg-blue-600 hover:bg-blue-500 px-6 py-3 h-auto">
              Start Free Trial
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-12 border-t border-slate-800 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between mb-12">
            <div className="mb-8 md:mb-0">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-4">
                SalesBoost AI
              </h1>
              <p className="text-gray-400 max-w-xs">
                Enterprise-grade AI-powered sales analytics and performance tools.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-medium mb-4">Company</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white">About</a></li>
                  <li><a href="#" className="hover:text-white">Careers</a></li>
                  <li><a href="#" className="hover:text-white">Blog</a></li>
                  <li><a href="#" className="hover:text-white">Press</a></li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-4">Legal</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white">Privacy</a></li>
                  <li><a href="#" className="hover:text-white">Terms</a></li>
                  <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
                  <li><a href="#" className="hover:text-white">Contact</a></li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-4">Features</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white">Analytics</a></li>
                  <li><a href="#" className="hover:text-white">Forecasting</a></li>
                  <li><a href="#" className="hover:text-white">Reporting</a></li>
                  <li><a href="#" className="hover:text-white">Integrations</a></li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-4">Social</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white">Twitter</a></li>
                  <li><a href="#" className="hover:text-white">LinkedIn</a></li>
                  <li><a href="#" className="hover:text-white">Facebook</a></li>
                  <li><a href="#" className="hover:text-white">Instagram</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2025 SalesBoost AI. All rights reserved.</p>
            {/* Removed the "Made with ♥ Globally" text as requested */}
          </div>
        </div>
      </footer>
    </div>
  );
};

// LoginForm component for when user clicks "Log In"
const LoginForm = () => {
  const [, setLocation] = useLocation();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });

  const loginOptions: LoginOptionProps[] = [
    { title: "Enterprise", icon: Building2 },
    { title: "Client", icon: Users },
    { title: "IT", icon: Cog }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email && formData.password) {
      setLocation('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-2xl backdrop-blur-xl">
        <CardContent className="p-8 space-y-6">
          <div className="text-center space-y-2 mb-8">
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              SalesBoost AI
            </h1>
            <p className="text-gray-400">
              {selectedRole 
                ? "Please enter your details to access dashboard" 
                : "Please select your login type"
              }
            </p>
          </div>

          {!selectedRole ? (
            <div className="grid gap-4">
              {loginOptions.map((option) => (
                <Button
                  key={option.title}
                  variant="outline"
                  className="w-full bg-slate-800/50 hover:bg-slate-800 text-white border-slate-700 h-14"
                  onClick={() => setSelectedRole(option.title)}
                >
                  <option.icon className="w-5 h-5 mr-2" />
                  {option.title} Login
                </Button>
              ))}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="E-mail Address *"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-slate-800/50 border-slate-700 text-white placeholder:text-gray-500 h-11"
                  required
                />
              </div>

              <div>
                <Input
                  type="password"
                  placeholder="Password *"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="bg-slate-800/50 border-slate-700 text-white placeholder:text-gray-500 h-11"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, rememberMe: checked as boolean })
                    }
                    className="border-slate-700 data-[state=checked]:bg-blue-600"
                  />
                  <label htmlFor="remember" className="text-sm text-gray-400 cursor-pointer">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm text-blue-500 hover:text-blue-400">
                  Forgot Password?
                </a>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white h-11"
              >
                Sign In
              </Button>

              <div className="text-center text-sm">
                <p className="text-gray-400">
                  Don't have an account yet?{' '}
                  <a href="#" className="text-blue-500 hover:text-blue-400">Sign Up</a>
                </p>
              </div>
            </form>
          )}

          {selectedRole && (
            <div className="absolute top-4 left-4">
              <Button
                variant="ghost"
                className="text-gray-400 hover:text-white"
                onClick={() => setSelectedRole(null)}
              >
                ← Back
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default function Login() {
  const [location] = useLocation();

  // If the URL is exactly '/login', show the login form
  // Otherwise, show the landing page
  const isLoginPage = location === "/login";

  return isLoginPage ? <LoginForm /> : <LandingPage />;
}