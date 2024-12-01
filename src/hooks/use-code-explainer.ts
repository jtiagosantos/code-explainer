import { CodeExplainerContext } from "@/contexts/code-explainer";
import { useContext } from "react";

export const useCodeExplainer = () => {
  const context = useContext(CodeExplainerContext);

  if (!context) {
    throw new Error('useCodeExplainer must be used within a CodeExplainerProvider');
  }

  return context;
}