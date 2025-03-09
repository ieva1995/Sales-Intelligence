// A minimal test server to check if port 5000 is available
import express from 'express';
const app = express();

// Basic route to confirm server is running
app.get('/', (req, res) => {
  res.send('Port 5000 is available and this test server is running!');
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Detailed logging for the listening process
console.log('Attempting to start minimal test server on port 5000...');

// Try to listen on port 5000 with detailed error handling
const server = app.listen(5000, '0.0.0.0', () => {
  console.log('SUCCESS: Test server is running on port 5000');
  console.log('This confirms the port is available for binding');
  console.log('To verify, visit: http://localhost:5000 in your browser');
})
.on('error', (error) => {
  console.error('TEST SERVER ERROR: Failed to bind to port 5000');
  console.error(`Error details: ${error.message}`);

  if (error.code === 'EADDRINUSE') {
    console.error('DIAGNOSIS: Port 5000 is already in use by another process');
    console.error('SOLUTION: Find and terminate the process using port 5000');
    console.error('On Linux/Mac, try: lsof -i :5000');
    console.error('On Windows, try: netstat -ano | findstr :5000');
  } else {
    console.error(`Unexpected error code: ${error.code}`);
  }
});

// Setup graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down test server...');
  server.close(() => {
    console.log('Test server closed successfully');
    process.exit(0);
  });
});

console.log('Test server setup complete. If no errors appear, the server should be running.');