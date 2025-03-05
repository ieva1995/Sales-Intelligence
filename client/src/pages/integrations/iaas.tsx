import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { SiGooglecloud, SiDigitalocean, SiOracle, SiVultr, SiOpenstack, SiOvh, SiScaleway, SiTerraform } from 'react-icons/si';
import { CheckCircle, XCircle, AlertCircle, RotateCw, Database, HardDrive, Server, Cloud, Azure, Box, FileCode } from 'lucide-react';

interface IaasIntegrationProps {
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
  services?: string[];
}

export default function IaasIntegrations({ view, searchQuery }: IaasIntegrationProps) {
  const { toast } = useToast();

  const integrations: Integration[] = [
    {
      id: 'aws',
      name: 'Amazon Web Services',
      description: 'Comprehensive cloud computing services with global infrastructure',
      icon: <Cloud className="h-8 w-8 text-[#FF9900]" />,
      status: 'connected',
      isPopular: true,
      isEnterprise: true,
      services: ['EC2', 'S3', 'RDS', 'Lambda', 'CloudFront']
    },
    {
      id: 'gcp',
      name: 'Google Cloud Platform',
      description: 'Suite of cloud computing services running on Google infrastructure',
      icon: <SiGooglecloud className="h-8 w-8 text-[#4285F4]" />,
      status: 'disconnected',
      isPopular: true,
      isEnterprise: true,
      services: ['Compute Engine', 'Cloud Storage', 'BigQuery', 'Kubernetes Engine']
    },
    {
      id: 'azure',
      name: 'Microsoft Azure',
      description: 'Cloud computing service for building, testing, deploying, and managing applications',
      icon: <Azure className="h-8 w-8 text-[#0078D4]" />,
      status: 'pending',
      isPopular: true,
      isEnterprise: true,
      services: ['Virtual Machines', 'Blob Storage', 'Azure SQL', 'Functions']
    },
    {
      id: 'digitalocean',
      name: 'DigitalOcean',
      description: 'Simple cloud computing designed for developers',
      icon: <SiDigitalocean className="h-8 w-8 text-[#0080FF]" />,
      status: 'disconnected',
      isPopular: true,
      isEnterprise: false,
      services: ['Droplets', 'Spaces', 'Managed Databases', 'Kubernetes']
    },
    {
      id: 'ibm-cloud',
      name: 'IBM Cloud',
      description: 'Cloud computing for enterprise needs with advanced features',
      icon: <Server className="h-8 w-8 text-[#1261FE]" />,
      status: 'disconnected',
      isPopular: false,
      isEnterprise: true,
      services: ['Virtual Servers', 'Object Storage', 'Databases', 'Watson AI']
    },
    {
      id: 'oracle-cloud',
      name: 'Oracle Cloud',
      description: 'Integrated cloud computing platform with comprehensive services',
      icon: <SiOracle className="h-8 w-8 text-[#F80000]" />,
      status: 'disconnected',
      isPopular: false,
      isEnterprise: true,
      services: ['Compute', 'Storage', 'Database', 'Networking']
    },
    {
      id: 'vultr',
      name: 'Vultr',
      description: 'High-performance SSD cloud compute with global availability',
      icon: <SiVultr className="h-8 w-8 text-[#007BFC]" />,
      status: 'error',
      isPopular: false,
      isEnterprise: false,
      services: ['Cloud Compute', 'Bare Metal', 'Block Storage', 'Kubernetes']
    },
    {
      id: 'linode',
      name: 'Linode',
      description: 'Cloud computing and storage services for developers',
      icon: <HardDrive className="h-8 w-8 text-[#00A95C]" />,
      status: 'disconnected',
      isPopular: false,
      isEnterprise: false,
      services: ['Linode Instances', 'Object Storage', 'Kubernetes', 'Databases']
    },
    {
      id: 'openstack',
      name: 'OpenStack',
      description: 'Open source cloud computing platform for public and private clouds',
      icon: <SiOpenstack className="h-8 w-8 text-[#ED1944]" />,
      status: 'disconnected',
      isPopular: false,
      isEnterprise: true,
      services: ['Nova', 'Swift', 'Cinder', 'Neutron']
    },
    {
      id: 'ovh',
      name: 'OVH Cloud',
      description: 'European cloud provider with global infrastructure',
      icon: <SiOvh className="h-8 w-8 text-[#123F6D]" />,
      status: 'disconnected',
      isPopular: false,
      isEnterprise: false,
      services: ['VPS', 'Public Cloud', 'Dedicated Servers', 'Storage']
    },
    {
      id: 'scaleway',
      name: 'Scaleway',
      description: 'Cloud platform with compute instances, kubernetes, and storage',
      icon: <SiScaleway className="h-8 w-8 text-[#4F0599]" />,
      status: 'disconnected',
      isPopular: false,
      isEnterprise: false,
      services: ['Instances', 'Kubernetes Kapsule', 'Object Storage', 'Databases']
    },
    {
      id: 'terraform',
      name: 'Terraform Cloud',
      description: 'Infrastructure as code automation platform',
      icon: <SiTerraform className="h-8 w-8 text-[#7B42BC]" />,
      status: 'disconnected',
      isPopular: false,
      isEnterprise: true,
      services: ['State Management', 'Policy as Code', 'Private Registry', 'VCS Integration']
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
      integration.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      integration.services?.some(service => service.toLowerCase().includes(searchQuery.toLowerCase()))
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

                    {integration.services && (
                      <div className="mt-3 flex flex-wrap gap-1">
                        {integration.services.slice(0, 3).map(service => (
                          <Badge key={service} variant="outline" className="bg-slate-700 text-slate-300 border-slate-600">
                            {service}
                          </Badge>
                        ))}
                        {integration.services.length > 3 && (
                          <Badge variant="outline" className="bg-slate-700 text-slate-300 border-slate-600">
                            +{integration.services.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}
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

                  {integration.services && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {integration.services.slice(0, 3).map(service => (
                        <Badge key={service} variant="outline" className="bg-slate-700 text-slate-300 border-slate-600">
                          {service}
                        </Badge>
                      ))}
                      {integration.services.length > 3 && (
                        <Badge variant="outline" className="bg-slate-700 text-slate-300 border-slate-600">
                          +{integration.services.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}
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