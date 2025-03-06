#!/usr/bin/env node

const { exec } = require('child_process');
const PORT = 5000;

console.log(`Attempting to free up port ${PORT}...`);

// For Windows
const windowsKill = () => {
  return new Promise((resolve) => {
    exec(`netstat -ano | findstr :${PORT}`, (error, stdout) => {
      if (error || !stdout) {
        console.log(`No process using port ${PORT} on Windows`);
        return resolve(false);
      }

      // Extract PID
      const lines = stdout.split('\n').filter(Boolean);
      if (lines.length > 0) {
        const line = lines[0].trim();
        const parts = line.split(/\s+/);
        const pid = parts[parts.length - 1];

        if (pid && !isNaN(parseInt(pid))) {
          console.log(`Found process ${pid} using port ${PORT}, killing...`);
          exec(`taskkill /F /PID ${pid}`, (error) => {
            if (error) {
              console.error(`Failed to kill process ${pid}:`, error.message);
              return resolve(false);
            }
            console.log(`Successfully killed process ${pid}`);
            return resolve(true);
          });
        } else {
          console.log(`Could not extract PID from line: ${line}`);
          return resolve(false);
        }
      } else {
        console.log(`No process found using port ${PORT}`);
        return resolve(false);
      }
    });
  });
};

// For Linux/Mac
const unixKill = () => {
  return new Promise((resolve) => {
    exec(`lsof -i :${PORT} -t`, (error, stdout) => {
      if (error || !stdout) {
        console.log(`No process using port ${PORT} on Unix`);
        return resolve(false);
      }

      const pids = stdout.split('\n').filter(Boolean);
      if (pids.length > 0) {
        let killPromises = pids.map(pid => {
          return new Promise((resolveKill) => {
            console.log(`Found process ${pid} using port ${PORT}, killing...`);
            exec(`kill -9 ${pid}`, (error) => {
              if (error) {
                console.error(`Failed to kill process ${pid}:`, error.message);
                return resolveKill(false);
              }
              console.log(`Successfully killed process ${pid}`);
              return resolveKill(true);
            });
          });
        });

        Promise.all(killPromises).then(results => {
          resolve(results.some(r => r));
        });
      } else {
        console.log(`No process found using port ${PORT}`);
        return resolve(false);
      }
    });
  });
};

// Try both approaches
const tryKill = async () => {
  try {
    // Try the platform-specific approach first
    if (process.platform === 'win32') {
      if (await windowsKill()) return;
    } else {
      if (await unixKill()) return;
    }

    // Fallback to the other approach
    if (process.platform === 'win32') {
      await unixKill(); // Some Windows environments have Unix tools (e.g. Git Bash)
    } else {
      await windowsKill(); // Some Unix environments can run Windows commands
    }

  } catch (err) {
    console.error('Error while trying to kill port:', err);
  } finally {
    console.log(`Kill port ${PORT} operation completed.`);
  }
};

tryKill();
