import { Bell, User, Settings, Search, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Header() {
  const { logout } = useAuth();
  const [, navigate] = useLocation();
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header relative z-40">
      <div className="flex items-center justify-between h-full px-4 md:px-8">
        <motion.div 
          className="hidden md:flex"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className={`relative w-64 transition-all duration-300 ${isSearchFocused ? 'w-80' : 'w-64'}`}>
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search..." 
              className="pl-8 bg-slate-800 border-slate-700 focus:border-blue-500 text-white transition-all duration-300"
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
          </div>
        </motion.div>

        <motion.div 
          className="flex items-center gap-4"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="ghost"
              size="icon"
              className="relative h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors duration-200"
            >
              <Bell className="h-4 w-4" />
              <motion.span 
                className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  duration: 0.3,
                  delay: 0.3, 
                  type: "spring",
                  stiffness: 500
                }}
              />
            </Button>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="ghost"
              size="icon"
              className="relative h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors duration-200"
              onClick={handleLogout}
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </motion.div>

          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white font-medium"
              whileHover={{ 
                boxShadow: "0 0 8px rgba(96, 165, 250, 0.6)",
              }}
              transition={{ duration: 0.2 }}
            >
              A
            </motion.div>
            <span className="hidden md:inline text-sm font-medium text-slate-200">Admin</span>
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
}