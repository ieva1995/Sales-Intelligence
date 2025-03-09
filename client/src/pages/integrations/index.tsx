import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { 
  Search, 
  Plus, 
  Grid, 
  ListFilter, 
  Cloud, 
  Server, 
  Database,
  RefreshCw,
  Settings
} from 'lucide-react';
import SaasIntegrations from './saas';
import PaasIntegrations from './paas';
import IaasIntegrations from './iaas';

export default function IntegrationsPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeView, setActiveView] = useState<'grid' | 'list'>('grid');
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const handleRefreshIntegrations = () => {
    setIsRefreshing(true);
    
    // Simulate refresh
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Integrations Refreshed",
        description: "All integration statuses have been updated"
      });
    }, 1500);
  };
  
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Integration Hub</h1>
          <p className="text-sm text-muted-foreground">
            Connect and manage all your service integrations in one place
          </p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefreshIntegrations}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="default" size="sm" className="bg-blue-600">
            <Plus className="h-4 w-4 mr-2" />
            Add New
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
          <Input
            placeholder="Search integrations..."
            className="pl-9 bg-slate-800 border-slate-700"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={activeView === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveView('grid')}
            className={activeView === 'grid' ? 'bg-blue-600' : ''}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={activeView === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveView('list')}
            className={activeView === 'list' ? 'bg-blue-600' : ''}
          >
            <ListFilter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="saas" className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-md mb-4">
          <TabsTrigger value="saas" className="flex items-center gap-2">
            <Cloud className="h-4 w-4" />
            <span className="hidden sm:inline">SaaS</span>
          </TabsTrigger>
          <TabsTrigger value="paas" className="flex items-center gap-2">
            <Server className="h-4 w-4" />
            <span className="hidden sm:inline">PaaS</span>
          </TabsTrigger>
          <TabsTrigger value="iaas" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            <span className="hidden sm:inline">IaaS</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="saas" className="mt-0">
          <SaasIntegrations view={activeView} searchQuery={searchQuery} />
        </TabsContent>
        
        <TabsContent value="paas" className="mt-0">
          <PaasIntegrations view={activeView} searchQuery={searchQuery} />
        </TabsContent>
        
        <TabsContent value="iaas" className="mt-0">
          <IaasIntegrations view={activeView} searchQuery={searchQuery} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
