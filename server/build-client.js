// Build script for the client
console.log('Starting client build process...');

import { execSync } from 'child_process';

try {
  console.log('Running Vite build...');
  execSync('npx vite build', { stdio: 'inherit' });
  console.log('Client build completed successfully!');
} catch (error) {
  console.error('Error during build:', error.message);
  process.exit(1);
}