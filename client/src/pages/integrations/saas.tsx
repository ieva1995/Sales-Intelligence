import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { SiSlack, SiShopify, SiMailchimp, SiHubspot, SiSalesforce, SiZoom, SiAsana, SiGoogle, SiDropbox, SiAmazon, SiZendesk, SiIntercom, SiAdobecreativecloud } from 'react-icons/si';
import { CheckCircle, XCircle, AlertCircle, RotateCw, Link as LinkIcon, Twitter } from 'lucide-react';
import { Windows } from '@/components/ui/icons'; // Updated import

interface SaasIntegrationProps {
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

export default function SaasIntegrations({ view, searchQuery }: SaasIntegrationProps) {
  const { toast } = useToast();

  const integrations: Integration[] = [
    {
      id: 'slack',
      name: 'Slack',
      description: 'Connect your Slack workspace to receive notifications and updates',
      icon: <SiSlack className="h-8 w-8 text-[#4A154B]" />,
      status: 'connected',
      isPopular: true,
      isEnterprise: false
    },
    {
      id: 'shopify',
      name: 'Shopify',
      description: 'Sync product, order, and customer data from your Shopify store',
      icon: <SiShopify className="h-8 w-8 text-[#95BF47]" />,
      status: 'connected',
      isPopular: true,
      isEnterprise: false
    },
    {
      id: 'mailchimp',
      name: 'Mailchimp',
      description: 'Sync contacts and automate email marketing campaigns',
      icon: <SiMailchimp className="h-8 w-8 text-[#FFE01B]" />,
      status: 'disconnected',
      isPopular: true,
      isEnterprise: false
    },
    {
      id: 'hubspot',
      name: 'HubSpot',
      description: 'Integrate CRM data, contacts, and marketing campaigns',
      icon: <SiHubspot className="h-8 w-8 text-[#FF7A59]" />,
      status: 'pending',
      isPopular: true,
      isEnterprise: false
    },
    {
      id: 'salesforce',
      name: 'Salesforce',
      description: 'Enterprise CRM integration with bidirectional sync',
      icon: <SiSalesforce className="h-8 w-8 text-[#00A1E0]" />,
      status: 'disconnected',
      isPopular: true,
      isEnterprise: true
    },
    {
      id: 'zoom',
      name: 'Zoom',
      description: 'Schedule and manage virtual meetings directly from the platform',
      icon: <SiZoom className="h-8 w-8 text-[#2D8CFF]" />,
      status: 'disconnected',
      isPopular: false,
      isEnterprise: false
    },
    {
      id: 'asana',
      name: 'Asana',
      description: 'Sync tasks, projects, and deadlines with your team',
      icon: <SiAsana className="h-8 w-8 text-[#F06A6A]" />,
      status: 'error',
      isPopular: false,
      isEnterprise: false
    },
    {
      id: 'microsoft365',
      name: 'Microsoft 365',
      description: 'Integrate with Outlook, Teams, OneDrive, and more',
      icon: <Windows className="h-8 w-8 text-[#0078D4]" />,
      status: 'disconnected',
      isPopular: true,
      isEnterprise: true
    },
    {
      id: 'googleworkspace',
      name: 'Google Workspace',
      description: 'Connect with Gmail, Calendar, Drive, and other Google apps',
      icon: <SiGoogle className="h-8 w-8 text-[#4285F4]" />,
      status: 'disconnected',
      isPopular: true,
      isEnterprise: false
    },
    {
      id: 'dropbox',
      name: 'Dropbox',
      description: 'Sync files and documents from your Dropbox account',
      icon: <SiDropbox className="h-8 w-8 text-[#0061FF]" />,
      status: 'disconnected',
      isPopular: false,
      isEnterprise: false
    },
    {
      id: 'aws',
      name: 'Amazon AWS',
      description: 'Connect to AWS services for advanced data processing',
      icon: <SiAmazon className="h-8 w-8 text-[#FF9900]" />,
      status: 'disconnected',
      isPopular: false,
      isEnterprise: true
    },
    {
      id: 'zendesk',
      name: 'Zendesk',
      description: 'Integrate customer support tickets and conversations',
      icon: <SiZendesk className="h-8 w-8 text-[#03363D]" />,
      status: 'disconnected',
      isPopular: false,
      isEnterprise: false
    },
    {
      id: 'intercom',
      name: 'Intercom',
      description: 'Manage customer messaging and support conversations',
      icon: <SiIntercom className="h-8 w-8 text-[#0079FF]" />,
      status: 'disconnected',
      isPopular: false,
      isEnterprise: false
    },
    {
      id: 'adobe',
      name: 'Adobe Creative Cloud',
      description: 'Access design assets and collaborate on creative projects',
      icon: <SiAdobecreativecloud className="h-8 w-8 text-[#DA1F26]" />,
      status: 'disconnected',
      isPopular: false,
      isEnterprise: true
    },
    {
      id: 'twitter',
      name: 'Twitter',
      description: 'Monitor brand mentions and engage with customers',
      icon: <Twitter className="h-8 w-8 text-[#1DA1F2]" />,
      status: 'disconnected',
      isPopular: false,
      isEnterprise: false
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