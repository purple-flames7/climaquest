import React from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so next render shows the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Optional: Log to monitoring service
    console.error(" Error caught by ErrorBoundary:", error, errorInfo);
  }

  handleReset = (): void => {
    // Optional reset logic (you can also reload)
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-emerald-100 to-teal-200 text-gray-800 text-center p-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-8 max-w-md">
            <h1 className="text-3xl font-semibold mb-4 text-emerald-800">
              Oops! Something went wrong
            </h1>
            <p className="text-base mb-6 text-gray-700">
              We hit a small snag while running the quiz. Don’t worry — you can
              try refreshing or restarting the game.
            </p>
            <button
              onClick={this.handleReset}
              className="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg shadow-md transition"
            >
              Refresh Game
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
