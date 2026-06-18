import React, { useMemo } from 'react';
import { Box, Text } from 'ink';
import { highlight } from 'cli-highlight';
import type { AnotacaoLinha } from '../types.js';

interface Props {
  /** Código-fonte completo (texto). */
  codigo: string;
  /** Anotações por linha. */
  anotacoes: AnotacaoLinha[];
  /** Índice da anotação em foco (na lista `anotacoes`), ou -1 para nenhuma. */
  focoIndex: number;
  /** Linguagem para o realce (padrão: java). */
  linguagem?: string;
}

/**
 * Mostra o código com realce de sintaxe e numeração.
 * A linha anotada em foco recebe um marcador ▸ e a sua nota aparece
 * num painel ao lado/abaixo.
 */
export function CodeBlock({ codigo, anotacoes, focoIndex, linguagem = 'java' }: Props): React.ReactElement {
  const linhasRealce = useMemo(() => {
    const realcado = highlight(codigo, { language: linguagem, ignoreIllegals: true });
    return realcado.split('\n');
  }, [codigo, linguagem]);

  const linhasAnotadas = new Set(anotacoes.map((a) => a.linha));
  const linhaFocada = focoIndex >= 0 && focoIndex < anotacoes.length ? anotacoes[focoIndex].linha : -1;
  const notaFocada = focoIndex >= 0 && focoIndex < anotacoes.length ? anotacoes[focoIndex].nota : null;

  const largura = String(linhasRealce.length).length;

  return (
    <Box flexDirection="column">
      <Box flexDirection="column" borderStyle="round" borderColor="gray" paddingX={1}>
        {linhasRealce.map((linhaTexto, i) => {
          const numero = i + 1;
          const temAnotacao = linhasAnotadas.has(numero);
          const focada = numero === linhaFocada;
          const marcador = focada ? '▸' : temAnotacao ? '◆' : ' ';
          const corMarcador = focada ? 'cyan' : temAnotacao ? 'yellow' : 'gray';
          return (
            <Box key={i}>
              <Text color={corMarcador}>{marcador} </Text>
              <Text dimColor={!focada}>{String(numero).padStart(largura, ' ')} │ </Text>
              <Text backgroundColor={focada ? 'blackBright' : undefined}>{linhaTexto}</Text>
            </Box>
          );
        })}
      </Box>

      {notaFocada && (
        <Box marginTop={1} borderStyle="round" borderColor="cyan" paddingX={1} flexDirection="column">
          <Text color="cyan" bold>
            📝 Linha {linhaFocada}
          </Text>
          <Text>{notaFocada}</Text>
        </Box>
      )}
    </Box>
  );
}
