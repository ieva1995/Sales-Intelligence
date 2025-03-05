import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle,
  Play,
  ChevronRight,
  Globe,
  Shield,
  Users,
  Zap,
  LineChart,
  BarChart,
  Share2,
  Menu,
  X,
  MessageCircle,
  BookOpen,
  BarChart2,
  PieChart
} from "lucide-react";

export default function LandingPage() {
  const [, setLocation] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");

  // Handle scroll to section
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  // Handle mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sections = ['overview', 'features', 'solutions', 'customers', 'cta'];

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop - 100 && scrollPosition < offsetTop + offsetHeight - 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-white text-slate-900">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                SalesBoost AI
              </h1>
              <nav className="hidden md:flex space-x-8">
                <a 
                  onClick={() => scrollToSection('overview')}
                  className={`cursor-pointer hover:text-blue-600 ${activeSection === 'overview' ? 'text-blue-600 font-medium' : 'text-slate-700'}`}
                >
                  Platform
                </a>
                <a 
                  onClick={() => scrollToSection('features')}
                  className={`cursor-pointer hover:text-blue-600 ${activeSection === 'features' ? 'text-blue-600 font-medium' : 'text-slate-700'}`}
                >
                  Solutions
                </a>
                <a 
                  onClick={() => scrollToSection('solutions')}
                  className={`cursor-pointer hover:text-blue-600 ${activeSection === 'solutions' ? 'text-blue-600 font-medium' : 'text-slate-700'}`}
                >
                  Resources
                </a>
                <a 
                  onClick={() => scrollToSection('customers')}
                  className={`cursor-pointer hover:text-blue-600 ${activeSection === 'customers' ? 'text-blue-600 font-medium' : 'text-slate-700'}`}
                >
                  Customers
                </a>
                <a 
                  onClick={() => scrollToSection('cta')}
                  className={`cursor-pointer hover:text-blue-600 ${activeSection === 'cta' ? 'text-blue-600 font-medium' : 'text-slate-700'}`}
                >
                  Pricing
                </a>
              </nav>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Button 
                variant="outline" 
                className="text-blue-600 border-blue-200 hover:bg-blue-50"
                onClick={() => setLocation('/login')}
              >
                Sign In
              </Button>
              <Button 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => setLocation('/login')}
              >
                Request Demo
              </Button>
            </div>

            {/* Mobile menu button */}
            <Button 
              variant="ghost"
              className="md:hidden"
              onClick={toggleMobileMenu}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div className={`fixed inset-0 bg-white z-50 transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
              SalesBoost AI
            </h1>
            <Button 
              variant="ghost"
              onClick={toggleMobileMenu}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          <nav className="flex flex-col space-y-6">
            <a 
              onClick={() => scrollToSection('overview')}
              className="text-xl font-medium hover:text-blue-600"
            >
              Platform
            </a>
            <a 
              onClick={() => scrollToSection('features')}
              className="text-xl font-medium hover:text-blue-600"
            >
              Solutions
            </a>
            <a 
              onClick={() => scrollToSection('solutions')}
              className="text-xl font-medium hover:text-blue-600"
            >
              Resources
            </a>
            <a 
              onClick={() => scrollToSection('customers')}
              className="text-xl font-medium hover:text-blue-600"
            >
              Customers
            </a>
            <a 
              onClick={() => scrollToSection('cta')}
              className="text-xl font-medium hover:text-blue-600"
            >
              Pricing
            </a>
          </nav>

          <div className="mt-12 flex flex-col space-y-4">
            <Button 
              variant="outline" 
              className="w-full text-blue-600 border-blue-200 hover:bg-blue-50"
              onClick={() => setLocation('/login')}
            >
              Sign In
            </Button>
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={() => setLocation('/login')}
            >
              Request Demo
            </Button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section id="overview" className="pt-16 pb-24 overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                AI-powered workflows across the customer journey
              </h1>
              <p className="text-xl text-slate-600 mb-8">
                Deploy SalesBoost AI to drive enhanced customer experiences across the full funnel. Create more engaging human-to-human connections with AI that's enterprise-ready.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-lg font-medium"
                  onClick={() => setLocation('/login')}
                >
                  Request Demo
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-white text-blue-600 border-blue-600 hover:bg-blue-50 text-lg font-medium"
                >
                  Watch Demo <Play className="ml-2 h-5 w-5" />
                </Button>
              </div>
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-slate-600">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  No credit card required
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Enterprise-ready security
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  AI-powered insights
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative rounded-xl overflow-hidden shadow-2xl border border-slate-200">
                <div className="aspect-[4/3] w-full bg-slate-50">
                  <img 
                    src="https://placehold.co/800x600/f8fafc/4f46e5/png?text=SalesBoost+AI+Platform" 
                    alt="SalesBoost AI Platform" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 to-transparent opacity-20"></div>
              </div>

              {/* Floating elements */}
              <div className="absolute -right-12 top-1/3 transform rotate-12 p-3 bg-white rounded-lg shadow-lg border border-slate-200">
                <BarChart2 className="h-6 w-6 text-blue-600" />
              </div>
              <div className="absolute right-1/4 -bottom-8 transform -rotate-6 p-3 bg-white rounded-lg shadow-lg border border-slate-200">
                <PieChart className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by Section */}
      <section className="py-12 bg-white border-y border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">
              Trusted by leading enterprises worldwide
            </h3>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all">
                <div className="bg-slate-100 h-12 w-32 rounded-md flex items-center justify-center">
                  <span className="text-slate-600 font-medium">Company {i}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Elevate your sales performance with AI 
            </h2>
            <p className="text-xl text-slate-600">
              SalesBoost AI delivers powerful tools to help your team engage prospects, close deals, and grow revenue.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
            {[
              {
                icon: MessageCircle,
                color: "text-blue-600",
                title: "Conversation Intelligence",
                description: "Record, transcribe, and analyze sales calls to improve performance and coach your team."
              },
              {
                icon: Zap,
                color: "text-indigo-600",
                title: "Sales Engagement",
                description: "Automate multi-channel outreach with personalized sequences for every prospect."
              },
              {
                icon: Users,
                color: "text-purple-600",
                title: "Team Coaching",
                description: "Use AI to identify coaching opportunities and improve sales performance across your team."
              },
              {
                icon: LineChart,
                color: "text-green-600",
                title: "Revenue Intelligence",
                description: "Get real-time insights into your pipeline and forecast to make data-driven decisions."
              },
              {
                icon: BookOpen,
                color: "text-orange-600",
                title: "Sales Content",
                description: "Organize and share sales content that drives engagement throughout the buyer journey."
              },
              {
                icon: Shield,
                color: "text-red-600",
                title: "Enterprise Security",
                description: "Keep your data safe with enterprise-grade security and compliance features."
              }
            ].map((feature, index) => (
              <div key={index} className="flex">
                <div className={`w-12 h-12 rounded-lg ${feature.color} bg-opacity-10 flex-shrink-0 flex items-center justify-center mr-4`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Overview */}
      <section id="solutions" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
                Drive consistent performance across your revenue team
              </h2>
              <p className="text-xl text-slate-600 mb-8">
                SalesBoost AI provides a unified platform that helps sales, marketing, and customer success teams align around a single source of truth.
              </p>

              <div className="space-y-6">
                {[
                  {
                    title: "Unify your tech stack",
                    description: "Connect your CRM, email, calendar, and other tools to create a seamless workflow."
                  },
                  {
                    title: "Automate mundane tasks",
                    description: "Let AI handle routine tasks so your team can focus on building relationships."
                  },
                  {
                    title: "Generate actionable insights",
                    description: "Use AI to turn conversation data into coaching opportunities and best practices."
                  }
                ].map((item, i) => (
                  <div key={i} className="flex">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0">
                      <span className="text-blue-600 font-semibold">{i + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                      <p className="text-slate-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Button 
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => setLocation('/login')}
                >
                  Explore the Platform <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200">
              <img 
                src="https://placehold.co/800x600/f8fafc/4f46e5/png?text=Platform+Overview" 
                alt="Platform Overview" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section id="customers" className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Loved by revenue teams everywhere
            </h2>
            <p className="text-xl text-slate-600">
              See why thousands of companies choose SalesBoost AI to power their sales processes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "SalesBoost AI has transformed our sales organization. Our reps are more productive, our pipeline is more predictable, and our customers are happier.",
                name: "Sarah Johnson",
                title: "VP of Sales, TechCorp"
              },
              {
                quote: "The conversation intelligence features alone paid for the platform in the first month. Being able to see what's working and what's not has been game-changing.",
                name: "Michael Chen",
                title: "Sales Director, GrowthCo"
              },
              {
                quote: "We evaluated several sales platforms, but SalesBoost AI stood out for its ease of use and powerful AI capabilities. It's now an essential part of our tech stack.",
                name: "Jessica Martinez",
                title: "CRO, SaaS Inc."
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-slate-50 p-8 rounded-xl border border-slate-200 shadow-sm">
                <div className="text-3xl text-blue-600 mb-4">"</div>
                <p className="text-slate-700 mb-8 text-lg">{testimonial.quote}</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-slate-300 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-slate-600">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-col md:flex-row justify-center items-center gap-8">
            <div className="flex items-center">
              <div className="text-3xl font-bold text-blue-600 mr-3">96%</div>
              <div className="text-slate-700">Customer satisfaction rate</div>
            </div>
            <div className="hidden md:block h-12 w-px bg-slate-200"></div>
            <div className="flex items-center">
              <div className="text-3xl font-bold text-blue-600 mr-3">42%</div>
              <div className="text-slate-700">Average increase in win rates</div>
            </div>
            <div className="hidden md:block h-12 w-px bg-slate-200"></div>
            <div className="flex items-center">
              <div className="text-3xl font-bold text-blue-600 mr-3">3.2x</div>
              <div className="text-slate-700">ROI in the first year</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-24 bg-blue-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Ready to transform your sales process?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-xl">
                Schedule a personalized demo to see how SalesBoost AI can help your team drive more revenue with less effort.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-blue-50 text-lg font-medium"
                  onClick={() => setLocation('/login')}
                >
                  Request Demo
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-blue-700 text-lg font-medium"
                  onClick={() => setLocation('/login')}
                >
                  Sign In
                </Button>
              </div>
            </div>

            <div className="bg-blue-500/30 p-8 rounded-xl backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-6">What you'll see in your demo</h3>
              <ul className="space-y-4">
                {[
                  "How SalesBoost AI integrates with your existing tools",
                  "Personalized workflows tailored to your sales process",
                  "AI-powered insights that drive more closed deals",
                  "ROI calculator based on your team's specific metrics",
                  "Implementation timeline and customer success plan"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-200 mt-0.5 mr-3 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
            <div className="col-span-2">
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-4">
                SalesBoost AI
              </h3>
              <p className="text-slate-400 mb-4 max-w-xs">
                The all-in-one AI-powered sales execution platform for modern revenue teams.
              </p>
              <div className="flex space-x-4">
                {['Twitter', 'LinkedIn', 'Facebook', 'YouTube'].map((social, i) => (
                  <a key={i} href="#" className="text-slate-400 hover:text-white">
                    {social}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2">
                {['Conversation Intelligence', 'Sales Engagement', 'Revenue Intelligence', 'Sales Content', 'Team Coaching'].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="text-slate-400 hover:text-white">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Solutions</h4>
              <ul className="space-y-2">
                {['Sales Teams', 'Marketing Teams', 'Customer Success', 'RevOps', 'Enterprise'].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="text-slate-400 hover:text-white">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                {['Blog', 'Guides', 'Webinars', 'Case Studies', 'Help Center'].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="text-slate-400 hover:text-white">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                {['About Us', 'Careers', 'Partners', 'Contact', 'Privacy'].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="text-slate-400 hover:text-white">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm mb-4 md:mb-0">
              © 2025 SalesBoost AI. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-slate-400 hover:text-white text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-slate-400 hover:text-white text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-slate-400 hover:text-white text-sm">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}