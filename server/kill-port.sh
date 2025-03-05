
#!/bin/bash
echo "Killing processes on port 5000..."
pkill -f "node" || true
fuser -k 5000/tcp || true
lsof -i :5000 | grep LISTEN | awk '{print $2}' | xargs kill -9 || true
netstat -tulpn 2>/dev/null | grep ':5000' | awk '{print $7}' | cut -d'/' -f1 | xargs kill -9 2>/dev/null || true
echo "All processes on port 5000 should be terminated."
sleep 2
