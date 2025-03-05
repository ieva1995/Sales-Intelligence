import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  ChevronDown, 
  ChevronRight,
  Menu, 
  X, 
  Home,
  BarChart2, 
  Users,
  ShoppingCart,
  FileText,
  Settings,
  Box,
  Truck,
  MessageCircle,
  PieChart,
  BarChart,
  LineChart,
  Activity,
  Zap,
  Milestone,
  ClipboardCheck,
  UserPlus,
  Mail
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import NavigationPreview from './NavigationPreview';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuItem {
  title: string;
  path?: string;
  icon: React.ElementType;
  children?: MenuItem[];
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const [, setLocation] = useLocation();
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  // Remove touch handlers to prevent unwanted navigation

  // Platform menu items to match PlatformDropdown component
  const platformItems: MenuItem[] = [
    {
      title: "What is SalesBoost?",
      icon: MessageCircle,
      path: "/platform/about"
    },
    {
      title: "Pipeline Management",
      icon: PieChart,
      path: "/platform/pipeline"
    },
    {
      title: "Sales Forecasting",
      icon: BarChart,
      path: "/platform/forecasting"
    },
    {
      title: "Deal Insights",
      icon: Activity,
      path: "/platform/insights"
    },
    {
      title: "Revenue Intelligence Software",
      icon: LineChart,
      path: "/platform/revenue"
    },
    {
      title: "Conversation Intelligence",
      icon: Zap,
      path: "/platform/conversation"
    },
    {
      title: "Mutual Action Plans",
      icon: Milestone,
      path: "/platform/action-plans"
    },
    {
      title: "Deal Management",
      icon: ClipboardCheck,
      path: "/platform/deal-management"
    },
    {
      title: "Rep Coaching",
      icon: UserPlus,
      path: "/platform/coaching"
    }
  ];

  const solutionsItems: MenuItem[] = [
    {
      title: "Sales Engagement",
      icon: Mail,
      path: "/solutions/sales-engagement"
    },
    {
      title: "Deal Management",
      icon: PieChart,
      path: "/solutions/deal-management"
    },
    {
      title: "Account-Based Selling",
      icon: Users,
      path: "/solutions/account-based-selling"
    },
    {
      title: "Revenue Intelligence",
      icon: LineChart,
      path: "/solutions/revenue-intelligence"
    }
  ];

  const menuItems: MenuItem[] = [
    {
      title: "Platform",
      icon: BarChart2,
      children: platformItems
    },
    {
      title: "Solutions",
      icon: Users,
      children: solutionsItems
    },
    {
      title: "Resources",
      icon: FileText,
      path: "/resources"
    },
    {
      title: "Pricing",
      icon: Settings,
      path: "/pricing"
    }
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);


  const toggleExpand = (title: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const handleNavigation = (path?: string) => {
    if (path) {
      setLocation(path);
      onClose();
    }
  };

  const variants = {
    open: { 
      x: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        mass: 1,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    closed: { 
      x: '-100%', 
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        mass: 1
      }
    },
  };

  const itemVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    },
    closed: {
      x: -20,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    }
  };

  const overlayVariants = {
    open: { 
      opacity: 1,
      transition: { duration: 0.2 }
    },
    closed: { 
      opacity: 0,
      transition: { duration: 0.2 }
    },
  };

  const childVariants = {
    open: {
      opacity: 1,
      height: 'auto',
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    }
  };

  const menuItemHoverVariants = {
    hover: {
      x: 5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            className="fixed inset-0 bg-black/40 z-40 backdrop-blur-md transition-all duration-300"
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            onClick={onClose}
          />

          <motion.div 
            className="fixed inset-y-0 left-0 w-[280px] max-w-[90vw] bg-slate-900 border-r border-slate-800 z-50 flex flex-col"
            initial="closed"
            animate="open"
            exit="closed"
            variants={variants}
          >
            <div className="flex items-center justify-between p-4 border-b border-slate-800">
              <div className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                SalesBoost AI
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={onClose}
                  className="text-slate-400 hover:text-white transition-all duration-200 hover:bg-white/10 rounded-full"
                >
                <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.div>
                </Button>
              </motion.div>
            </div>

            <div className="flex-1 overflow-y-auto py-2 overscroll-contain">
              <ul className="space-y-2 p-3">
                {menuItems.map((item) => (
                  <li key={item.title} className="rounded-lg overflow-hidden">
                    {item.children ? (
                      <motion.div
                        variants={itemVariants}
                        initial="closed"
                        animate="open"
                      >
                        <motion.button
                          whileTap={{ scale: 0.98 }}
                          className="w-full flex items-center justify-between p-4 hover:bg-slate-800/80 active:bg-slate-800 text-slate-200 rounded-lg transition-colors"
                          onClick={() => toggleExpand(item.title)}
                        >
                          <div className="flex items-center">
                            <item.icon className="h-5 w-5 mr-3 text-slate-400" />
                            <motion.span 
                              className="text-sm font-medium bg-clip-text text-slate-200 transition-all duration-150"
                              whileHover={{
                                backgroundImage: "linear-gradient(to right, #818cf8, #c084fc)",
                                backgroundClip: "text",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                x: 2
                              }}
                            >
                              {item.title}
                            </motion.span>
                          </div>
                          <ChevronDown 
                            className={`h-4 w-4 transition-transform duration-200 ${expandedItems[item.title] ? 'rotate-180' : ''}`} 
                          />
                        </motion.button>

                        <AnimatePresence>
                          {expandedItems[item.title] && (
                            <motion.ul
                              initial="closed"
                              animate="open"
                              exit="closed"
                              variants={childVariants}
                              className="bg-slate-800/50 rounded-lg mt-1 overflow-hidden"
                            >
                              {item.children.map((child) => (
                                <motion.li key={child.title} whileTap={{ scale: 0.98 }}>
                                  <motion.button
                                    className="w-full flex items-center p-4 pl-12 hover:bg-slate-700/50 active:bg-slate-700/70 text-slate-300 text-sm transition-colors"
                                    onClick={() => handleNavigation(child.path)}
                                    whileHover="hover"
                                    variants={menuItemHoverVariants}
                                  >
                                    <child.icon className="h-4 w-4 mr-3 text-indigo-400" />
                                    <motion.span 
                                      className="transition-all duration-150"
                                      whileHover={{
                                        backgroundImage: "linear-gradient(to right, #818cf8, #c084fc)",
                                        backgroundClip: "text",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent"
                                      }}
                                    >
                                      {child.title}
                                    </motion.span>
                                  </motion.button>
                                </motion.li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ) : (
                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center p-4 hover:bg-slate-800/80 active:bg-slate-800 text-slate-200 rounded-lg transition-colors"
                        onClick={() => handleNavigation(item.path)}
                        whileHover="hover"
                        variants={menuItemHoverVariants}
                      >
                        <item.icon className="h-5 w-5 mr-3 text-slate-400" />
                        <motion.span 
                          className="text-sm font-medium transition-all duration-150"
                          whileHover={{
                            backgroundImage: "linear-gradient(to right, #818cf8, #c084fc)",
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent"
                          }}
                        >
                          {item.title}
                        </motion.span>
                      </motion.button>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 border-t border-slate-800">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  className="w-full mb-3 bg-indigo-600 hover:bg-indigo-700 transition-all h-12 shadow-lg hover:shadow-indigo-500/25"
                  onClick={() => {
                    setLocation('/login');
                    onClose();
                  }}
                >
                  Sign In
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="outline"
                  className="w-full border-white text-white hover:bg-white/10 transition-all h-12 shadow-lg hover:shadow-white/25"
                  onClick={() => {
                    window.open('https://calendly.com/demo', '_blank');
                    onClose();
                  }}
                >
                  Request Demo
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;