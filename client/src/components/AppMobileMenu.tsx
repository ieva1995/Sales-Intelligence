import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  ChevronDown, 
  ChevronRight,
  X, 
  Home,
  FileText, 
  Users,
  ShoppingCart,
  Truck,
  Box
} from 'lucide-react';
import { Button } from '@/components/ui/button';

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

const menuItems: MenuItem[] = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: Home
  },
  {
    title: 'Content',
    icon: FileText,
    children: [
      { title: 'Calendar', path: '/content/calendar', icon: ChevronRight },
      { title: 'Blog', path: '/content/blog', icon: ChevronRight },
      { title: 'Holiday Message', path: '/content/holiday', icon: ChevronRight },
      { title: 'Home Page', path: '/content/home', icon: ChevronRight },
      { title: 'Menu Section', path: '/content/menu', icon: ChevronRight },
    ]
  },
  {
    title: 'Customers',
    icon: Users,
    children: [
      { title: 'Brokers', path: '/customers/brokers', icon: ChevronRight },
      { title: 'Customer Logs', path: '/customers/logs', icon: ChevronRight },
      { title: 'Customers', path: '/customers', icon: ChevronRight },
      { title: 'Gift Vouchers', path: '/customers/vouchers', icon: ChevronRight },
    ]
  },
  {
    title: 'Orders',
    icon: ShoppingCart,
    children: [
      { title: 'Create Order', path: '/orders/create', icon: ChevronRight },
      { title: 'Dispatch Order', path: '/orders/dispatch', icon: ChevronRight },
      { title: 'Build Invoice', path: '/orders/invoice', icon: ChevronRight },
      { title: 'Checkout Feedback', path: '/orders/feedback', icon: ChevronRight },
    ]
  },
  {
    title: 'Shipping',
    path: '/shipping',
    icon: Truck
  },
  {
    title: 'Product',
    icon: Box,
    children: [
      { title: 'Categories', path: '/product/categories', icon: ChevronRight },
      { title: 'Inventory', path: '/product/inventory', icon: ChevronRight },
      { title: 'Lookbooks', path: '/product/lookbooks', icon: ChevronRight },
      { title: 'Models', path: '/product/models', icon: ChevronRight },
      { title: 'Size', path: '/product/size', icon: ChevronRight },
    ]
  }
];

const AppMobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const [, setLocation] = useLocation();
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

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
    open: { x: 0, opacity: 1 },
    closed: { x: '-100%', opacity: 0 },
  };

  const overlayVariants = {
    open: { opacity: 1 },
    closed: { opacity: 0 },
  };

  const childVariants = {
    open: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div 
            className="fixed inset-y-0 left-0 w-[280px] max-w-[80vw] bg-slate-900 border-r border-slate-800 z-50 flex flex-col"
            initial="closed"
            animate="open"
            exit="closed"
            variants={variants}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-800">
              <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                SalesBoost AI
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} className="text-slate-400 hover:text-white">
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Menu Items */}
            <div className="flex-1 overflow-y-auto py-2">
              <ul className="space-y-1 p-2">
                {menuItems.map((item) => (
                  <li key={item.title} className="rounded-md overflow-hidden">
                    {item.children ? (
                      <div>
                        <button
                          className="w-full flex items-center justify-between p-3 hover:bg-slate-800 text-slate-200 rounded-md"
                          onClick={() => toggleExpand(item.title)}
                        >
                          <div className="flex items-center">
                            <item.icon className="h-5 w-5 mr-3 text-slate-400" />
                            <span>{item.title}</span>
                          </div>
                          <ChevronDown 
                            className={`h-4 w-4 transition-transform duration-200 ${expandedItems[item.title] ? 'rotate-180' : ''}`} 
                          />
                        </button>

                        <AnimatePresence>
                          {expandedItems[item.title] && (
                            <motion.ul
                              initial="closed"
                              animate="open"
                              exit="closed"
                              variants={childVariants}
                              className="bg-slate-800/50 rounded-md mt-1 overflow-hidden"
                            >
                              {item.children.map((child) => (
                                <li key={child.title}>
                                  <button
                                    className="w-full flex items-center p-3 pl-11 hover:bg-slate-700/50 text-slate-300 text-sm"
                                    onClick={() => handleNavigation(child.path)}
                                  >
                                    <span>{child.title}</span>
                                  </button>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <button
                        className="w-full flex items-center p-3 hover:bg-slate-800 text-slate-200 rounded-md"
                        onClick={() => handleNavigation(item.path)}
                      >
                        <item.icon className="h-5 w-5 mr-3 text-slate-400" />
                        <span>{item.title}</span>
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-800">
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-500"
                onClick={() => handleNavigation('/login')}
              >
                Sign Out
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AppMobileMenu;