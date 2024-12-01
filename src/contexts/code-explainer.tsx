import { explainCodeAction } from "@/actions/explain-code-action";
import { useAction } from "next-safe-action/hooks";
import { createContext, FC, PropsWithChildren, useCallback, useState } from "react";

const data = {
  "programming_language": "YAML",
  "overview": "Este código configura um workflow do GitHub Actions para publicar pacotes no NPM. Ele é acionado sempre que há um push para a branch principal (`main`) e realiza etapas como checkout do repositório, configuração do Node.js, instalação de dependências e publicação no NPM.",
  "comments": [
    {
      "code": "name: Release",
      "comment": "Define o nome do workflow como 'Release', facilitando a identificação deste fluxo no GitHub Actions. 🏷️"
    },
    {
      "code": "on:\n  push:\n    branches:\n      - main",
      "comment": "Especifica que o workflow será acionado automaticamente sempre que houver um push para a branch `main`. Isso garante que a publicação no NPM só aconteça em mudanças na branch principal. 🚀"
    },
    {
      "code": "jobs:\n  release:\n    name: Release\n    runs-on: ubuntu-latest",
      "comment": "Configura um job chamado 'Release' que será executado em um ambiente Ubuntu na versão mais recente disponível. Cada job é uma sequência de etapas a serem realizadas. 💻"
    },
    {
      "code": "- name: Checkout\n  uses: actions/checkout@v3",
      "comment": "A primeira etapa do job realiza o checkout do repositório, permitindo que os arquivos do código estejam disponíveis para as próximas etapas. Usa a ação oficial `actions/checkout`. 📂"
    },
    {
      "code": "- name: Setup Node.js\n  uses: actions/setup-node@v3\n  with:\n    node-version: 16\n    cache: 'npm'\n    cache-dependency-path: '**/package-lock.json'",
      "comment": "Configura o ambiente com Node.js na versão 16. Também habilita o cache para acelerar builds futuros, utilizando arquivos `package-lock.json` como referência para dependências. 🚀"
    },
    {
      "code": "- name: Install dependencies\n  run: npm ci",
      "comment": "Instala as dependências do projeto usando `npm ci`. Este comando garante que as dependências sejam instaladas exatamente conforme especificado no arquivo `package-lock.json`, garantindo reprodutibilidade. 📦"
    },
    {
      "code": "- name: Publish to NPM\n  id: changesets\n  uses: changesets/action@v1\n  with:\n    publish: npm run release\n  env:\n    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}\n    NPM_TOKEN: ${{ secrets.NPM_TOKEN }}",
      "comment": "Publica o pacote no NPM usando a ação `changesets/action`. O comando `npm run release` é chamado para executar o processo de publicação. Os tokens de autenticação necessários para o GitHub e o NPM são fornecidos por meio de variáveis secretas. 🔑"
    }
  ]
}

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