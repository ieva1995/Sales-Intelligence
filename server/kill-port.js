
import { execSync } from 'child_process';

function checkCommand(command) {
  try {
    execSync(`which ${command}`);
    return true;
  } catch {
    return false;
  }
}

async function killPort(port) {
  console.log(`Attempting to find and kill process using port ${port}...`);
  
  if (checkCommand('lsof')) {
    try {
      const pids = execSync(`lsof -i :${port} -t`).toString().trim().split('\n');
      if (pids && pids.length && pids[0]) {
        pids.forEach(pid => {
          try {
            console.log(`Killing process ${pid}`);
            execSync(`kill -9 ${pid}`);
          } catch (err) {
            console.log(`Failed to kill process ${pid}`);
          }
        });
        return true;
      }
    } catch (err) {
      console.log('No process found using lsof');
    }
  }

  if (checkCommand('fuser')) {
    try {
      execSync(`fuser -k ${port}/tcp`);
      console.log('Process killed using fuser');
      return true;
    } catch (err) {
      console.log('No process found using fuser');
    }
  }

  if (checkCommand('netstat')) {
    try {
      const output = execSync(`netstat -ano | grep ${port}`).toString();
      const lines = output.split('\n');
      const pidRegex = /(\d+)$/;
      
      for (const line of lines) {
        const match = line.match(pidRegex);
        if (match?.[1]) {
          try {
            execSync(`kill -9 ${match[1]}`);
            console.log(`Process ${match[1]} killed`);
            return true;
          } catch (err) {
            console.log(`Failed to kill process ${match[1]}`);
          }
        }
      }
    } catch (err) {
      console.log('No process found using netstat');
    }
  }

  return false;
}

// Execute
killPort(5000);
