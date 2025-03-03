import { useState } from "react";
import { useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PandaSvg } from "@/components/PandaSvg";

export default function Login() {
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [isHappy, setIsHappy] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email && formData.password) {
      setIsHappy(true);
      setLocation('/settings');
    } else {
      setIsHappy(false);
      setTimeout(() => setIsHappy(true), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <PandaSvg 
            isPasswordVisible={showPassword} 
            isHappy={isHappy} 
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
          <div>
            <Input
              type="email"
              placeholder="Email Address *"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <Input
              type="password"
              placeholder="Password *"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              onFocus={() => setShowPassword(true)}
              onBlur={() => setShowPassword(false)}
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            SIGN IN
          </Button>

          <div className="text-center">
            <a 
              href="#" 
              className="text-sm text-blue-600 hover:text-blue-800"
              onClick={(e) => {
                e.preventDefault();
                // Handle forgot password
              }}
            >
              Forgot password?
            </a>
          </div>

          <div className="text-center">
            <a 
              href="#" 
              className="text-sm text-blue-600 hover:text-blue-800"
              onClick={(e) => {
                e.preventDefault();
                // Handle sign up
              }}
            >
              Don't have an account? Sign Up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}