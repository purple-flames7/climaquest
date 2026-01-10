import { Suspense } from "react";
import type { FC, ReactNode } from "react";
import { PageLoader } from "./page-loader";

interface LoadableProps {
  children: ReactNode;
}

export const Loadable: FC<LoadableProps> = ({ children }) => (
  <Suspense
    fallback={
      <div
        className="flex flex-col items-center justify-center min-h-screen text-center"
        role="status"
        aria-busy="true"
      >
        <PageLoader />
        <p className="mt-4 text-text-muted">Loading content…</p>
      </div>
    }
  >
    {children}
  </Suspense>
);
