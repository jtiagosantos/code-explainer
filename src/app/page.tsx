'use client';

import { CodeExplainer } from "@/components/code-explainer";
import { useCodeExplainer } from "@/hooks/use-code-explainer";
import BubbleAnimation from "@/assets/bubble-animation.svg";
import { CodeExplanation } from "@/components/code-explanation";
import { Logo } from "@/components/logo";

export default function Page() {
  const { isGeneratingExplanation, explanation } = useCodeExplainer();

  return (
    <div className="min-h-screen bg-[#0A0D10]">
      <main className="container mx-auto px-4 py-8">
        <Logo />

        {isGeneratingExplanation ? (
          <div className="w-fit mx-auto mt-[200px] flex flex-col items-center justify-center gap-10">
            <BubbleAnimation />
            <p className="text-violet-600 font-medium tracking-wide">Estamos gerando a explicação do seu código, aguarde...</p>
          </div>
        ) : (
          <>
            {!explanation ? <CodeExplainer /> : <CodeExplanation />}
          </>
        )}
      </main>
    </div>
  );
}