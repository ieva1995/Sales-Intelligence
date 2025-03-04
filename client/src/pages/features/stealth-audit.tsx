import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, AlertTriangle, CheckCircle, ArrowRight, RefreshCw, Shield, Settings, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function StealthAudit() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Stealth Audit Tool</h1>
        <p className="text-muted-foreground">Automated system analysis with instant problem detection</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-blue-500/10 border-0">
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <Search className="h-8 w-8 text-blue-500 mb-2" />
              <h3 className="text-2xl font-bold">1,248</h3>
              <p className="text-sm text-muted-foreground">Systems Analyzed</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-500/10 border-0">
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <AlertTriangle className="h-8 w-8 text-red-500 mb-2" />
              <h3 className="text-2xl font-bold">89%</h3>
              <p className="text-sm text-muted-foreground">Issue Detection Rate</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-500/10 border-0">
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <CheckCircle className="h-8 w-8 text-green-500 mb-2" />
              <h3 className="text-2xl font-bold">94%</h3>
              <p className="text-sm text-muted-foreground">Success Rate</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-500/10 border-0">
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <Zap className="h-8 w-8 text-purple-500 mb-2" />
              <h3 className="text-2xl font-bold">2.4s</h3>
              <p className="text-sm text-muted-foreground">Avg. Scan Time</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Scans */}
      <Card className="border-0 bg-slate-800">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Active Scans</CardTitle>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
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
            ].map((scan, i) => (
              <div key={i} className="p-4 bg-slate-700/50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">{scan.target}</h4>
                  <span className="text-sm text-blue-400">{scan.status}</span>
                </div>
                <div className="w-full h-2 bg-slate-600 rounded-full mb-2">
                  <div 
                    className="h-full bg-blue-500 rounded-full"
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

      {/* Analysis Tools */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 bg-slate-800">
          <CardHeader>
            <CardTitle>Security Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-red-500/10 rounded-lg">
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

              <div className="p-4 bg-yellow-500/10 rounded-lg">
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
              <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Settings className="h-5 w-5 text-blue-400" />
                  <div>
                    <h4 className="font-medium">Scan Depth</h4>
                    <p className="text-sm text-gray-400">Deep Analysis</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  Configure
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-green-400" />
                  <div>
                    <h4 className="font-medium">Security Rules</h4>
                    <p className="text-sm text-gray-400">Enterprise Grade</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  Update
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}