
#!/bin/bash
echo "Killing processes on port 5000..."
pkill -f "node|tsx" 2>/dev/null || true
fuser -k 5000/tcp 2>/dev/null || true
sleep 1
echo "Cleanup complete."
