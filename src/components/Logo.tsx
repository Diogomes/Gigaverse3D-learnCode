import React from 'react';
import { Box, Text } from 'ink';
import Gradient from 'ink-gradient';
import BigText from 'ink-big-text';

/** Logo de abertura: "GIGAVERSE3D" em letras grandes com gradiente. */
export function Logo(): React.ReactElement {
  return (
    <Box flexDirection="column" alignItems="center" marginBottom={1}>
      <Gradient name="pastel">
        <BigText text="learnCode" font="block" />
      </Gradient>
      <Gradient name="cristal">
        <Text>Gigaverse3D · learnCode: java</Text>
      </Gradient>
      <Text dimColor>Curso interativo de Java · Deitel 10ª ed. · 25 capítulos</Text>
    </Box>
  );
}
