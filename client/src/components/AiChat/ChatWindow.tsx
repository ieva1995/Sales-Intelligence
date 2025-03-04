import { useState } from "react";
import { X, Send } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatWindow({ isOpen, onClose }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      content: "Hello! I'm your AI assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      content: input,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Simulate AI response (this will be replaced with actual API call)
    setTimeout(() => {
      const aiMessage: Message = {
        content: "I understand your question. Let me help you with that...",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);

    setInput("");
  };

  if (!isOpen) return null;

  return (
    <Card className="fixed bottom-20 right-4 w-96 h-[600px] shadow-xl flex flex-col border-0">
      <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">AI Assistant</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:text-white/80"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.isUser
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 dark:bg-gray-800"
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <p className="text-xs mt-1 opacity-70">
                {message.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button
            className="bg-green-500 hover:bg-green-600 text-white"
            onClick={handleSend}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
