'use client';

import { CodeExplainerProvider } from "@/contexts/code-explainer";
import { FC, PropsWithChildren } from "react";

export const Providers: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <CodeExplainerProvider>
      {children}
    </CodeExplainerProvider>
  );
}