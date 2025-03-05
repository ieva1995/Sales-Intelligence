
#!/usr/bin/env node
import { exec } from 'child_process';

const port = 5000;

console.log(`Attempting to find and kill process using port ${port}...`);

// For Linux/macOS
exec(`lsof -i :${port} | grep LISTEN | awk '{print $2}' | xargs -r kill -9`, (error, stdout, stderr) => {
  if (error) {
    console.log(`No process found on port ${port} using lsof`);
  } else {
    console.log(`Process using port ${port} killed successfully`);
  }

  // For Windows (will be ignored on Linux/macOS if previous command succeeded)
  exec(`netstat -ano | findstr :${port} | findstr LISTENING`, (error, stdout) => {
    if (error || !stdout) {
      console.log(`No process found on port ${port} using netstat`);
      return;
    }

    const lines = stdout.trim().split('\n');
    if (lines.length > 0) {
      const line = lines[0];
      const pid = line.trim().split(/\s+/).pop();

      exec(`taskkill /F /PID ${pid}`, (error) => {
        if (error) {
          console.log(`Error killing process: ${error.message}`);
        } else {
          console.log(`Process with PID ${pid} using port ${port} killed successfully`);
        }
      });
    }
  });
});

console.log('Now the server should be able to start on port 5000');
