import React, { useEffect, useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Wifi, 
  WifiOff, 
  Search, 
  CheckCircle, 
  AlertCircle, 
  RefreshCw, 
  Loader2,
  X,
  Send,
  Upload,
  Monitor,
  Zap,
  Database,
  Save
} from 'lucide-react';
import { useConnectionManager, Device, ConnectionState } from '@/lib/connection-manager';
import { ConnectionStatus } from '@/components/ui/connection-status';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle
} from '@/components/ui/resizable';

export default function DeviceConnectionManager() {
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState<string>('control');
  const [instructionInput, setInstructionInput] = useState<string>('');
  
  // Connection manager state
  const connectionState = useConnectionManager(state => state.connectionState);
  const devices = useConnectionManager(state => state.devices);
  const selectedDevices = useConnectionManager(state => state.selectedDevices);
  const connectionAttempts = useConnectionManager(state => state.connectionAttempts);
  const isConnecting = useConnectionManager(state => state.isConnecting);
  const isOfflineMode = useConnectionManager(state => state.isOfflineMode);
  const connectionData = useConnectionManager(state => state.connectionData);
  
  // Connection manager actions
  const detectWiFiConnection = useConnectionManager(state => state.detectWiFiConnection);
  const searchAvailableDevices = useConnectionManager(state => state.searchAvailableDevices);
  const selectDevice = useConnectionManager(state => state.selectDevice);
  const deselectDevice = useConnectionManager(state => state.deselectDevice);
  const establishConnection = useConnectionManager(state => state.establishConnection);
  const sendControlInstruction = useConnectionManager(state => state.sendControlInstruction);
  const handleDisconnection = useConnectionManager(state => state.handleDisconnection);
  const closeConnection = useConnectionManager(state => state.closeConnection);
  const resetConnectionState = useConnectionManager(state => state.resetConnectionState);
  
  // Initialize connection workflow when component mounts
  useEffect(() => {
    if (connectionState === 'idle') {
      startConnectionFlow();
    }
  }, []);
  
  // Start the connection flow
  const startConnectionFlow = async () => {
    // Step 1: Detect WiFi Connection
    const wifiConnected = await detectWiFiConnection();
    
    if (!wifiConnected) {
      toast({
        title: "WiFi Connection Failed",
        description: "Unable to detect a stable network connection",
        variant: "destructive"
      });
      return;
    }
    
    // Step 2: Search for available devices
    const foundDevices = await searchAvailableDevices();
    
    if (foundDevices.length === 0) {
      toast({
        title: "No Devices Found",
        description: "No compatible devices were detected on your network",
        variant: "destructive"
      });
    }
  };
  
  // Handle device selection toggle
  const toggleDeviceSelection = (device: Device) => {
    const isSelected = selectedDevices.some(d => d.id === device.id);
    
    if (isSelected) {
      deselectDevice(device.id);
    } else {
      selectDevice(device.id);
    }
  };
  
  // Handle connection establishment
  const handleConnect = async () => {
    if (selectedDevices.length === 0) {
      toast({
        title: "No Devices Selected",
        description: "Please select at least one device to connect",
        variant: "destructive"
      });
      return;
    }
    
    const connected = await establishConnection();
    
    if (connected) {
      toast({
        title: "Connection Established",
        description: `Successfully connected to ${selectedDevices.length} device(s)`,
      });
    } else {
      toast({
        title: "Connection Failed",
        description: "Unable to establish connection to the selected devices",
        variant: "destructive"
      });
    }
  };
  
  // Handle sending control instructions
  const handleSendInstruction = async () => {
    if (!instructionInput.trim()) {
      toast({
        title: "Empty Instruction",
        description: "Please enter a valid control instruction",
        variant: "destructive"
      });
      return;
    }
    
    const sent = await sendControlInstruction(instructionInput);
    
    if (sent) {
      toast({
        title: "Instruction Sent",
        description: `Successfully sent: ${instructionInput}`,
      });
      setInstructionInput('');
    } else {
      toast({
        title: "Instruction Failed",
        description: "Failed to send the control instruction",
        variant: "destructive"
      });
    }
  };
  
  // Handle closing the connection
  const handleCloseConnection = () => {
    closeConnection();
    toast({
      title: "Connection Closed",
      description: "The connection has been closed and data stored",
    });
  };
  
  // Get connection status details
  const getConnectionStatusDetails = () => {
    const maxAttempts = 3;
    
    return {
      isConnected: connectionState === 'connected',
      isOfflineMode,
      connectionError: ['connection-failed', 'wifi-failed', 'exception'].includes(connectionState),
      connectionAttempts,
      maxAttempts,
      onRetry: startConnectionFlow
    };
  };
  
  // Render appropriate UI based on connection state
  const renderConnectionStateUI = () => {
    switch (connectionState) {
      case 'idle':
      case 'detecting-wifi':
        return (
          <div className="flex flex-col items-center justify-center p-6 space-y-4">
            <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
            <h3 className="text-lg font-medium">Initializing Connection</h3>
            <p className="text-sm text-gray-500">Detecting network connectivity...</p>
          </div>
        );
        
      case 'wifi-failed':
        return (
          <div className="flex flex-col items-center justify-center p-6 space-y-4">
            <WifiOff className="h-12 w-12 text-red-500" />
            <h3 className="text-lg font-medium">Network Connection Failed</h3>
            <p className="text-sm text-gray-500">Unable to detect a stable network connection</p>
            <Button onClick={startConnectionFlow}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Retry Connection
            </Button>
          </div>
        );
        
      case 'searching-devices':
        return (
          <div className="flex flex-col items-center justify-center p-6 space-y-4">
            <Search className="h-12 w-12 text-blue-500 animate-pulse" />
            <h3 className="text-lg font-medium">Searching For Devices</h3>
            <p className="text-sm text-gray-500">Scanning your network for compatible devices...</p>
          </div>
        );
        
      case 'device-selection':
        return (
          <div className="space-y-4 p-4">
            <h3 className="text-lg font-medium">Select Devices</h3>
            <p className="text-sm text-gray-500 mb-4">Choose the devices you want to connect to</p>
            
            <div className="grid grid-cols-1 gap-3">
              {devices.length === 0 ? (
                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
                  <p className="text-gray-500">No devices found on your network</p>
                </div>
              ) : (
                devices.map(device => (
                  <div 
                    key={device.id}
                    className={cn(
                      "p-4 border rounded-lg cursor-pointer transition-colors",
                      selectedDevices.some(d => d.id === device.id)
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "border-gray-200 dark:border-gray-700 hover:border-blue-300"
                    )}
                    onClick={() => toggleDeviceSelection(device)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "h-3 w-3 rounded-full",
                          device.status === 'online' ? "bg-green-500" :
                          device.status === 'offline' ? "bg-red-500" : "bg-yellow-500"
                        )} />
                        <div>
                          <h4 className="font-medium">{device.name}</h4>
                          <p className="text-xs text-gray-500">{device.type} • {device.ipAddress}</p>
                        </div>
                      </div>
                      <CheckCircle className={cn(
                        "h-5 w-5 transition-opacity",
                        selectedDevices.some(d => d.id === device.id)
                          ? "text-blue-500 opacity-100"
                          : "opacity-0"
                      )} />
                    </div>
                  </div>
                ))
              )}
            </div>
            
            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={searchAvailableDevices}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Rescan
              </Button>
              <Button 
                onClick={handleConnect}
                disabled={selectedDevices.length === 0}
              >
                Connect to {selectedDevices.length} device(s)
              </Button>
            </div>
          </div>
        );
        
      case 'connecting':
        return (
          <div className="flex flex-col items-center justify-center p-6 space-y-4">
            <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
            <h3 className="text-lg font-medium">Establishing Connection</h3>
            <p className="text-sm text-gray-500">Connecting to {selectedDevices.length} device(s)...</p>
            <p className="text-xs text-gray-400">Attempt {connectionAttempts} of 3</p>
          </div>
        );
        
      case 'connection-failed':
        return (
          <div className="flex flex-col items-center justify-center p-6 space-y-4">
            <AlertCircle className="h-12 w-12 text-red-500" />
            <h3 className="text-lg font-medium">Connection Failed</h3>
            <p className="text-sm text-gray-500">Unable to establish connection to the selected devices</p>
            
            {connectionAttempts < 3 ? (
              <Button onClick={establishConnection}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Retry Connection
              </Button>
            ) : (
              <div className="space-y-2">
                <p className="text-sm text-red-500">Maximum connection attempts reached</p>
                <Button variant="outline" onClick={resetConnectionState}>
                  Start Over
                </Button>
              </div>
            )}
          </div>
        );
        
      case 'connected':
      case 'monitoring':
        return (
          <ResizablePanelGroup direction="horizontal" className="min-h-[500px]">
            <ResizablePanel defaultSize={65} minSize={40}>
              <Tabs 
                value={selectedTab} 
                onValueChange={setSelectedTab} 
                className="h-full flex flex-col"
              >
                <div className="px-4 pt-4 border-b">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="control">Control</TabsTrigger>
                    <TabsTrigger value="data">Data</TabsTrigger>
                    <TabsTrigger value="status">Status</TabsTrigger>
                  </TabsList>
                </div>
                
                <div className="flex-1 overflow-hidden">
                  <TabsContent value="control" className="h-full flex flex-col data-[state=active]:flex-1 m-0">
                    <div className="p-4 flex-1 overflow-auto">
                      <h3 className="text-lg font-medium mb-4">Control Interface</h3>
                      
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-2">
                          <Button onClick={() => sendControlInstruction('power_on')}>
                            <Zap className="mr-2 h-4 w-4" />
                            Power On
                          </Button>
                          <Button onClick={() => sendControlInstruction('power_off')} variant="outline">
                            <Zap className="mr-2 h-4 w-4" />
                            Power Off
                          </Button>
                          <Button onClick={() => sendControlInstruction('restart')}>
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Restart
                          </Button>
                          <Button onClick={() => sendControlInstruction('status')} variant="outline">
                            <Monitor className="mr-2 h-4 w-4" />
                            Get Status
                          </Button>
                        </div>
                        
                        <div className="pt-4">
                          <h4 className="text-sm font-medium mb-2">Custom Instruction</h4>
                          <div className="flex space-x-2">
                            <input
                              type="text"
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              placeholder="Enter control instruction..."
                              value={instructionInput}
                              onChange={(e) => setInstructionInput(e.target.value)}
                            />
                            <Button onClick={handleSendInstruction}>
                              <Send className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 border-t">
                      <h4 className="text-sm font-medium mb-2">Last Instruction</h4>
                      <div className="px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded text-sm">
                        {connectionData.lastInstruction || 'No instructions sent yet'}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="data" className="h-full flex flex-col data-[state=active]:flex-1 m-0">
                    <div className="p-4 flex-1 overflow-auto">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium">Upload Data</h3>
                        <Badge variant="outline" className="font-mono">
                          {connectionData.uploadedData.length} items
                        </Badge>
                      </div>
                      
                      <ScrollArea className="h-[350px] rounded-md border">
                        {connectionData.uploadedData.length === 0 ? (
                          <div className="p-4 text-center text-gray-500">
                            <Upload className="h-8 w-8 mx-auto mb-2 opacity-50" />
                            <p>No data uploaded yet</p>
                          </div>
                        ) : (
                          <div className="p-4 space-y-4">
                            {connectionData.uploadedData.map((data, idx) => (
                              <div key={idx} className="p-2 rounded-md bg-gray-100 dark:bg-gray-800">
                                <pre className="text-xs overflow-auto">
                                  {JSON.stringify(data, null, 2)}
                                </pre>
                              </div>
                            ))}
                          </div>
                        )}
                      </ScrollArea>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="status" className="h-full flex flex-col data-[state=active]:flex-1 m-0">
                    <div className="p-4 flex-1 overflow-auto">
                      <h3 className="text-lg font-medium mb-4">Device Status</h3>
                      
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-4">
                          {selectedDevices.map(device => (
                            <Card key={device.id}>
                              <CardHeader className="pb-2">
                                <CardTitle className="text-base">{device.name}</CardTitle>
                                <CardDescription className="text-xs">{device.ipAddress} • {device.type}</CardDescription>
                              </CardHeader>
                              <CardContent className="pb-2">
                                <ScrollArea className="h-[200px]">
                                  <div className="space-y-2">
                                    {Object.entries(connectionData.deviceStatus[device.id] || {}).map(([key, value]) => (
                                      <div key={key} className="grid grid-cols-3 text-sm">
                                        <span className="text-gray-500">{key}</span>
                                        <span className="col-span-2 font-mono">{String(value)}</span>
                                      </div>
                                    ))}
                                    
                                    {!connectionData.deviceStatus[device.id] && (
                                      <div className="text-center py-4 text-gray-500">
                                        <p>No status data available</p>
                                      </div>
                                    )}
                                  </div>
                                </ScrollArea>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </ResizablePanel>
            
            <ResizableHandle withHandle />
            
            <ResizablePanel defaultSize={35} minSize={25}>
              <div className="p-4 h-full flex flex-col">
                <h3 className="text-lg font-medium mb-4">Connection Log</h3>
                
                <ScrollArea className="flex-1 border rounded-md">
                  <div className="p-4 space-y-2">
                    {connectionData.exceptions.length > 0 ? (
                      connectionData.exceptions.map((exception, idx) => (
                        <div 
                          key={idx} 
                          className="p-2 rounded bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-sm"
                        >
                          <span className="font-mono text-red-600 dark:text-red-400">{exception}</span>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <p>No exceptions logged</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
                
                <div className="flex justify-between items-center pt-4">
                  <div className="text-sm text-gray-500">
                    {connectionData.connectionTime ? (
                      <span>Connected since: {new Date(connectionData.connectionTime).toLocaleTimeString()}</span>
                    ) : (
                      <span>Not connected</span>
                    )}
                  </div>
                  <Button 
                    variant="destructive" 
                    onClick={handleCloseConnection}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Close Connection
                  </Button>
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        );
        
      case 'disconnected':
      case 'exception':
        return (
          <div className="flex flex-col items-center justify-center p-6 space-y-4">
            <AlertCircle className="h-12 w-12 text-red-500" />
            <h3 className="text-lg font-medium">Connection Error</h3>
            <p className="text-sm text-gray-500">The connection was interrupted or an error occurred</p>
            
            <div className="w-full max-w-md p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
              <h4 className="text-sm font-medium mb-2">Error Details</h4>
              <ScrollArea className="h-[100px]">
                <div className="space-y-2">
                  {connectionData.exceptions.map((exception, idx) => (
                    <div key={idx} className="text-xs font-mono text-red-600 dark:text-red-400">
                      {exception}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
            
            <div className="flex gap-3">
              <Button variant="outline" onClick={resetConnectionState}>
                Start Over
              </Button>
              <Button onClick={establishConnection}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Reconnect
              </Button>
            </div>
          </div>
        );
        
      case 'closed':
        return (
          <div className="flex flex-col items-center justify-center p-6 space-y-4">
            <Save className="h-12 w-12 text-green-500" />
            <h3 className="text-lg font-medium">Connection Closed</h3>
            <p className="text-sm text-gray-500">The connection has been closed and all data has been stored</p>
            
            <div className="flex gap-3">
              <Button onClick={resetConnectionState}>
                Start New Connection
              </Button>
            </div>
          </div>
        );
        
      default:
        return (
          <div className="flex flex-col items-center justify-center p-6 space-y-4">
            <AlertCircle className="h-12 w-12 text-yellow-500" />
            <h3 className="text-lg font-medium">Unknown State</h3>
            <p className="text-sm text-gray-500">The connection is in an unknown state</p>
            <Button onClick={resetConnectionState}>
              Reset Connection
            </Button>
          </div>
        );
    }
  };
  
  return (
    <Card className="w-full shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Device Connection</CardTitle>
            <CardDescription>Connect and manage your devices</CardDescription>
          </div>
          <ConnectionStatus {...getConnectionStatusDetails()} />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {renderConnectionStateUI()}
      </CardContent>
    </Card>
  );
}
