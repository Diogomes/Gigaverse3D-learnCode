import React from 'react';
import { Box, Text } from 'ink';
import { nivelDoXp, progressoNivel } from '../core/progress.js';

interface Props {
  xp: number;
  largura?: number;
}

/** Barra de XP/nível: ███░░░ com o XP acumulado dentro do nível atual. */
export function ProgressBar({ xp, largura = 20 }: Props) {
  const nivel = nivelDoXp(xp);
  const { atual, total } = progressoNivel(xp);
  const preenchido = Math.round((atual / total) * largura);
  const barra = '█'.repeat(preenchido) + '░'.repeat(largura - preenchido);

  return (
    <Text>
      <Text color="greenBright" bold>
        Nível {nivel}
      </Text>
      <Text> </Text>
      <Text color="green">{barra}</Text>
      <Text dimColor>
        {' '}
        {atual}/{total} XP · total {xp}
      </Text>
    </Text>
  );
}
