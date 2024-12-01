import { explainCodeAction } from "@/actions/explain-code-action";
import { useAction } from "next-safe-action/hooks";
import { createContext, FC, PropsWithChildren, useCallback, useState } from "react";

export const CHARACTERES_LIMIT = 5000;

type Comment = {
  code: string;
  comment: string;
}

type Explanation = {
  programming_language: string;
  overview: string;
  comments: Comment[];
}

type CodeExplainerContextProps = {
  explanation: Explanation | null;
  isGeneratingExplanation: boolean;
  generateExplanation: (code: string) => Promise<void>;
  clearExplanation: () => void;
};

export const CodeExplainerContext = createContext<CodeExplainerContextProps>({
  explanation: null,
  isGeneratingExplanation: false,
  generateExplanation: async () => { },
  clearExplanation: () => { },
});

export const CodeExplainerProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const { executeAsync, isExecuting } = useAction(explainCodeAction);
  const [explanation, setExplanation] = useState<Explanation | null>(null);

  const generateExplanation = useCallback(async (code: string) => {
    if (!code) {
      alert("⚠️ Insira um código para gerar a explicação.");
      return;
    }

    if (code.length > CHARACTERES_LIMIT) {
      alert(`⚠️ Limite de caracteres excedido. Por favor, limite seu código a ${CHARACTERES_LIMIT} caracteres.`);
      return;
    }

    const result = await executeAsync({ code });

    if (!result?.data) {
      alert("❌ Erro ao gerar explicação do código, tente novamente.");
      return;
    }

    setExplanation(result.data.explanation as unknown as Explanation);
  }, []);

  const clearExplanation = useCallback(() => {
    setExplanation(null);
  }, []);

  return (
    <CodeExplainerContext.Provider value={{
      explanation,
      isGeneratingExplanation: isExecuting,
      generateExplanation,
      clearExplanation,
    }}>
      {children}
    </CodeExplainerContext.Provider>
  );
}