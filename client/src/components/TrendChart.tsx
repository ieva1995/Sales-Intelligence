import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TrendChartProps {
  data: Array<{ time: string; value: number }>;
  title: string;
}

export default function TrendChart({ data, title }: TrendChartProps) {
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      month: 'short',
      day: 'numeric',
      hour: 'numeric'
    });
  };

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ 
            top: 20,
            right: 30,
            left: 20,
            bottom: 20
          }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            horizontal={true}
            vertical={false}
            stroke="#e5e7eb" 
          />
          <XAxis
            dataKey="time"
            tickFormatter={formatDate}
            stroke="#64748b"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
            padding={{ left: 10, right: 10 }}
            minTickGap={50}
          />
          <YAxis
            stroke="#64748b"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
            domain={[0, 100]}
            ticks={[0, 25, 50, 75, 100]}
            width={35}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "none",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              fontSize: "12px",
              padding: "8px 12px"
            }}
            labelFormatter={(time) => formatDate(time)}
            formatter={(value: number) => [`${value}`, 'Interest']}
            cursor={{ stroke: '#4b5563', strokeWidth: 1, strokeDasharray: '4 4' }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#2563eb"
            strokeWidth={2}
            dot={false}
            activeDot={{ 
              r: 4, 
              fill: "#2563eb",
              stroke: "#ffffff",
              strokeWidth: 2
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}