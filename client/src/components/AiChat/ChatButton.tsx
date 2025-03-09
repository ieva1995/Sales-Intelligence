import { MessageSquareMore } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ChatWindow from "./ChatWindow";

export default function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        className="fixed bottom-4 right-4 h-12 w-12 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg"
        onClick={() => setIsOpen(true)}
      >
        <MessageSquareMore className="h-6 w-6" />
      </Button>

      <ChatWindow isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
