'use client'

import { useEffect, useRef } from 'react'
import Prism from 'prismjs'
import 'prismjs/components/prism-css'

interface CodeInputProps {
  code: string
  setCode: (code: string) => void
}

export default function CodeInput({ code, setCode }: CodeInputProps) {
  const codeRef = useRef<HTMLPreElement>(null)

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current)
    }
  }, [code])

  useEffect(() => {
    if (codeRef.current) {
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(codeRef.current);
      range.collapse(false);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }, [code]);

  const handleInput = (event: React.FormEvent<HTMLPreElement>) => {
    const content = event.currentTarget.innerText || '';
    setCode(content);
  };

  return (
    <div className="relative bg-[##1a1d20] rounded-md overflow-hidden -mt-3">
      <pre
        ref={codeRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        className="w-full h-[300px] p-4 font-mono text-sm bg-[#1A1D20] text-gray-400 outline-none overflow-auto whitespace-pre-wrap break-words"
        style={{ tabSize: 2 }}
      >
        {code || '// Digite ou cole seu código aqui...'}
      </pre>
    </div>
  )
}

