import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Play,
  ArrowRight,
  Menu,
  X,
  Check,
  Globe,
  Users,
  Zap,
  ChevronDown,
  ChevronUp,
  PlusCircle
} from "lucide-react";
import MobileMenu from "../components/MobileMenu";

export default function LandingPage() {
  const [, setLocation] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  
  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden">
      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-slate-900/90 z-50 transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6">
          <div className="flex justify-end">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          <div className="mt-8 space-y-6">
            <ul className="space-y-6">
              <li><a href="#" className="text-2xl font-medium text-white hover:text-blue-400">Platform</a></li>
              <li><a href="#" className="text-2xl font-medium text-white hover:text-blue-400">Solutions</a></li>
              <li><a href="#" className="text-2xl font-medium text-white hover:text-blue-400">Resources</a></li>
              <li><a href="#" className="text-2xl font-medium text-white hover:text-blue-400">Pricing</a></li>
            </ul>
            <div className="pt-6 border-t border-slate-800">
              <Button 
                className="w-full mb-3 bg-indigo-600 hover:bg-indigo-700 text-white"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setLocation('/login');
                }}
              >
                Sign In
              </Button>
              <Button
                variant="outline"
                className="w-full border-white text-white hover:bg-white/10"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  window.open('https://calendly.com/demo', '_blank');
                }}
              >
                Request Demo
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-slate-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mr-10">
              SalesBoost AI
            </h1>
            <nav className="hidden lg:block">
              <ul className="flex space-x-8">
                <li className="relative group">
                  <a href="#" className="text-slate-700 hover:text-indigo-600 flex items-center">
                    Platform 
                    <ChevronDown className="ml-1 h-4 w-4 group-hover:hidden" />
                    <ChevronUp className="ml-1 h-4 w-4 hidden group-hover:block" />
                  </a>
                </li>
                <li className="relative group">
                  <a href="#" className="text-slate-700 hover:text-indigo-600 flex items-center">
                    Solutions
                    <ChevronDown className="ml-1 h-4 w-4 group-hover:hidden" />
                    <ChevronUp className="ml-1 h-4 w-4 hidden group-hover:block" />
                  </a>
                </li>
                <li><a href="#" className="text-slate-700 hover:text-indigo-600">Resources</a></li>
                <li><a href="#" className="text-slate-700 hover:text-indigo-600">Pricing</a></li>
              </ul>
            </nav>
          </div>

          {/* Mobile menu toggle button - only visible on small screens */}
          <div className="lg:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-slate-700 hover:text-indigo-600"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            <Button
              variant="ghost"
              className="text-slate-700 hover:text-indigo-600"
              onClick={() => setLocation('/login')}
            >
              Sign In
            </Button>
            <Button
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
              onClick={() => window.open('https://calendly.com/demo', '_blank')}
            >
              Request Demo
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            AI-powered <br/>workflows across<br/>the customer journey
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto mb-8 text-lg">
            Deploy our SalesBoost AI to drive enhanced customer experiences across the full funnel. Create more engaging human-to-human connections with AI that's enterprise-ready, deeply integrated, and designed for the entire customer lifecycle.
          </p>
          <div className="flex justify-center mb-16">
            <Button
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full"
            >
              Watch our demo
            </Button>
          </div>

          {/* Video Player */}
          <div className="relative max-w-4xl mx-auto">
            <div className="aspect-video bg-slate-800 rounded-lg overflow-hidden shadow-xl flex items-center justify-center relative">
              <div className="absolute inset-0 bg-[url('https://placehold.co/1280x720/1e293b/FFFFFF/png?text=SalesBoost+AI+Video')] bg-cover bg-center opacity-70"></div>
              <div className="absolute left-4 top-4 flex items-center text-white">
                <Globe className="h-5 w-5 mr-2" />
                <span className="font-medium">AI-powered sales:</span>
                <span className="ml-2">The complete journey</span>
              </div>
              <Button
                size="icon"
                className="relative z-10 rounded-full w-16 h-16 bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                <Play className="h-8 w-8" />
              </Button>
              <div className="absolute bottom-0 left-0 right-0 h-10 bg-slate-900 flex items-center px-4">
                <div className="w-full bg-slate-700 h-1 rounded-full">
                  <div className="w-1/3 bg-indigo-500 h-1 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Feature 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-20">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Sell smarter with<br/> 
                <span className="text-indigo-600">SalesBoost</span>
              </h2>
              <p className="text-slate-600 mb-6">
                AI-driven insights empower your sales team to prioritize accounts and interactions that have the highest impact of success, all while automating tedious processes and communications that free up more time for what actually matters.
              </p>
              <ul className="space-y-3">
                {['Automate repetitive tasks', 'Prioritize high-value prospects', 'Increase conversion rates'].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white shadow-lg rounded-lg p-6 border border-slate-100">
                <img src="https://placehold.co/300x200/ffffff/5a67d8/png?text=Dashboard" alt="Dashboard" className="w-full h-auto rounded" />
              </div>
              <div className="bg-white shadow-lg rounded-lg p-4 border border-slate-100">
                <div className="p-3 bg-slate-50 rounded-lg mb-2">
                  <img src="https://placehold.co/60x60/e2e8f0/5a67d8/png?text=User" alt="User Avatar" className="w-12 h-12 rounded-full mx-auto" />
                </div>
                <p className="text-sm text-center text-slate-600">"SalesBoost AI has transformed our sales process completely."</p>
                <p className="text-xs text-center text-slate-500 mt-1">- Sara Johnson, VP of Sales</p>
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-20">
            <div className="order-2 md:order-1">
              <div className="bg-white shadow-lg rounded-lg p-6 border border-slate-100">
                <img src="https://placehold.co/500x300/ffffff/5a67d8/png?text=Workflow" alt="AI Workflow" className="w-full h-auto rounded" />
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold mb-6">
                Work faster with<br/> 
                <span className="text-indigo-600">SalesBoost</span>
              </h2>
              <p className="text-slate-600 mb-6">
                Accelerate your sales cycle with AI assistance generating accurate and persuasive copy, performing research at a pace no human could match, and ensuring that every touchpoint with prospects is delivered at exactly the right moment.
              </p>
              <ul className="space-y-3">
                {['Generate compelling copy in seconds', 'Research prospects automatically', 'Perfect timing for every outreach'].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Grow predictably with<br/> 
                <span className="text-indigo-600">SalesBoost</span>
              </h2>
              <p className="text-slate-600 mb-6">
                Our AI-driven analytics enable you to understand which activities drive predictable and consistent revenue outcomes. Track leading indicators that give you a forecast you can finally trust.
              </p>
              <ul className="space-y-3">
                {['Accurate sales forecasting', 'Identify revenue trends early', 'Optimize resource allocation'].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white shadow-lg rounded-lg p-4 border border-slate-100">
                <div className="p-3 bg-slate-50 rounded-lg mb-2">
                  <img src="https://placehold.co/60x60/e2e8f0/5a67d8/png?text=CEO" alt="CEO Avatar" className="w-12 h-12 rounded-full mx-auto" />
                </div>
                <p className="text-sm text-center text-slate-600">"We've seen a 40% increase in close rates since implementing SalesBoost AI."</p>
                <p className="text-xs text-center text-slate-500 mt-1">- Michael Chen, CEO</p>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-6 border border-slate-100">
                <img src="https://placehold.co/300x200/ffffff/5a67d8/png?text=Analytics" alt="Analytics" className="w-full h-auto rounded" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Funnel Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Advanced AI built for full funnel sales
            </h2>
            <p className="text-slate-600 max-w-3xl mx-auto">
              SalesBoost's Sales AI capabilities help every member of your sales org make data-driven decisions, execute the right actions, and drive winning outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white shadow-md rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="h-8 w-8 bg-indigo-100 rounded-md flex items-center justify-center mr-3">
                  <PlusCircle className="h-5 w-5 text-indigo-600" />
                </div>
                <h3 className="font-semibold text-lg">Smart Deal Assist</h3>
              </div>
              <p className="text-slate-600 text-sm">Analyze deals using AI to provide tailored sales guidance and improve close rates.</p>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="h-8 w-8 bg-indigo-100 rounded-md flex items-center justify-center mr-3">
                  <PlusCircle className="h-5 w-5 text-indigo-600" />
                </div>
                <h3 className="font-semibold text-lg">Smart Account Assist</h3>
              </div>
              <p className="text-slate-600 text-sm">Generate AI-driven insights for targeted account planning and expansion.</p>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="h-8 w-8 bg-indigo-100 rounded-md flex items-center justify-center mr-3">
                  <PlusCircle className="h-5 w-5 text-indigo-600" />
                </div>
                <h3 className="font-semibold text-lg">Topics and Mentions</h3>
              </div>
              <p className="text-slate-600 text-sm">Track important conversation patterns across all customer communications.</p>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="h-8 w-8 bg-indigo-100 rounded-md flex items-center justify-center mr-3">
                  <PlusCircle className="h-5 w-5 text-indigo-600" />
                </div>
                <h3 className="font-semibold text-lg">Smart Email Assist</h3>
              </div>
              <p className="text-slate-600 text-sm">Craft compelling emails with AI suggestions to drive engagement.</p>
            </div>
            
            <div className="bg-white shadow-md rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="h-8 w-8 bg-indigo-100 rounded-md flex items-center justify-center mr-3">
                  <PlusCircle className="h-5 w-5 text-indigo-600" />
                </div>
                <h3 className="font-semibold text-lg">Smart Meeting Cop Notes</h3>
              </div>
              <p className="text-slate-600 text-sm">Automatically generate detailed meeting summaries and action items.</p>
            </div>
            
            <div className="bg-white shadow-md rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="h-8 w-8 bg-indigo-100 rounded-md flex items-center justify-center mr-3">
                  <PlusCircle className="h-5 w-5 text-indigo-600" />
                </div>
                <h3 className="font-semibold text-lg">Automated Speech Recognition</h3>
              </div>
              <p className="text-slate-600 text-sm">Convert sales conversations into actionable text for analysis and follow-up.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-t border-slate-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:justify-between max-w-4xl mx-auto">
            <div className="mb-10 md:mb-0 text-center md:text-left">
              <div className="text-6xl md:text-8xl font-bold text-indigo-900">
                33<span className="text-indigo-600">+</span>
              </div>
              <p className="text-slate-600 mt-2">New high-value interaction data captured weekly</p>
            </div>
            <div className="text-center md:text-left">
              <div className="text-6xl md:text-8xl font-bold text-indigo-900">
                3bn <span className="text-indigo-600">+</span>
              </div>
              <p className="text-slate-600 mt-2">
                <span className="block">3.5 billion+ signals used to train</span>
                <span className="block">the machine learning models</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="bg-indigo-600 rounded-lg py-10 px-6 md:px-12 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Discover the AI-Powered sales execution platform</h2>
            <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
              Transform your sales approach with our AI-driven platform designed for enterprise sales teams.
            </p>
            <Button 
              size="lg"
              className="bg-white text-indigo-600 hover:bg-indigo-50"
              onClick={() => window.open('https://calendly.com/demo', '_blank')}
            >
              Request a Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Industry Positioning */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <img 
                src="https://placehold.co/600x400/e2e8f0/5a67d8/png?text=Market+Position" 
                alt="Market Position Chart" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">
                <span className="block">CR Insights names</span>
                <span className="block text-indigo-600">SalesBoost leader in</span>
                <span className="block">Generative AI for Sales</span>
              </h2>
              <p className="text-slate-600 mb-6">
                Learn why SalesBoost is outpacing Microsoft, Writer, and competitors to lead the market for enterprise AI in sales.
              </p>
              <Button 
                variant="outline" 
                className="flex items-center border-indigo-600 text-indigo-600 hover:bg-indigo-50"
              >
                Download Report <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-slate-50" id="faq">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">FAQ on AI in sales</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "How does SalesBoost use AI in sales?",
                answer: "SalesBoost harnesses the power of artificial intelligence to analyze and interpret vast amounts of sales data, customer interactions, and market trends. Our AI technology identifies patterns, predicts outcomes, and provides actionable insights that enhance sales strategies. The system learns continuously from customer interactions and sales outcomes, becoming increasingly effective over time."
              },
              {
                question: "What are the benefits of using AI tools in sales?",
                answer: "AI tools in sales provide numerous benefits including increased productivity through automation of repetitive tasks, improved lead qualification and prioritization, enhanced customer insights leading to more personalized interactions, data-driven forecasting for better resource allocation, and ultimately higher conversion rates and revenue growth."
              },
              {
                question: "What is the future of sales AI?",
                answer: "The future of sales AI points toward even more sophisticated predictive capabilities, deeper integration with all customer touchpoints, and truly conversational AI that can handle complex sales scenarios. We anticipate AI becoming an indispensable sales team member that augments human capabilities rather than replacing them, creating a powerful human-AI partnership that delivers exceptional results."
              }
            ].map((faq, index) => (
              <div 
                key={index} 
                className="border-b border-slate-200 pb-6"
              >
                <button 
                  className="flex justify-between items-center w-full text-left font-medium text-lg"
                  onClick={() => toggleFaq(index)}
                >
                  {faq.question}
                  {expandedFaq === index ? 
                    <ChevronUp className="h-5 w-5 text-indigo-600" /> : 
                    <ChevronDown className="h-5 w-5 text-slate-700" />
                  }
                </button>
                <div className={`mt-2 text-slate-600 transition-all duration-300 overflow-hidden ${expandedFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learn More Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-4">Learn more about AI-powered selling within SalesBoost</h2>
            <Button
              size="sm"
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              View all
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: "Work smarter, not harder: Elevate your selling",
                tag: "WEBINAR"
              },
              {
                title: "AI-powered selling: The ultimate guide for sales leaders",
                tag: "GUIDE"
              },
              {
                title: "How AI can help train sales reps faster than ever before",
                tag: "BLOG"
              }
            ].map((item, index) => (
              <div key={index} className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                <div className="aspect-video bg-slate-100 flex items-center justify-center">
                  <img 
                    src={`https://placehold.co/400x225/e2e8f0/5a67d8/png?text=Content+${index+1}`}
                    alt={item.title}
                    className="w-full h-auto"
                  />
                </div>
                <div className="p-5">
                  <div className="text-xs font-medium text-slate-500 mb-2">{item.tag}</div>
                  <h3 className="font-medium text-lg mb-3">{item.title}</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-indigo-600 text-indigo-600 hover:bg-indigo-50"
                  >
                    Read
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Responsible AI Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Our commitment to responsible AI</h2>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              "Transparent",
              "Fair and ethical",
              "Respects data privacy",
              "Technically robust and reliable"
            ].map((item, index) => (
              <div 
                key={index} 
                className="border-b border-slate-200 py-4 flex justify-between items-center"
              >
                <span className="font-medium">{item}</span>
                <ChevronDown className="h-5 w-5 text-slate-400" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between mb-12">
            <div className="mb-8 md:mb-0">
              <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-4">
                Discover the Sales<br />Execution Platform
              </h2>
              <p className="text-slate-400 max-w-xs">
                See how SalesBoost helps your reps hit their quota and grow into sales leaders.
              </p>
              <div className="mt-4">
                <Button
                  size="sm"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  Learn more
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-medium mb-4 text-indigo-400">Platform</h3>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li><a href="#" className="hover:text-white">Platform overview</a></li>
                  <li><a href="#" className="hover:text-white">Sales AI</a></li>
                  <li><a href="#" className="hover:text-white">Analytics</a></li>
                  <li><a href="#" className="hover:text-white">Integrations</a></li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-4 text-indigo-400">Solutions</h3>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li><a href="#" className="hover:text-white">Sales engagement</a></li>
                  <li><a href="#" className="hover:text-white">Deal management</a></li>
                  <li><a href="#" className="hover:text-white">Account-based selling</a></li>
                  <li><a href="#" className="hover:text-white">Revenue intelligence</a></li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-4 text-indigo-400">Why SalesBoost</h3>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li><a href="#" className="hover:text-white">Why choose SalesBoost?</a></li>
                  <li><a href="#" className="hover:text-white">Customer stories</a></li>
                  <li><a href="#" className="hover:text-white">Services</a></li>
                  <li><a href="#" className="hover:text-white">Security</a></li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-4 text-indigo-400">Customers</h3>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li><a href="#" className="hover:text-white">Enterprise teams</a></li>
                  <li><a href="#" className="hover:text-white">Mid-market teams</a></li>
                  <li><a href="#" className="hover:text-white">Startup teams</a></li>
                  <li><a href="#" className="hover:text-white">Customer success stories</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 text-center md:text-left text-sm text-slate-500">
            © 2025 SalesBoost AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
