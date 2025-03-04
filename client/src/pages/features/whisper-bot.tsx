import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function WhisperBot() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">AI Whisper Bot</h1>
        <p className="text-muted-foreground">Stay ahead of your competition with AI-powered industry insights</p>
      </div>

      <Card className="border-0 bg-slate-800">
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-500/10 rounded-lg">
              <h4 className="font-medium text-blue-400 mb-2">Continuous Monitoring</h4>
              <p className="text-gray-300">Our AI constantly scans industry news, LinkedIn updates, and market trends to identify potential opportunities for your business.</p>
            </div>

            <div className="p-4 bg-green-500/10 rounded-lg">
              <h4 className="font-medium text-green-400 mb-2">Instant Solutions</h4>
              <p className="text-gray-300">When companies face challenges mentioned in news or updates, we automatically suggest your solutions as the perfect fit.</p>
            </div>

            <div className="p-4 bg-purple-500/10 rounded-lg">
              <h4 className="font-medium text-purple-400 mb-2">Key Benefits</h4>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Be the first brand in their mind before they Google competitors</li>
                <li>Turn industry news into sales opportunities</li>
                <li>Automated outreach with personalized solution suggestions</li>
                <li>Stay ahead of market trends and competition</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}