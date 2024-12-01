'use client';

import CodeMirror from "@uiw/react-codemirror";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { FC, useState } from "react";

type CodeEditorProps = {
  code: string;
  setCode: (code: string) => void;
  isDone: boolean;
  setIsDone: (isDone: boolean) => void;
}

export const CodeEditor: FC<CodeEditorProps> = ({ code, setCode, isDone, setIsDone }) => {
  return (
    <>
      <CodeMirror
        theme={dracula}
        basicSetup={{
          autocompletion: true,
          closeBrackets: true,
          lineNumbers: true,
          syntaxHighlighting: true,
          tabSize: 2,
          highlightActiveLine: false,
        }}
        value={code}
        onChange={(value) => setCode(value)}
        height="400px"
        autoFocus
        onFocus={() => setIsDone(true)}
        className="relative rounded-md overflow-hidden -mt-3 text-base"
        placeholder="// Digite ou cole seu código aqui..."
      />

      {!isDone && (
        <p className="text-base text-gray-300">
          Carregando editor de código...
        </p>
      )}
    </>
  );
}