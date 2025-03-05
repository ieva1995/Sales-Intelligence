const { execSync } = require('child_process');

function killPort(port) {
  console.log(`Attempting to find and kill process using port ${port}...`);

  // First try to kill any Node processes
  try {
    execSync('pkill -f "node|tsx"');
    console.log('Killed all Node processes');
  } catch (err) {
    console.log('No Node processes found');
  }

  // Force kill anything on port 5000
  try {
    execSync(`kill -9 $(lsof -t -i:${port}) 2>/dev/null || true`);
    console.log(`Killed process on port ${port}`);
  } catch (err) {
    console.log(`No process found on port ${port}`);
  }

  // Wait a moment
  execSync('sleep 1');

  // Verify port is free
  try {
    execSync(`lsof -i:${port}`);
    console.log(`WARNING: Port ${port} still in use`);
    return false;
  } catch (err) {
    console.log(`Port ${port} is now free`);
    return true;
  }
}

// Kill process on port 5000
killPort(5000);