
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

  // Try fuser as an alternative (often available on Linux)
  exec(`fuser -k ${port}/tcp`, (error, stdout, stderr) => {
    if (error) {
      console.log(`No process found on port ${port} using fuser`);
    } else {
      console.log(`Process using port ${port} killed successfully with fuser`);
    }
  });
});
