import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import type { CapituloMeta } from '../types.js';
import { infoParadigma } from '../core/paradigma.js';

interface Props {
  capitulos: CapituloMeta[];
  /** ids de capítulos já concluídos (para o badge ✓). */
  concluidos?: number[];
  onSelecionar?: (id: number) => void;
}

/**
 * Menu de capítulos navegável por teclado.
 * Setas (ou j/k) movem; Enter seleciona. Mostra badge do paradigma,
 * cadeado para capítulos ainda não disponíveis e ✓ para concluídos.
 */
export function ChapterMenu({ capitulos, concluidos = [], onSelecionar }: Props) {
  const [indice, setIndice] = useState(0);

  useInput((input, key) => {
    if (key.upArrow || input === 'k') {
      setIndice((i) => (i - 1 + capitulos.length) % capitulos.length);
    } else if (key.downArrow || input === 'j') {
      setIndice((i) => (i + 1) % capitulos.length);
    } else if (key.return) {
      onSelecionar?.(capitulos[indice]!.id);
    }
  });

  return (
    <Box flexDirection="column">
      <Text bold>Escolha um capítulo:</Text>
      <Box flexDirection="column" marginTop={1}>
        {capitulos.map((cap, i) => {
          const selecionado = i === indice;
          const info = infoParadigma(cap.paradigma);
          const concluido = concluidos.includes(cap.id);
          const num = String(cap.id).padStart(2, '0');
          return (
            <Box key={cap.id}>
              <Text color={selecionado ? 'cyanBright' : undefined}>
                {selecionado ? '▶ ' : '  '}
              </Text>
              <Text dimColor={!selecionado}>{num} </Text>
              <Text color={info.cor}>{info.icone} </Text>
              <Text bold={selecionado} color={selecionado ? 'white' : undefined}>
                {cap.titulo}
              </Text>
              {concluido ? <Text color="green"> ✓</Text> : null}
              {!cap.disponivel ? <Text dimColor> 🔒</Text> : null}
            </Box>
          );
        })}
      </Box>
      <Box marginTop={1} flexDirection="column">
        <Text dimColor>
          Conceito em foco: {capitulos[indice]!.resumo}
        </Text>
        <Text dimColor>
          ↑/↓ navega · Enter seleciona · q sai · 🔒 = ainda não disponível
        </Text>
      </Box>
    </Box>
  );
}
