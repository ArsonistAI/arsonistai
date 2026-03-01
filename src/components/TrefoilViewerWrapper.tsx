"use client";

import dynamic from "next/dynamic";
import React from "react";

const TrefoilViewer = dynamic(() => import("@/components/TrefoilViewer"), {
  ssr: false,
  loading: () => <Placeholder />,
});

function Placeholder() {
  return <div className="w-full aspect-square max-h-[700px]" />;
}

const MAX_RETRIES = 2;

interface ErrorBoundaryState {
  hasError: boolean;
  retryCount: number;
}

class TrefoilErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  private retryTimeout: ReturnType<typeof setTimeout> | null = null;

  state: ErrorBoundaryState = { hasError: false, retryCount: 0 };

  static getDerivedStateFromError(): Partial<ErrorBoundaryState> {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn("[TrefoilViewer] caught error:", error.message);
    if (this.state.retryCount < MAX_RETRIES) {
      this.retryTimeout = setTimeout(() => {
        this.setState((prev) => ({
          hasError: false,
          retryCount: prev.retryCount + 1,
        }));
      }, 2000);
    }
  }

  componentWillUnmount() {
    if (this.retryTimeout) clearTimeout(this.retryTimeout);
  }

  render() {
    if (this.state.hasError) {
      return <Placeholder />;
    }
    return this.props.children;
  }
}

export default function TrefoilViewerWrapper() {
  return (
    <TrefoilErrorBoundary>
      <TrefoilViewer />
    </TrefoilErrorBoundary>
  );
}
