'use client';

import { useCodeExplainer } from "@/hooks/use-code-explainer";
import { Code2, FileCode2, ScrollText, Settings, X } from "lucide-react";

export const CodeExplanation = () => {
  const { explanation, clearExplanation } = useCodeExplainer();

  return (
    <div className="max-w-[800px] w-full mx-auto">
      <div className="w-fit ml-auto">
        <button
          onClick={clearExplanation}
          className="text-sm text-gray-400 border border-gray-400 rounded-md p-1 px-2 flex items-center"
        >
          <Code2 className="w-[18px] h-[18px] mr-1" />
          Novo Código
        </button>
      </div>

      <div className="mt-10">
        <h2 className="text-[17px] font-medium text-left text-gray-300">
          <Settings className="inline-block w-[23px] h-[23px] mr-3 text-violet-600" />
          Linguagem: {explanation!.programming_language}
        </h2>
      </div>

      <div className="my-10">
        <h2 className="text-[17px] font-medium text-left text-gray-300">
          <FileCode2 className="inline-block w-[23px] h-[23px] mr-3 text-violet-600" />
          Visão Geral
        </h2>
        <p className="text-[17px] text-gray-300 leading-7 tracking-wide mt-2">{explanation!.overview}</p>
      </div>

      <div>
        <h2 className="text-[17px] font-medium text-left text-gray-300">
          <ScrollText className="inline-block w-[23px] h-[23px] mr-3 text-violet-600" />
          Explicação
        </h2>
        {explanation!.comments.map((comment, index) => (
          <div className="mb-8" key={index}>
            <div key={index} className="bg-[#1A1D20] p-3 mt-4 rounded-md">
              <code className="text-base text-gray-300 block whitespace-pre-wrap">{comment.code}</code>
            </div>
            <p className="text-base text-gray-300 mt-2">{comment.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}