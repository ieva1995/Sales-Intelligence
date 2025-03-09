import { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Award,
  Play,
  MessageCircle,
  Brain,
  UserCheck,
  Info
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface SalesPerformanceToolbarProps {
  className?: string;
}

export default function SalesPerformanceToolbar({ className }: SalesPerformanceToolbarProps) {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [showAchievementDialog, setShowAchievementDialog] = useState(false);
  const [showInteractionDialog, setShowInteractionDialog] = useState(false);
  const [showMentorTooltip, setShowMentorTooltip] = useState(false);
  const [showStrategyDialog, setShowStrategyDialog] = useState(false);

  // Sample data for sales performance
  const salesData = [42, 45, 39, 47, 53, 58, 62, 59, 63, 67, 65, 72];
  
  // Sample achievement badges
  const badges = [
    { id: 1, name: "Deal Closer", description: "Closed 10+ deals this month", icon: <Award className="h-8 w-8 text-yellow-500" />, achieved: true },
    { id: 2, name: "Target Crusher", description: "Exceeded monthly quota by 20%", icon: <TrendingUp className="h-8 w-8 text-green-500" />, achieved: true },
    { id: 3, name: "Team Leader", description: "Top sales performer for 3 consecutive months", icon: <UserCheck className="h-8 w-8 text-blue-500" />, achieved: false },
    { id: 4, name: "S.L.A.S.E Power User", description: "Used AI suggestions on 25+ successful deals", icon: <Brain className="h-8 w-8 text-purple-500" />, achieved: true },
  ];

  // Sample customer interactions
  const customerInteractions = [
    { id: 1, customer: "Acme Corp", date: "2025-03-05", type: "Demo Call", notes: "Interested in enterprise package, need follow-up on security features" },
    { id: 2, customer: "TechGiant Inc", date: "2025-03-04", type: "Email Thread", notes: "Pricing negotiation, requested custom integration options" },
    { id: 3, customer: "Innovative Solutions", date: "2025-03-03", type: "Sales Meeting", notes: "Contract review, finalizing terms for Q2 rollout" },
  ];

  // Sample AI mentor tooltips
  const mentorTips = [
    "Try highlighting the ROI metrics when following up with Acme Corp",
    "TechGiant's decision maker responds well to case studies - send them the recent finance sector success story",
    "Schedule your outreach to Innovative Solutions for Tuesday mornings - their team is most responsive then",
    "Your close rate increases 23% when you present the security features first for enterprise clients"
  ];

  // Sample mood-based strategies
  const moodStrategies = [
    { mood: "Ambitious", strategy: "Focus on high-value accounts with 3+ decision makers", icon: <TrendingUp className="h-6 w-6 text-blue-500" /> },
    { mood: "Methodical", strategy: "Implement the 7-touch sequence for all enterprise leads", icon: <Play className="h-6 w-6 text-green-500" /> },
    { mood: "Collaborative", strategy: "Partner with Solutions team on complex deal structuring", icon: <UserCheck className="h-6 w-6 text-purple-500" /> },
    { mood: "Analytical", strategy: "Focus on data-driven objection handling using S.L.A.S.E insights", icon: <Brain className="h-6 w-6 text-orange-500" /> },
  ];

  const renderSparkline = () => {
    const max = Math.max(...salesData);
    const min = Math.min(...salesData);
    const range = max - min;
    
    return (
      <div className="h-16 flex items-end space-x-1">
        {salesData.map((value, index) => {
          const height = Math.max(4, ((value - min) / range) * 100);
          return (
            <motion.div
              key={index}
              initial={{ height: 0 }}
              animate={{ height: `${height}%` }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                delay: index * 0.05
              }}
              className={`w-2 rounded-t-sm ${activeFeature === 'sparkline' ? 'bg-blue-500' : 'bg-blue-400'}`}
            ></motion.div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700 p-2 z-30 ${className}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="p-2 h-auto"
                  onClick={() => setActiveFeature(activeFeature === 'sparkline' ? null : 'sparkline')}
                >
                  <TrendingUp className="h-5 w-5 mr-2" />
                  <span className="hidden md:inline">Performance</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Animated Sales Performance Sparkline</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="p-2 h-auto"
                  onClick={() => setShowAchievementDialog(true)}
                >
                  <Award className="h-5 w-5 mr-2" />
                  <span className="hidden md:inline">Achievements</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Gamified Achievement Badges</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="p-2 h-auto"
                  onClick={() => setShowInteractionDialog(true)}
                >
                  <Play className="h-5 w-5 mr-2" />
                  <span className="hidden md:inline">Interactions</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>One-Click Customer Interaction Replay</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip open={showMentorTooltip} onOpenChange={setShowMentorTooltip}>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="p-2 h-auto"
                  onClick={() => setShowMentorTooltip(!showMentorTooltip)}
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  <span className="hidden md:inline">AI Mentor</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-sm">
                <div className="space-y-2 p-1">
                  <h4 className="font-medium flex items-center">
                    <Brain className="h-4 w-4 mr-2 text-purple-500" />
                    S.L.A.S.E AI Sales Mentor
                  </h4>
                  <div className="text-sm">
                    {mentorTips.map((tip, index) => (
                      <div key={index} className="flex items-start mt-2">
                        <Info className="h-4 w-4 mr-2 mt-0.5 text-blue-500 flex-shrink-0" />
                        <p>{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="p-2 h-auto"
                  onClick={() => setShowStrategyDialog(true)}
                >
                  <Brain className="h-5 w-5 mr-2" />
                  <span className="hidden md:inline">Strategies</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Mood-Based Sales Strategy Recommender</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="hidden md:flex items-center">
          <Badge variant="outline" className="bg-slate-700 text-slate-200">
            <Sparkles className="h-3 w-3 mr-1 text-amber-400" />
            S.L.A.S.E Enhanced
          </Badge>
        </div>
      </div>

      {/* Expandable sparkline */}
      {activeFeature === 'sparkline' && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="bg-slate-900 p-3 border-t border-slate-700 mt-2"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-slate-300">Sales Performance (Last 12 Weeks)</h3>
              <Badge variant="outline" className="bg-blue-900/20 text-blue-400 border-blue-800">
                +14.3% from previous period
              </Badge>
            </div>
            {renderSparkline()}
          </div>
        </motion.div>
      )}

      {/* Achievement Badges Dialog */}
      <Dialog open={showAchievementDialog} onOpenChange={setShowAchievementDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Award className="h-5 w-5 mr-2 text-amber-500" />
              Sales Achievement Badges
            </DialogTitle>
            <DialogDescription>
              Gamified achievements to track your sales performance milestones.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {badges.map((badge) => (
              <div 
                key={badge.id} 
                className={`p-4 rounded-lg border text-center ${
                  badge.achieved 
                    ? 'bg-gradient-to-b from-slate-800 to-slate-900 border-slate-700' 
                    : 'bg-slate-950 border-slate-800 opacity-60'
                }`}
              >
                <div className="mx-auto mb-2 rounded-full w-16 h-16 flex items-center justify-center bg-slate-800">
                  {badge.icon}
                </div>
                <h4 className="font-bold">{badge.name}</h4>
                <p className="text-xs text-slate-400 mt-1">{badge.description}</p>
                {badge.achieved && (
                  <Badge className="mt-2 bg-amber-900/50 text-amber-400 border-amber-700">
                    Achieved
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Customer Interaction Dialog */}
      <Dialog open={showInteractionDialog} onOpenChange={setShowInteractionDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Play className="h-5 w-5 mr-2 text-green-500" />
              Recent Customer Interactions
            </DialogTitle>
            <DialogDescription>
              Replay your recent customer interactions and key takeaways.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            {customerInteractions.map((interaction) => (
              <div key={interaction.id} className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold">{interaction.customer}</h4>
                  <Badge variant="outline" className="bg-slate-900 text-slate-300">
                    {interaction.type}
                  </Badge>
                </div>
                <p className="text-xs text-slate-400 mb-2">{interaction.date}</p>
                <p className="text-sm">{interaction.notes}</p>
                <div className="mt-3 flex justify-end">
                  <Button size="sm" variant="outline" className="flex items-center text-xs">
                    <Play className="h-3 w-3 mr-1" />
                    Replay
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Mood-Based Strategy Dialog */}
      <Dialog open={showStrategyDialog} onOpenChange={setShowStrategyDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Brain className="h-5 w-5 mr-2 text-purple-500" />
              Mood-Based Sales Strategies
            </DialogTitle>
            <DialogDescription>
              S.L.A.S.E generated strategies based on your current sales approach.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-4 mt-4">
            {moodStrategies.map((strategy, index) => (
              <div key={index} className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                <div className="flex items-center mb-2">
                  <div className="rounded-full p-1.5 bg-slate-700 mr-3">{strategy.icon}</div>
                  <h4 className="font-bold">{strategy.mood} Approach</h4>
                </div>
                <p className="text-sm ml-12">{strategy.strategy}</p>
                <div className="mt-3 flex justify-end space-x-2">
                  <Button size="sm" variant="outline" className="text-xs">Save</Button>
                  <Button size="sm" variant="default" className="text-xs">Apply</Button>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
