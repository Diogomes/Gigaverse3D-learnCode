import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import type { PerguntaQuiz } from '../types.js';

interface Props {
  perguntas: PerguntaQuiz[];
  /** Chamado quando todas as perguntas foram respondidas. */
  onConcluir: (acertos: number) => void;
}

/** Quiz de múltipla escolha com explicação após cada resposta. */
export function Quiz({ perguntas, onConcluir }: Props) {
  const [indice, setIndice] = useState(0);
  const [selecionado, setSelecionado] = useState(0);
  const [respondido, setRespondido] = useState(false);
  const [acertos, setAcertos] = useState(0);

  const pergunta = perguntas[indice]!;

  useInput((input, key) => {
    if (!respondido) {
      if (key.upArrow || input === 'k') {
        setSelecionado((s) => (s - 1 + pergunta.opcoes.length) % pergunta.opcoes.length);
      } else if (key.downArrow || input === 'j') {
        setSelecionado((s) => (s + 1) % pergunta.opcoes.length);
      } else if (key.return) {
        setRespondido(true);
        if (selecionado === pergunta.correta) setAcertos((a) => a + 1);
      }
      return;
    }

    // já respondeu: Enter avança
    if (key.return) {
      if (indice + 1 < perguntas.length) {
        setIndice((i) => i + 1);
        setSelecionado(0);
        setRespondido(false);
      } else {
        onConcluir(acertos);
      }
    }
  });

  return (
    <Box flexDirection="column">
      <Text dimColor>
        Pergunta {indice + 1} de {perguntas.length}
      </Text>
      <Text bold>{pergunta.pergunta}</Text>
      <Box flexDirection="column" marginTop={1}>
        {pergunta.opcoes.map((opcao, i) => {
          const escolhida = i === selecionado;
          let cor: string | undefined;
          let marca = escolhida ? '▶' : ' ';
          if (respondido) {
            if (i === pergunta.correta) {
              cor = 'green';
              marca = '✓';
            } else if (i === selecionado) {
              cor = 'red';
              marca = '✗';
            }
          }
          return (
            <Text key={i} color={cor} bold={escolhida && !respondido}>
              {marca} {opcao}
            </Text>
          );
        })}
      </Box>

      {respondido ? (
        <Box marginTop={1} flexDirection="column">
          <Text color={selecionado === pergunta.correta ? 'green' : 'red'}>
            {selecionado === pergunta.correta ? '✓ Correto!' : '✗ Não foi dessa vez.'}
          </Text>
          <Text dimColor>{pergunta.explicacao}</Text>
          <Text dimColor>
            [Enter] {indice + 1 < perguntas.length ? 'próxima pergunta' : 'finalizar quiz'}
          </Text>
        </Box>
      ) : (
        <Box marginTop={1}>
          <Text dimColor>↑/↓ escolhe · Enter responde</Text>
        </Box>
      )}
    </Box>
  );
}
