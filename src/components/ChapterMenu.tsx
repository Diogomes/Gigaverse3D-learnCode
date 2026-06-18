import React, { useState } from 'react';
import { Box, Text } from 'ink';
import SelectInput from 'ink-select-input';
import type { CapituloMeta, Progresso } from '../types.js';
import { capituloDesbloqueado, nivel } from '../core/progress.js';

interface ItemCapitulo {
  label: string;
  value: number;
  meta: CapituloMeta;
  desbloqueado: boolean;
  concluido: boolean;
}

interface Props {
  capitulos: CapituloMeta[];
  progresso: Progresso;
  /** Chamado quando o aluno escolhe um capítulo. */
  onSelecionar?: (id: number) => void;
}

/** Ícone de status à esquerda de cada capítulo. */
function statusIcone(it: ItemCapitulo): string {
  if (it.concluido) return '✅';
  if (it.desbloqueado) return '▶ ';
  return '🔒';
}

/** Renderiza cada linha da lista de capítulos. */
function ItemRender({ isSelected, label }: { isSelected?: boolean; label: string }) {
  return <Text color={isSelected ? 'cyan' : undefined}>{label}</Text>;
}

export function ChapterMenu({ capitulos, progresso, onSelecionar }: Props): React.ReactElement {
  const items: ItemCapitulo[] = capitulos.map((meta) => {
    const concluido = progresso.capitulosConcluidos.includes(meta.id);
    const desbloqueado = capituloDesbloqueado(meta.id, progresso);
    const num = String(meta.id).padStart(2, '0');
    const label = `${statusIcone({ meta, desbloqueado, concluido } as ItemCapitulo)} Cap. ${num} — ${meta.titulo}`;
    return { label, value: meta.id, meta, desbloqueado, concluido };
  });

  const [focado, setFocado] = useState<ItemCapitulo | undefined>(items[0]);

  const concluidos = progresso.capitulosConcluidos.length;
  const total = capitulos.length;

  return (
    <Box flexDirection="column">
      {/* Barra de progresso / gamificação */}
      <Box justifyContent="space-between" marginBottom={1}>
        <Text>
          <Text color="magenta">Nível {nivel(progresso.xp)}</Text>
          {'  '}
          <Text color="yellow">{progresso.xp} XP</Text>
          {'  '}
          <Text color="green">🏅 {progresso.badges.length} badges</Text>
        </Text>
        <Text dimColor>
          {concluidos}/{total} capítulos concluídos
        </Text>
      </Box>

      {concluidos === total && (
        <Box marginBottom={1} borderStyle="double" borderColor="green" paddingX={1} flexDirection="column">
          <Text color="green" bold>
            🎉 Parabéns! Você concluiu os {total} capítulos do curso de Java!
          </Text>
          <Text dimColor>
            Nível {nivel(progresso.xp)} · {progresso.xp} XP · {progresso.badges.length} badges conquistadas.
          </Text>
        </Box>
      )}

      <Box>
        <Text bold>Escolha um capítulo:</Text>
      </Box>

      <SelectInput
        items={items}
        limit={12}
        itemComponent={ItemRender}
        onHighlight={(it) => setFocado(it as ItemCapitulo)}
        onSelect={(it) => onSelecionar?.((it as ItemCapitulo).value)}
      />

      {/* Painel de detalhe do capítulo focado */}
      {focado && (
        <Box flexDirection="column" marginTop={1} borderStyle="round" borderColor="blue" paddingX={1}>
          <Text bold color="blue">
            Cap. {focado.meta.id} — {focado.meta.titulo}
          </Text>
          {focado.meta.foco && (
            <Text>
              💡 Conceito em foco: <Text color="cyan">{focado.meta.foco}</Text>
            </Text>
          )}
          <Text dimColor>
            {focado.concluido
              ? 'Status: concluído ✅'
              : focado.desbloqueado
                ? 'Status: disponível ▶'
                : 'Status: bloqueado 🔒 (conclua o capítulo anterior)'}
          </Text>
        </Box>
      )}

      <Box marginTop={1}>
        <Text dimColor>↑/↓ navegar · Enter selecionar · Ctrl+C sair</Text>
      </Box>
    </Box>
  );
}
