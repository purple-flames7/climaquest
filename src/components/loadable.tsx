import { Suspense } from "react";
import type { FC, ReactNode } from "react";

interface LoadableProps {
  children: ReactNode;
}

export const Loadable: FC<LoadableProps> = ({ children }) => (
  <Suspense
    fallback={
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "1.2rem",
        }}
      >
        Loading...
      </div>
    }
  >
    {children}
  </Suspense>
);
