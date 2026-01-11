import React from "react";
import { Fallback } from "./ui"; // UI component to show a friendly error screen

// Props for the ErrorBoundary component
interface ErrorBoundaryProps {
  children: React.ReactNode; // The child components to wrap
  onReset?: () => void; // Optional callback when user retries
}

// Internal state of the ErrorBoundary
interface ErrorBoundaryState {
  hasError: boolean; // Whether an error has been caught
  error?: Error; // The actual error object caught
}

/**
 * ErrorBoundary component catches JavaScript errors in its child component tree.
 * It prevents the entire app from crashing and allows showing a fallback UI.
 */
export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    // Initial state: no error
    this.state = { hasError: false, error: undefined };
  }

  /**
   * Update state when an error is thrown in children.
   * React calls this method automatically when a child throws.
   */
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  /**
   * Lifecycle method called after an error is caught.
   * Useful for logging errors to an external service.
   */
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    // Could integrate with Sentry, LogRocket, etc.
  }

  /**
   * Reset the error state, allowing the user to retry.
   * If an onReset callback is provided, call it; otherwise reload the page.
   */
  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });

    if (this.props.onReset) {
      this.props.onReset();
    } else {
      window.location.reload();
    }
  };

  render() {
    // If an error has occurred, show the fallback UI
    if (this.state.hasError) {
      return (
        <div role="alert" aria-live="assertive">
          <Fallback
            type="error"
            message={this.state.error?.message ?? "Something went wrong."}
            onRetry={this.handleRetry}
          />
        </div>
      );
    }

    // Otherwise, render children normally
    return this.props.children;
  }
}
