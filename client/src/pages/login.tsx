import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Users,
  Cog,
  ChevronRight,
  BarChart2,
  LineChart,
  PieChart,
  TrendingUp,
  ArrowRight,
  Mail,
  Lock,
  LogIn,
  AlertCircle,
  Info,
  ArrowLeft,
  Clock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "../hooks/use-auth";

interface LoginOptionProps {
  title: string;
  icon: React.ElementType;
}

// Component for the landing page before login
const LandingPage = () => {
  const [, setLocation] = useLocation();
  const [marketTrends, setMarketTrends] = useState([
    { id: 1, trend: "Ecommerce Growth", change: "+12%", icon: TrendingUp },
    { id: 2, trend: "Mobile Shopping", change: "+24%", icon: BarChart2 },
    { id: 3, trend: "Social Commerce", change: "+18%", icon: LineChart },
  ]);

  const [currentDate, setCurrentDate] = useState(new Date());

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
                <li><a href="/features" className="text-gray-300 hover:text-white">Features</a></li>
                <li><a href="/solutions" className="text-gray-300 hover:text-white">Solutions</a></li>
                <li><a href="/pricing" className="text-gray-300 hover:text-white">Pricing</a></li>
                <li><a href="/resources" className="text-gray-300 hover:text-white">Resources</a></li>
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
                  <div className="rounded overflow-hidden p-4">
                    <h3 className="text-white text-lg font-medium mb-4">Latest Market Trends</h3>
                    <div className="space-y-4">
                      {marketTrends.map((trend) => (
                        <div key={trend.id} className="bg-slate-700 rounded-lg p-3 flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="bg-blue-600/30 p-2 rounded-md mr-3">
                              <trend.icon className="h-5 w-5 text-blue-400" />
                            </div>
                            <span>{trend.trend}</span>
                          </div>
                          <span className="text-green-400 font-medium">{trend.change}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-600">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-medium text-slate-300">Real-time Updates</h4>
                        <span className="text-xs text-slate-400">Last updated: {currentDate.toLocaleTimeString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
                  <li><a href="/about" className="hover:text-white">About</a></li>
                  <li><a href="/careers" className="hover:text-white">Careers</a></li>
                  <li><a href="/blog" className="hover:text-white">Blog</a></li>
                  <li><a href="/press" className="hover:text-white">Press</a></li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-4">Legal</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="/privacy" className="hover:text-white">Privacy</a></li>
                  <li><a href="/terms" className="hover:text-white">Terms</a></li>
                  <li><a href="/cookies" className="hover:text-white">Cookie Policy</a></li>
                  <li><a href="/contact" className="hover:text-white">Contact</a></li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-4">Features</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="/analytics" className="hover:text-white">Analytics</a></li>
                  <li><a href="/forecasting" className="hover:text-white">Forecasting</a></li>
                  <li><a href="/reporting" className="hover:text-white">Reporting</a></li>
                  <li><a href="/integrations" className="hover:text-white">Integrations</a></li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-4">Social</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="https://twitter.com/salesboostai" target="_blank" rel="noopener noreferrer" className="hover:text-white">Twitter</a></li>
                  <li><a href="https://linkedin.com/company/salesboostai" target="_blank" rel="noopener noreferrer" className="hover:text-white">LinkedIn</a></li>
                  <li><a href="https://facebook.com/salesboostai" target="_blank" rel="noopener noreferrer" className="hover:text-white">Facebook</a></li>
                  <li><a href="https://instagram.com/salesboostai" target="_blank" rel="noopener noreferrer" className="hover:text-white">Instagram</a></li>
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

  // Use our secure authentication hook
  const { requestLoginToken, validateLoginToken, isLoading, isAuthenticated } = useAuth();

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

  // Handle requesting a token
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
      const result = await requestLoginToken(email);
      console.log("Token request result:", result);

      if (result.success) {
        toast({
          title: "Login token sent",
          description: result.message || "Please check your email for a login token.",
        });

        if (result.expiresAt) {
          setTokenExpiry(result.expiresAt);
        }

        // Explicitly set step to token
        setStep("token");
        console.log("Set step to token");

        // For demo purposes only - In a real application, the token would never be shown in the UI
        if (process.env.NODE_ENV === 'development' && result._devToken) {
          toast({
            title: "DEMO MODE: Login Token",
            description: `Token: ${result._devToken}`,
            variant: "default",
          });
        }
      } else {
        toast({
          title: "Failed to send token",
          description: result.message || "Please try again later.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Token request error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Handle validating a token
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
      const result = await validateLoginToken(email, token);

      if (result.success) {
        toast({
          title: "Login successful",
          description: "Welcome to SalesBoost AI!",
        });

        // Redirect to dashboard
        setLocation("/dashboard");
      } else {
        toast({
          title: "Invalid token",
          description: result.message || "Please check your token and try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Token validation error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Reset to email step
  const handleBackToEmail = () => {
    setStep("email");
    setToken("");
    setErrors({});
  };

  // Request a new token (resend)
  const handleResendToken = () => {
    handleRequestToken();
  };

  // If user is already logged in, redirect to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      setLocation('/dashboard');
    }
  }, [isAuthenticated, setLocation]);

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
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

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

  // Debug information - this helps us see what state the component is in
  console.log("Current step:", step);
  console.log("Email:", email);
  console.log("Token:", token);
  console.log("Errors:", errors);
  console.log("Token expiry:", tokenExpiry);
  console.log("Countdown:", countdown);

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
                ? "Enter your email to receive a secure one-time login token"
                : "Enter the verification token sent to your email"
              }
            </p>
          </div>

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
            <div className="text-center mt-2">
              <Button
                variant="link"
                className="text-xs text-slate-500 hover:text-slate-400"
                onClick={() => setShowLoginHelp(true)}
              >
                Show login instructions
              </Button>
            </div>
          )}

          <div className="space-y-4">
            {step === "email" ? (
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
              </>
            ) : (
              // Token validation screen
              <>
                <div className="relative">
                  <button
                    className="absolute top-0 left-0 text-gray-400 hover:text-white"
                    onClick={handleBackToEmail}
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                </div>

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
                      placeholder="Enter token sent to your email"
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

                <div className="text-center mt-4">
                  <Button
                    variant="link"
                    className="text-sm text-blue-400 hover:text-blue-300"
                    onClick={handleResendToken}
                    disabled={countdown > 0}
                  >
                    {countdown > 0
                      ? `Resend token in ${formatCountdown()}`
                      : "Didn't receive a token? Resend"
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