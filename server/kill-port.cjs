
const { execSync } = require('child_process');

function killPort(port) {
  console.log(`Attempting to find and kill process using port ${port}...`);

  // Kill all Node/TSX processes first
  try {
    execSync('pkill -f "node|tsx" || true');
    console.log('Attempted to kill Node/TSX processes');
  } catch (err) {}

  // Kill specific port with multiple methods
  try {
    execSync(`fuser -k ${port}/tcp || true`);
    execSync(`kill -9 $(lsof -t -i:${port}) 2>/dev/null || true`);
    console.log(`Attempted to kill processes on port ${port}`);
  } catch (err) {}

  // Small delay to ensure processes are terminated
  execSync('sleep 2');

  // Verify port is free
  try {
    execSync(`lsof -i:${port}`);
    console.log(`WARNING: Port ${port} may still be in use`);
    return false;
  } catch (err) {
    console.log(`Port ${port} is now available`);
    return true;
  }
}

// Kill process on port 5000
killPort(5000);
