import React from 'react';
import { Box, Text } from 'ink';
import Gradient from 'ink-gradient';
import BigText from 'ink-big-text';

/** Cabeçalho do app: logo em gradiente + subtítulo. */
export function Logo() {
  return (
    <Box flexDirection="column" alignItems="center" marginBottom={1}>
      <Gradient name="vice">
        <BigText text="learnCode" font="tiny" />
      </Gradient>
      <Text>
        <Text color="#34d399">🐍 Gigaverse3D</Text>
        <Text dimColor> learnCode: </Text>
        <Text color="#facc15" bold>
          python
        </Text>
      </Text>
      <Text dimColor italic>
        Pense em Python (2ª ed.) + Módulo Funcional · roda Python de verdade
      </Text>
    </Box>
  );
}
