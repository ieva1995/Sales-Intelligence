import { Bell } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Alert } from "@shared/schema";

interface TrendAlertProps {
  alert: Alert;
  onToggle: (id: number, active: boolean) => void;
}

export default function TrendAlert({ alert, onToggle }: TrendAlertProps) {
  return (
    <Card className="mb-4">
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <Bell className="h-5 w-5 text-primary" />
          <div>
            <h3 className="font-medium">{alert.keyword}</h3>
            <p className="text-sm text-muted-foreground">
              Threshold: {alert.threshold}%
            </p>
          </div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={alert.active}
            onChange={(e) => onToggle(alert.id, e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
        </label>
      </CardContent>
    </Card>
  );
}
