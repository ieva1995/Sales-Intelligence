import { useState, useEffect } from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

type ThemeType = "light" | "dark" | "system";

interface DarkModeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export default function DarkModeToggle({ className = "", showLabel = true }: DarkModeToggleProps) {
  const { toast } = useToast();
  const [theme, setTheme] = useState<ThemeType>("dark");
  const [isMounted, setIsMounted] = useState(false);

  // Initialize theme based on system preference or stored preference
  useEffect(() => {
    setIsMounted(true);
    
    // Check for stored theme preference
    const storedTheme = localStorage.getItem("theme") as ThemeType | null;
    
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      // If no stored preference, check system preference
      const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(isSystemDark ? "dark" : "light");
    }
  }, []);

  // Update the DOM when theme changes
  useEffect(() => {
    if (!isMounted) return;

    const root = document.documentElement;
    const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    // Apply theme based on selection
    if (theme === "dark" || (theme === "system" && isSystemDark)) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    
    // Store preference
    localStorage.setItem("theme", theme);
    
    // Listen for system preference changes if on system mode
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      
      const handleChange = () => {
        if (mediaQuery.matches) {
          root.classList.add("dark");
        } else {
          root.classList.remove("dark");
        }
      };
      
      mediaQuery.addEventListener("change", handleChange);
      
      return () => {
        mediaQuery.removeEventListener("change", handleChange);
      };
    }
  }, [theme, isMounted]);

  // Cycle through themes: light -> dark -> system -> light
  const cycleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
    setTheme(nextTheme);
    
    toast({
      title: "Theme Changed",
      description: `Theme set to ${nextTheme.charAt(0).toUpperCase() + nextTheme.slice(1)} mode`,
      duration: 2000,
    });
  };

  // Don't render anything until the component has mounted to prevent hydration issues
  if (!isMounted) return null;

  return (
    <motion.button
      className={`
        relative p-2 rounded-full transition-colors duration-300 focus:outline-none
        ${theme === "light" 
          ? "bg-blue-100 text-blue-900" 
          : theme === "dark" 
            ? "bg-slate-800 text-slate-200" 
            : "bg-slate-700 text-slate-300"}
        ${className}
      `}
      onClick={cycleTheme}
      whileTap={{ scale: 0.92 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      aria-label="Toggle theme"
    >
      <div className="flex items-center">
        <motion.span
          initial={{ rotate: 0 }}
          animate={{ rotate: theme === "dark" ? 360 : 0 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="flex items-center justify-center w-6 h-6"
        >
          {theme === "light" ? (
            <Sun className="w-5 h-5" />
          ) : theme === "dark" ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Monitor className="w-5 h-5" />
          )}
        </motion.span>
        
        {showLabel && (
          <motion.span 
            className="ml-2 text-sm font-medium"
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: 0.1 }}
          >
            {theme === "light" ? "Light" : theme === "dark" ? "Dark" : "System"}
          </motion.span>
        )}
      </div>
      
      {/* Theme indicator dot */}
      <motion.div
        className={`
          absolute bottom-1 right-1 w-2 h-2 rounded-full
          ${theme === "light" 
            ? "bg-blue-500" 
            : theme === "dark" 
              ? "bg-purple-500" 
              : "bg-green-500"}
        `}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2 }}
      />
    </motion.button>
  );
}
