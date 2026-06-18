import React, { useState } from 'react';
import { spawn } from 'node:child_process';
import { Box, Text, useInput, useStdin } from 'ink';
import type { Capitulo } from '../types.js';
import { CodeBlock } from './CodeBlock.js';
import { OutputPanel } from './OutputPanel.js';
import { Quiz } from './Quiz.js';
import { compilarERodar, lerCodigo, type ResultadoExecucao } from '../core/javaRunner.js';

const PASSOS = ['teoria', 'codigo', 'discussao', 'rodar', 'desafio', 'quiz'] as const;
type Passo = (typeof PASSOS)[number];

const ROTULOS: Record<Passo, string> = {
  teoria: '1·Teoria',
  codigo: '2·Código',
  discussao: '3·Discussão',
  rodar: '4·Execução',
  desafio: '5·Desafio',
  quiz: '6·Quiz',
};

interface Props {
  capitulo: Capitulo;
  onSair: () => void;
  onConcluir: (id: number, xp: number) => void;
}

export function ChapterView({ capitulo, onSair, onConcluir }: Props): React.ReactElement {
  const { setRawMode } = useStdin();
  const [passoIdx, setPassoIdx] = useState(0);
  const passo = PASSOS[passoIdx];

  // Estado da etapa "código"
  const [anotIdx, setAnotIdx] = useState(0);
  // Estado da etapa "execução"
  const [rodando, setRodando] = useState(false);
  const [resultado, setResultado] = useState<ResultadoExecucao | null>(null);
  // Estado da etapa "desafio"
  const [verDica, setVerDica] = useState(false);
  const [verSolucao, setVerSolucao] = useState(false);
  const [dRodando, setDRodando] = useState(false);
  const [dResultado, setDResultado] = useState<ResultadoExecucao | null>(null);
  // Estado do quiz
  const [qIdx, setQIdx] = useState(0);
  const [escolha, setEscolha] = useState(0);
  const [respondida, setRespondida] = useState(false);
  const [acertos, setAcertos] = useState(0);

  const codigoExemplo = safeLer(capitulo.exemplo.arquivo);

  function avancar() {
    if (passoIdx < PASSOS.length - 1) setPassoIdx(passoIdx + 1);
  }
  function voltar() {
    if (passoIdx > 0) setPassoIdx(passoIdx - 1);
  }

  async function rodarExemplo() {
    setRodando(true);
    setResultado(null);
    const r = await compilarERodar(capitulo.exemplo.arquivo, capitulo.exemplo.entradaSimulada);
    setResultado(r);
    setRodando(false);
  }

  async function rodarDesafio() {
    setDRodando(true);
    setDResultado(null);
    const r = await compilarERodar(capitulo.desafio.arquivoBase);
    setDResultado(r);
    setDRodando(false);
  }

  async function abrirEditor() {
    const editor = process.env.VISUAL || process.env.EDITOR || 'nano';
    setRawMode(false);
    await new Promise<void>((res) => {
      const filho = spawn(editor, [capitulo.desafio.arquivoBase], { stdio: 'inherit' });
      filho.on('exit', () => res());
      filho.on('error', () => res());
    });
    setRawMode(true);
  }

  useInput((input, key) => {
    if (input === 'q') return onSair();

    switch (passo) {
      case 'teoria':
      case 'discussao':
        if (key.rightArrow || key.return) avancar();
        else if (key.leftArrow) voltar();
        break;

      case 'codigo':
        if (key.upArrow) setAnotIdx((i) => Math.max(0, i - 1));
        else if (key.downArrow) setAnotIdx((i) => Math.min(capitulo.exemplo.anotacoes.length - 1, i + 1));
        else if (key.rightArrow || key.return) avancar();
        else if (key.leftArrow) voltar();
        break;

      case 'rodar':
        if (key.return) {
          if (!rodando) void rodarExemplo();
        } else if (key.rightArrow) avancar();
        else if (key.leftArrow) voltar();
        break;

      case 'desafio':
        if (input === 'e') void abrirEditor();
        else if (input === 'r') {
          if (!dRodando) void rodarDesafio();
        } else if (input === 'd') setVerDica((v) => !v);
        else if (input === 's') setVerSolucao((v) => !v);
        else if (key.rightArrow || key.return) avancar();
        else if (key.leftArrow) voltar();
        break;

      case 'quiz': {
        const pergunta = capitulo.quiz[qIdx];
        if (!respondida) {
          if (key.upArrow) setEscolha((i) => Math.max(0, i - 1));
          else if (key.downArrow) setEscolha((i) => Math.min(pergunta.opcoes.length - 1, i + 1));
          else if (key.return) {
            setRespondida(true);
            if (escolha === pergunta.correta) setAcertos((a) => a + 1);
          } else if (key.leftArrow) voltar();
        } else if (key.return) {
          if (qIdx + 1 < capitulo.quiz.length) {
            setQIdx(qIdx + 1);
            setEscolha(0);
            setRespondida(false);
          } else {
            onConcluir(capitulo.id, capitulo.xp);
          }
        }
        break;
      }
    }
  });

  return (
    <Box flexDirection="column">
      {/* Cabeçalho com trilha de passos */}
      <Box justifyContent="space-between">
        <Text bold color="blue">
          Cap. {capitulo.id} — {capitulo.titulo}
        </Text>
      </Box>
      <Box marginBottom={1}>
        {PASSOS.map((p, i) => (
          <Text key={p} color={i === passoIdx ? 'cyan' : undefined} dimColor={i !== passoIdx}>
            {i === passoIdx ? `[${ROTULOS[p]}]` : ` ${ROTULOS[p]} `}
          </Text>
        ))}
      </Box>

      {passo === 'teoria' && <Teoria capitulo={capitulo} />}
      {passo === 'codigo' && (
        <Box flexDirection="column">
          <Text dimColor>{capitulo.exemplo.descricao}</Text>
          <Box marginTop={1}>
            <CodeBlock codigo={codigoExemplo} anotacoes={capitulo.exemplo.anotacoes} focoIndex={anotIdx} />
          </Box>
        </Box>
      )}
      {passo === 'discussao' && <Discussao capitulo={capitulo} />}
      {passo === 'rodar' && (
        <Box flexDirection="column">
          <Text>Execute o exemplo de verdade (javac + java):</Text>
          <Box marginTop={1}>
            <OutputPanel rodando={rodando} resultado={resultado} />
          </Box>
        </Box>
      )}
      {passo === 'desafio' && (
        <DesafioView
          capitulo={capitulo}
          verDica={verDica}
          verSolucao={verSolucao}
          rodando={dRodando}
          resultado={dResultado}
        />
      )}
      {passo === 'quiz' && (
        <Quiz
          pergunta={capitulo.quiz[qIdx]}
          indiceAtual={qIdx}
          total={capitulo.quiz.length}
          escolhaIndex={escolha}
          respondida={respondida}
          acertos={acertos}
        />
      )}

      <Rodape passo={passo} />
    </Box>
  );
}

function Teoria({ capitulo }: { capitulo: Capitulo }): React.ReactElement {
  return (
    <Box flexDirection="column">
      <Box borderStyle="round" borderColor="cyan" paddingX={1} flexDirection="column" marginBottom={1}>
        <Text color="cyan" bold>
          💡 Conceito em foco: {capitulo.conceitoEmFoco.termo}
        </Text>
        <Text>{capitulo.conceitoEmFoco.explicacao}</Text>
      </Box>
      {capitulo.teoria.map((sec, i) => (
        <Box key={i} flexDirection="column" marginBottom={1}>
          <Text bold color="magenta">
            ▸ {sec.titulo}
          </Text>
          {sec.paragrafos.map((p, j) => (
            <Text key={j}>{p}</Text>
          ))}
        </Box>
      ))}
      <Box flexDirection="column">
        <Text bold>🎯 Objetivos:</Text>
        {capitulo.objetivos.map((o, i) => (
          <Text key={i}>• {o}</Text>
        ))}
      </Box>
    </Box>
  );
}

function Discussao({ capitulo }: { capitulo: Capitulo }): React.ReactElement {
  return (
    <Box flexDirection="column">
      <Text bold color="magenta">
        Discussão — por que funciona e pegadinhas comuns
      </Text>
      <Box flexDirection="column" marginTop={1}>
        {capitulo.discussao.map((d, i) => (
          <Box key={i} marginBottom={1}>
            <Text>⚠️ {d}</Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

function DesafioView({
  capitulo,
  verDica,
  verSolucao,
  rodando,
  resultado,
}: {
  capitulo: Capitulo;
  verDica: boolean;
  verSolucao: boolean;
  rodando: boolean;
  resultado: ResultadoExecucao | null;
}): React.ReactElement {
  return (
    <Box flexDirection="column">
      <Box borderStyle="round" borderColor="yellow" paddingX={1} flexDirection="column">
        <Text color="yellow" bold>
          🏋️ Desafio prático
        </Text>
        <Text>{capitulo.desafio.enunciado}</Text>
        <Text dimColor>Arquivo: {capitulo.desafio.arquivoBase}</Text>
      </Box>

      {verDica && (
        <Box marginTop={1} borderStyle="round" borderColor="cyan" paddingX={1}>
          <Text color="cyan">💡 Dica: {capitulo.desafio.dica}</Text>
        </Box>
      )}

      {verSolucao && (
        <Box marginTop={1} borderStyle="round" borderColor="green" paddingX={1} flexDirection="column">
          <Text color="green" bold>
            ✅ Solução sugerida:
          </Text>
          {capitulo.desafio.solucao.split('\n').map((l, i) => (
            <Text key={i}>{l}</Text>
          ))}
        </Box>
      )}

      <Box marginTop={1}>
        <OutputPanel rodando={rodando} resultado={resultado} />
      </Box>
    </Box>
  );
}

function Rodape({ passo }: { passo: Passo }): React.ReactElement {
  const dicas: Record<Passo, string> = {
    teoria: 'Enter/→ avançar · q sair',
    codigo: '↑/↓ navegar anotações · →/Enter avançar · ← voltar · q sair',
    discussao: 'Enter/→ avançar · ← voltar · q sair',
    rodar: 'Enter rodar (javac+java) · → avançar · ← voltar · q sair',
    desafio: 'e editar ($EDITOR) · r rodar · d dica · s solução · → avançar · ← voltar · q sair',
    quiz: '↑/↓ escolher · Enter responder/continuar · q sair',
  };
  return (
    <Box marginTop={1}>
      <Text dimColor>{dicas[passo]}</Text>
    </Box>
  );
}

function safeLer(arquivo: string): string {
  try {
    return lerCodigo(arquivo);
  } catch {
    return `// (não foi possível ler ${arquivo})`;
  }
}
