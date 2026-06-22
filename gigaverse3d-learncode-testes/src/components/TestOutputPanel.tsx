import React from 'react';
import { Box, Text } from 'ink';
import Spinner from 'ink-spinner';
import type { ResultadoTeste } from '../core/runner.js';

interface Props {
  resultado: ResultadoTeste | null;
  rodando: boolean;
  /** Rótulo do runner em execução, ex.: 'vitest'. */
  runner?: string;
}

/**
 * Painel de saída de uma rodada de testes. Mostra spinner enquanto roda; depois
 * exibe ✅/❌ por teste, um resumo (verde/vermelho) e o tempo. Quando há falhas,
 * mostra também a saída crua do runner para o aluno ler o erro.
 */
export function TestOutputPanel({ resultado, rodando, runner = 'vitest' }: Props) {
  if (rodando) {
    return (
      <Box borderStyle="round" borderColor="cyan" paddingX={1}>
        <Text color="cyan">
          <Spinner type="dots" />
        </Text>
        <Text> Rodando {runner}…</Text>
      </Box>
    );
  }

  if (!resultado) {
    return (
      <Box borderStyle="round" borderColor="gray" paddingX={1}>
        <Text dimColor>Pressione [Enter] para rodar esta suíte de testes.</Text>
      </Box>
    );
  }

  if (resultado.erro && resultado.total === 0) {
    return (
      <Box flexDirection="column" borderStyle="round" borderColor="yellow" paddingX={1}>
        <Text color="yellow">⚠ {resultado.erro}</Text>
      </Box>
    );
  }

  const cor = resultado.ok ? 'green' : 'red';

  return (
    <Box flexDirection="column" borderStyle="round" borderColor={cor} paddingX={1}>
      <Text color={cor} bold>
        {resultado.ok ? '✅ SUÍTE VERDE' : '❌ SUÍTE VERMELHA'} — {resultado.passou}/{resultado.total}{' '}
        passaram
        {resultado.falhou ? `, ${resultado.falhou} falharam` : ''}
      </Text>

      <Box flexDirection="column" marginTop={1}>
        {resultado.testes.map((t, i) => (
          <Text key={i} color={t.status === 'passou' ? 'green' : t.status === 'falhou' ? 'red' : 'gray'}>
            {t.status === 'passou' ? '✅' : t.status === 'falhou' ? '❌' : '⚪'} {t.nome}
          </Text>
        ))}
      </Box>

      {!resultado.ok && resultado.stderr ? (
        <Box flexDirection="column" marginTop={1}>
          <Text color="redBright" bold>
            saída do runner:
          </Text>
          {resultado.stderr
            .replace(/\n$/, '')
            .split('\n')
            .slice(-14)
            .map((l, i) => (
              <Text key={i} color="red">
                {l}
              </Text>
            ))}
        </Box>
      ) : null}

      <Box marginTop={1}>
        <Text dimColor>{resultado.duracaoMs} ms</Text>
      </Box>
    </Box>
  );
}
