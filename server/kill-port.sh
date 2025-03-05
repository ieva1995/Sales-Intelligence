
#!/bin/bash
echo "Killing processes on port 5000..."
pkill -f "node" || true
fuser -k 5000/tcp || true
lsof -i :5000 | grep LISTEN | awk '{print $2}' | xargs kill -9 || true
echo "All processes on port 5000 should be terminated."
