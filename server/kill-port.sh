#!/bin/bash

PORT=5000
echo "====== Port $PORT Cleanup Utility ======"
echo "Attempting to identify and terminate processes using port $PORT..."

# Diagnostic information - list all running node processes
echo "Checking for node processes..."
ps aux | grep -E "node|tsx" | grep -v grep || echo "No node processes found."

# Try multiple approaches to find the PID
echo "Attempting to find process ID using port $PORT..."

# Method 1: lsof
if command -v lsof &> /dev/null; then
    echo "Using lsof to find process..."
    PIDS=$(lsof -t -i:$PORT 2>/dev/null)
    if [ -n "$PIDS" ]; then
        echo "Found PIDs: $PIDS"
        for PID in $PIDS; do
            echo "Killing process $PID using port $PORT"
            kill -9 $PID 2>/dev/null || echo "Failed to kill $PID"
        done
    else
        echo "No processes found using lsof"
    fi
else
    echo "lsof not available, trying alternative methods"
fi

# Method 2: netstat
if command -v netstat &> /dev/null; then
    echo "Using netstat to find process..."
    PIDS=$(netstat -tlnp 2>/dev/null | grep ":$PORT" | awk '{print $7}' | cut -d'/' -f1)
    if [ -n "$PIDS" ]; then
        echo "Found PIDs: $PIDS"
        for PID in $PIDS; do
            echo "Killing process $PID using port $PORT"
            kill -9 $PID 2>/dev/null || echo "Failed to kill $PID"
        done
    else
        echo "No processes found using netstat"
    fi
else
    echo "netstat not available, trying alternative methods"
fi

# Method 3: fuser (kill directly)
if command -v fuser &> /dev/null; then
    echo "Using fuser to kill process on port $PORT..."
    fuser -k $PORT/tcp 2>/dev/null && echo "Successfully killed process with fuser" || echo "No process killed with fuser"
else
    echo "fuser not available, trying alternative methods"
fi

# Method 4: pkill - more targeted approach for node processes
echo "Using pkill to terminate node processes that might be using port $PORT..."
pkill -f "node.*$PORT" 2>/dev/null && echo "Successfully killed matching node processes" || echo "No matching node processes killed"

# Last resort: kill all node/tsx processes
echo "Last resort: killing all node and tsx processes..."
pkill -f "node|tsx" 2>/dev/null && echo "Successfully killed all node/tsx processes" || echo "No node/tsx processes killed"

# Wait for processes to terminate
echo "Waiting for processes to terminate..."
sleep 3

# Verify if port is now free
echo "Verifying if port $PORT is now free..."
if command -v lsof &> /dev/null; then
    if lsof -i:$PORT &>/dev/null; then
        echo "WARNING: Port $PORT is still in use after all kill attempts."
    else
        echo "SUCCESS: Port $PORT is now free."
    fi
elif command -v netstat &> /dev/null; then
    if netstat -tuln 2>/dev/null | grep -q ":$PORT "; then
        echo "WARNING: Port $PORT is still in use after all kill attempts."
    else
        echo "SUCCESS: Port $PORT is now free."
    fi
else
    echo "Cannot verify if port is free, no tools available."
fi

echo "====== Cleanup operation complete ======"