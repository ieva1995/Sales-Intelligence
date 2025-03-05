import React from 'react';
import { Users, FileText, BarChart2, MessageSquare, Layout } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';

interface ToolbarItem {
  id: string;
  icon: React.ElementType;
  label: string;
  description: string;
}

export default function EnterpriseToolbar() {
  const { toast } = useToast();

  const toolbarItems: ToolbarItem[] = [
    {
      id: 'communication-hub',
      icon: Users,
      label: 'Interactive Sales Team Communication Hub',
      description: 'Connect and collaborate with your sales team in real-time'
    },
    {
      id: 'report-generator',
      icon: FileText,
      label: 'One-Click Performance Report Generator',
      description: 'Generate comprehensive sales performance reports with a single click'
    },
    {
      id: 'sentiment-analysis',
      icon: BarChart2,
      label: 'Customer Sentiment Analysis Widget',
      description: 'Analyze and visualize customer sentiment across all touchpoints'
    },
    {
      id: 'coaching-chatbot',
      icon: MessageSquare,
      label: 'Personalized Sales Coaching Chatbot',
      description: 'Get AI-powered coaching and guidance for your sales strategies'
    },
    {
      id: 'dashboard-customization',
      icon: Layout,
      label: 'Intuitive Drag-and-Drop Dashboard Customization',
      description: 'Customize your dashboard layouts with easy drag-and-drop functionality'
    }
  ];

  const handleToolClick = (tool: ToolbarItem) => {
    toast({
      title: tool.label,
      description: "This feature is coming soon. Stay tuned for updates!",
    });
  };

  return (
    <TooltipProvider>
      <div className="fixed top-0 left-0 right-0 z-30 bg-slate-900 border-b border-slate-800 shadow-md">
        <div className="mx-auto px-2 md:px-4 py-2 flex items-center justify-end gap-4 overflow-x-auto">
          {toolbarItems.map((item) => (
            <Tooltip key={item.id}>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-xs sm:text-sm text-slate-300 hover:text-white flex items-center whitespace-nowrap px-2 py-1"
                  onClick={() => handleToolClick(item)}
                >
                  <item.icon className="h-4 w-4 mr-1.5" />
                  <span className="hidden md:inline">{item.label}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <div>
                  <p className="font-medium">{item.label}</p>
                  <p className="text-xs text-slate-400">{item.description}</p>
                </div>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
}