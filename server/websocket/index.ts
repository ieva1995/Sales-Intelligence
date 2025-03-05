import { Server as HttpServer } from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import { randomUUID } from 'crypto';

// Define types for the WebSocket implementation
interface Client {
  id: string;
  socket: WebSocket;
  connectedDevices: string[];
  lastActivity: number;
}

interface DeviceStatus {
  status: 'online' | 'offline' | 'busy';
  uptime: number;
  cpuUsage: number;
  memoryUsage: number;
  batteryLevel?: number;
  temperature?: number;
  lastUpdated: number;
}

// Store active WebSocket clients and their connection status
const clients = new Map<string, Client>();

// Store simulated device status data
const deviceStatusData = new Map<string, DeviceStatus>();

// Setup WebSocket server
export function setupWebSocketServer(httpServer: HttpServer) {
  const wss = new WebSocketServer({ 
    server: httpServer,
    path: '/ws'
  });
  
  console.log('WebSocket server initialized');
  
  wss.on('connection', (socket: WebSocket) => {
    // Generate a unique ID for this connection
    const clientId = randomUUID();
    
    // Store client information
    clients.set(clientId, {
      id: clientId,
      socket,
      connectedDevices: [],
      lastActivity: Date.now()
    });
    
    console.log(`Client connected: ${clientId}`);
    
    // Handle incoming messages
    socket.on('message', (messageData: Buffer) => {
      try {
        const client = clients.get(clientId);
        if (!client) return;
        
        // Update last activity timestamp
        client.lastActivity = Date.now();
        
        // Parse the message
        const message = JSON.parse(messageData.toString());
        
        // Handle different message types
        switch (message.type) {
          case 'connect':
            handleDeviceConnection(client, message.data?.deviceIds || []);
            break;
            
          case 'instruction':
            handleControlInstruction(client, message.instruction, message.params || {});
            break;
            
          case 'status_request':
            sendDeviceStatus(client);
            break;
            
          default:
            console.warn(`Unknown message type: ${message.type}`);
        }
        
      } catch (error) {
        console.error('Error processing message:', error);
        sendErrorMessage(socket, 'Error processing message', false);
      }
    });
    
    // Handle disconnection
    socket.on('close', () => {
      console.log(`Client disconnected: ${clientId}`);
      clients.delete(clientId);
    });
    
    // Handle errors
    socket.on('error', (error) => {
      console.error(`WebSocket error for client ${clientId}:`, error);
      clients.delete(clientId);
    });
  });
  
  // Start periodic status updates for connected clients
  startPeriodicStatusUpdates();
  
  // Start periodic data generation for simulation
  startPeriodicDataGeneration();
  
  return wss;
}

// Handle device connection requests
function handleDeviceConnection(client: Client, deviceIds: string[]) {
  console.log(`Client ${client.id} connecting to devices:`, deviceIds);
  
  // Store connected devices
  client.connectedDevices = deviceIds;
  
  // Initialize status data for each device if not exists
  deviceIds.forEach(deviceId => {
    if (!deviceStatusData.has(deviceId)) {
      deviceStatusData.set(deviceId, generateRandomDeviceStatus());
    }
  });
  
  // Send initial status update
  sendDeviceStatus(client);
  
  // Send success message
  if (client.socket.readyState === WebSocket.OPEN) {
    client.socket.send(JSON.stringify({
      type: 'connection_success',
      message: 'Successfully connected to devices',
      connectedDevices: deviceIds
    }));
  }
}

// Handle control instructions
function handleControlInstruction(client: Client, instruction: string, params: any) {
  console.log(`Client ${client.id} sent instruction: ${instruction}`, params);
  
  // Validate connected devices
  if (!client.connectedDevices.length) {
    sendErrorMessage(client.socket, 'No devices connected', true);
    return;
  }
  
  // Process the instruction (simulated)
  switch (instruction) {
    case 'power_on':
    case 'power_off':
    case 'restart':
      // Simulate processing time
      setTimeout(() => {
        sendInstructionResponse(client, instruction, true);
        
        // Update device status based on instruction
        client.connectedDevices.forEach(deviceId => {
          const status = deviceStatusData.get(deviceId);
          if (status) {
            const updatedStatus = { ...status };
            
            if (instruction === 'power_off') {
              updatedStatus.status = 'offline';
            } else if (instruction === 'power_on') {
              updatedStatus.status = 'online';
            } else if (instruction === 'restart') {
              // Simulate restart by temporarily marking device as offline
              updatedStatus.status = 'offline';
              setTimeout(() => {
                if (deviceStatusData.has(deviceId)) {
                  const currentStatus = deviceStatusData.get(deviceId)!;
                  deviceStatusData.set(deviceId, {
                    ...currentStatus,
                    status: 'online',
                    lastUpdated: Date.now()
                  });
                  
                  // Send updated status after restart
                  sendDeviceStatus(client);
                }
              }, 3000);
            }
            
            updatedStatus.lastUpdated = Date.now();
            deviceStatusData.set(deviceId, updatedStatus);
          }
        });
        
        // Send updated status
        sendDeviceStatus(client);
      }, 1000);
      break;
      
    case 'status':
      // Send current device status immediately
      sendDeviceStatus(client);
      sendInstructionResponse(client, instruction, true);
      break;
      
    default:
      // For any custom instruction, simulate processing
      setTimeout(() => {
        const success = Math.random() > 0.2; // 80% success rate for custom instructions
        sendInstructionResponse(client, instruction, success);
        
        if (!success) {
          sendErrorMessage(
            client.socket, 
            `Failed to execute instruction: ${instruction}`, 
            false
          );
        }
      }, 1500);
  }
}

// Send instruction response
function sendInstructionResponse(client: Client, instruction: string, success: boolean) {
  if (client.socket.readyState === WebSocket.OPEN) {
    client.socket.send(JSON.stringify({
      type: 'instruction_response',
      instruction,
      success,
      timestamp: Date.now()
    }));
  }
}

// Send device status to client
function sendDeviceStatus(client: Client) {
  if (client.socket.readyState !== WebSocket.OPEN) return;
  
  const deviceStatus: Record<string, any> = {};
  
  client.connectedDevices.forEach(deviceId => {
    const status = deviceStatusData.get(deviceId);
    if (status) {
      deviceStatus[deviceId] = status;
    }
  });
  
  client.socket.send(JSON.stringify({
    type: 'status',
    data: deviceStatus,
    timestamp: Date.now()
  }));
}

// Send error message to client
function sendErrorMessage(socket: WebSocket, error: string, critical: boolean) {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({
      type: 'error',
      error,
      critical,
      timestamp: Date.now()
    }));
  }
}

// Generate random device status for simulation
function generateRandomDeviceStatus(): DeviceStatus {
  return {
    status: Math.random() > 0.2 ? 'online' : 'offline',
    uptime: Math.floor(Math.random() * 86400), // Random uptime in seconds (up to 24 hours)
    cpuUsage: Math.random() * 100,
    memoryUsage: Math.random() * 100,
    batteryLevel: Math.random() > 0.5 ? Math.random() * 100 : undefined,
    temperature: 20 + Math.random() * 30,
    lastUpdated: Date.now()
  };
}

// Generate simulated data for devices
function generateSimulatedData() {
  // For each device with status
  deviceStatusData.forEach((status, deviceId) => {
    // Only generate data for online devices
    if (status.status === 'online') {
      // Update status values with small random changes
      status.cpuUsage = Math.max(0, Math.min(100, status.cpuUsage + (Math.random() * 20 - 10)));
      status.memoryUsage = Math.max(0, Math.min(100, status.memoryUsage + (Math.random() * 15 - 7.5)));
      
      if (status.batteryLevel !== undefined) {
        // Slowly decrease battery level
        status.batteryLevel = Math.max(0, Math.min(100, status.batteryLevel - Math.random() * 0.5));
      }
      
      status.temperature = Math.max(10, Math.min(60, status.temperature + (Math.random() * 4 - 2)));
      status.uptime += 5; // Add 5 seconds to uptime
      status.lastUpdated = Date.now();
      
      // Store updated status
      deviceStatusData.set(deviceId, status);
      
      // Find clients connected to this device and send them updated status
      clients.forEach(client => {
        if (client.connectedDevices.includes(deviceId)) {
          sendDeviceStatus(client);
        }
      });
    }
  });
}

// Generate simulated data upload for devices
function generateSimulatedUpload() {
  // Find clients with connected devices
  clients.forEach(client => {
    if (client.connectedDevices.length > 0 && client.socket.readyState === WebSocket.OPEN) {
      // Only generate upload data occasionally (30% chance)
      if (Math.random() > 0.7) {
        // Pick a random connected device
        const deviceIndex = Math.floor(Math.random() * client.connectedDevices.length);
        const deviceId = client.connectedDevices[deviceIndex];
        const status = deviceStatusData.get(deviceId);
        
        // Only generate data for online devices
        if (status && status.status === 'online') {
          // Generate a random data sample
          const dataSample = {
            deviceId,
            timestamp: Date.now(),
            readings: {
              temperature: 20 + Math.random() * 10,
              humidity: Math.random() * 100,
              pressure: 980 + Math.random() * 40,
              light: Math.random() * 1000,
              motion: Math.random() > 0.7
            },
            metadata: {
              sampleRate: 5000,
              version: '1.0.2',
              calibration: 0.98 + Math.random() * 0.04
            }
          };
          
          // Send the data to the client
          client.socket.send(JSON.stringify({
            type: 'data',
            data: dataSample
          }));
        }
      }
    }
  });
}

// Start periodic status updates
function startPeriodicStatusUpdates() {
  setInterval(() => {
    // Update device status data
    generateSimulatedData();
  }, 5000); // Update every 5 seconds
}

// Start periodic data generation
function startPeriodicDataGeneration() {
  setInterval(() => {
    // Generate simulated data uploads
    generateSimulatedUpload();
  }, 8000); // Generate data approximately every 8 seconds
}
