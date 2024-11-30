import CodeExplainer from "@/components/code-explainer";
import { Code2 } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen bg-[#0A0D10]">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-[80px] text-gray-300">
          <Code2 className="inline-block w-11 h-11 mr-3 text-violet-600" />
          Code <span className="border-b-4 border-b-violet-600">Explainer</span>
        </h1>

        <CodeExplainer />
      </main>
    </div>
  );
}