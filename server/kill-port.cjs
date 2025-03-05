
const { execSync } = require('child_process');

function killPort(port) {
  console.log(`Attempting to find and kill process using port ${port}...`);

  try {
    // Kill processes more aggressively
    execSync(`pkill -f "node|tsx" || true`);
    execSync(`fuser -k ${port}/tcp 2>/dev/null || true`);
    execSync(`kill -9 $(lsof -t -i:${port}) 2>/dev/null || true`);
    
    // Give processes time to fully terminate
    execSync('sleep 1');
    
    return true;
  } catch (err) {
    return false;
  }
}

// Kill process on port 5000
killPort(5000);
