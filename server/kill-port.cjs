const { execSync } = require('child_process');

/**
 * Enhanced function to kill processes using a specific port
 * Uses multiple approaches to ensure the port is released
 * 
 * @param {number} port - The port number to free
 * @returns {boolean} - Whether the operation succeeded
 */
function killPort(port) {
  console.log(`Attempting to find and kill process using port ${port}...`);

  try {
    // First check what processes are using the port (diagnostic only)
    try {
      console.log('Checking processes using the port...');
      execSync(`ps aux | grep node || true`);
    } catch (err) {
      // Ignore errors, this is just for diagnostic info
    }

    // Try multiple commands with increasing aggressiveness to ensure port is freed
    // 1. Try using kill-port if available (non-destructive approach)
    try {
      execSync(`npx kill-port ${port} 2>/dev/null || true`);
      console.log('Attempted kill-port command');
    } catch (err) {
      console.log('kill-port command not available, continuing with alternatives');
    }

    // 2. Try using fuser (Linux)
    try {
      execSync(`fuser -k ${port}/tcp 2>/dev/null || true`);
      console.log('Attempted fuser command');
    } catch (err) {
      console.log('fuser command not available, continuing with alternatives');
    }

    // 3. Try using lsof (Linux/Mac)
    try {
      const pid = execSync(`lsof -t -i:${port} 2>/dev/null || echo ""`).toString().trim();
      if (pid) {
        console.log(`Found process ${pid} using port ${port}, terminating...`);
        execSync(`kill -9 ${pid} 2>/dev/null || true`);
      }
    } catch (err) {
      console.log('lsof command not available or failed, continuing with alternatives');
    }

    // 4. Try using netstat (more compatible across systems)
    try {
      execSync(`netstat -tlnp 2>/dev/null | grep ":${port}" | awk '{print $7}' | cut -d'/' -f1 | xargs -r kill -9 2>/dev/null || true`);
      console.log('Attempted netstat command');
    } catch (err) {
      console.log('netstat command not available, continuing with alternatives');
    }


    // Give processes time to fully terminate
    console.log('Attempting to kill processes on port...');
    execSync('sleep 3');

    // Verify if the port is now free
    try {
      const check = execSync(`lsof -i:${port} || netstat -tlnp 2>/dev/null | grep ":${port}" || true`).toString().trim();
      if (check) {
        console.log(`Warning: Port ${port} may still be in use after all attempts`);
        return false;
      } else {
        console.log(`Successfully freed port ${port}`);
        return true;
      }
    } catch (err) {
      // If commands fail, assume it worked and continue
      console.log(`Could not verify if port ${port} is free, assuming success`);
      return true;
    }
  } catch (err) {
    console.error('Error killing port:', err.message);
    return false;
  }
}

// Kill process on port 5000
const result = killPort(5000);
console.log(`Port kill operation ${result ? 'succeeded' : 'may have failed'}`);

module.exports = {
  killPort
};