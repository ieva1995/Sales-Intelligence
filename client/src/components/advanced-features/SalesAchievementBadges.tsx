import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Trophy,
  Award,
  Star,
  TrendingUp,
  Zap,
  Target,
  User,
  Users,
  Calendar,
  RefreshCw,
  Sparkles,
  Download,
  Share2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

// Badge types
type BadgeStatus = 'locked' | 'progress' | 'completed' | 'new';

interface AchievementBadge {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  progress: number; // 0-100
  status: BadgeStatus;
  category: 'sales' | 'customer' | 'team' | 'quality';
  level: 1 | 2 | 3;
  reward?: string;
  dateEarned?: string;
}

interface SalesPerson {
  id: number;
  name: string;
  avatar: string;
  role: string;
  teamName: string;
  badges: string[]; // Badge IDs earned
  totalBadges: number;
}

// Sample leaderboard data
const topPerformers: SalesPerson[] = [
  { 
    id: 1, 
    name: "Alex Morgan", 
    avatar: "AM", 
    role: "Senior Sales Exec", 
    teamName: "Enterprise", 
    badges: ['consistent_closer', 'top_monthly', 'customer_loyalty'],
    totalBadges: 12
  },
  { 
    id: 2, 
    name: "Jordan Lee", 
    avatar: "JL", 
    role: "Account Executive", 
    teamName: "SMB", 
    badges: ['top_monthly', 'quick_response', 'team_player'],
    totalBadges: 9
  },
  { 
    id: 3, 
    name: "Taylor Swift", 
    avatar: "TS", 
    role: "Sales Director", 
    teamName: "Enterprise", 
    badges: ['mega_deal', 'customer_loyalty', 'top_quarterly'],
    totalBadges: 15
  },
  { 
    id: 4, 
    name: "Jamie Smith", 
    avatar: "JS", 
    role: "SDR Team Lead", 
    teamName: "Outbound", 
    badges: ['prospecting_pro', 'team_player', 'quick_response'],
    totalBadges: 8
  },
  { 
    id: 5, 
    name: "Casey Johnson", 
    avatar: "CJ", 
    role: "Account Manager", 
    teamName: "Customer Success", 
    badges: ['renewal_champion', 'customer_loyalty', 'upsell_master'],
    totalBadges: 11
  }
];

// Sample badge data
const achievementBadges: AchievementBadge[] = [
  {
    id: 'consistent_closer',
    name: 'Consistent Closer',
    description: 'Closed deals consistently above target for 3 consecutive months',
    icon: Trophy,
    color: 'gold',
    progress: 100,
    status: 'completed',
    category: 'sales',
    level: 3,
    reward: '$500 Bonus',
    dateEarned: '2025-02-15'
  },
  {
    id: 'top_monthly',
    name: 'Top Monthly Performer',
    description: 'Highest revenue generation for the month',
    icon: Award,
    color: 'blue',
    progress: 100,
    status: 'completed',
    category: 'sales',
    level: 2,
    reward: 'Premium Parking Spot',
    dateEarned: '2025-02-28'
  },
  {
    id: 'prospecting_pro',
    name: 'Prospecting Pro',
    description: 'Generated 50+ qualified leads in a month',
    icon: Target,
    color: 'green',
    progress: 100,
    status: 'completed',
    category: 'sales',
    level: 1,
    reward: 'LinkedIn Premium',
    dateEarned: '2025-01-30'
  },
  {
    id: 'mega_deal',
    name: 'Mega Deal',
    description: 'Closed a deal worth over $500,000',
    icon: Zap,
    color: 'purple',
    progress: 100,
    status: 'completed',
    category: 'sales',
    level: 3,
    reward: 'Luxury Vacation',
    dateEarned: '2024-12-15'
  },
  {
    id: 'quick_response',
    name: 'Lightning Response',
    description: 'Averaged under 1 hour response time to all leads',
    icon: Zap,
    color: 'orange',
    progress: 80,
    status: 'progress',
    category: 'quality',
    level: 2
  },
  {
    id: 'customer_loyalty',
    name: 'Customer Loyalty',
    description: 'Maintained 95%+ retention rate for assigned accounts',
    icon: Star,
    color: 'pink',
    progress: 100,
    status: 'completed',
    category: 'customer',
    level: 2,
    reward: 'Dinner Gift Card',
    dateEarned: '2025-01-15'
  },
  {
    id: 'team_player',
    name: 'Team Player',
    description: 'Provided critical assistance on 10+ team deals',
    icon: Users,
    color: 'teal',
    progress: 60,
    status: 'progress',
    category: 'team',
    level: 1
  },
  {
    id: 'renewal_champion',
    name: 'Renewal Champion',
    description: 'Achieved 100% renewal rate for the quarter',
    icon: TrendingUp,
    color: 'indigo',
    progress: 95,
    status: 'progress',
    category: 'customer',
    level: 2
  },
  {
    id: 'upsell_master',
    name: 'Upsell Master',
    description: 'Expanded 15 accounts with additional products',
    icon: TrendingUp,
    color: 'amber',
    progress: 75,
    status: 'progress',
    category: 'sales',
    level: 2
  },
  {
    id: 'top_quarterly',
    name: 'Quarterly MVP',
    description: 'Top overall performer for the quarter',
    icon: Trophy,
    color: 'purple',
    progress: 100,
    status: 'completed',
    category: 'sales',
    level: 3,
    reward: 'Company-wide Recognition + Bonus',
    dateEarned: '2024-12-31'
  },
  {
    id: 'social_seller',
    name: 'Social Selling Star',
    description: 'Generated 20+ deals through social media engagement',
    icon: Share2,
    color: 'blue',
    progress: 20,
    status: 'progress',
    category: 'sales',
    level: 1
  },
  {
    id: 'perfect_pitch',
    name: 'Perfect Pitch',
    description: 'Achieved 75%+ conversion rate on demos',
    icon: Target,
    color: 'green',
    progress: 0,
    status: 'locked',
    category: 'quality',
    level: 2
  }
];

// Color mapping
const getCategoryColor = (category: string) => {
  switch(category) {
    case 'sales': return 'from-blue-500 to-blue-600';
    case 'customer': return 'from-green-500 to-green-600';
    case 'team': return 'from-purple-500 to-purple-600';
    case 'quality': return 'from-amber-500 to-amber-600';
    default: return 'from-gray-500 to-gray-600';
  }
};

// Badge icon color mapping
const getBadgeColor = (color: string) => {
  switch(color) {
    case 'gold': return 'text-yellow-400';
    case 'blue': return 'text-blue-400';
    case 'green': return 'text-green-400';
    case 'purple': return 'text-purple-400';
    case 'orange': return 'text-orange-400';
    case 'pink': return 'text-pink-400';
    case 'teal': return 'text-teal-400';
    case 'indigo': return 'text-indigo-400';
    case 'amber': return 'text-amber-400';
    default: return 'text-gray-400';
  }
};

// Badge background color mapping
const getBadgeBgColor = (color: string, status: BadgeStatus) => {
  if (status === 'locked') return 'bg-slate-700/50';
  
  switch(color) {
    case 'gold': return 'bg-yellow-500/10';
    case 'blue': return 'bg-blue-500/10';
    case 'green': return 'bg-green-500/10';
    case 'purple': return 'bg-purple-500/10';
    case 'orange': return 'bg-orange-500/10';
    case 'pink': return 'bg-pink-500/10';
    case 'teal': return 'bg-teal-500/10';
    case 'indigo': return 'bg-indigo-500/10';
    case 'amber': return 'bg-amber-500/10';
    default: return 'bg-gray-500/10';
  }
};

// Level indicator
const getLevelIndicator = (level: number) => {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3].map((i) => (
        <Star 
          key={i} 
          className={`h-3 w-3 ${i <= level ? 'text-yellow-400' : 'text-gray-600'}`} 
          fill={i <= level ? 'currentColor' : 'none'} 
        />
      ))}
    </div>
  );
};

export default function SalesAchievementBadges() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("earned");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [badges, setBadges] = useState<AchievementBadge[]>([]);
  const [showBadgeDetails, setShowBadgeDetails] = useState<string | null>(null);

  // Fetch data initially
  useEffect(() => {
    fetchBadges();
  }, []);

  // Filter badges based on active tab and category
  useEffect(() => {
    let filtered = [...achievementBadges];
    
    if (activeTab === "earned") {
      filtered = filtered.filter(badge => badge.status === 'completed');
    } else if (activeTab === "progress") {
      filtered = filtered.filter(badge => badge.status === 'progress');
    } else if (activeTab === "locked") {
      filtered = filtered.filter(badge => badge.status === 'locked');
    }
    
    if (selectedCategory) {
      filtered = filtered.filter(badge => badge.category === selectedCategory);
    }
    
    setBadges(filtered);
  }, [activeTab, selectedCategory]);

  const fetchBadges = () => {
    setIsLoading(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      setBadges(achievementBadges);
      setIsLoading(false);
    }, 800);
  };

  const handleShare = (badgeId: string) => {
    const badge = achievementBadges.find(b => b.id === badgeId);
    
    if (!badge) return;
    
    toast({
      title: "Badge Shared",
      description: `You've shared your "${badge.name}" achievement with your team`,
    });
  };

  const handleDownload = (badgeId: string) => {
    const badge = achievementBadges.find(b => b.id === badgeId);
    
    if (!badge) return;
    
    toast({
      title: "Certificate Downloaded",
      description: `Your "${badge.name}" achievement certificate has been downloaded`,
    });
  };

  const handleShowBadgeDetails = (badgeId: string) => {
    setShowBadgeDetails(badgeId);
  };

  return (
    <Card className="overflow-hidden border-0 bg-slate-800/60">
      <CardHeader className="bg-gradient-to-r from-amber-600 to-amber-500 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <CardTitle className="text-white text-xl sm:text-2xl flex items-center">
              <Trophy className="mr-2 h-5 w-5" />
              Gamified Sales Achievement Badges
            </CardTitle>
            <CardDescription className="text-amber-100">
              Unlock achievements and rewards for sales excellence
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              onClick={fetchBadges}
              disabled={isLoading}
            >
              {isLoading ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4 mr-2" />
              )}
              Refresh
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {showBadgeDetails ? (
          <BadgeDetails 
            badge={achievementBadges.find(b => b.id === showBadgeDetails)!}
            onClose={() => setShowBadgeDetails(null)}
            onShare={() => handleShare(showBadgeDetails)}
            onDownload={() => handleDownload(showBadgeDetails)}
          />
        ) : (
          <>
            <Tabs defaultValue="earned" className="w-full" value={activeTab} onValueChange={setActiveTab}>
              <div className="px-4 sm:px-6 py-4 border-b border-slate-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <TabsList className="bg-slate-700">
                  <TabsTrigger value="earned" className="data-[state=active]:bg-amber-500">
                    <Award className="h-4 w-4 mr-2" />
                    Earned
                  </TabsTrigger>
                  <TabsTrigger value="progress" className="data-[state=active]:bg-amber-500">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    In Progress
                  </TabsTrigger>
                  <TabsTrigger value="locked" className="data-[state=active]:bg-amber-500">
                    <Trophy className="h-4 w-4 mr-2" />
                    Locked
                  </TabsTrigger>
                  <TabsTrigger value="leaderboard" className="data-[state=active]:bg-amber-500">
                    <Users className="h-4 w-4 mr-2" />
                    Leaderboard
                  </TabsTrigger>
                </TabsList>
                
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className={`border-slate-600 ${selectedCategory === null ? 'bg-slate-700' : 'bg-slate-800'}`}
                    onClick={() => setSelectedCategory(null)}
                  >
                    All
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className={`border-slate-600 ${selectedCategory === 'sales' ? 'bg-slate-700' : 'bg-slate-800'}`}
                    onClick={() => setSelectedCategory('sales')}
                  >
                    <Target className="h-3 w-3 mr-1 text-blue-400" />
                    Sales
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className={`border-slate-600 ${selectedCategory === 'customer' ? 'bg-slate-700' : 'bg-slate-800'}`}
                    onClick={() => setSelectedCategory('customer')}
                  >
                    <User className="h-3 w-3 mr-1 text-green-400" />
                    Customer
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className={`border-slate-600 ${selectedCategory === 'team' ? 'bg-slate-700' : 'bg-slate-800'}`}
                    onClick={() => setSelectedCategory('team')}
                  >
                    <Users className="h-3 w-3 mr-1 text-purple-400" />
                    Team
                  </Button>
                </div>
              </div>
              
              <TabsContent value="earned" className="p-0 m-0">
                <div className="p-4 sm:p-6">
                  {isLoading ? (
                    <div className="h-[300px] w-full flex items-center justify-center">
                      <RefreshCw className="h-8 w-8 animate-spin text-amber-400" />
                    </div>
                  ) : badges.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {badges.map((badge) => (
                        <motion.div
                          key={badge.id}
                          className={`rounded-lg p-4 cursor-pointer relative ${getBadgeBgColor(badge.color, badge.status)}`}
                          whileHover={{ scale: 1.03 }}
                          onClick={() => handleShowBadgeDetails(badge.id)}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="absolute top-2 right-2">
                            {getLevelIndicator(badge.level)}
                          </div>
                          <div className="flex flex-col items-center text-center">
                            <div className="p-4 rounded-full bg-slate-800/80 mb-3">
                              <badge.icon className={`h-8 w-8 ${getBadgeColor(badge.color)}`} />
                            </div>
                            <h3 className="font-semibold text-white mb-1">{badge.name}</h3>
                            <p className="text-xs text-gray-400 mb-2 line-clamp-2">{badge.description}</p>
                            {badge.dateEarned && (
                              <div className="flex items-center text-xs text-slate-400 mt-auto">
                                <Calendar className="h-3 w-3 mr-1" />
                                Earned {new Date(badge.dateEarned).toLocaleDateString()}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Trophy className="h-12 w-12 text-slate-600 mx-auto mb-3" />
                      <h3 className="text-white font-medium mb-2">No Badges Yet</h3>
                      <p className="text-slate-400 text-sm">
                        Complete sales achievements to earn badges and rewards
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="progress" className="p-0 m-0">
                <div className="p-4 sm:p-6">
                  {isLoading ? (
                    <div className="h-[300px] w-full flex items-center justify-center">
                      <RefreshCw className="h-8 w-8 animate-spin text-amber-400" />
                    </div>
                  ) : badges.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {badges.map((badge) => (
                        <motion.div
                          key={badge.id}
                          className={`rounded-lg p-4 cursor-pointer relative ${getBadgeBgColor(badge.color, badge.status)}`}
                          whileHover={{ scale: 1.03 }}
                          onClick={() => handleShowBadgeDetails(badge.id)}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="absolute top-2 right-2">
                            {getLevelIndicator(badge.level)}
                          </div>
                          <div className="flex flex-col items-center text-center">
                            <div className="p-4 rounded-full bg-slate-800/80 mb-3">
                              <badge.icon className={`h-8 w-8 ${getBadgeColor(badge.color)}`} />
                            </div>
                            <h3 className="font-semibold text-white mb-1">{badge.name}</h3>
                            <p className="text-xs text-gray-400 mb-3 line-clamp-2">{badge.description}</p>
                            <div className="w-full bg-slate-700 h-2 rounded-full mt-auto">
                              <div 
                                className={`h-2 rounded-full bg-gradient-to-r ${getCategoryColor(badge.category)}`}
                                style={{ width: `${badge.progress}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-slate-400 mt-1">{badge.progress}% Complete</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <TrendingUp className="h-12 w-12 text-slate-600 mx-auto mb-3" />
                      <h3 className="text-white font-medium mb-2">No Badges In Progress</h3>
                      <p className="text-slate-400 text-sm">
                        Start working towards achievements to see your progress
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="locked" className="p-0 m-0">
                <div className="p-4 sm:p-6">
                  {isLoading ? (
                    <div className="h-[300px] w-full flex items-center justify-center">
                      <RefreshCw className="h-8 w-8 animate-spin text-amber-400" />
                    </div>
                  ) : badges.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {badges.map((badge) => (
                        <motion.div
                          key={badge.id}
                          className="bg-slate-700/50 rounded-lg p-4 cursor-pointer relative"
                          whileHover={{ scale: 1.03 }}
                          onClick={() => handleShowBadgeDetails(badge.id)}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="absolute top-2 right-2">
                            {getLevelIndicator(badge.level)}
                          </div>
                          <div className="flex flex-col items-center text-center">
                            <div className="p-4 rounded-full bg-slate-800/80 mb-3">
                              <badge.icon className="h-8 w-8 text-slate-500" />
                            </div>
                            <h3 className="font-semibold text-white mb-1">{badge.name}</h3>
                            <p className="text-xs text-gray-400 mb-3 line-clamp-2">{badge.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Trophy className="h-12 w-12 text-slate-600 mx-auto mb-3" />
                      <h3 className="text-white font-medium mb-2">No Locked Badges</h3>
                      <p className="text-slate-400 text-sm">
                        You've discovered all available badges
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="leaderboard" className="p-0 m-0">
                <div className="p-4 sm:p-6">
                  <div className="bg-slate-700 rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-slate-600">
                          <th className="py-3 px-4 text-left text-sm font-medium text-white">Rank</th>
                          <th className="py-3 px-4 text-left text-sm font-medium text-white">Salesperson</th>
                          <th className="py-3 px-4 text-left text-sm font-medium text-white">Team</th>
                          <th className="py-3 px-4 text-left text-sm font-medium text-white">Recent Badges</th>
                          <th className="py-3 px-4 text-right text-sm font-medium text-white">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {topPerformers.map((person, index) => (
                          <tr 
                            key={person.id} 
                            className={`border-b border-slate-600 ${index === 0 ? 'bg-amber-500/10' : ''}`}
                          >
                            <td className="py-3 px-4">
                              {index === 0 ? (
                                <div className="flex items-center">
                                  <Trophy className="h-5 w-5 text-yellow-400 mr-1" />
                                  <span className="font-medium text-yellow-400">1st</span>
                                </div>
                              ) : (
                                <span className="text-white">{index + 1}</span>
                              )}
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center text-white text-sm font-medium mr-3">
                                  {person.avatar}
                                </div>
                                <div>
                                  <div className="font-medium text-white">{person.name}</div>
                                  <div className="text-xs text-slate-400">{person.role}</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-slate-300">{person.teamName}</td>
                            <td className="py-3 px-4">
                              <div className="flex space-x-1">
                                {person.badges.slice(0, 3).map((badgeId) => {
                                  const badge = achievementBadges.find(b => b.id === badgeId);
                                  if (!badge) return null;
                                  return (
                                    <div 
                                      key={badgeId}
                                      className={`w-6 h-6 rounded-full ${getBadgeBgColor(badge.color, 'completed')} flex items-center justify-center`}
                                      title={badge.name}
                                    >
                                      <badge.icon className={`h-3 w-3 ${getBadgeColor(badge.color)}`} />
                                    </div>
                                  );
                                })}
                                {person.badges.length > 3 && (
                                  <div className="w-6 h-6 rounded-full bg-slate-600 flex items-center justify-center text-xs text-white">
                                    +{person.badges.length - 3}
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="py-3 px-4 text-right font-medium text-white">
                              {person.totalBadges}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
      </CardContent>
    </Card>
  );
}

interface BadgeDetailsProps {
  badge: AchievementBadge;
  onClose: () => void;
  onShare: () => void;
  onDownload: () => void;
}

function BadgeDetails({ badge, onClose, onShare, onDownload }: BadgeDetailsProps) {
  return (
    <div className="p-4 sm:p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <button 
            onClick={onClose}
            className="mr-2 text-slate-400 hover:text-white"
          >
            &larr;
          </button>
          Badge Details
        </h3>
        
        <div className="flex space-x-2">
          <Button 
            size="sm" 
            variant="outline" 
            className="border-slate-600"
            onClick={onShare}
          >
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </Button>
          {badge.status === 'completed' && (
            <Button 
              size="sm" 
              variant="outline" 
              className="border-slate-600"
              onClick={onDownload}
            >
              <Download className="h-4 w-4 mr-1" />
              Certificate
            </Button>
          )}
        </div>
      </div>
      
      <div className="bg-slate-700 rounded-lg overflow-hidden">
        <div className={`p-8 bg-gradient-to-r ${getCategoryColor(badge.category)}`}>
          <div className="flex justify-center">
            <motion.div 
              className={`p-5 rounded-full bg-white/10 backdrop-blur`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <badge.icon className={`h-16 w-16 text-white`} />
            </motion.div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="text-center mb-4">
            <div className="flex justify-center mb-2">
              {getLevelIndicator(badge.level)}
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">{badge.name}</h2>
            <p className="text-slate-400">{badge.description}</p>
          </div>
          
          <div className="space-y-4 mt-6">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Status</span>
              <span className={`
                px-2 py-1 rounded text-xs font-medium
                ${badge.status === 'completed' ? 'bg-green-500/20 text-green-400' : 
                  badge.status === 'progress' ? 'bg-blue-500/20 text-blue-400' : 
                  'bg-slate-500/20 text-slate-400'}
              `}>
                {badge.status === 'completed' ? 'Completed' : 
                 badge.status === 'progress' ? 'In Progress' : 'Locked'}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Category</span>
              <span className={`
                px-2 py-1 rounded text-xs font-medium
                ${badge.category === 'sales' ? 'bg-blue-500/20 text-blue-400' : 
                  badge.category === 'customer' ? 'bg-green-500/20 text-green-400' :
                  badge.category === 'team' ? 'bg-purple-500/20 text-purple-400' :
                  'bg-amber-500/20 text-amber-400'}
              `}>
                {badge.category.charAt(0).toUpperCase() + badge.category.slice(1)}
              </span>
            </div>
            
            {badge.status === 'progress' && (
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-slate-400">Progress</span>
                  <span className="text-white text-sm">{badge.progress}%</span>
                </div>
                <div className="w-full bg-slate-600 h-2 rounded-full">
                  <div 
                    className={`h-2 rounded-full bg-gradient-to-r ${getCategoryColor(badge.category)}`}
                    style={{ width: `${badge.progress}%` }}
                  ></div>
                </div>
              </div>
            )}
            
            {badge.reward && (
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Reward</span>
                <span className="text-amber-400 font-medium flex items-center">
                  <Sparkles className="h-4 w-4 mr-1" />
                  {badge.reward}
                </span>
              </div>
            )}
            
            {badge.dateEarned && (
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Date Earned</span>
                <span className="text-white">
                  {new Date(badge.dateEarned).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
          
          {badge.status === 'completed' && (
            <div className="mt-6 text-center">
              <div className="inline-block mx-auto p-4 border border-dashed border-green-500/30 rounded-lg bg-green-500/5">
                <div className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5 text-green-400" />
                  <span className="text-green-400 font-medium">Achievement Unlocked!</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
