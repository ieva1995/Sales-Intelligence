import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, AlertTriangle, CheckCircle, ArrowRight, RefreshCw, Shield, Settings, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

export default function StealthAudit() {
  const { toast } = useToast();
  const [scans, setScans] = useState([
    {
      target: "enterprise-systems.com",
      progress: 78,
      status: "Scanning",
      issues: 12
    },
    {
      target: "cloudtech-solutions.net",
      progress: 45,
      status: "In Progress",
      issues: 8
    },
    {
      target: "digital-fortress.org",
      progress: 92,
      status: "Completing",
      issues: 15
    }
  ]);

  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [scanDepth, setScanDepth] = useState("Deep Analysis");
  const [securityLevel, setSecurityLevel] = useState("Enterprise Grade");
  const [scanTimeout, setScanTimeout] = useState(30);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [showScanConfigDialog, setShowScanConfigDialog] = useState(false);
  const [showSecurityDialog, setShowSecurityDialog] = useState(false);

  // Simulate progress updates
  useEffect(() => {
    const interval = setInterval(() => {
      setScans(prevScans => 
        prevScans.map(scan => {
          const newProgress = scan.progress < 100 ? scan.progress + 1 : scan.progress;
          const newIssues = newProgress > scan.progress ? scan.issues + Math.floor(Math.random() * 2) : scan.issues;
          return {
            ...scan,
            progress: newProgress,
            issues: newIssues,
            status: newProgress >= 99 ? "Complete" : scan.status
          };
        })
      );
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    // Simulate new scan data
    const newScans = [
      {
        target: "newtech-platform.com",
        progress: 15,
        status: "Starting",
        issues: 3
      },
      ...scans.slice(0, -1)
    ];
    setScans(newScans);
    setLastRefresh(new Date());

    toast({
      title: "Scans Refreshed",
      description: "New scan data loaded and processing.",
    });
  };

  const handleScanDepthChange = (value: string) => {
    setScanDepth(value);
    toast({
      title: "Scan Depth Updated",
      description: `Analysis depth changed to: ${value}`,
    });
  };

  const handleSecurityLevelChange = (value: string) => {
    setSecurityLevel(value);
    toast({
      title: "Security Level Updated",
      description: `Security level upgraded to: ${value}`,
    });
  };

  const handleScanTimeoutChange = (value: number[]) => {
    setScanTimeout(value[0]);
  };

  const handleAutoRefreshChange = (checked: boolean) => {
    setAutoRefresh(checked);
    toast({
      title: "Auto Refresh",
      description: checked ? "Enabled automatic scan updates" : "Disabled automatic scan updates",
    });
  };

  const handleScanClick = (target: string) => {
    setScans(prevScans =>
      prevScans.map(scan =>
        scan.target === target
          ? { ...scan, issues: scan.issues + 1, status: "Analyzing" }
          : scan
      )
    );

    toast({
      title: `Analyzing ${target}`,
      description: "Detailed scan report being generated...",
    });
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Stealth Audit Tool</h1>
        <p className="text-muted-foreground">Automated system analysis with instant problem detection</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-blue-500/10 border-0 cursor-pointer hover:bg-blue-500/20 transition-colors"
          onClick={() => toast({ title: "Systems Analysis", description: "Viewing detailed analysis reports..." })}>
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <Search className="h-8 w-8 text-blue-500 mb-2" />
              <h3 className="text-2xl font-bold">1,248</h3>
              <p className="text-sm text-muted-foreground">Systems Analyzed</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-500/10 border-0 cursor-pointer hover:bg-red-500/20 transition-colors"
          onClick={() => toast({ title: "Detection Metrics", description: "Viewing issue detection statistics..." })}>
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <AlertTriangle className="h-8 w-8 text-red-500 mb-2" />
              <h3 className="text-2xl font-bold">89%</h3>
              <p className="text-sm text-muted-foreground">Issue Detection Rate</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-500/10 border-0 cursor-pointer hover:bg-green-500/20 transition-colors"
          onClick={() => toast({ title: "Success Metrics", description: "Viewing success rate analytics..." })}>
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <CheckCircle className="h-8 w-8 text-green-500 mb-2" />
              <h3 className="text-2xl font-bold">94%</h3>
              <p className="text-sm text-muted-foreground">Success Rate</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-500/10 border-0 cursor-pointer hover:bg-purple-500/20 transition-colors"
          onClick={() => toast({ title: "Performance Metrics", description: "Viewing scan performance data..." })}>
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <Zap className="h-8 w-8 text-purple-500 mb-2" />
              <h3 className="text-2xl font-bold">2.4s</h3>
              <p className="text-sm text-muted-foreground">Avg. Scan Time</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 bg-slate-800">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Active Scans</CardTitle>
            <Button variant="outline" size="sm" onClick={handleRefresh}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {scans.map((scan, i) => (
              <div 
                key={i} 
                className="p-4 bg-slate-700/50 rounded-lg cursor-pointer hover:bg-slate-700/70 transition-colors"
                onClick={() => handleScanClick(scan.target)}
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">{scan.target}</h4>
                  <span className="text-sm text-blue-400">{scan.status}</span>
                </div>
                <div className="w-full h-2 bg-slate-600 rounded-full mb-2">
                  <div 
                    className="h-full bg-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${scan.progress}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-sm text-gray-400">
                  <span>{scan.progress}% Complete</span>
                  <span>{scan.issues} Issues Found</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 bg-slate-800">
          <CardHeader>
            <CardTitle>Security Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-red-500/10 rounded-lg cursor-pointer hover:bg-red-500/20 transition-colors"
                onClick={() => toast({ 
                  title: "Critical Vulnerabilities", 
                  description: "Opening vulnerability report..." 
                })}>
                <div className="flex items-center space-x-3 mb-3">
                  <Shield className="h-5 w-5 text-red-400" />
                  <h4 className="font-medium">Critical Vulnerabilities</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">SSL Certificate Issues</span>
                    <span className="text-red-400">High Risk</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Outdated Dependencies</span>
                    <span className="text-red-400">Critical</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-yellow-500/10 rounded-lg cursor-pointer hover:bg-yellow-500/20 transition-colors"
                onClick={() => toast({ 
                  title: "Performance Issues", 
                  description: "Opening performance analysis..." 
                })}>
                <div className="flex items-center space-x-3 mb-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-400" />
                  <h4 className="font-medium">Performance Issues</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Load Time</span>
                    <span className="text-yellow-400">4.2s</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Resource Usage</span>
                    <span className="text-yellow-400">High</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-slate-800">
          <CardHeader>
            <CardTitle>Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg cursor-pointer hover:bg-slate-700/70">
                    <div className="flex items-center space-x-3">
                      <Settings className="h-5 w-5 text-blue-400" />
                      <div>
                        <h4 className="font-medium">Scan Configuration</h4>
                        <p className="text-sm text-gray-400">{scanDepth}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Configure
                    </Button>
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Scan Configuration</DialogTitle>
                    <DialogDescription>
                      Adjust scan depth and timing settings
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6 py-4">
                    <div className="space-y-4">
                      <h4 className="font-medium text-sm">Scan Depth</h4>
                      <RadioGroup value={scanDepth} onValueChange={handleScanDepthChange}>
                        {["Quick Scan", "Standard Analysis", "Deep Analysis", "Comprehensive Audit"].map((depth) => (
                          <div key={depth} className="flex items-center space-x-2">
                            <RadioGroupItem value={depth} id={depth} />
                            <Label htmlFor={depth}>{depth}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-medium text-sm">Scan Timeout (seconds)</h4>
                      <Slider
                        value={[scanTimeout]}
                        onValueChange={handleScanTimeoutChange}
                        max={120}
                        min={10}
                        step={5}
                      />
                      <p className="text-sm text-gray-400">{scanTimeout} seconds</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h4 className="font-medium text-sm">Auto Refresh</h4>
                        <p className="text-sm text-gray-400">Update scans automatically</p>
                      </div>
                      <Switch
                        checked={autoRefresh}
                        onCheckedChange={handleAutoRefreshChange}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowScanConfigDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setShowScanConfigDialog(false)}>
                      Save Changes
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg cursor-pointer hover:bg-slate-700/70">
                    <div className="flex items-center space-x-3">
                      <Shield className="h-5 w-5 text-green-400" />
                      <div>
                        <h4 className="font-medium">Security Rules</h4>
                        <p className="text-sm text-gray-400">{securityLevel}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Update
                    </Button>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Security Configuration</DialogTitle>
                    <DialogDescription>
                      Configure security levels and rules
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6 py-4">
                    <div className="space-y-4">
                      <h4 className="font-medium text-sm">Security Level</h4>
                      <RadioGroup value={securityLevel} onValueChange={handleSecurityLevelChange}>
                        {["Standard", "Enhanced", "Enterprise Grade", "Military Grade"].map((level) => (
                          <div key={level} className="flex items-center space-x-2">
                            <RadioGroupItem value={level} id={level} />
                            <Label htmlFor={level}>{level}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-medium text-sm">Additional Security Options</h4>
                      <div className="space-y-2">
                        {[
                          "Enable Deep Packet Inspection",
                          "Use Advanced Threat Detection",
                          "Apply Zero Trust Policy",
                          "Enable Audit Logging"
                        ].map((option) => (
                          <div key={option} className="flex items-center justify-between">
                            <Label htmlFor={option}>{option}</Label>
                            <Switch id={option} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowSecurityDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setShowSecurityDialog(false)}>
                      Apply Security Settings
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}