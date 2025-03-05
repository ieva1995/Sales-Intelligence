
const { execSync } = require('child_process');

function killPort(port) {
  console.log(`Attempting to find and kill process using port ${port}...`);
  
  try {
    // Try using lsof (available on most Unix systems)
    const lsofCommand = `lsof -i :${port} -t`;
    const pids = execSync(lsofCommand).toString().trim().split('\n');
    
    if (pids && pids.length && pids[0]) {
      pids.forEach(pid => {
        try {
          console.log(`Killing process ${pid} using port ${port}`);
          execSync(`kill -9 ${pid}`);
        } catch (err) {
          console.log(`Failed to kill process ${pid}: ${err.message}`);
        }
      });
      console.log(`Process using port ${port} killed successfully`);
      return true;
    }
  } catch (err) {
    console.log(`No process found using lsof on port ${port}`);
  }
  
  try {
    // Try using fuser as an alternative (available on many Linux systems)
    execSync(`fuser -k ${port}/tcp`);
    console.log(`Process using port ${port} killed successfully using fuser`);
    return true;
  } catch (err) {
    console.log(`No process found on port ${port} using fuser`);
  }
  
  try {
    // Another approach with netstat and grep (works on most systems)
    const netstatCommand = `netstat -ano | grep ${port}`;
    const output = execSync(netstatCommand).toString();
    
    // Parse the output to find PIDs
    const lines = output.split('\n');
    const pidRegex = /(\d+)$/;
    
    for (const line of lines) {
      const match = line.match(pidRegex);
      if (match && match[1]) {
        const pid = match[1];
        try {
          console.log(`Killing process ${pid} using port ${port} (found via netstat)`);
          execSync(`kill -9 ${pid}`);
          console.log(`Process ${pid} killed successfully`);
          return true;
        } catch (killErr) {
          console.log(`Failed to kill process ${pid}: ${killErr.message}`);
        }
      }
    }
  } catch (err) {
    console.log(`No process found using netstat on port ${port}`);
  }
  
  console.log(`No process found using port ${port} or failed to kill it.`);
  return false;
}

// Kill process on port 5000
killPort(5000);
