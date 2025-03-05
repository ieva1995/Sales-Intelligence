
const { execSync } = require('child_process');

function killPort(port) {
  console.log(`Attempting to find and kill process using port ${port}...`);

  try {
    // Try multiple commands to ensure port is freed
    execSync(`pkill -f "node|tsx" || true`);
    execSync(`fuser -k ${port}/tcp 2>/dev/null || true`);
    execSync(`kill -9 $(lsof -t -i:${port}) 2>/dev/null || true`);
    execSync(`kill -9 $(netstat -tlnp 2>/dev/null | grep ":${port}" | awk '{print $7}' | cut -d'/' -f1) 2>/dev/null || true`);
    
    // Give processes time to fully terminate
    execSync('sleep 2');
    
    return true;
  } catch (err) {
    console.error('Error killing port:', err.message);
    return false;
  }
}

// Kill process on port 5000
killPort(5000);
