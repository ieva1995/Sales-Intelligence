#!/usr/bin/env node
import { exec } from 'child_process';

const PORT = 5000;

console.log(`Attempting to kill any process using port ${PORT}...`);

// Try different commands based on platform availability
const commands = [
  `fuser -k ${PORT}/tcp`,                       // Linux
  `lsof -i :${PORT} | grep LISTEN | awk '{print $2}' | xargs kill -9`,  // macOS/Linux with lsof
  `netstat -ano | findstr :${PORT} | findstr LISTENING`,  // Windows (gets PID only)
];

// Execute commands sequentially until one succeeds
async function tryKillCommands() {
  for (const cmd of commands) {
    try {
      console.log(`Trying command: ${cmd}`);
      const output = await executeCommand(cmd);
      console.log(`Command output: ${output}`);
      
      if (output) {
        console.log(`Successfully executed command to kill process on port ${PORT}`);
        return true;
      }
    } catch (error) {
      console.log(`Command failed: ${error.message}`);
    }
  }
  return false;
}

function executeCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error && error.code !== 1) { // Some commands return exit code 1 when successful
        reject(error);
        return;
      }
      resolve(stdout || stderr);
    });
  });
}

// Run the port-killing attempt
tryKillCommands()
  .then(success => {
    if (success) {
      console.log(`Port ${PORT} should now be free for use.`);
    } else {
      console.error(`Failed to free port ${PORT}. You may need to manually find and kill the process.`);
      console.log('For Linux/macOS, use: lsof -i :5000');
      console.log('For Windows, use: netstat -ano | findstr :5000');
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
