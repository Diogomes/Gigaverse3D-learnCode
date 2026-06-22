import React, { useEffect, useState } from 'react';
import { Box, Text, useApp, useInput } from 'ink';
import Spinner from 'ink-spinner';
import { Logo } from './components/Logo.js';
import { ModuleMenu } from './components/ModuleMenu.js';
import { ModuleView } from './components/ModuleView.js';
import { ProgressBar } from './components/ProgressBar.js';
import { CURRICULO } from './core/content.js';
import { verificarAmbiente, type AmbienteInfo } from './core/ambiente.js';
import { moduloDisponivel, carregarModulo } from './core/conteudo.js';
import { carregarProgresso, type Progresso } from './core/progress.js';
import type { Modulo } from './types.js';

type Estado =
  | { tela: 'verificando' }
  | { tela: 'sem-ambiente'; info: AmbienteInfo }
  | { tela: 'menu' }
  | { tela: 'carregando' }
  | { tela: 'indisponivel'; id: number }
  | { tela: 'modulo'; modulo: Modulo };

export function App() {
  const { exit } = useApp();
  const [estado, setEstado] = useState<Estado>({ tela: 'verificando' });
  const [ambiente, setAmbiente] = useState<AmbienteInfo | null>(null);
  const [progresso, setProgresso] = useState<Progresso>(() => carregarProgresso());

  useEffect(() => {
    const info = verificarAmbiente();
    setAmbiente(info);
    setEstado(info.pronto ? { tela: 'menu' } : { tela: 'sem-ambiente', info });
  }, []);

  async function selecionar(id: number) {
    if (!moduloDisponivel(id)) {
      setEstado({ tela: 'indisponivel', id });
      return;
    }
    setEstado({ tela: 'carregando' });
    const modulo = await carregarModulo(id);
    if (modulo) setEstado({ tela: 'modulo', modulo });
    else setEstado({ tela: 'indisponivel', id });
  }

  useInput((input, key) => {
    if (estado.tela === 'modulo') return; // ModuleView controla o teclado
    if (input === 'q' || (key.ctrl && input === 'c')) return exit();
    if (estado.tela === 'indisponivel' && (key.return || key.escape)) {
      setEstado({ tela: 'menu' });
    }
  });

  const itensMenu = CURRICULO.map((m) => ({ ...m, disponivel: moduloDisponivel(m.id) }));

  return (
    <Box flexDirection="column" padding={1}>
      {estado.tela !== 'modulo' && <Logo />}

      {estado.tela === 'verificando' && (
        <Text>
          <Text color="cyan">
            <Spinner type="dots" />
          </Text>{' '}
          Verificando o ambiente de testes…
        </Text>
      )}

      {estado.tela === 'sem-ambiente' && (
        <Box flexDirection="column">
          <Text color="red" bold>
            ✗ Ambiente de testes incompleto.
          </Text>
          <Box marginTop={1} flexDirection="column">
            {(estado.info.instrucao ?? '').split('\n').map((linha, i) => (
              <Text key={i} color={linha.trim().startsWith('npm') || linha.trim().startsWith('sudo') ? 'yellow' : undefined}>
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
          Carregando módulo…
        </Text>
      )}

      {(estado.tela === 'menu' || estado.tela === 'indisponivel') && (
        <Box flexDirection="column">
          {ambiente?.pronto && (
            <Text color="green">
              ✓ Node {ambiente.versaoNode} · Vitest pronto
              {ambiente.playwright ? ' · Playwright pronto' : ' · Playwright: pendente (E2E)'}.
            </Text>
          )}
          <Box marginTop={1}>
            <ProgressBar xp={progresso.xp} />
          </Box>
          <Box marginTop={1}>
            <ModuleMenu
              modulos={itensMenu}
              concluidos={progresso.concluidos}
              onSelecionar={selecionar}
            />
          </Box>
          {estado.tela === 'indisponivel' && (
            <Box marginTop={1} borderStyle="round" borderColor="yellow" paddingX={1}>
              <Text>
                🧪 O módulo {estado.id} ainda não está disponível — chega nas próximas fases.
                Pressione Enter para voltar.
              </Text>
            </Box>
          )}
        </Box>
      )}

      {estado.tela === 'modulo' && (
        <ModuleView
          modulo={estado.modulo}
          onSair={(p) => {
            if (p) setProgresso(p);
            setEstado({ tela: 'menu' });
          }}
        />
      )}
    </Box>
  );
}
