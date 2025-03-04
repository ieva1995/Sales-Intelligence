import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useLocation } from "wouter";

// Define user types and interfaces
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean; // New property to easily check admin status
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  signUp: (name: string, email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  checkPermission: (requiredRole: string) => boolean; // New function to check role permissions
}

// Sample users for demo purposes - in a real app this would be in the backend
const DEMO_USERS = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@salesboost.ai",
    password: "Admin123!",
    role: "admin",
    avatar: "A"
  },
  {
    id: "2",
    name: "Sales Manager",
    email: "manager@salesboost.ai",
    password: "Manager123!",
    role: "manager",
    avatar: "M"
  },
  {
    id: "3",
    name: "Sales Rep",
    email: "rep@salesboost.ai",
    password: "Sales123!",
    role: "rep",
    avatar: "S"
  }
];

// Define role hierarchy for permission checks
const ROLE_HIERARCHY: Record<string, string[]> = {
  admin: ["admin", "manager", "rep", "user"],  // Admin can access all roles
  manager: ["manager", "rep", "user"],         // Manager can access manager, rep and user roles
  rep: ["rep", "user"],                        // Rep can access rep and user roles
  user: ["user"]                               // User can only access user role
};

// Create auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [, setLocation] = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem("sb_user");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } catch (e) {
          console.error("Failed to parse stored user", e);
          localStorage.removeItem("sb_user");
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = DEMO_USERS.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (user) {
      // Create a user object without the password
      const { password, ...secureUser } = user;

      // Store in localStorage
      localStorage.setItem("sb_user", JSON.stringify(secureUser));
      localStorage.setItem("sb_auth_token", `token_${secureUser.id}_${Date.now()}`);

      // Update state
      setUser(secureUser);

      return { success: true };
    }

    return { 
      success: false, 
      message: "Invalid email or password. Try admin@salesboost.ai with Admin123!"
    };
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("sb_user");
    localStorage.removeItem("sb_auth_token");
    setUser(null);
    setLocation("/");
  };

  // Sign up function
  const signUp = async (name: string, email: string, password: string) => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if email already exists
    if (DEMO_USERS.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { 
        success: false, 
        message: "Email already exists. Please use a different email."
      };
    }

    // In a real app, we would make an API call to create the user
    // For demo, we'll just pretend it worked and log them in
    const newUser = {
      id: `demo_${Date.now()}`,
      name,
      email,
      role: "user", // Default role for new signups is 'user' - no admin access
      avatar: name.charAt(0).toUpperCase()
    };

    // Store in localStorage
    localStorage.setItem("sb_user", JSON.stringify(newUser));
    localStorage.setItem("sb_auth_token", `token_${newUser.id}_${Date.now()}`);

    // Update state
    setUser(newUser);

    return { success: true };
  };

  // Check if user has permission for a specific role
  const checkPermission = (requiredRole: string): boolean => {
    if (!user) return false;

    const userRole = user.role.toLowerCase();
    const allowedRoles = ROLE_HIERARCHY[userRole] || [];

    return allowedRoles.includes(requiredRole.toLowerCase());
  };

  // Check if user is an admin
  const isAdmin = !!user && user.role.toLowerCase() === 'admin';

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoading, 
        isAuthenticated: !!user,
        isAdmin,
        login, 
        logout,
        signUp,
        checkPermission
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}