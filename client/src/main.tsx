import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Define global configuration for consistent port usage
window.process = window.process || {};
window.process.env = window.process.env || {};

// Ensure WebSocket connections use the standard port 5000
const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
const port = "5000"; // Explicitly using port 5000
const wsUrl = `${protocol}//${window.location.hostname}:${port}`;

console.log("SalesBoost AI: Initializing application");
console.log(`WebSocket URL configured as: ${wsUrl}`);

// Make this configuration available globally
window.process.env.VITE_WS_URL = wsUrl;
window.process.env.VITE_HMR_PORT = port;
window.process.env.VITE_HMR_PATH = '/ws-feed';

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled Promise Rejection:', event.reason);
});

// Mount the React application
createRoot(document.getElementById("root")!).render(<App />);