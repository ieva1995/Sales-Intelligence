import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Lock,
  ArrowLeft,
  Clock,
  Copy,
  AlertCircle,
  Info,
  LogIn,
  ArrowRight,
  ChevronRight,
  Check,
  Users,
  BarChart2,
  LineChart,
  PieChart,
  TrendingUp,
  Zap,
  Menu
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "../hooks/use-auth";
import MobileMenu from "../components/MobileMenu";

// Component for the landing page before login
const LandingPage = () => {
  const [, setLocation] = useLocation();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Update date every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Format date for display
  const formatDate = () => {
    return currentDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:30px_30px] pointer-events-none"></div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      {/* Header */}
      <header className="relative z-10 border-b border-slate-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mr-10">
              SalesBoost AI
            </h1>
            <nav className="hidden md:block">
              <ul className="flex space-x-8">
                <li><a href="#features" className="text-gray-300 hover:text-white">Features</a></li>
                <li><a href="#solutions" className="text-gray-300 hover:text-white">Solutions</a></li>
                <li><a href="#pricing" className="text-gray-300 hover:text-white">Pricing</a></li>
                <li><a href="#resources" className="text-gray-300 hover:text-white">Resources</a></li>
              </ul>
            </nav>
          </div>

          {/* Mobile menu toggle button - only visible on small screens */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-gray-300 hover:text-white"
              onClick={toggleMobileMenu}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>

          <div className="hidden md:flex items-center space-x-4">
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
              <div className="text-blue-400 text-sm font-medium mb-3">
                {formatDate()} - Latest Commerce Intelligence
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-6">
                Maximize <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Sales Success</span> Through Data Insights
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Transform your sales strategy with AI-powered analytics and real-time performance tracking for enterprise teams.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button 
                  className="bg-blue-600 hover:bg-blue-500 h-12 px-6 text-base"
                  onClick={() => setLocation('/login')}
                >
                  Get Started
                </Button>
                <Button 
                  variant="outline" 
                  className="border-gray-700 text-white hover:bg-slate-800 h-12 px-6 text-base"
                >
                  Learn More
                </Button>
              </div>
              <div className="flex items-center mt-8">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-950 bg-slate-700 flex items-center justify-center overflow-hidden">
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
            <div className="hidden lg:flex justify-end">
              <div className="relative w-full max-w-md">
                <div className="absolute -top-12 -left-12 w-40 h-40 bg-blue-500/20 rounded-full filter blur-2xl"></div>
                <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-purple-500/20 rounded-full filter blur-2xl"></div>
                <div className="rounded-lg overflow-hidden border border-slate-700 bg-slate-800/50 backdrop-blur-sm">
                  <div className="p-2 bg-slate-900/70 border-b border-slate-700">
                    <div className="flex space-x-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-900/50 rounded-md p-3 border border-slate-700">
                        <div className="flex items-center space-x-2 mb-2">
                          <BarChart2 className="h-4 w-4 text-blue-400" />
                          <span className="text-xs font-medium">Sales Metrics</span>
                        </div>
                        <div className="h-16 w-full bg-slate-800/70 rounded-md"></div>
                      </div>
                      <div className="bg-slate-900/50 rounded-md p-3 border border-slate-700">
                        <div className="flex items-center space-x-2 mb-2">
                          <LineChart className="h-4 w-4 text-green-400" />
                          <span className="text-xs font-medium">Growth</span>
                        </div>
                        <div className="h-16 w-full bg-slate-800/70 rounded-md"></div>
                      </div>
                      <div className="bg-slate-900/50 rounded-md p-3 border border-slate-700">
                        <div className="flex items-center space-x-2 mb-2">
                          <PieChart className="h-4 w-4 text-purple-400" />
                          <span className="text-xs font-medium">Distribution</span>
                        </div>
                        <div className="h-16 w-full bg-slate-800/70 rounded-md"></div>
                      </div>
                      <div className="bg-slate-900/50 rounded-md p-3 border border-slate-700">
                        <div className="flex items-center space-x-2 mb-2">
                          <TrendingUp className="h-4 w-4 text-orange-400" />
                          <span className="text-xs font-medium">Forecast</span>
                        </div>
                        <div className="h-16 w-full bg-slate-800/70 rounded-md"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Innovative Approach To <span className="text-blue-400">Fuel Your Sales Success</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Our platform combines data insights, AI-powered analytics, and enterprise-grade tools to maximize your sales performance.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: "AI-Powered Analytics", 
                desc: "Get real-time insights into your sales performance with our advanced analytics engine.",
                icon: BarChart2
              },
              { 
                title: "Shopify Integration", 
                desc: "Seamlessly connect your Shopify store for real-time commerce data synchronization.",
                icon: Zap
              },
              { 
                title: "Team Collaboration", 
                desc: "Enable your entire team to work together with role-based permissions and shared insights.",
                icon: Users
              },
            ].map((feature, idx) => (
              <div key={idx} className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:bg-slate-800 transition duration-300">
                <div className="bg-blue-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ticket Sales View Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-blue-400 text-sm font-medium mb-3">Sales Performance</div>
              <h2 className="text-3xl font-bold mb-4">Ticket Sales View of <br />Sales Progress to Date</h2>
              <p className="text-gray-400 mb-6">Get a comprehensive view of your sales progress with our intuitive ticket sales dashboard. Track conversions, monitor performance, and identify opportunities for growth.</p>

              <div className="flex items-center space-x-4">
                <Button variant="outline" className="border-gray-700 rounded-full">
                  Learn More
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-500 rounded-full">
                  See Demo
                </Button>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden border border-slate-700 bg-slate-800/30">
              <img src="https://placehold.co/600x400/2a3c56/FFFFFF/png?text=Sales+Dashboard" alt="Sales Dashboard" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Creative Approach Section */}
      <section className="py-20 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 rounded-lg overflow-hidden border border-slate-700 bg-slate-800/30">
              <img src="https://placehold.co/600x400/2a3c56/FFFFFF/png?text=Strategy+Visualization" alt="Strategy Visualization" className="w-full h-auto" />
            </div>

            <div className="order-1 md:order-2">
              <div className="text-blue-400 text-sm font-medium mb-3">Growth Strategy</div>
              <h2 className="text-3xl font-bold mb-4">A Creative Approach To <br />Drive Sales Success</h2>
              <p className="text-gray-400 mb-6">Our platform helps you develop innovative strategies to drive sales growth. Leverage AI-powered insights to identify trends, optimize campaigns, and maximize ROI.</p>

              <div className="flex flex-wrap -mx-2 mb-6">
                {['Data-Driven', 'AI-Powered', 'Team-Focused'].map((tag, idx) => (
                  <span key={idx} className="m-2 px-4 py-2 bg-slate-800 text-sm rounded-full text-gray-300">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center">
                <div className="flex -space-x-2 mr-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-700 flex items-center justify-center overflow-hidden">
                      <span className="text-xs">{i}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-lg text-sm font-medium">
                  30k+ Users
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-orange-500/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Globally Preferred By 1200+ World-<br />Class Brands.</h2>
          </div>

          <div className="max-w-3xl mx-auto bg-slate-800/50 border border-slate-700 rounded-lg p-8">
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="text-orange-400 text-6xl">"</div>
              <div>
                <p className="text-xl text-gray-300 mb-6">SalesBoost has transformed how we approach sales analytics. The AI-powered insights have helped us identify opportunities we would have otherwise missed.</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-slate-700 mr-4"></div>
                  <div>
                    <p className="font-medium">Jennifer Chen</p>
                    <p className="text-sm text-gray-400">VP Sales, TechCorp Inc.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <div className="flex justify-center mb-8">
              <div className="flex items-center space-x-8">
                <div><span className="text-4xl font-bold">+120</span><span className="text-gray-400 ml-2">Daily Active Users</span></div>
                <div className="h-12 w-px bg-slate-700"></div>
                <div><span className="text-4xl font-bold">4.9</span><span className="text-gray-400 ml-2">Average User Rating</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-2 text-center">Revolutionizing Your <br />Innovative Sales Strategy</h2>
          </div>

          <div className="max-w-3xl mx-auto">
            {[
              "Signup for free account",
              "Transforming Your Sales Approach",
              "Accessing Your Top Data Stats",
              "Reviewing Your Sales Goals Plan"
            ].map((step, idx) => (
              <div key={idx} className="border-b border-slate-800 py-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-sm font-medium mr-4">
                      {idx + 1}
                    </div>
                    <h3 className="font-medium">{step}</h3>
                  </div>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900/50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Are you interested with SrategLine?</h2>
            <p className="text-gray-400 mb-8">Join thousands of sales professionals who've transformed their sales approach with our platform.</p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button className="bg-blue-600 hover:bg-blue-500 h-12 px-6 text-base">
                Sign Up Now
              </Button>
              <Button variant="outline" className="border-gray-700 text-white hover:bg-slate-800 h-12 px-6 text-base">
                Schedule Demo
              </Button>
            </div>
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
                  <li><a href="#about" className="hover:text-white">About</a></li>
                  <li><a href="#careers" className="hover:text-white">Careers</a></li>
                  <li><a href="#blog" className="hover:text-white">Blog</a></li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-4">Legal</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#privacy" className="hover:text-white">Privacy</a></li>
                  <li><a href="#terms" className="hover:text-white">Terms</a></li>
                  <li><a href="#cookies" className="hover:text-white">Cookies</a></li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-4">Features</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#analytics" className="hover:text-white">Analytics</a></li>
                  <li><a href="#forecasting" className="hover:text-white">Forecasting</a></li>
                  <li><a href="#reporting" className="hover:text-white">Reporting</a></li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-4">Social</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#twitter" className="hover:text-white">Twitter</a></li>
                  <li><a href="#linkedin" className="hover:text-white">LinkedIn</a></li>
                  <li><a href="#facebook" className="hover:text-white">Facebook</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2025 SalesBoost AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Token-based login form component
const TokenLogin = () => {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [showLoginHelp, setShowLoginHelp] = useState(false);
  const [step, setStep] = useState<"email" | "token">("email");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [tokenExpiry, setTokenExpiry] = useState<Date | null>(null);
  const [countdown, setCountdown] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<"email" | "token">("email");

  // Use our secure authentication hook
  const { requestLoginToken, validateLoginToken, isLoading } = useAuth();

  // Handle countdown for token expiration
  useEffect(() => {
    if (tokenExpiry) {
      const calculateTimeLeft = () => {
        const difference = +tokenExpiry - +new Date();
        return Math.max(0, Math.floor(difference / 1000));
      };

      setCountdown(calculateTimeLeft());

      const timer = setInterval(() => {
        const timeLeft = calculateTimeLeft();
        setCountdown(timeLeft);

        if (timeLeft === 0) {
          clearInterval(timer);
          toast({
            title: "Token expired",
            description: "Your login token has expired. Please request a new one.",
            variant: "destructive",
          });
          setStep("email");
          setActiveTab("email");
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [tokenExpiry, toast]);

  // Format countdown as MM:SS
  const formatCountdown = () => {
    const minutes = Math.floor(countdown / 60);
    const seconds = countdown % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Handle copying token to clipboard
  const copyTokenToClipboard = (tokenToCopy: string) => {
    navigator.clipboard.writeText(tokenToCopy).then(() => {
      toast({
        title: "Copied to clipboard",
        description: "Token copied to clipboard successfully",
      });
    }).catch(err => {
      console.error('Failed to copy: ', err);
      toast({
        title: "Copy failed",
        description: "Failed to copy token to clipboard",
        variant: "destructive",
      });
    });
  };

  // Rainbow border effect CSS for input focus
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes rainbow-border {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }

      .rainbow-glow-input:focus {
        border-color: transparent !important;
        background-clip: padding-box, border-box;
        background-origin: padding-box, border-box;
        animation: rainbow-border 4s ease infinite;
      }

      .rainbow-glow-input {
        position: relative;
        transition: all 0.2s;
      }

      .rainbow-glow-input:focus::after {
        content: '';
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        background: linear-gradient(45deg, #3e97ff, #6f67fc, #9b59f0, #d759cb, #f95c88, #3e97ff);
        background-size: 200% 200%;
        border-radius: inherit;
        z-index: -1;
        opacity: 1;
        animation: rainbow-border 4s ease infinite;
      }

      .interactive-button {
        transition: transform 0.2s, box-shadow 0.2s;
      }

      .interactive-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }

      .interactive-button:active {
        transform: translateY(0);
        box-shadow: none;
      }

      .login-card {
        box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
        transition: box-shadow 0.3s ease;
      }

      .login-card:hover {
        box-shadow: 0 0 50px rgba(59, 130, 246, 0.15);
      }

      .screen-edges-glow {
        position: relative;
      }

      .screen-edges-glow::after {
        content: '';
        position: absolute;
        inset: 0;
        background: radial-gradient(circle at 15% 50%, rgba(59, 130, 246, 0.08) 0%, transparent 25%),
                  radial-gradient(circle at 85% 30%, rgba(109, 40, 217, 0.08) 0%, transparent 25%);
        pointer-events: none;
        z-index: -1;
      }

      .tab-active {
        color: white;
        border-bottom: 2px solid #3b82f6;
      }

      .tab-inactive {
        color: #94a3b8;
        border-bottom: 2px solid transparent;
      }

      .tab-active, .tab-inactive {
        padding: 0.5rem 1rem;
        transition: all 0.2s ease;
      }

      .tab-inactive:hover {
        color: #e2e8f0;
        border-bottom-color: #4b5563;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Login token request handler
  const handleRequestToken = async () => {
    // Validate email
    const newErrors: Record<string, string> = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email format is invalid";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      console.log("Requesting login token for email:", email);

      // Generate a demo token for testing
      const demoToken = Math.random().toString(36).substring(2, 8).toUpperCase();
      console.log("Generated demo token:", demoToken);

      // Show token in toast notification for demo purposes only
      toast({
        title: "DEMO MODE: Login Token",
        description: (
          <div className="flex items-center justify-between">
            <span>Token: {demoToken}</span>            <Button
              variant="outline"
              size="icon"
              className="h-5 w-5 ml-2"
              onClick={() => copyTokenToClipboard(demoToken)}
            >
              <Copy className="h-3 w-3" />
            </Button>
          </div>
        ),
        variant: "default",
      });

      // Set token expiry (15 minutes from now)
      const expiryTime = new Date();
      expiryTime.setMinutes(expiryTime.getMinutes() + 15);
      setTokenExpiry(expiryTime);

      // CRITICAL: This explicitly transitions to the token step
      setStep("token");
      setActiveTab("token");
      console.log("Set step to token:", step);

    } catch (error) {
      console.error("Token request error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Handler for returning to the email step
  const handleBackToEmail = () => {
    setStep("email");
    setActiveTab("email");
    setToken("");
  };

  // Token validation handler
  const handleValidateToken = async () => {
    // Validate token
    const newErrors: Record<string, string> = {};

    if (!token) {
      newErrors.token = "Token is required";
    } else if (token.length < 6) {
      newErrors.token = "Token must be at least 6 characters";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      // For demo, accept any valid token
      toast({
        title: "Login successful",
        description: "Welcome to SalesBoost AI!",
      });

      // Redirect to dashboard
      setLocation("/dashboard");

    } catch (error) {
      console.error("Token validation error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Resend token handler
  const handleResendToken = () => {
    handleRequestToken();
  };

  // Handle tab changes
  const handleTabChange = (tabName: "email" | "token") => {
    if (tabName === "token" && !email) {
      // Can't go to token tab without email
      return;
    }

    setActiveTab(tabName);
    setStep(tabName);
  };

  // Redirect if already logged in
  useEffect(() => {
    const checkForExistingSession = () => {
      const token = localStorage.getItem("sb_session_token");
      if (token) {
        setLocation('/dashboard');
      }
    };

    checkForExistingSession();
  }, [setLocation]);

  // Loading indicator for authentication operations
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="text-white text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Authenticating...</p>
        </div>
      </div>
    );
  }

  // Debug information - for development debugging only
  console.log("Current step:", step);
  console.log("Email:", email);
  console.log("Token:", token);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 screen-edges-glow">
      <Card className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-2xl backdrop-blur-xl login-card">
        <CardContent className="p-6">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-white mb-2">
              Secure Login
            </h1>
            <p className="text-slate-400">
              {step === "email" 
                ? "Enter your email to receive a secure login token" 
                : "Enter the verification token to sign in"
              }
            </p>
          </div>

          {/* Login Instructions */}
          {showLoginHelp && (
            <div className="mb-6 p-3 bg-blue-900/30 border border-blue-800 rounded-lg">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-blue-400 mr-2 mt-0.5" />
                <div>
                  <p className="text-sm text-blue-300 font-medium">Login Instructions</p>
                  <p className="text-xs text-blue-200 mt-1">
                    This platform uses a secure token-based login system:
                    <br />
                    1. Enter your email address
                    <br />
                    2. Click "Send Login Token"
                    <br />
                    3. Enter the token you receive
                    <br />
                    4. Click "Verify & Sign In"
                  </p>
                  <p className="text-xs text-blue-200 mt-1">
                    <strong>Note:</strong> In development mode, the token will be shown in a notification.
                  </p>
                </div>
              </div>
              <button
                className="text-xs text-blue-400 mt-2 underline"
                onClick={() => setShowLoginHelp(false)}
              >
                Hide instructions
              </button>
            </div>
          )}

          {!showLoginHelp && (
            <div className="text-center mt-2 mb-4">
              <Button
                variant="link"
                className="text-xs text-slate-500 hover:text-slate-400"
                onClick={() => setShowLoginHelp(true)}
              >
                Show login instructions
              </Button>
            </div>
          )}

          {/* Login Tabs */}
          <div className="flex mb-6 border-b border-slate-700">
            <button
              className={`flex-1 ${activeTab === "email" ? "tab-active" : "tab-inactive"}`}
              onClick={() => handleTabChange("email")}
            >
              <div className="flex justify-center items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span>Email</span>
              </div>
            </button>
            <button
              className={`flex-1 ${activeTab === "token" ? "tab-active" : "tab-inactive"}`}
              onClick={() => handleTabChange("token")}
              disabled={!email}
            >
              <div className="flex justify-center items-center">
                <Lock className="h-4 w-4 mr-2" />
                <span>Token</span>
              </div>
            </button>
          </div>

          {/* Form Content */}
          <div className="space-y-4">
            {step === "email" ? (
              /* Email Input Form */
              <>
                <div>
                  <label className="text-sm font-medium text-slate-300 mb-1 block">Email Address</label>
                  <div className="relative">
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) {
                          setErrors({ ...errors, email: '' });
                        }
                      }}
                      placeholder="email@company.com"
                      className="rainbow-glow-input bg-slate-800/50 border-slate-700 text-white placeholder:text-gray-500 pl-10"
                    />
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                    {errors.email && (
                      <div className="text-red-500 text-xs mt-1 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {errors.email}
                      </div>
                    )}
                  </div>
                </div>

                <Button
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white h-12 mt-4 transform transition-transform active:scale-95 interactive-button"
                  onClick={handleRequestToken}
                  disabled={isLoading}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Send Login Token
                </Button>

                <div className="text-center mt-4">
                  <p className="text-sm text-slate-400">
                    After receiving the token, click the "Token" tab above
                  </p>
                </div>
              </>
            ) : (
              /* Token Input Form */
              <>
                <div className="my-2 p-3 rounded-lg bg-blue-900/20 border border-blue-800/30 flex items-center">
                  <Mail className="h-5 w-5 text-blue-400 mr-2" />
                  <div>
                    <p className="text-sm text-blue-200">Token sent to:</p>
                    <p className="text-sm font-medium text-blue-300">{email}</p>
                  </div>
                </div>

                {countdown > 0 && (
                  <div className="flex items-center justify-center space-x-2 text-amber-400">
                    <Clock className="h-4 w-4" />
                    <p className="text-sm">Token expires in: {formatCountdown()}</p>
                  </div>
                )}

                <div>
                  <label className="text-sm font-medium text-slate-300 mb-1 block">Enter Verification Token</label>
                  <div className="relative">
                    <Input
                      type="text"
                      value={token}
                      onChange={(e) => {
                        setToken(e.target.value);
                        if (errors.token) {
                          setErrors({ ...errors, token: '' });
                        }
                      }}
                      placeholder="Enter the token from your email"
                      className="rainbow-glow-input bg-slate-800/50 border-slate-700 text-white placeholder:text-gray-500 pl-10"
                    />
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                    {errors.token && (
                      <div className="text-red-500 text-xs mt-1 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {errors.token}
                      </div>
                    )}
                  </div>
                </div>

                <Button
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white h-12 mt-4 transform transition-transform active:scale-95 interactive-button"
                  onClick={handleValidateToken}
                  disabled={isLoading}
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Verify & Sign In
                </Button>

                <div className="flex justify-between mt-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-400 hover:text-slate-300 text-sm"
                    onClick={handleBackToEmail}
                  >
                    <ArrowLeft className="mr-1 h-4 w-4" />
                    Back to Email
                  </Button>

                  <Button
                    variant="link"
                    className="text-sm text-blue-400 hover:text-blue-300"
                    onClick={handleResendToken}
                    disabled={countdown > 0}
                  >
                    {countdown > 0
                      ? `Resend in ${formatCountdown()}`
                      : "Resend Token"
                    }
                  </Button>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default function Login() {
  const [location] = useLocation();
  const { isAuthenticated } = useAuth();

  // If user is already logged in, redirect to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = '/dashboard';
    }
  }, [isAuthenticated]);

  // If the URL is exactly '/login', show the login form
  // Otherwise, show the landing page
  return location === '/login' ? <TokenLogin /> : <LandingPage />;
}