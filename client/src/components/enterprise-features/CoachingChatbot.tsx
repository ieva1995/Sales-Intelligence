import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageSquare, Send, Bot, Zap, User, BookOpen, Award, Settings } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function CoachingChatbot() {
  const { toast } = useToast();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI sales coach. How can I help you improve your sales performance today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const coachingTopics = [
    { 
      id: 'objections', 
      icon: BookOpen, 
      label: 'Handling Objections',
      description: 'Learn effective techniques for overcoming common sales objections'
    },
    { 
      id: 'closing', 
      icon: Award, 
      label: 'Closing Techniques',
      description: 'Master proven methods to close deals more effectively'
    },
    { 
      id: 'negotiation', 
      icon: Zap, 
      label: 'Negotiation Skills',
      description: 'Improve your negotiation tactics to win better deals'
    }
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsTyping(true);
    
    // Simulate bot response
    setTimeout(() => {
      const responses = [
        "That's a great question! When dealing with this scenario, I recommend focusing on value rather than price. Could you tell me more about the specific objection you're facing?",
        "Based on my analysis of top performers, the most effective approach is to use open-ended questions that encourage prospects to elaborate on their needs. Would you like me to provide some examples?",
        "I've analyzed your recent sales data and noticed that you're particularly strong in discovery calls but could improve your follow-up technique. Let's focus on developing a structured follow-up strategy.",
        "Looking at industry benchmarks, your conversion rate is above average, but your deal cycle could be shortened. Have you considered implementing a more streamlined qualification process?",
        "One technique that's proven effective is the 'feel, felt, found' method for addressing concerns. Would you like me to explain how to apply this to your specific situation?"
      ];
      
      const botMessage: Message = {
        id: Date.now().toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };
  
  const handleTopicClick = (topic: string) => {
    // Simulate selecting a coaching topic
    const topicQuestions = {
      'objections': "How do I handle price objections from enterprise clients?",
      'closing': "What closing techniques work best for high-value deals?",
      'negotiation': "How can I negotiate better terms without reducing price?"
    };
    
    setMessage(topicQuestions[topic as keyof typeof topicQuestions] || '');
  };
  
  return (
    <Card className="border-0 bg-slate-800/60">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 sm:p-6">
        <div>
          <CardTitle className="text-white text-xl sm:text-2xl flex items-center">
            <MessageSquare className="mr-2 h-5 w-5" />
            Personalized Sales Coaching Chatbot
          </CardTitle>
          <CardDescription className="text-blue-100">
            Get AI-powered coaching and guidance for your sales strategies
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid md:grid-cols-4 h-[600px]">
          <div className="bg-slate-700 md:col-span-1 border-r border-slate-600 p-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-white">Coaching Topics</h3>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-2">
              {coachingTopics.map(topic => (
                <Button
                  key={topic.id}
                  variant="ghost"
                  className="w-full justify-start text-left h-auto py-3"
                  onClick={() => handleTopicClick(topic.id)}
                >
                  <div className="flex gap-3 items-start">
                    <div className="bg-slate-800 p-2 rounded-md">
                      <topic.icon className="h-4 w-4 text-blue-400" />
                    </div>
                    <div>
                      <div className="font-medium text-white">{topic.label}</div>
                      <p className="text-xs text-slate-400 mt-1">{topic.description}</p>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
            
            <div className="mt-6">
              <h3 className="font-medium text-white mb-3">Your Performance</h3>
              <div className="bg-slate-800 p-3 rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-400">Closing Rate</span>
                  <span className="text-sm font-medium text-white">32%</span>
                </div>
                <div className="w-full bg-slate-600 rounded-full h-1.5 mb-4">
                  <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '32%' }}></div>
                </div>
                
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-400">Deal Size</span>
                  <span className="text-sm font-medium text-white">$8,450</span>
                </div>
                <div className="w-full bg-slate-600 rounded-full h-1.5 mb-4">
                  <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '67%' }}></div>
                </div>
                
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-400">Follow-ups</span>
                  <span className="text-sm font-medium text-white">4.2/week</span>
                </div>
                <div className="w-full bg-slate-600 rounded-full h-1.5">
                  <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '42%' }}></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:col-span-3">
            <div className="flex-1 p-4 overflow-y-auto" style={{ maxHeight: 'calc(600px - 70px)' }}>
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div 
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`
                        max-w-[80%] rounded-lg p-3 
                        ${msg.sender === 'user' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-slate-700 text-slate-100'}
                      `}
                    >
                      <div className="flex items-center mb-1">
                        {msg.sender === 'bot' ? (
                          <Bot className="h-4 w-4 mr-1.5 text-blue-400" />
                        ) : (
                          <User className="h-4 w-4 mr-1.5 text-blue-100" />
                        )}
                        <span className="text-xs opacity-70">
                          {msg.sender === 'bot' ? 'AI Coach' : 'You'} • {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-sm">{msg.content}</p>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-slate-700 rounded-lg p-3 max-w-[80%]">
                      <div className="flex items-center">
                        <Bot className="h-4 w-4 mr-1.5 text-blue-400" />
                        <span className="text-xs text-slate-400">AI Coach is typing</span>
                      </div>
                      <div className="flex space-x-1 mt-2">
                        <div className="h-2 w-2 rounded-full bg-slate-500 animate-bounce"></div>
                        <div className="h-2 w-2 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="h-2 w-2 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </div>
            
            <div className="p-4 border-t border-slate-600">
              <div className="flex gap-2">
                <Input 
                  placeholder="Ask your sales coach a question..." 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="bg-slate-700 border-slate-600"
                />
                <Button onClick={handleSendMessage} disabled={!message.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
