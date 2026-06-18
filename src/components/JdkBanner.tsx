import React from 'react';
import { Box, Text } from 'ink';
import type { ResultadoJdk } from '../core/jdkCheck.js';
import { INSTRUCAO_INSTALACAO_FEDORA } from '../core/jdkCheck.js';

/**
 * Faixa de status do JDK.
 * - Verde quando javac + java estão disponíveis (o app pode compilar e rodar Java).
 * - Amarela com instrução de instalação caso falte algo.
 */
export function JdkBanner({ jdk }: { jdk: ResultadoJdk }): React.ReactElement {
  if (jdk.ok) {
    return (
      <Box borderStyle="round" borderColor="green" paddingX={1}>
        <Text color="green">
          ✅ JDK detectado{jdk.versao ? ` (versão ${jdk.versao})` : ''} — pronto para compilar e
          rodar Java.
        </Text>
      </Box>
    );
  }

  return (
    <Box flexDirection="column" borderStyle="round" borderColor="yellow" paddingX={1}>
      <Text color="yellow">
        ⚠️ JDK não encontrado no PATH ({jdk.temJavac ? 'javac ok' : 'sem javac'},{' '}
        {jdk.temJava ? 'java ok' : 'sem java'}).
      </Text>
      <Text>
        Para compilar/rodar os exemplos, instale o JDK. No Fedora:
      </Text>
      <Text color="cyan"> {INSTRUCAO_INSTALACAO_FEDORA}</Text>
    </Box>
  );
}
