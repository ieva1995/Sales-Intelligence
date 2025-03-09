
// Simple logging utility for vite-related operations
export function log(message: string, context: string = 'vite'): void {
  console.log(`[${context}] ${message}`);
}
