import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { SiHeroku, SiVercel, SiNetlify, SiGooglecloud, SiDigitalocean, SiRailway, SiRender, SiFirebase, SiCloudflare, SiDatadog } from 'react-icons/si';
import { CheckCircle, XCircle, AlertCircle, RotateCw, Cloud, Server, Box, Database, Azure } from 'lucide-react';

interface PaasIntegrationProps {
  view: 'grid' | 'list';
  searchQuery: string;
}

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  status: 'connected' | 'disconnected' | 'pending' | 'error';
  isPopular: boolean;
  isEnterprise: boolean;
}

export default function PaasIntegrations({ view, searchQuery }: PaasIntegrationProps) {
  const { toast } = useToast();

  const integrations: Integration[] = [
    {
      id: 'heroku',
      name: 'Heroku',
      description: 'Deploy, manage, and scale your applications in a fully managed environment',
      icon: <SiHeroku className="h-8 w-8 text-[#430098]" />,
      status: 'connected',
      isPopular: true,
      isEnterprise: false
    },
    {
      id: 'vercel',
      name: 'Vercel',
      description: 'Deploy and host your static sites and serverless functions',
      icon: <SiVercel className="h-8 w-8 text-white" />,
      status: 'disconnected',
      isPopular: true,
      isEnterprise: false
    },
    {
      id: 'netlify',
      name: 'Netlify',
      description: 'Build, deploy and host your modern web projects',
      icon: <SiNetlify className="h-8 w-8 text-[#00C7B7]" />,
      status: 'disconnected',
      isPopular: true,
      isEnterprise: false
    },
    {
      id: 'gcp',
      name: 'Google Cloud Platform',
      description: 'Build, deploy, and scale applications with Google\'s infrastructure',
      icon: <SiGooglecloud className="h-8 w-8 text-[#4285F4]" />,
      status: 'disconnected',
      isPopular: false,
      isEnterprise: true
    },
    {
      id: 'azure',
      name: 'Microsoft Azure',
      description: 'Build, deploy, and manage applications across the cloud',
      icon: <Azure className="h-8 w-8 text-[#0078D4]" />,
      status: 'disconnected',
      isPopular: false,
      isEnterprise: true
    },
    {
      id: 'aws-elastic-beanstalk',
      name: 'AWS Elastic Beanstalk',
      description: 'Easy-to-use service for deploying and scaling web applications',
      icon: <Cloud className="h-8 w-8 text-[#FF9900]" />,
      status: 'pending',
      isPopular: false,
      isEnterprise: true
    },
    {
      id: 'digitalocean-app-platform',
      name: 'DigitalOcean App Platform',
      description: 'Build, deploy, and scale apps quickly using a simple, fully managed solution',
      icon: <SiDigitalocean className="h-8 w-8 text-[#0080FF]" />,
      status: 'error',
      isPopular: false,
      isEnterprise: false
    },
    {
      id: 'railway',
      name: 'Railway',
      description: 'Develop, deploy, and scale your apps simply and quickly',
      icon: <SiRailway className="h-8 w-8 text-white" />,
      status: 'disconnected',
      isPopular: true,
      isEnterprise: false
    },
    {
      id: 'render',
      name: 'Render',
      description: 'Unified platform to build and run all your apps with free SSL',
      icon: <SiRender className="h-8 w-8 text-[#46E3B7]" />,
      status: 'disconnected',
      isPopular: false,
      isEnterprise: false
    },
    {
      id: 'firebase',
      name: 'Firebase',
      description: 'Build, improve, and grow your app with Google\'s platform',
      icon: <SiFirebase className="h-8 w-8 text-[#FFCA28]" />,
      status: 'disconnected',
      isPopular: true,
      isEnterprise: false
    },
    {
      id: 'cloudflare-pages',
      name: 'Cloudflare Pages',
      description: 'Build and deploy JAMstack sites with collaborative Git integration',
      icon: <SiCloudflare className="h-8 w-8 text-[#F38020]" />,
      status: 'disconnected',
      isPopular: false,
      isEnterprise: false
    },
    {
      id: 'datadog',
      name: 'Datadog',
      description: 'Monitor your entire stack with full visibility across systems, apps, and services',
      icon: <SiDatadog className="h-8 w-8 text-[#632CA6]" />,
      status: 'disconnected',
      isPopular: false,
      isEnterprise: true
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'disconnected':
        return <XCircle className="h-5 w-5 text-slate-400" />;
      case 'pending':
        return <RotateCw className="h-5 w-5 text-blue-500 animate-spin" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'connected':
        return 'Connected';
      case 'disconnected':
        return 'Not Connected';
      case 'pending':
        return 'Connecting...';
      case 'error':
        return 'Connection Error';
      default:
        return '';
    }
  };

  const handleConnect = (integration: Integration) => {
    if (integration.status === 'connected') {
      toast({
        title: `Disconnect ${integration.name}`,
        description: `Are you sure you want to disconnect from ${integration.name}?`,
      });
    } else {
      toast({
        title: `Connect to ${integration.name}`,
        description: `Starting connection process for ${integration.name}...`,
      });
    }
  };

  // Filter integrations based on search query
  const filteredIntegrations = integrations.filter(
    integration => 
      integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      integration.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filteredIntegrations.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="rounded-full bg-slate-800 w-12 h-12 mx-auto flex items-center justify-center mb-4">
          <AlertCircle className="h-6 w-6 text-slate-400" />
        </div>
        <h3 className="text-lg font-medium text-white">No integrations found</h3>
        <p className="text-sm text-slate-400 mt-1">Try adjusting your search terms</p>
      </div>
    );
  }

  return (
    <>
      {view === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredIntegrations.map(integration => (
            <Card key={integration.id} className="bg-slate-800 border-slate-700 overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="bg-slate-700 rounded-lg p-3">
                      {integration.icon}
                    </div>
                    <div className="flex flex-col items-end">
                      {integration.isPopular && (
                        <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20 mb-2">
                          Popular
                        </Badge>
                      )}
                      {integration.isEnterprise && (
                        <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/20">
                          Enterprise
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-medium text-white">{integration.name}</h3>
                    <p className="text-sm text-slate-400 mt-1 line-clamp-2">{integration.description}</p>
                  </div>
                </div>
                <div className="border-t border-slate-700 p-4 flex items-center justify-between">
                  <div className="flex items-center text-sm">
                    {getStatusIcon(integration.status)}
                    <span className="ml-2 text-slate-300">{getStatusText(integration.status)}</span>
                  </div>
                  <Button 
                    variant={integration.status === 'connected' ? 'outline' : 'default'}
                    size="sm"
                    className={integration.status === 'connected' ? '' : 'bg-blue-600'}
                    onClick={() => handleConnect(integration)}
                  >
                    {integration.status === 'connected' ? 'Disconnect' : 'Connect'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-0">
            {filteredIntegrations.map((integration, index) => (
              <div 
                key={integration.id} 
                className={`p-4 flex items-center gap-4 ${
                  index < filteredIntegrations.length - 1 ? 'border-b border-slate-700' : ''
                }`}
              >
                <div className="bg-slate-700 rounded-lg p-3 flex-shrink-0">
                  {integration.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap gap-2 mb-1">
                    <h3 className="text-base font-medium text-white">{integration.name}</h3>
                    {integration.isPopular && (
                      <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                        Popular
                      </Badge>
                    )}
                    {integration.isEnterprise && (
                      <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/20">
                        Enterprise
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-slate-400 truncate">{integration.description}</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="flex items-center text-sm">
                    {getStatusIcon(integration.status)}
                    <span className="ml-2 hidden md:inline text-slate-300">{getStatusText(integration.status)}</span>
                  </div>
                  <Button 
                    variant={integration.status === 'connected' ? 'outline' : 'default'}
                    size="sm"
                    className={integration.status === 'connected' ? '' : 'bg-blue-600'}
                    onClick={() => handleConnect(integration)}
                  >
                    {integration.status === 'connected' ? 'Disconnect' : 'Connect'}
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </>
  );
}