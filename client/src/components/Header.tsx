import { Bell, User, Settings, Search, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";

export default function Header() {
  const { logout } = useAuth();
  const [, navigate] = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header relative z-40">
      <div className="flex items-center justify-between h-full px-4 md:px-8">
        <div className="hidden md:flex">
          <div className="relative w-64">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search..." 
              className="pl-8 bg-slate-800 border-slate-700 focus:border-blue-500 text-white"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="relative h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="relative h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-800"
            onClick={handleLogout}
            title="Logout"
          >
            <LogOut className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white font-medium">
              A
            </div>
            <span className="hidden md:inline text-sm font-medium text-slate-200">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}