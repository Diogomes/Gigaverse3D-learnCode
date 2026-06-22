import React, { useMemo } from 'react';
import { Box, Text } from 'ink';
import { readFileSync } from 'node:fs';
import { highlight } from 'cli-highlight';
import { caminhoExemplo } from '../core/paths.js';
import type { Anotacao } from '../types.js';

interface Props {
  arquivo: string;
  anotacoes: Anotacao[];
  /** Linha (base 1) atualmente em foco; sua nota é exibida abaixo. */
  linhaFoco?: number;
  /** Linguagem para o realce de sintaxe. */
  linguagem?: string;
}

/**
 * Mostra um arquivo de código com realce de sintaxe e numeração de linhas.
 * Linhas anotadas recebem um marcador; a linha em foco fica destacada e sua
 * nota aparece logo abaixo do código.
 */
export function CodeBlock({ arquivo, anotacoes, linhaFoco, linguagem = 'typescript' }: Props) {
  const linhas = useMemo(() => {
    let codigo: string;
    try {
      codigo = readFileSync(caminhoExemplo(arquivo), 'utf8');
    } catch {
      return [`(não consegui ler ${arquivo})`];
    }
    const realcado = highlight(codigo, { language: linguagem, ignoreIllegals: true });
    return realcado.replace(/\n$/, '').split('\n');
  }, [arquivo, linguagem]);

  const comNota = useMemo(() => new Set(anotacoes.map((a) => a.linha)), [anotacoes]);
  const notaFoco = anotacoes.find((a) => a.linha === linhaFoco);
  const larguraNum = String(linhas.length).length;

  return (
    <Box flexDirection="column">
      <Box flexDirection="column" borderStyle="round" borderColor="gray" paddingX={1}>
        {linhas.map((linha, i) => {
          const n = i + 1;
          const temNota = comNota.has(n);
          const foco = n === linhaFoco;
          const marcador = foco ? '▶' : temNota ? '•' : ' ';
          return (
            <Box key={n}>
              <Text color={foco ? 'yellowBright' : temNota ? 'yellow' : 'gray'}>{marcador} </Text>
              <Text dimColor>{String(n).padStart(larguraNum, ' ')} │ </Text>
              <Text>{linha}</Text>
            </Box>
          );
        })}
      </Box>

      {notaFoco ? (
        <Box marginTop={1} borderStyle="round" borderColor="yellow" paddingX={1}>
          <Text>
            <Text color="yellowBright" bold>
              linha {notaFoco.linha}:{' '}
            </Text>
            {notaFoco.nota}
          </Text>
        </Box>
      ) : (
        <Box marginTop={1}>
          <Text dimColor>Use ↑/↓ para percorrer as linhas comentadas (•).</Text>
        </Box>
      )}
    </Box>
  );
}
