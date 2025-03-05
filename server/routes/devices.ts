import express from 'express';

const router = express.Router();

// Sample devices data for demonstration purposes
const sampleDevices = [
  {
    id: 'device-001',
    name: 'Smart Hub Controller',
    type: 'Hub',
    ipAddress: '192.168.1.101',
    macAddress: '00:1A:2B:3C:4D:5E',
    status: 'online'
  },
  {
    id: 'device-002',
    name: 'Environment Sensor',
    type: 'Sensor',
    ipAddress: '192.168.1.102',
    macAddress: '00:1A:2B:3C:4D:5F',
    status: 'online'
  },
  {
    id: 'device-003',
    name: 'Media Player',
    type: 'Media',
    ipAddress: '192.168.1.103',
    macAddress: '00:1A:2B:3C:4D:60',
    status: 'offline'
  },
  {
    id: 'device-004',
    name: 'Smart Thermostat',
    type: 'Climate',
    ipAddress: '192.168.1.104',
    macAddress: '00:1A:2B:3C:4D:61',
    status: 'online'
  },
  {
    id: 'device-005',
    name: 'Security Camera',
    type: 'Security',
    ipAddress: '192.168.1.105',
    macAddress: '00:1A:2B:3C:4D:62',
    status: 'online'
  }
];

// Endpoint to scan for devices on the network
router.get('/scan', (req, res) => {
  // In a real implementation, this would perform an actual network scan
  // For demonstration, we'll return sample devices with a short delay to simulate scanning
  
  setTimeout(() => {
    // Randomly vary the number of devices found to simulate a real scan
    const deviceCount = Math.floor(Math.random() * sampleDevices.length) + 1;
    const foundDevices = sampleDevices.slice(0, deviceCount);
    
    // Randomly vary device status to simulate real-world conditions
    const devicesWithUpdatedStatus = foundDevices.map(device => ({
      ...device,
      status: Math.random() > 0.2 ? 'online' : 'offline'
    }));
    
    res.json(devicesWithUpdatedStatus);
  }, 1500); // Simulate network scan delay
});

// Endpoint to check network connectivity
router.get('/network-check', (req, res) => {
  // In a real implementation, this would check actual network connectivity
  // For demonstration, we'll return success with a small chance of failure
  
  if (Math.random() > 0.1) {
    res.status(200).json({ status: 'connected' });
  } else {
    res.status(503).json({ status: 'disconnected', error: 'Network connectivity issues detected' });
  }
});

// Endpoint to get specific device details
router.get('/:deviceId', (req, res) => {
  const device = sampleDevices.find(d => d.id === req.params.deviceId);
  
  if (!device) {
    return res.status(404).json({ error: 'Device not found' });
  }
  
  res.json(device);
});

export default router;
