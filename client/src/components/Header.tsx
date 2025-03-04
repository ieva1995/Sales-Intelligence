import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="header relative z-40">
      <div className="flex items-center justify-end h-full px-4 md:pl-72">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="relative h-8 w-8 text-gray-400 hover:text-white"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
          </Button>
        </div>
      </div>
    </header>
  );
}
