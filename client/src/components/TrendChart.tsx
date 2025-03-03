import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface TrendChartProps {
  data: Array<{ time: string; value: number }>;
  title: string;
}

export default function TrendChart({ data, title }: TrendChartProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] md:h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="time"
                tickFormatter={(time) => new Date(time).toLocaleDateString()}
                stroke="hsl(var(--foreground))"
                fontSize={12}
              />
              <YAxis stroke="hsl(var(--foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
                labelFormatter={(time) => new Date(time).toLocaleDateString()}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}