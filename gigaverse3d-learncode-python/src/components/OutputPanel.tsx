import React from 'react';
import { Box, Text } from 'ink';
import Spinner from 'ink-spinner';
import type { ResultadoExecucao } from '../core/pythonRunner.js';

interface Props {
  resultado: ResultadoExecucao | null;
  rodando: boolean;
}

/**
 * Painel de saída da execução. Mostra spinner enquanto roda; depois exibe
 * stdout, o traceback (stderr) com a linha do erro em destaque, e um rodapé
 * com código de saída e tempo.
 */
export function OutputPanel({ resultado, rodando }: Props) {
  if (rodando) {
    return (
      <Box borderStyle="round" borderColor="cyan" paddingX={1}>
        <Text color="cyan">
          <Spinner type="dots" />
        </Text>
        <Text> Executando python3…</Text>
      </Box>
    );
  }

  if (!resultado) {
    return (
      <Box borderStyle="round" borderColor="gray" paddingX={1}>
        <Text dimColor>Pressione [Enter] para rodar este programa.</Text>
      </Box>
    );
  }

  const sucesso = resultado.codigo === 0 && !resultado.timeout;
  const cor = sucesso ? 'green' : 'red';

  return (
    <Box flexDirection="column" borderStyle="round" borderColor={cor} paddingX={1}>
      <Text color={cor} bold>
        {sucesso ? '▶ saída' : resultado.timeout ? '⏱ tempo esgotado (10s)' : '▶ saída (com erro)'}
      </Text>

      {resultado.stdout ? (
        <Box flexDirection="column" marginTop={1}>
          {resultado.stdout.replace(/\n$/, '').split('\n').map((l, i) => (
            <Text key={i}>{l}</Text>
          ))}
        </Box>
      ) : null}

      {resultado.stderr ? (
        <Box flexDirection="column" marginTop={1}>
          {resultado.linhaErro ? (
            <Text color="redBright" bold>
              ⚠ erro perto da linha {resultado.linhaErro} — leia o traceback de baixo para cima:
            </Text>
          ) : null}
          {resultado.stderr.replace(/\n$/, '').split('\n').map((l, i) => (
            <Text key={i} color="red">
              {l}
            </Text>
          ))}
        </Box>
      ) : null}

      <Box marginTop={1}>
        <Text dimColor>
          código de saída: {resultado.codigo ?? '—'} · {resultado.duracaoMs} ms
        </Text>
      </Box>
    </Box>
  );
}
