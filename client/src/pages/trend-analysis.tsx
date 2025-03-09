import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TrendChart from "@/components/TrendChart";
import TrendAlert from "@/components/TrendAlert";
import { fetchTrendData } from "@/lib/trends";
import { Alert, insertAlertSchema, type InsertAlert } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export default function TrendAnalysis() {
  const [keyword, setKeyword] = useState("");
  const { toast } = useToast();

  const form = useForm<InsertAlert>({
    resolver: zodResolver(insertAlertSchema),
    defaultValues: {
      keyword: "",
      threshold: 50,
      active: true
    }
  });

  const { data: alerts } = useQuery<Alert[]>({
    queryKey: ["/api/alerts"]
  });

  const { data: trendData } = useQuery({
    queryKey: ["trend-data", keyword],
    queryFn: () => fetchTrendData(keyword),
    enabled: !!keyword
  });

  const createAlertMutation = useMutation({
    mutationFn: (data: InsertAlert) => {
      return apiRequest("POST", "/api/alerts", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/alerts"] });
      toast({
        title: "Alert Created",
        description: "Your trend alert has been created successfully."
      });
      form.reset();
    }
  });

  const toggleAlertMutation = useMutation({
    mutationFn: ({ id, active }: { id: number; active: boolean }) => {
      return apiRequest("PATCH", `/api/alerts/${id}`, { active });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/alerts"] });
    }
  });

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Trend Analysis</h1>

      <div className="flex gap-4 mb-8">
        <Input
          placeholder="Enter keyword to analyze"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button>Analyze</Button>
      </div>

      {trendData && (
        <div className="mb-8">
          <TrendChart
            data={trendData.timelineData}
            title={`Trend Analysis: ${keyword}`}
          />
        </div>
      )}

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Create Trend Alert</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit((data) => createAlertMutation.mutate(data))} className="space-y-4">
            <FormField
              control={form.control}
              name="keyword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Keyword</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter keyword to monitor" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="threshold"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Threshold (%)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="1" 
                      max="100" 
                      placeholder="Enter threshold percentage" 
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={createAlertMutation.isPending}>
              Create Alert
            </Button>
          </form>
        </Form>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Trend Alerts</h2>
        {alerts?.map((alert) => (
          <TrendAlert
            key={alert.id}
            alert={alert}
            onToggle={(id, active) => toggleAlertMutation.mutate({ id, active })}
          />
        ))}
      </div>
    </div>
  );
}