import React from "react";
import { Button } from "./button";
import { RefreshCw, Wifi, WifiOff, AlertCircle, Monitor } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

interface ConnectionStatusProps {
  isConnected: boolean;
  isOfflineMode: boolean;
  connectionError: boolean;
  connectionAttempts: number;
  maxAttempts: number;
  onRetry: () => void;
}

export function ConnectionStatus({
  isConnected,
  isOfflineMode,
  connectionError,
  connectionAttempts,
  maxAttempts,
  onRetry
}: ConnectionStatusProps) {
  // Determine status color
  const statusColor = isConnected 
    ? "bg-green-500" 
    : connectionError 
      ? "bg-red-500" 
      : "bg-yellow-500";

  // Determine status message
  const statusMessage = isConnected 
    ? 'Connected to intelligence feed' 
    : isOfflineMode 
      ? `Offline mode - using cached data` 
      : connectionError 
        ? `Connection error - working in offline mode` 
        : 'Connecting...';

  // Calculate progress as a percentage toward max attempts
  const progressPercent = Math.min(100, (connectionAttempts / maxAttempts) * 100);

  return (
    <div className="flex items-center space-x-3 p-2 bg-gradient-to-r from-slate-800/50 to-transparent rounded-lg">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="relative">
              {isConnected ? (
                <Wifi className="h-5 w-5 text-green-400" />
              ) : connectionError ? (
                <AlertCircle className="h-5 w-5 text-red-400" />
              ) : isOfflineMode ? (
                <WifiOff className="h-5 w-5 text-yellow-400" />
              ) : (
                <div className="flex items-center">
                  <div className={`h-2.5 w-2.5 rounded-full ${statusColor}`} />
                </div>
              )}
              {connectionAttempts > 0 && !isConnected && (
                <div className="absolute -bottom-1 -right-1 h-3 w-3">
                  <svg className="animate-spin h-3 w-3 text-yellow-500" viewBox="0 0 24 24">
                    <circle 
                      className="opacity-25" 
                      cx="12" 
                      cy="12" 
                      r="10" 
                      stroke="currentColor" 
                      strokeWidth="4"
                      fill="none"
                    />
                    <path 
                      className="opacity-75" 
                      fill="currentColor" 
                      d={`M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z`}
                    />
                  </svg>
                </div>
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="bg-slate-900 border-slate-700">
            {isConnected ? (
              <p>WebSocket connection is active and healthy</p>
            ) : connectionError ? (
              <div>
                <p>Connection failed (Attempt {connectionAttempts}/{maxAttempts})</p>
                {connectionAttempts < maxAttempts && <p>Will retry automatically</p>}
              </div>
            ) : (
              <p>Establishing WebSocket connection...</p>
            )}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <span className="text-sm font-medium text-gray-300">
        {statusMessage}
      </span>

      {(connectionError || isOfflineMode) && connectionAttempts < maxAttempts && (
        <Button
          variant="outline"
          size="sm"
          className="ml-2 text-xs h-7 px-2 bg-slate-800 hover:bg-slate-700 border-slate-700"
          onClick={onRetry}
        >
          <RefreshCw className="mr-1 h-3 w-3" /> 
          Retry Connection
        </Button>
      )}
    </div>
  );
}