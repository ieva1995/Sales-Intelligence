import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Users, Cog } from "lucide-react";

interface LoginOptionProps {
  title: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
}

const LoginOption = ({ title, description, icon: Icon, gradient }: LoginOptionProps) => (
  <Card className="group transition-all duration-300 hover:scale-[1.02] cursor-pointer border-2 hover:border-transparent hover:shadow-xl">
    <CardHeader>
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-lg bg-gradient-to-r ${gradient} group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <CardTitle className="text-xl">{title}</CardTitle>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <Button 
        className={`w-full bg-gradient-to-r ${gradient} hover:opacity-90 transition-opacity`}
      >
        Login
      </Button>
    </CardContent>
  </Card>
);

export default function Settings() {
  const loginOptions = [
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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Choose your login type to access settings</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loginOptions.map((option) => (
          <LoginOption key={option.title} {...option} />
        ))}
      </div>
    </div>
  );
}
