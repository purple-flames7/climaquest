import { Suspense } from "react";
import type { FC, ReactNode } from "react";
import { PageLoader } from "./page-loader"; // Spinner / loader component

// Props for the Loadable component
interface LoadableProps {
  children: ReactNode; // Components that will be lazily loaded
}

/**
 * Loadable wraps any component that uses React.lazy or Suspense.
 * It displays a fallback UI while the component is being loaded.
 */
export const Loadable: FC<LoadableProps> = ({ children }) => (
  <Suspense
    fallback={
      // Fallback UI while content is loading
      <div
        className="flex flex-col items-center justify-center min-h-screen text-center"
        role="status" // Accessibility: informs assistive tech that a process is ongoing
        aria-busy="true" // Indicates the region is loading
      >
        <PageLoader />
        <p className="mt-4 text-text-muted">Loading content…</p>
      </div>
    }
  >
    {children} {/* Render children once loaded */}
  </Suspense>
);
