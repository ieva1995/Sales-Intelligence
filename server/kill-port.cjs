
const { execSync } = require('child_process');

function killPort(port) {
  console.log(`Attempting to find and kill process using port ${port}...`);

  try {
    // Kill Node processes first
    execSync('pkill -f "node|tsx" || true');
    console.log('Killed Node/TSX processes');
    
    // Force kill any remaining processes on the port
    execSync(`fuser -k ${port}/tcp 2>/dev/null || true`);
    execSync(`kill -9 $(lsof -t -i:${port}) 2>/dev/null || true`);
    console.log(`Killed processes on port ${port}`);

    // Wait briefly
    execSync('sleep 1');
    
    return true;
  } catch (err) {
    console.log('Error during port cleanup:', err.message);
    return false;
  }
}

// Kill process on port 5000
killPort(5000);
