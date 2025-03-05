import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "./button";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error to console for debugging
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleRetry = (): void => {
    // Reset the error state to trigger a re-render
    this.setState({ hasError: false, error: null, errorInfo: null });
    // Reload the page to refresh the application
    window.location.reload();
  };

  public render(): ReactNode {
    if (this.state.hasError) {
      // If a fallback component is provided, use it
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Otherwise, render our default error component
      return (
        <div className="p-6 bg-slate-800 rounded-lg border border-red-800/50 shadow-lg">
          <div className="flex items-center gap-2 mb-4 text-red-400">
            <AlertTriangle className="h-6 w-6" />
            <h2 className="text-xl font-semibold">Something went wrong</h2>
          </div>
          <p className="text-gray-300 mb-4">
            An error occurred in the application. We're working to resolve this issue.
          </p>
          <div className="bg-slate-900 p-4 rounded-md text-gray-400 text-sm mb-4 max-h-32 overflow-auto">
            <p>{this.state.error?.toString()}</p>
            {this.state.errorInfo && (
              <pre className="mt-2 whitespace-pre-wrap text-xs">
                {this.state.errorInfo.componentStack}
              </pre>
            )}
          </div>
          <Button className="flex items-center" onClick={this.handleRetry}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
