import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  X, 
  BarChart2,
  Users,
  MessageSquare,
  FileText,
  ShoppingBag,
  Zap,
  TrendingUp,
  Database,
  Library,
  Settings,
  Sparkles,
  Rocket,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const AppMobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const [, setLocation] = useLocation();
  const [location] = useLocation();

  // Copy the menu items directly from Sidebar.tsx for consistency
  const mainNavItems = [
    { href: "/dashboard", icon: BarChart2, label: "Dashboard" },
    { href: "/crm", icon: Users, label: "CRM" },
    { href: "/marketing", icon: MessageSquare, label: "Marketing" },
    { href: "/content", icon: FileText, label: "Content" },
    { href: "/commerce", icon: ShoppingBag, label: "Commerce" },
    { href: "/automations", icon: Zap, label: "Automations" },
    { href: "/reporting", icon: TrendingUp, label: "Reporting" },
    { href: "/data", icon: Database, label: "Data Management" },
    { href: "/library", icon: Library, label: "Library" },
  ];

  const premiumFeatures = [
    { href: "/features/smart-tools", icon: Sparkles, label: "Advanced Sales Tools" },
    { href: "/features/enterprise-turbo", icon: Rocket, label: "Enterprise Turbo" },
  ];

  useEffect(() => {
    // Disable body scroll when menu is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleNavigation = (path: string) => {
    setLocation(path);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div 
            className="fixed inset-y-0 left-0 w-[280px] max-w-[80vw] bg-slate-900 border-r border-slate-800 z-50 flex flex-col"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-800">
              <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                SalesBoost AI
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} className="text-slate-400 hover:text-white">
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Menu Items */}
            <div className="flex-1 overflow-y-auto py-4 px-3">
              <div className="space-y-2 px-1">
                {mainNavItems.map((item) => (
                  <button
                    key={item.label}
                    className={`w-full flex items-center px-4 py-3 rounded-md transition-colors duration-200 ${
                      location === item.href 
                        ? 'bg-slate-800 text-blue-400' 
                        : 'hover:bg-slate-800/50 text-slate-300'
                    }`}
                    onClick={() => handleNavigation(item.href)}
                  >
                    <item.icon className="h-5 w-5 mr-4 text-slate-400" />
                    <span className="text-sm">{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Premium Features Section */}
              <div className="mt-8">
                <div className="px-5 py-2">
                  <h3 className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
                    Premium Features
                  </h3>
                </div>
                <div className="space-y-2 px-1 mt-2">
                  {premiumFeatures.map((item) => (
                    <button
                      key={item.label}
                      className={`w-full flex items-center px-4 py-3 rounded-md transition-colors duration-200 ${
                        location === item.href 
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                          : 'hover:bg-slate-800/50 text-slate-300'
                      }`}
                      onClick={() => handleNavigation(item.href)}
                    >
                      <item.icon className="h-5 w-5 mr-4 text-slate-400" />
                      <span className="text-sm">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-5 border-t border-slate-800">
              <button
                className="w-full flex items-center px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-md transition-colors duration-200"
                onClick={() => handleNavigation('/settings')}
              >
                <Settings className="h-5 w-5 mr-4" />
                <span className="text-sm">Settings</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AppMobileMenu;