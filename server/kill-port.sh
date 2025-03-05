#!/bin/bash

echo "Attempting to free ports for SalesBoost AI application..."

# Define ports to free
PORTS=(5000 3000 8080 4000)

for PORT in "${PORTS[@]}"; do
  echo "Checking port $PORT..."

  # Try different commands to find and kill processes
  # Some commands might not be available in all environments

  # Try using netstat
  echo "Using netstat to find processes on port $PORT"
  PIDS=$(netstat -tlnp 2>/dev/null | grep ":$PORT " | awk '{print $7}' | cut -d'/' -f1)

  if [ -n "$PIDS" ]; then
    echo "Found processes using port $PORT: $PIDS"
    for PID in $PIDS; do
      if [ -n "$PID" ] && [ "$PID" != "-" ]; then
        echo "Killing process $PID"
        kill -9 $PID 2>/dev/null || true
      fi
    done
  else
    echo "No specific process found for port $PORT using netstat"
  fi

  # Try using fuser (now available from psmisc)
  echo "Using fuser to free port $PORT"
  fuser -k $PORT/tcp 2>/dev/null || true

  # Try using killall (now available from psmisc)
  echo "Using killall to free node processes"
  killall -9 node 2>/dev/null || true

  # Try a more aggressive approach to kill node processes
  echo "Attempting to kill any node processes that might be using port $PORT"
  pkill -f "node" || true

  echo "Port $PORT should be free now"
done

echo "Port freeing complete. Starting application..."
sleep 2