import React from 'react';
import { Box, Text } from 'ink';
import type { PerguntaQuiz } from '../types.js';

interface Props {
  pergunta: PerguntaQuiz;
  indiceAtual: number;
  total: number;
  /** Alternativa em foco (cursor). */
  escolhaIndex: number;
  /** true depois que o aluno confirmou a resposta. */
  respondida: boolean;
  acertos: number;
}

/** Componente presentacional do quiz: a navegação é controlada pelo ChapterView. */
export function Quiz({
  pergunta,
  indiceAtual,
  total,
  escolhaIndex,
  respondida,
  acertos,
}: Props): React.ReactElement {
  const acertou = respondida && escolhaIndex === pergunta.correta;

  return (
    <Box flexDirection="column">
      <Text dimColor>
        Pergunta {indiceAtual + 1}/{total} · Acertos: {acertos}
      </Text>
      <Box marginY={1}>
        <Text bold>{pergunta.pergunta}</Text>
      </Box>

      <Box flexDirection="column">
        {pergunta.opcoes.map((opcao, i) => {
          const emFoco = i === escolhaIndex;
          let cor: string | undefined;
          let prefixo = '  ';
          if (respondida) {
            if (i === pergunta.correta) {
              cor = 'green';
              prefixo = '✓ ';
            } else if (i === escolhaIndex) {
              cor = 'red';
              prefixo = '✗ ';
            }
          } else if (emFoco) {
            cor = 'cyan';
            prefixo = '❯ ';
          }
          return (
            <Text key={i} color={cor}>
              {prefixo}
              {String.fromCharCode(65 + i)}) {opcao}
            </Text>
          );
        })}
      </Box>

      {respondida && (
        <Box
          marginTop={1}
          borderStyle="round"
          borderColor={acertou ? 'green' : 'red'}
          paddingX={1}
          flexDirection="column"
        >
          <Text color={acertou ? 'green' : 'red'} bold>
            {acertou ? '✅ Correto!' : '❌ Não foi dessa vez.'}
          </Text>
          <Text>{pergunta.explicacao}</Text>
        </Box>
      )}

      <Box marginTop={1}>
        <Text dimColor>
          {respondida
            ? indiceAtual + 1 < total
              ? 'Enter → próxima pergunta'
              : 'Enter → concluir capítulo'
            : '↑/↓ escolher · Enter responder'}
        </Text>
      </Box>
    </Box>
  );
}
