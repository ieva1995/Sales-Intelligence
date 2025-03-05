/**
 * Connection Manager for SalesBoost AI
 * Implements the device connection workflow for establishing and managing device connections
 */

import { create } from 'zustand';

// Types for the connection manager
export type ConnectionState = 
  | 'idle'
  | 'detecting-wifi'
  | 'wifi-failed'
  | 'searching-devices'
  | 'device-selection'
  | 'connecting'
  | 'connection-failed'
  | 'connected'
  | 'monitoring'
  | 'disconnected'
  | 'exception'
  | 'closed';

export type Device = {
  id: string;
  name: string;
  type: string;
  ipAddress: string;
  macAddress: string;
  status: 'online' | 'offline' | 'unknown';
};

export type ConnectionData = {
  connectionTime: number;
  uploadedData: any[];
  lastInstruction: string | null;
  deviceStatus: Record<string, any>;
  exceptions: string[];
};

// Connection Manager Store
interface ConnectionManagerState {
  // Connection state
  connectionState: ConnectionState;
  devices: Device[];
  selectedDevices: Device[];
  socket: WebSocket | null;
  connectionAttempts: number;
  connectionData: ConnectionData;
  isConnecting: boolean;
  isOfflineMode: boolean;

  // Actions
  detectWiFiConnection: () => Promise<boolean>;
  searchAvailableDevices: () => Promise<Device[]>;
  selectDevice: (deviceId: string) => void;
  deselectDevice: (deviceId: string) => void;
  establishConnection: () => Promise<boolean>;
  sendControlInstruction: (instruction: string, params?: any) => Promise<boolean>;
  monitorConnection: () => void;
  monitorUploadData: () => void;
  displayControlInterface: () => void;
  handleDisconnection: (reason?: string) => void;
  closeConnection: () => void;
  resetConnectionState: () => void;
}

// Create the connection manager store
export const useConnectionManager = create<ConnectionManagerState>((set, get) => ({
  // Initial state
  connectionState: 'idle',
  devices: [],
  selectedDevices: [],
  socket: null,
  connectionAttempts: 0,
  isConnecting: false,
  isOfflineMode: false,
  connectionData: {
    connectionTime: 0,
    uploadedData: [],
    lastInstruction: null,
    deviceStatus: {},
    exceptions: []
  },

  // Methods that implement the connection workflow
  detectWiFiConnection: async () => {
    set({ connectionState: 'detecting-wifi' });

    try {
      // Check if navigator is online
      const isOnline = navigator.onLine;

      if (!isOnline) {
        set({ connectionState: 'wifi-failed', isOfflineMode: true });
        return false;
      }

      // Additional network check (ping test)
      try {
        const response = await fetch('/api/network-check', { 
          method: 'GET',
          cache: 'no-cache',
          headers: { 'Cache-Control': 'no-cache' }
        });

        if (!response.ok) {
          set({ connectionState: 'wifi-failed', isOfflineMode: true });
          return false;
        }
      } catch (error) {
        console.error('Network check failed:', error);
        set({ connectionState: 'wifi-failed', isOfflineMode: true });
        return false;
      }

      return true;
    } catch (error) {
      console.error('WiFi detection error:', error);
      set({ connectionState: 'wifi-failed', isOfflineMode: true });
      return false;
    }
  },

  searchAvailableDevices: async () => {
    set({ connectionState: 'searching-devices' });

    try {
      // API call to fetch available devices on the network
      const response = await fetch('/api/devices/scan', { 
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to scan devices');
      }

      const devices: Device[] = await response.json();
      set({ devices, connectionState: 'device-selection' });
      return devices;
    } catch (error) {
      console.error('Device search error:', error);
      set({ connectionState: 'exception' });

      // Return empty array on error
      return [];
    }
  },

  selectDevice: (deviceId: string) => {
    const { devices, selectedDevices } = get();
    const device = devices.find((d: Device) => d.id === deviceId);

    if (device && !selectedDevices.some((d: Device) => d.id === deviceId)) {
      set({ selectedDevices: [...selectedDevices, device] });
    }
  },

  deselectDevice: (deviceId: string) => {
    const { selectedDevices } = get();
    set({ selectedDevices: selectedDevices.filter((d: Device) => d.id !== deviceId) });
  },

  establishConnection: async () => {
    const { selectedDevices } = get();

    if (selectedDevices.length === 0) {
      console.error('No devices selected');
      return false;
    }

    set({ 
      connectionState: 'connecting',
      isConnecting: true,
      connectionAttempts: get().connectionAttempts + 1
    });

    try {
      // Create device IDs list for connection
      const deviceIds = selectedDevices.map((device: Device) => device.id);

      // Establish WebSocket connection
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/ws`;

      return new Promise<boolean>((resolve) => {
        const socket = new WebSocket(wsUrl);

        socket.onopen = () => {
          // Send initial connection message with selected devices
          socket.send(JSON.stringify({
            type: 'connect',
            data: { deviceIds }
          }));

          set({ 
            socket,
            connectionState: 'connected',
            isConnecting: false,
            connectionData: {
              ...get().connectionData,
              connectionTime: Date.now()
            }
          });

          // Start monitoring processes
          get().monitorConnection();
          get().displayControlInterface();
          get().monitorUploadData();

          resolve(true);
        };

        socket.onerror = (event) => {
          console.error('WebSocket connection error:', event);
          set({ 
            connectionState: 'connection-failed',
            isConnecting: false
          });
          resolve(false);
        };

        // Set timeout for connection attempt
        setTimeout(() => {
          if (get().connectionState === 'connecting') {
            console.error('Connection attempt timed out');
            set({ 
              connectionState: 'connection-failed',
              isConnecting: false
            });
            resolve(false);
          }
        }, 10000); // 10 second timeout
      });
    } catch (error) {
      console.error('Connection establishment error:', error);
      set({ 
        connectionState: 'connection-failed',
        isConnecting: false
      });
      return false;
    }
  },

  sendControlInstruction: async (instruction: string, params = {}) => {
    const { socket, connectionState } = get();

    if (!socket || connectionState !== 'connected') {
      console.error('Cannot send instruction: Not connected');
      return false;
    }

    try {
      const message = {
        type: 'instruction',
        instruction,
        params,
        timestamp: Date.now()
      };

      socket.send(JSON.stringify(message));

      // Update last instruction in state
      set({
        connectionData: {
          ...get().connectionData,
          lastInstruction: instruction
        }
      });

      return true;
    } catch (error) {
      console.error('Failed to send instruction:', error);
      get().handleDisconnection('Instruction failed');
      return false;
    }
  },

  monitorConnection: () => {
    const { socket } = get();

    if (!socket) return;

    // Setup message handler
    socket.onmessage = (event: MessageEvent) => {
      try {
        const message = JSON.parse(event.data);

        switch (message.type) {
          case 'status':
            // Update device status
            set({
              connectionData: {
                ...get().connectionData,
                deviceStatus: {
                  ...get().connectionData.deviceStatus,
                  ...message.data
                }
              }
            });
            break;

          case 'data':
            // Store uploaded data
            set({
              connectionData: {
                ...get().connectionData,
                uploadedData: [
                  ...get().connectionData.uploadedData,
                  message.data
                ]
              }
            });
            break;

          case 'error':
            // Store error in exceptions
            set({
              connectionData: {
                ...get().connectionData,
                exceptions: [
                  ...get().connectionData.exceptions,
                  message.error
                ]
              }
            });

            if (message.critical) {
              get().handleDisconnection('Critical error');
            }
            break;

          default:
            console.log('Unknown message type:', message.type);
        }
      } catch (error) {
        console.error('Error processing message:', error);
      }
    };

    // Setup close handler
    socket.onclose = () => {
      get().handleDisconnection('Connection closed by server');
    };
  },

  monitorUploadData: () => {
    // This would typically set up periodic checks or listeners for data uploads
    console.log('Started monitoring upload data');

    // In a real implementation, this might set up timers or additional event listeners
  },

  displayControlInterface: () => {
    // This would update the UI to show the control interface
    // In this implementation, we just update the state
    set({ connectionState: 'connected' });
    console.log('Control interface ready');
  },

  handleDisconnection: (reason = 'Unknown reason') => {
    const { socket } = get();

    console.warn('Disconnection occurred:', reason);

    // Update state to disconnected
    set({ 
      connectionState: 'disconnected',
      isConnecting: false
    });

    // Add the disconnection reason to exceptions
    set({
      connectionData: {
        ...get().connectionData,
        exceptions: [
          ...get().connectionData.exceptions,
          `Disconnected: ${reason}`
        ]
      }
    });

    // Close socket if still open
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.close();
    }

    set({ socket: null });
  },

  closeConnection: () => {
    const { socket, connectionData } = get();

    // Close the socket connection if open
    if (socket) {
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
      set({ socket: null });
    }

    // Store the data
    // In a real implementation, you would send this to the server
    console.log('Stored connection data:', connectionData);

    // Move to closed state
    set({ connectionState: 'closed' });
  },

  resetConnectionState: () => {
    // Reset the entire connection state
    set({
      connectionState: 'idle',
      devices: [],
      selectedDevices: [],
      socket: null,
      connectionAttempts: 0,
      isConnecting: false,
      isOfflineMode: false,
      connectionData: {
        connectionTime: 0,
        uploadedData: [],
        lastInstruction: null,
        deviceStatus: {},
        exceptions: []
      }
    });
  }
}));