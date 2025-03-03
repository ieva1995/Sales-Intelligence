import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Building2, Users, Cog } from "lucide-react";

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
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-black/30 border-0 backdrop-blur-xl">
          <CardContent className="p-6 space-y-6">
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
                  className="w-full bg-black/50 hover:bg-black/70 text-white border-gray-700 h-14"
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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-black/30 border-0 backdrop-blur-xl">
        <CardContent className="p-6 space-y-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent mb-2">
              SalesBoost AI
            </h1>
            <p className="text-gray-400">Welcome Back</p>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">{selectedRole} Login</h2>
              <p className="text-sm text-gray-400">Please enter your details</p>
            </div>
            <Button 
              variant="ghost" 
              className="text-gray-400 hover:text-white"
              onClick={() => setSelectedRole(null)}
            >
              ← Back
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="E-mail Address *"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-black/50 border-gray-700 text-white placeholder:text-gray-500"
                required
              />
            </div>

            <div>
              <Input
                type="password"
                placeholder="Password *"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="bg-black/50 border-gray-700 text-white placeholder:text-gray-500"
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
                  className="border-gray-700"
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
        </CardContent>
      </Card>
    </div>
  );
}