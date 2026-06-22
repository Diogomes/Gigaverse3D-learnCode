import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import type { ModuloMeta } from '../types.js';
import { infoCamada } from '../core/camada.js';

interface Props {
  modulos: ModuloMeta[];
  /** ids de módulos já concluídos (para o badge ✓). */
  concluidos?: number[];
  onSelecionar?: (id: number) => void;
}

/**
 * Menu de módulos navegável por teclado.
 * Setas (ou j/k) movem; Enter seleciona. Mostra badge da camada da pirâmide,
 * cadeado para módulos ainda não disponíveis e ✓ para concluídos.
 */
export function ModuleMenu({ modulos, concluidos = [], onSelecionar }: Props) {
  const [indice, setIndice] = useState(0);

  useInput((input, key) => {
    if (key.upArrow || input === 'k') {
      setIndice((i) => (i - 1 + modulos.length) % modulos.length);
    } else if (key.downArrow || input === 'j') {
      setIndice((i) => (i + 1) % modulos.length);
    } else if (key.return) {
      onSelecionar?.(modulos[indice]!.id);
    }
  });

  return (
    <Box flexDirection="column">
      <Text bold>Escolha um módulo:</Text>
      <Box flexDirection="column" marginTop={1}>
        {modulos.map((mod, i) => {
          const selecionado = i === indice;
          const info = infoCamada(mod.camada);
          const concluido = concluidos.includes(mod.id);
          const num = String(mod.id).padStart(2, '0');
          return (
            <Box key={mod.id}>
              <Text color={selecionado ? 'cyanBright' : undefined}>
                {selecionado ? '▶ ' : '  '}
              </Text>
              <Text dimColor={!selecionado}>{num} </Text>
              <Text color={info.cor}>{info.icone} </Text>
              <Text bold={selecionado} color={selecionado ? 'white' : undefined}>
                {mod.titulo}
              </Text>
              {concluido ? <Text color="green"> ✓</Text> : null}
              {!mod.disponivel ? <Text dimColor> 🔒</Text> : null}
            </Box>
          );
        })}
      </Box>
      <Box marginTop={1} flexDirection="column">
        <Text dimColor>Conceito em foco: {modulos[indice]!.resumo}</Text>
        <Text dimColor>↑/↓ navega · Enter seleciona · q sai · 🔒 = ainda não disponível</Text>
      </Box>
    </Box>
  );
}
