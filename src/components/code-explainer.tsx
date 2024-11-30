'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import CodeInput from './code-input'
import { Code2, BookOpen, Wand2 } from 'lucide-react'

export default function CodeExplainer() {
  const [code, setCode] = useState('')
  const [explanation, setExplanation] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  const handleExplain = async () => {
    setIsProcessing(true)
    // Simular o processamento do código
    await new Promise(resolve => setTimeout(resolve, 2000))
    setExplanation(`Explicação simulada para o código:\n\n${code}`)
    setIsProcessing(false)
  }

  return (
    <Card className="w-full max-w-4xl mx-auto bg-transparent border-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base text-gray-300 tracking-wide font-normal">
          <Code2 className="w-6 h-6" strokeWidth={1.5} />
          Insira seu código e obtenha uma explicação detalhada
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CodeInput code={code} setCode={setCode} />
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleExplain}
          disabled={!code.trim() || isProcessing}
          className="w-full bg-violet-600 hover:brightness-75 cursor-pointer transition-all duration-300 font-semibold"
        >
          <Wand2 className="w-4 h-4" />
          {isProcessing ? 'Processando...' : 'Explicar Código'}
        </Button>
      </CardFooter>
    </Card>
  )
}
