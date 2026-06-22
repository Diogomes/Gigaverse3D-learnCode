import React from 'react';
import { Box, Text } from 'ink';
import Gradient from 'ink-gradient';
import BigText from 'ink-big-text';

/** Cabeçalho do app: logo em gradiente + subtítulo. */
export function Logo() {
  return (
    <Box flexDirection="column" alignItems="center" marginBottom={1}>
      <Gradient name="summer">
        <BigText text="learnCode" font="tiny" />
      </Gradient>
      <Text>
        <Text color="#34d399">🧪 Gigaverse3D</Text>
        <Text dimColor> learnCode: </Text>
        <Text color="#22d3ee" bold>
          testes
        </Text>
      </Text>
      <Text dimColor italic>
        A pirâmide de testes · Vitest · Supertest · Playwright · roda testes de verdade
      </Text>
    </Box>
  );
}
