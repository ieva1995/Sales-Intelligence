import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, Users, Cog } from "lucide-react";
import { useLocation } from "wouter";
import { YetiSvg } from "@/components/YetiSvg";

interface LoginOptionProps {
  title: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
}

export default function Login() {
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [isHappy, setIsHappy] = useState(true);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const loginOptions: LoginOptionProps[] = [
    {
      title: "Enterprise Login",
      description: "For large organizations and corporate users",
      icon: Building2,
      gradient: "from-blue-500 to-blue-600"
    },
    {
      title: "Client Login",
      description: "For customers and business partners",
      icon: Users,
      gradient: "from-purple-500 to-purple-600"
    },
    {
      title: "IT Admin Login",
      description: "For system administrators and IT staff",
      icon: Cog,
      gradient: "from-emerald-500 to-emerald-600"
    }
  ];

  const handleLogin = () => {
    if (formData.username && formData.password) {
      setIsHappy(true);
      setLocation('/settings');
    } else {
      setIsHappy(false);
      setTimeout(() => setIsHappy(true), 2000);
    }
  };

  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Welcome to SalesBoost AI</h1>
            <p className="text-muted-foreground">Choose your login type to continue</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {loginOptions.map((option) => (
              <motion.div
                key={option.title}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card 
                  className="cursor-pointer border-2 hover:border-transparent hover:shadow-xl"
                  onClick={() => setSelectedRole(option.title)}
                >
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${option.gradient}`}>
                        <option.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{option.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{option.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{selectedRole}</CardTitle>
          <Button 
            variant="ghost" 
            className="absolute top-2 left-2"
            onClick={() => setSelectedRole(null)}
          >
            ← Back
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <YetiSvg 
              isPasswordVisible={showPassword} 
              isHappy={isHappy} 
            />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Username</Label>
              <Input
                placeholder="Enter your username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                onFocus={() => setIsHappy(true)}
              />
            </div>

            <div className="space-y-2">
              <Label>Password</Label>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                onFocus={() => setShowPassword(true)}
                onBlur={() => setShowPassword(false)}
              />
            </div>

            <Button 
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600"
              onClick={handleLogin}
            >
              Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}