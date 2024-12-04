'use client'

import { FC, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { CircleAlert, Code2, KeyRound, Wand2 } from 'lucide-react'
import { useCodeExplainer } from '@/hooks/use-code-explainer'
import { CodeEditor } from './code-editor'
import { CHARACTERES_LIMIT } from '@/contexts/code-explainer'

type CodeExplainerProps = {
  isSigned: boolean;
}

export const CodeExplainer: FC<CodeExplainerProps> = ({ isSigned }) => {
  const [code, setCode] = useState('');
  const [isCodeEditorDone, setIsCodeEditorDone] = useState(false);
  const { generateExplanation } = useCodeExplainer();

  return (
    <>
      <Card className="w-full max-w-4xl mx-auto bg-transparent border-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base text-gray-300 tracking-wide font-normal">
            <Code2 className="w-6 h-6" strokeWidth={1.5} />
            Insira seu código e obtenha uma explicação detalhada
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CodeEditor
            code={code}
            setCode={setCode}
            isDone={isCodeEditorDone}
            setIsDone={setIsCodeEditorDone}
          />

          {isCodeEditorDone && (
            <>
              <p className="text-sm text-gray-300 mt-1">
                {code.length}/{CHARACTERES_LIMIT} caracteres
              </p>
              {code.length > CHARACTERES_LIMIT && (
                <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                  <CircleAlert className="w-4 h-4" strokeWidth={1.5} />
                  Limite de caracteres excedido. Por favor, limite seu código a {CHARACTERES_LIMIT} caracteres.
                </p>
              )}
            </>
          )}
        </CardContent>
        <CardFooter>
          {isSigned ? (
            <Button
              onClick={() => generateExplanation(code.trim())}
              disabled={!code.trim() || code.length > CHARACTERES_LIMIT}
              className="w-full bg-violet-600 hover:brightness-75 cursor-pointer transition-all duration-300 font-semibold"
            >
              <Wand2 className="w-4 h-4" />
              Explicar Código
            </Button>
          ) : (
            <Button
              className="w-full bg-violet-600 hover:brightness-75 cursor-pointer transition-all duration-300 font-semibold"
            >
              <KeyRound className="w-4 h-4" />
              Fazer Autenticação
            </Button>
          )}
        </CardFooter>
      </Card>
    </>
  )
}
