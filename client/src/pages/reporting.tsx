import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReportingMenu from "@/components/ReportingMenu";
import ReactConfetti from 'react-confetti';

const emojis = ["😊", "🎉", "🌟", "✨", "💫", "🎈", "🎊", "🥳"];

export default function Reporting() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({ 
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    setShowConfetti(true);

    // Hide confetti after 5 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="flex relative">
      {showConfetti && (
        <ReactConfetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          numberOfPieces={50}
          recycle={false}
          confettiSource={{ x: windowDimensions.width / 2, y: 0 }}
          drawShape={ctx => {
            const emoji = emojis[Math.floor(Math.random() * emojis.length)];
            ctx.font = "24px Arial";
            ctx.fillText(emoji, 0, 0);
          }}
        />
      )}

      {/* Reporting Menu */}
      <div className="w-64 flex-shrink-0">
        <ReportingMenu />
      </div>

      {/* Main Content */}
      <div className="flex-grow space-y-8 pl-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reporting</h1>
          <p className="text-muted-foreground">View and analyze your business performance</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Welcome to Reporting</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Select an option from the menu to start exploring your analytics and reports.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
