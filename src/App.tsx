import React, { useEffect, useState } from 'react';
import { Box, Text, useApp, useInput } from 'ink';
import Spinner from 'ink-spinner';
import { Logo } from './components/Logo.js';
import { JdkBanner } from './components/JdkBanner.js';
import { ChapterMenu } from './components/ChapterMenu.js';
import { ChapterView } from './components/ChapterView.js';
import { checarJdk, type ResultadoJdk } from './core/jdkCheck.js';
import { carregarProgresso, concluirCapitulo, capituloDesbloqueado } from './core/progress.js';
import { listarCapitulos, carregarCapitulo } from './core/content.js';
import type { Capitulo, Progresso } from './types.js';

type Tela = 'menu' | 'capitulo';

export function App(): React.ReactElement {
  const { exit } = useApp();
  const [jdk, setJdk] = useState<ResultadoJdk | null>(null);
  const [progresso, setProgresso] = useState<Progresso>(() => carregarProgresso());
  const [tela, setTela] = useState<Tela>('menu');
  const [capituloAtual, setCapituloAtual] = useState<Capitulo | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState<string | null>(null);

  const capitulos = listarCapitulos();

  useEffect(() => {
    let vivo = true;
    checarJdk().then((r) => {
      if (vivo) setJdk(r);
    });
    return () => {
      vivo = false;
    };
  }, []);

  useInput((input) => {
    if (tela === 'menu' && input === 'q') exit();
  });

  async function selecionar(id: number) {
    setMensagem(null);
    if (!capituloDesbloqueado(id, progresso)) {
      setMensagem(`🔒 Cap. ${id} está bloqueado. Conclua o capítulo anterior primeiro.`);
      return;
    }
    setCarregando(true);
    const cap = await carregarCapitulo(id);
    setCarregando(false);
    if (!cap) {
      setMensagem(`📦 O conteúdo do Cap. ${id} ainda não foi escrito (chega numa próxima fase).`);
      return;
    }
    setCapituloAtual(cap);
    setTela('capitulo');
  }

  function concluir(id: number, xp: number) {
    const p = concluirCapitulo(id, xp);
    setProgresso(p);
    setCapituloAtual(null);
    setTela('menu');
    setMensagem(`🎉 Cap. ${id} concluído! +${xp} XP e nova badge. Próximo capítulo desbloqueado.`);
  }

  function voltarAoMenu() {
    setCapituloAtual(null);
    setTela('menu');
  }

  if (!jdk) {
    return (
      <Box flexDirection="column" padding={1}>
        <Logo />
        <Text>
          <Text color="green">
            <Spinner type="dots" />
          </Text>{' '}
          Verificando o JDK (javac/java)...
        </Text>
      </Box>
    );
  }

  if (tela === 'capitulo' && capituloAtual) {
    return (
      <Box flexDirection="column" padding={1}>
        <ChapterView capitulo={capituloAtual} onSair={voltarAoMenu} onConcluir={concluir} />
      </Box>
    );
  }

  return (
    <Box flexDirection="column" padding={1}>
      <Logo />
      <Box marginBottom={1}>
        <JdkBanner jdk={jdk} />
      </Box>

      <ChapterMenu capitulos={capitulos} progresso={progresso} onSelecionar={selecionar} />

      {carregando && (
        <Box marginTop={1}>
          <Text color="green">
            <Spinner type="dots" /> Carregando capítulo...
          </Text>
        </Box>
      )}

      {mensagem && (
        <Box marginTop={1} borderStyle="round" borderColor="yellow" paddingX={1}>
          <Text color="yellow">{mensagem}</Text>
        </Box>
      )}
    </Box>
  );
}
