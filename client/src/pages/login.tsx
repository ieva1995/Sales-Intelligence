import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Building2, Users, Cog } from "lucide-react";
import { BackgroundMetrics } from "@/components/BackgroundMetrics";

interface LoginOptionProps {
  title: string;
  icon: React.ElementType;
}

export default function Login() {
  const [, setLocation] = useLocation();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });

  const loginOptions: LoginOptionProps[] = [
    { title: "Enterprise", icon: Building2 },
    { title: "Client", icon: Users },
    { title: "IT", icon: Cog }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email && formData.password) {
      setLocation('/settings');
    }
  };

  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <BackgroundMetrics />
        <Card className="w-full max-w-md bg-black/30 border border-gray-800 rounded-2xl backdrop-blur-xl">
          <CardContent className="p-8 space-y-6">
            <div className="text-center space-y-2 mb-8">
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                SalesBoost AI
              </h1>
              <p className="text-gray-400">Please select your login type</p>
            </div>

            <div className="grid gap-4">
              {loginOptions.map((option) => (
                <Button
                  key={option.title}
                  variant="outline"
                  className="w-full bg-black/50 hover:bg-black/70 text-white border-gray-800 h-14"
                  onClick={() => setSelectedRole(option.title)}
                >
                  <option.icon className="w-5 h-5 mr-2" />
                  {option.title} Login
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <BackgroundMetrics />
      <Card className="w-full max-w-md bg-black/30 border border-gray-800 rounded-2xl backdrop-blur-xl">
        <CardContent className="p-8 space-y-6">
          <div className="text-center space-y-2 mb-8">
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              SalesBoost AI
            </h1>
            <p className="text-gray-400">Please enter your details to access dashboard</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <Button
              type="button"
              variant="outline"
              className="w-full bg-black/50 text-white border-gray-800 h-11 hover:bg-black/70"
            >
              <svg viewBox="0 0 48 48" className="w-5 h-5 mr-2">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
              </svg>
              Google
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full bg-black/50 text-white border-gray-800 h-11 hover:bg-black/70"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2">
                <path fill="currentColor" d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
              Apple
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-black px-2 text-gray-400">Or</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="E-mail Address *"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-black/50 border-gray-800 text-white placeholder:text-gray-500 h-11"
                required
              />
            </div>

            <div>
              <Input
                type="password"
                placeholder="Password *"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="bg-black/50 border-gray-800 text-white placeholder:text-gray-500 h-11"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={formData.rememberMe}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, rememberMe: checked as boolean })
                  }
                  className="border-gray-800 data-[state=checked]:bg-green-500"
                />
                <label htmlFor="remember" className="text-sm text-gray-400 cursor-pointer">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm text-green-500 hover:text-green-400">
                Forgot Password?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-400 text-white h-11"
            >
              Sign In
            </Button>

            <div className="text-center text-sm">
              <p className="text-gray-400">
                Don't have an account yet?{' '}
                <a href="#" className="text-green-500 hover:text-green-400">Sign Up</a>
              </p>
            </div>
          </form>

          {selectedRole && (
            <div className="absolute top-4 left-4">
              <Button
                variant="ghost"
                className="text-gray-400 hover:text-white"
                onClick={() => setSelectedRole(null)}
              >
                ← Back
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}