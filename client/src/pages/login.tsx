import { useState, useEffect, useRef } from "react";
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
  ArrowRight,
  ArrowLeft,
  Mail,
  Lock,
  GitHub,
  Twitter,
  Facebook,
  X,
  LogIn
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

// New enhanced login flow components
const WelcomeBack = ({ onContinue, onBackToOptions, onSignUpWithEmail }) => {
  return (
    <div className="text-center space-y-4">
      <h2 className="text-2xl font-bold mb-1">Welcome Back</h2>
      <p className="text-sm text-gray-400 mb-6">Stay informed and explore the latest stories. Let's dive into the newest!</p>

      <div className="space-y-3">
        <Button 
          className="w-full flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 h-12 interactive-button"
          onClick={onContinue}
        >
          <Mail className="mr-2 h-4 w-4" />
          Sign in with Email
        </Button>

        <Button 
          className="w-full flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 h-12 interactive-button"
        >
          <svg className="mr-2 h-4 w-4" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" /><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" /><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" /><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" /></svg>
          Sign in with Google
        </Button>

        <Button 
          className="w-full flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 h-12 interactive-button"
        >
          <Facebook className="mr-2 h-4 w-4" />
          Sign in with Facebook
        </Button>

        <Button 
          className="w-full flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 h-12 interactive-button"
        >
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24"><path fill="currentColor" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
          Sign in with Apple
        </Button>

        <Button 
          className="w-full flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 h-12 interactive-button"
        >
          <X className="mr-2 h-4 w-4" />
          Sign in with X
        </Button>
      </div>

      <div className="mt-8 text-sm text-gray-400">
        Don't have an account? <Button variant="link" className="p-0 text-blue-400 hover:text-blue-300" onClick={onSignUpWithEmail}>Sign up</Button>
      </div>

      <div className="text-xs text-gray-500 mt-6 pt-6 border-t border-slate-700">
        By sign in, you agree to our <Button variant="link" className="p-0 text-xs text-gray-500 hover:text-gray-400">Terms of Service</Button> and 
        acknowledge that our <Button variant="link" className="p-0 text-xs text-gray-500 hover:text-gray-400">Privacy Policy</Button> applies to you.
      </div>
    </div>
  );
};

const EmailSignIn = ({ onContinue, onBack, onForgotPassword, email, setEmail, password, setPassword }) => {
  return (
    <div className="space-y-4">
      <button 
        className="absolute top-4 left-4 text-gray-400 hover:text-white" 
        onClick={onBack}
      >
        <ArrowLeft className="h-5 w-5" />
      </button>

      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-1">Sign In With Email</h2>
        <p className="text-sm text-gray-400">Enter your email account to send the verification code and sign in to SalesBoost.</p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@domain.com"
            className="rainbow-glow-input bg-slate-800/50 border-slate-700 text-white placeholder:text-gray-500 h-12 pl-10"
            required
          />
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
        </div>

        <div className="relative">
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="rainbow-glow-input bg-slate-800/50 border-slate-700 text-white placeholder:text-gray-500 h-12 pl-10"
            required
          />
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
        </div>
      </div>

      <div className="flex justify-end">
        <Button variant="link" className="p-0 text-sm text-blue-400 hover:text-blue-300" onClick={onForgotPassword}>
          Forgot Password?
        </Button>
      </div>

      <Button
        className="w-full bg-blue-600 hover:bg-blue-500 text-white h-12 mt-4 transform transition-transform active:scale-95 interactive-button"
        onClick={onContinue}
      >
        Continue
      </Button>
    </div>
  );
};

const VerificationCode = ({ onVerify, onBack, onResend, email }) => {
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  const handleCodeChange = (index, value) => {
    if (value.length <= 1) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);

      // Move to next input if value is entered
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  useEffect(() => {
    // Check if code is complete and verify
    if (verificationCode.every(digit => digit !== '')) {
      // Auto-submit after a short delay
      const timer = setTimeout(() => {
        onVerify(verificationCode.join(''));
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [verificationCode, onVerify]);

  return (
    <div className="space-y-4">
      <button 
        className="absolute top-4 left-4 text-gray-400 hover:text-white" 
        onClick={onBack}
      >
        <ArrowLeft className="h-5 w-5" />
      </button>

      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-1">Verification Code</h2>
        <p className="text-sm text-gray-400">Verification code has been sent via email to <span className="text-blue-400">{email}</span></p>
      </div>

      <div className="flex justify-center space-x-3 mb-8">
        {verificationCode.map((digit, index) => (
          <Input
            key={index}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleCodeChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            ref={el => inputRefs.current[index] = el}
            className="rainbow-glow-input w-12 h-12 text-center text-xl bg-slate-800/50 border-slate-700 text-white"
            inputMode="numeric"
            pattern="[0-9]*"
          />
        ))}
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-400">
          Didn't receive it? <Button variant="link" className="p-0 text-blue-400 hover:text-blue-300" onClick={onResend}>Resend code</Button> in 00:59 (1/3)
        </p>
      </div>
    </div>
  );
};

const ForgotPassword = ({ onSendReset, onBack, email, setEmail }) => {
  return (
    <div className="space-y-4">
      <button 
        className="absolute top-4 left-4 text-gray-400 hover:text-white" 
        onClick={onBack}
      >
        <ArrowLeft className="h-5 w-5" />
      </button>

      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-1">Forgot Password</h2>
        <p className="text-sm text-gray-400">Please enter your email account to send the link verification to reset your password.</p>
      </div>

      <div className="relative">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@domain.com"
          className="rainbow-glow-input bg-slate-800/50 border-slate-700 text-white placeholder:text-gray-500 h-12 pl-10"
          required
        />
        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
      </div>

      <Button
        className="w-full bg-blue-600 hover:bg-blue-500 text-white h-12 mt-6 transform transition-transform active:scale-95 interactive-button"
        onClick={onSendReset}
      >
        Send Email
      </Button>
    </div>
  );
};

const ResetPassword = ({ onResetPassword, onBack }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <div className="space-y-4">
      <button 
        className="absolute top-4 left-4 text-gray-400 hover:text-white" 
        onClick={onBack}
      >
        <ArrowLeft className="h-5 w-5" />
      </button>

      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-1">Reset Password</h2>
        <p className="text-sm text-gray-400">Please enter a strong password for your SalesBoost account.</p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
            className="rainbow-glow-input bg-slate-800/50 border-slate-700 text-white placeholder:text-gray-500 h-12 pl-10"
            required
          />
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
        </div>

        <div className="relative">
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className="rainbow-glow-input bg-slate-800/50 border-slate-700 text-white placeholder:text-gray-500 h-12 pl-10"
            required
          />
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
        </div>
      </div>

      <Button
        className="w-full bg-blue-600 hover:bg-blue-500 text-white h-12 mt-6 transform transition-transform active:scale-95 interactive-button"
        onClick={() => onResetPassword(newPassword, confirmPassword)}
      >
        Reset Password
      </Button>
    </div>
  );
};

const SignUp = ({ onSignUp, onBack, email, setEmail, password, setPassword }) => {
  const [fullName, setFullName] = useState('');

  return (
    <div className="space-y-4">
      <button 
        className="absolute top-4 left-4 text-gray-400 hover:text-white" 
        onClick={onBack}
      >
        <ArrowLeft className="h-5 w-5" />
      </button>

      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-1">Sign Up with Email</h2>
        <p className="text-sm text-gray-400">Please create your account with email and explore the world of SalesBoost AI.</p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <Input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full Name"
            className="rainbow-glow-input bg-slate-800/50 border-slate-700 text-white placeholder:text-gray-500 h-12 pl-10"
            required
          />
          <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
        </div>

        <div className="relative">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="rainbow-glow-input bg-slate-800/50 border-slate-700 text-white placeholder:text-gray-500 h-12 pl-10"
            required
          />
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
        </div>

        <div className="relative">
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="rainbow-glow-input bg-slate-800/50 border-slate-700 text-white placeholder:text-gray-500 h-12 pl-10"
            required
          />
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
        </div>
      </div>

      <Button
        className="w-full bg-blue-600 hover:bg-blue-500 text-white h-12 mt-6 transform transition-transform active:scale-95 interactive-button"
        onClick={() => onSignUp(fullName, email, password)}
      >
        Create Account
      </Button>

      <div className="text-xs text-gray-500 mt-6 pt-6 border-t border-slate-700 text-center">
        By clicking the 'Create Account' button, you agree to the SalesBoost AI
        <br />
        <Button variant="link" className="p-0 text-xs text-gray-500 hover:text-gray-400">Terms of Service</Button> and <Button variant="link" className="p-0 text-xs text-gray-500 hover:text-gray-400">Privacy Policy</Button>.
      </div>
    </div>
  );
};

// Main Login Form with Multi-Step Flow
const LoginForm = () => {
  const [, setLocation] = useLocation();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStep, setLoginStep] = useState("welcome"); // welcome, email, verification, forgot, reset, signup

  const loginOptions: LoginOptionProps[] = [
    { title: "Enterprise", icon: Building2 },
    { title: "Client", icon: Users },
    { title: "IT", icon: Cog }
  ];

  // Rainbow border effect CSS for input focus
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .rainbow-glow-input:focus {
        border-color: transparent;
        box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.2);
        animation: rainbow-glow 2s linear infinite;
      }

      @keyframes rainbow-glow {
        0% { box-shadow: 0 0 5px rgba(62, 151, 255, 0.8), 0 0 10px rgba(62, 151, 255, 0.5), 0 0 15px rgba(62, 151, 255, 0.3); }
        20% { box-shadow: 0 0 5px rgba(111, 103, 252, 0.8), 0 0 10px rgba(111, 103, 252, 0.5), 0 0 15px rgba(111, 103, 252, 0.3); }
        40% { box-shadow: 0 0 5px rgba(155, 89, 240, 0.8), 0 0 10px rgba(155, 89, 240, 0.5), 0 0 15px rgba(155, 89, 240, 0.3); }
        60% { box-shadow: 0 0 5px rgba(215, 89, 203, 0.8), 0 0 10px rgba(215, 89, 203, 0.5), 0 0 15px rgba(215, 89, 203, 0.3); }
        80% { box-shadow: 0 0 5px rgba(249, 92, 136, 0.8), 0 0 10px rgba(249, 92, 136, 0.5), 0 0 15px rgba(249, 92, 136, 0.3); }
        100% { box-shadow: 0 0 5px rgba(62, 151, 255, 0.8), 0 0 10px rgba(62, 151, 255, 0.5), 0 0 15px rgba(62, 151, 255, 0.3); }
      }

      /* Add rainbow border to the main content card */
      .login-card {
        position: relative;
      }

      .login-card::before {
        content: '';
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        background: linear-gradient(45deg, #3e97ff, #6f67fc, #9b59f0, #d759cb, #f95c88, #3e97ff);
        border-radius: inherit;
        z-index: -1;
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      .login-card:hover::before {
        opacity: 0.7;
        animation: rotate-rainbow 6s linear infinite;
      }

      @keyframes rotate-rainbow {
        0% { background-position: 0% 50%; }
        100% { background-position: 100% 50%; }
      }

      /* Button hover effect */
      .interactive-button {
        position: relative;
        overflow: hidden;
      }

      .interactive-button::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(45deg, #3e97ff, #6f67fc, #9b59f0, #d759cb, #f95c88, #3e97ff);
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      .interactive-button:hover::after {
        opacity: 0.2;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Mock authentication function
  const handleLogin = () => {
    // For demo purposes, simply navigate to dashboard
    localStorage.setItem('auth_token', 'demo_token');
    setLocation('/dashboard');
  };

  const handleSignUp = (name, email, password) => {
    // For demo purposes, create account and navigate to verification
    setLoginStep("verification");
  };

  const handleVerification = (code) => {
    // For demo purposes, verify code and navigate to dashboard
    handleLogin();
  };

  const handleResetPassword = (newPassword, confirmPassword) => {
    // For demo purposes, reset password and return to login
    if (newPassword === confirmPassword) {
      setLoginStep("email");
    }
  };

  const renderLoginStep = () => {
    switch (loginStep) {
      case "welcome":
        return (
          <WelcomeBack 
            onContinue={() => setLoginStep("email")}
            onBackToOptions={() => setSelectedRole(null)} 
            onSignUpWithEmail={() => setLoginStep("signup")}
          />
        );

      case "email":
        return (
          <EmailSignIn 
            onContinue={() => setLoginStep("verification")}
            onBack={() => setLoginStep("welcome")}
            onForgotPassword={() => setLoginStep("forgot")}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
          />
        );

      case "verification":
        return (
          <VerificationCode 
            onVerify={handleVerification}
            onBack={() => setLoginStep("email")}
            onResend={() => {}} // Mock function
            email={email}
          />
        );

      case "forgot":
        return (
          <ForgotPassword 
            onSendReset={() => setLoginStep("reset")}
            onBack={() => setLoginStep("email")}
            email={email}
            setEmail={setEmail}
          />
        );

      case "reset":
        return (
          <ResetPassword 
            onResetPassword={handleResetPassword}
            onBack={() => setLoginStep("forgot")}
          />
        );

      case "signup":
        return (
          <SignUp 
            onSignUp={handleSignUp}
            onBack={() => setLoginStep("welcome")}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-2xl backdrop-blur-xl login-card">
        <CardContent className="p-8 space-y-6 relative">
          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              SalesBoost AI
            </h1>
          </div>

          {!selectedRole ? (
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-gray-400">Please select your login type</p>
              </div>

              <div className="grid gap-4">
                {loginOptions.map((option) => (
                  <Button
                    key={option.title}
                    variant="outline"
                    className="w-full bg-slate-800/50 hover:bg-slate-800 text-white border-slate-700 h-14 transform transition-transform hover:scale-105 interactive-button"
                    onClick={() => setSelectedRole(option.title)}
                  >
                    <option.icon className="w-5 h-5 mr-2" />
                    {option.title} Login
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            renderLoginStep()
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