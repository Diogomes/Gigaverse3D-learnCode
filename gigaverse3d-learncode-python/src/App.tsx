import React, { useEffect, useState } from 'react';
import { Box, Text, useApp, useInput } from 'ink';
import Spinner from 'ink-spinner';
import { Logo } from './components/Logo.js';
import { ChapterMenu } from './components/ChapterMenu.js';
import { ChapterView } from './components/ChapterView.js';
import { ProgressBar } from './components/ProgressBar.js';
import { CURRICULO } from './core/content.js';
import { verificarPython, type PythonInfo } from './core/pythonCheck.js';
import { capituloDisponivel, carregarCapitulo } from './core/conteudo.js';
import { carregarProgresso, type Progresso } from './core/progress.js';
import type { Capitulo } from './types.js';

type Estado =
  | { tela: 'verificando' }
  | { tela: 'sem-python'; info: PythonInfo }
  | { tela: 'menu' }
  | { tela: 'carregando' }
  | { tela: 'indisponivel'; id: number }
  | { tela: 'capitulo'; capitulo: Capitulo };

export function App() {
  const { exit } = useApp();
  const [estado, setEstado] = useState<Estado>({ tela: 'verificando' });
  const [python, setPython] = useState<PythonInfo | null>(null);
  const [progresso, setProgresso] = useState<Progresso>(() => carregarProgresso());

  useEffect(() => {
    verificarPython().then((info) => {
      setPython(info);
      setEstado(info.disponivel ? { tela: 'menu' } : { tela: 'sem-python', info });
    });
  }, []);

  async function selecionar(id: number) {
    if (!capituloDisponivel(id)) {
      setEstado({ tela: 'indisponivel', id });
      return;
    }
    setEstado({ tela: 'carregando' });
    const capitulo = await carregarCapitulo(id);
    if (capitulo) setEstado({ tela: 'capitulo', capitulo });
    else setEstado({ tela: 'indisponivel', id });
  }

  useInput((input, key) => {
    if (estado.tela === 'capitulo') return; // ChapterView controla o teclado
    if (input === 'q' || (key.ctrl && input === 'c')) return exit();
    if (estado.tela === 'indisponivel' && (key.return || key.escape)) {
      setEstado({ tela: 'menu' });
    }
  });

  const itensMenu = CURRICULO.map((c) => ({ ...c, disponivel: capituloDisponivel(c.id) }));

  return (
    <Box flexDirection="column" padding={1}>
      {estado.tela !== 'capitulo' && <Logo />}

      {estado.tela === 'verificando' && (
        <Text>
          <Text color="cyan">
            <Spinner type="dots" />
          </Text>{' '}
          Procurando o interpretador Python 3…
        </Text>
      )}

      {estado.tela === 'sem-python' && (
        <Box flexDirection="column">
          <Text color="red" bold>
            ✗ Python 3 não encontrado no PATH.
          </Text>
          <Box marginTop={1} flexDirection="column">
            {(estado.info.instrucaoInstalacao ?? '').split('\n').map((linha, i) => (
              <Text key={i} color={linha.trim().startsWith('sudo') ? 'yellow' : undefined}>
                {linha}
              </Text>
            ))}
          </Box>
          <Text dimColor>Pressione q para sair.</Text>
        </Box>
      )}

      {estado.tela === 'carregando' && (
        <Text>
          <Text color="cyan">
            <Spinner type="dots" />
          </Text>{' '}
          Carregando capítulo…
        </Text>
      )}

      {(estado.tela === 'menu' || estado.tela === 'indisponivel') && (
        <Box flexDirection="column">
          {python?.versao && (
            <Text color="green">
              ✓ Python {python.versao} detectado ({python.comando}).
            </Text>
          )}
          <Box marginTop={1}>
            <ProgressBar xp={progresso.xp} />
          </Box>
          <Box marginTop={1}>
            <ChapterMenu
              capitulos={itensMenu}
              concluidos={progresso.concluidos}
              onSelecionar={selecionar}
            />
          </Box>
          {estado.tela === 'indisponivel' && (
            <Box marginTop={1} borderStyle="round" borderColor="yellow" paddingX={1}>
              <Text>
                📚 O capítulo {estado.id} ainda não está disponível — chega nas próximas fases.
                Pressione Enter para voltar.
              </Text>
            </Box>
          )}
        </Box>
      )}

      {estado.tela === 'capitulo' && (
        <ChapterView
          capitulo={estado.capitulo}
          comandoPython={python?.comando ?? 'python3'}
          onSair={(p) => {
            if (p) setProgresso(p);
            setEstado({ tela: 'menu' });
          }}
        />
      )}
    </Box>
  );
}
