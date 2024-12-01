import { Code2 } from "lucide-react";

export const Logo = () => {
  return (
    <h1 className="text-4xl font-bold text-center mb-[80px] text-gray-300">
      <Code2 className="inline-block w-11 h-11 mr-3 text-violet-600" />
      Code <span className="border-b-4 border-b-violet-600">Explainer</span>
    </h1>
  );
}