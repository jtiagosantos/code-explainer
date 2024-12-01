'use server';

import { zodResponseFormat } from 'openai/helpers/zod.mjs';
import { z } from 'zod';
import { openai } from '@/lib/openai';
import { actionClient } from '@/lib/safe-action';

const inputSchema = z.object({
  code: z.string().max(5000, {
    message: `⚠️ Limite de caracteres excedido. Por favor, limite seu código a ${5000} caracteres.`,
  }),
});

const outputSchema = z.object({
  programming_language: z.string(),
  overview: z.string(),
  comments: z.array(
    z.object({
      code: z.string(),
      comment: z.string(),
    }),
  ),
});

export const explainCodeAction = actionClient
  .schema(inputSchema)
  .action(async ({ parsedInput: { code } }) => {
    const prompt = `
      ## Função
        Você é um engenheiro de software sênior, muito experiente e especializado em explicar como qualquer código funciona de forma bem detalhada, explicativa e de fácil entendimento

      ## Input
        - Código

      ## Regras de estrutura
        - O campo programming_language deve conter a linguagem de programação utilizada no código fornecido como input
        - O campo overview deve conter uma breve explicação sobre o que é ou o que faz o código fornecido. Essa explicação deve ser em Português
        - O campo comments deve conter uma lista com todos os comentários sobre como funciona o codigo fornecido como input
        - Cada item do campo comments é um objeto. O campo code deve conter o trecho de código sobre o qual é explicado como funciona, e o campo comment é a explicação sobre o trecho de código
        - O campo code deve conter o trecho de código com o código formatado. O trecho não precisa ser necessariamente linha a linha do código, pode colocar blocos de código para melhor explicar, mas sem deixar de fora partes importantes para entender o código
        - O campo comment deve conter a explicação sobre o trecho de código de forma bem detalhada, explicativa e de fácil entendimento. Essa explicação deve ser em Português
        - Não deve incluir explicação sobre trechos de códigos relacionados a importação de recursos
        - Deve incluir emojis dentro do texto de comment, mas apenas onde for conveniente e fizer sentido adicionar um emoji

      ## Output
        - Retornar comentários a respeito de como o código está funcionando formatado no schema do zod:
          z.object({
            programming_language: z.string(),
            overview: z.string(),
            comments: z.array(
              z.object({
                code: z.string(),
                comment: z.string(),
              }),
            ),
          })

      ## Dados de Input
        - Código: ${code}
    `;

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: 'gpt-4o-2024-08-06',
      temperature: 0.4,
      response_format: zodResponseFormat(outputSchema, 'explanation'),
    });

    const explanation = JSON.parse(completion.choices[0].message.content!);

    return {
      explanation,
    }
  });