import React from 'react';
import { Box, Text } from 'ink';
import Spinner from 'ink-spinner';
import type { ResultadoExecucao } from '../core/javaRunner.js';

interface Props {
  rodando: boolean;
  resultado: ResultadoExecucao | null;
}

/** Painel que mostra o spinner durante a execução e a saída real do Java depois. */
export function OutputPanel({ rodando, resultado }: Props): React.ReactElement {
  if (rodando) {
    return (
      <Box borderStyle="round" borderColor="yellow" paddingX={1}>
        <Text color="yellow">
          <Spinner type="dots" /> Compilando com javac e executando com java...
        </Text>
      </Box>
    );
  }

  if (!resultado) {
    return (
      <Box borderStyle="round" borderColor="gray" paddingX={1}>
        <Text dimColor>Pressione Enter para compilar e rodar este código.</Text>
      </Box>
    );
  }

  const corBorda = resultado.ok ? 'green' : 'red';
  const tituloEtapa = resultado.ok
    ? '✅ Saída do programa'
    : resultado.etapa === 'compilacao'
      ? '❌ Erro de compilação'
      : '❌ Erro em tempo de execução';

  return (
    <Box flexDirection="column" borderStyle="round" borderColor={corBorda} paddingX={1}>
      <Text color={corBorda} bold>
        {tituloEtapa} <Text dimColor>({resultado.duracaoMs} ms)</Text>
      </Text>

      {resultado.stdout.trim() !== '' && (
        <Box flexDirection="column" marginTop={1}>
          {resultado.stdout.replace(/\n$/, '').split('\n').map((l, i) => (
            <Text key={`o${i}`}>{l}</Text>
          ))}
        </Box>
      )}

      {resultado.stderr.trim() !== '' && (
        <Box flexDirection="column" marginTop={1}>
          <Text color="red" dimColor>
            — mensagens de erro —
          </Text>
          {resultado.stderr.replace(/\n$/, '').split('\n').map((l, i) => (
            <Text key={`e${i}`} color="red">
              {l}
            </Text>
          ))}
        </Box>
      )}

      {resultado.erro && (
        <Box marginTop={1}>
          <Text color="red">↳ {resultado.erro}</Text>
        </Box>
      )}
    </Box>
  );
}
