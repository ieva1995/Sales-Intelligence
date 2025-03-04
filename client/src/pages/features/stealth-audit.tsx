import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StealthAudit() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Stealth Audit Tool</h1>
        <p className="text-muted-foreground">Automatic system analysis with instant problem detection</p>
      </div>

      <Card className="border-0 bg-slate-800">
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-500/10 rounded-lg">
              <h4 className="font-medium text-blue-400 mb-2">Automated Analysis</h4>
              <p className="text-gray-300">Our system automatically scans websites and digital systems to identify hidden problems and inefficiencies.</p>
            </div>
            
            <div className="p-4 bg-green-500/10 rounded-lg">
              <h4 className="font-medium text-green-400 mb-2">Instant Reports</h4>
              <p className="text-gray-300">Generate comprehensive reports that highlight issues and present your solution as the answer.</p>
            </div>

            <div className="p-4 bg-purple-500/10 rounded-lg">
              <h4 className="font-medium text-purple-400 mb-2">Key Benefits</h4>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Find problems before companies even know they have them</li>
                <li>Generate professional audit reports automatically</li>
                <li>Position your solution as the perfect fix</li>
                <li>Build trust through expertise and insight</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
