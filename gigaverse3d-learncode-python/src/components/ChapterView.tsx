import React, { useEffect, useState } from 'react';
import { Box, Text, useInput, useStdin } from 'ink';
import { execa } from 'execa';
import type { Capitulo } from '../types.js';
import { infoParadigma } from '../core/paradigma.js';
import { caminhoExemplo } from '../core/paths.js';
import { rodarPython, type ResultadoExecucao } from '../core/pythonRunner.js';
import { concluirCapitulo, type Progresso } from '../core/progress.js';
import { CodeBlock } from './CodeBlock.js';
import { OutputPanel } from './OutputPanel.js';
import { Quiz } from './Quiz.js';
import { ProgressBar } from './ProgressBar.js';

const ETAPAS = ['teoria', 'codigo', 'discussao', 'execucao', 'desafio', 'quiz', 'concluido'] as const;
type Etapa = (typeof ETAPAS)[number];
const ROTULOS: Record<Etapa, string> = {
  teoria: 'Teoria',
  codigo: 'Código',
  discussao: 'Discussão',
  execucao: 'Execução',
  desafio: 'Desafio',
  quiz: 'Quiz',
  concluido: 'Fim',
};

interface Props {
  capitulo: Capitulo;
  comandoPython: string;
  onSair: (progresso?: Progresso) => void;
}

export function ChapterView({ capitulo, comandoPython, onSair }: Props) {
  const { setRawMode } = useStdin();
  const [idxEtapa, setIdxEtapa] = useState(0);
  const etapa = ETAPAS[idxEtapa]!;

  // código comentado
  const [idxAnotacao, setIdxAnotacao] = useState(0);
  // execução do exemplo
  const [rodando, setRodando] = useState(false);
  const [resultado, setResultado] = useState<ResultadoExecucao | null>(null);
  // desafio
  const [mostrarDica, setMostrarDica] = useState(false);
  const [mostrarSolucao, setMostrarSolucao] = useState(false);
  const [rodandoDes, setRodandoDes] = useState(false);
  const [resultadoDes, setResultadoDes] = useState<ResultadoExecucao | null>(null);
  const [editando, setEditando] = useState(false);
  // conclusão
  const [acertos, setAcertos] = useState(0);
  const [progressoFinal, setProgressoFinal] = useState<Progresso | null>(null);

  const info = infoParadigma(capitulo.paradigma);

  // salva o progresso ao chegar na etapa final (uma vez)
  useEffect(() => {
    if (etapa === 'concluido' && !progressoFinal) {
      setProgressoFinal(concluirCapitulo(capitulo.id, capitulo.xp));
    }
  }, [etapa, progressoFinal, capitulo.id, capitulo.xp]);

  const avancar = () => setIdxEtapa((i) => Math.min(i + 1, ETAPAS.length - 1));
  const voltar = () => setIdxEtapa((i) => Math.max(i - 1, 0));

  async function executar(arquivo: string, paraDesafio: boolean) {
    if (paraDesafio) setRodandoDes(true);
    else setRodando(true);
    const r = await rodarPython(comandoPython, arquivo, capitulo.exemplo.entradaSimulada);
    if (paraDesafio) {
      setResultadoDes(r);
      setRodandoDes(false);
    } else {
      setResultado(r);
      setRodando(false);
    }
  }

  async function abrirEditor() {
    const editor = process.env.VISUAL || process.env.EDITOR || 'nano';
    setEditando(true);
    setRawMode?.(false);
    try {
      await execa(editor, [caminhoExemplo(capitulo.desafio.arquivoBase)], { stdio: 'inherit' });
    } catch {
      /* editor indisponível: o aluno pode editar em outro terminal */
    }
    setRawMode?.(true);
    setEditando(false);
  }

  useInput((input, key) => {
    if (editando || etapa === 'quiz') return; // Quiz tem seu próprio controle

    if (input === 'q') return onSair(progressoFinal ?? undefined);
    if (key.leftArrow && etapa !== 'concluido') return voltar();

    if (etapa === 'codigo') {
      const n = capitulo.exemplo.anotacoes.length;
      if (key.upArrow) return setIdxAnotacao((i) => (i - 1 + n) % n);
      if (key.downArrow) return setIdxAnotacao((i) => (i + 1) % n);
      if (key.return) return avancar();
      return;
    }

    if (etapa === 'execucao') {
      if (key.return) {
        if (!resultado && !rodando) return void executar(capitulo.exemplo.arquivo, false);
        if (resultado) return avancar();
      }
      return;
    }

    if (etapa === 'desafio') {
      if (input === 'd') return setMostrarDica((v) => !v);
      if (input === 's') return setMostrarSolucao((v) => !v);
      if (input === 'e') return void abrirEditor();
      if (input === 'r') return void executar(capitulo.desafio.arquivoBase, true);
      if (key.return) return avancar();
      return;
    }

    if (etapa === 'concluido') {
      if (key.return) return onSair(progressoFinal ?? undefined);
      return;
    }

    // teoria, discussao
    if (key.return) return avancar();
  });

  if (editando) {
    return (
      <Box padding={1}>
        <Text dimColor>Abrindo o editor… salve e feche para voltar ao curso.</Text>
      </Box>
    );
  }

  return (
    <Box flexDirection="column" padding={1}>
      {/* Cabeçalho */}
      <Box>
        <Text color={info.cor} bold>
          {info.icone} Cap. {capitulo.id} · {capitulo.titulo}
        </Text>
      </Box>
      <Box marginBottom={1}>
        <Text dimColor>
          {info.rotulo} · {capitulo.xp} XP · {ETAPAS.slice(0, -1).map((e, i) => {
            const ativo = e === etapa;
            return ativo ? `[${ROTULOS[e]}]` : ROTULOS[e];
          }).join(' › ')}
        </Text>
      </Box>

      {etapa === 'teoria' && <Teoria capitulo={capitulo} />}

      {etapa === 'codigo' && (
        <Box flexDirection="column">
          <Text bold>{capitulo.exemplo.descricao}</Text>
          <Box marginTop={1}>
            <CodeBlock
              arquivo={capitulo.exemplo.arquivo}
              anotacoes={capitulo.exemplo.anotacoes}
              linhaFoco={capitulo.exemplo.anotacoes[idxAnotacao]?.linha}
            />
          </Box>
          <Rodape texto="↑/↓ percorre os comentários · Enter avança · ← volta · q sai" />
        </Box>
      )}

      {etapa === 'discussao' && (
        <Box flexDirection="column">
          <Text bold>Discussão — pegadinhas e decisões</Text>
          <Box flexDirection="column" marginTop={1}>
            {capitulo.discussao.map((d, i) => (
              <Box key={i} marginBottom={1}>
                <Text color="cyan">• </Text>
                <Text>{d}</Text>
              </Box>
            ))}
          </Box>
          <Rodape texto="Enter avança · ← volta · q sai" />
        </Box>
      )}

      {etapa === 'execucao' && (
        <Box flexDirection="column">
          <Text bold>Execução ao vivo — roda Python de verdade</Text>
          <Box marginTop={1}>
            <OutputPanel resultado={resultado} rodando={rodando} />
          </Box>
          <Rodape
            texto={
              resultado
                ? 'Enter avança para o desafio · ← volta · q sai'
                : 'Enter roda o programa · ← volta · q sai'
            }
          />
        </Box>
      )}

      {etapa === 'desafio' && (
        <Box flexDirection="column">
          <Text bold>Desafio prático</Text>
          <Box marginTop={1}>
            <Text>{capitulo.desafio.enunciado}</Text>
          </Box>
          <Box marginTop={1}>
            <Text dimColor>arquivo: {capitulo.desafio.arquivoBase}</Text>
          </Box>

          {mostrarDica && (
            <Box marginTop={1} borderStyle="round" borderColor="cyan" paddingX={1}>
              <Text>
                <Text color="cyan" bold>
                  dica:{' '}
                </Text>
                {capitulo.desafio.dica}
              </Text>
            </Box>
          )}
          {mostrarSolucao && (
            <Box marginTop={1} borderStyle="round" borderColor="magenta" paddingX={1} flexDirection="column">
              <Text color="magenta" bold>
                solução (um caminho possível):
              </Text>
              {capitulo.desafio.solucao.split('\n').map((l, i) => (
                <Text key={i}>{l}</Text>
              ))}
            </Box>
          )}

          {(rodandoDes || resultadoDes) && (
            <Box marginTop={1}>
              <OutputPanel resultado={resultadoDes} rodando={rodandoDes} />
            </Box>
          )}

          <Rodape texto="[e] editar  [r] rodar  [d] dica  [s] solução · Enter avança · q sai" />
        </Box>
      )}

      {etapa === 'quiz' && (
        <Box flexDirection="column">
          <Text bold>Quiz</Text>
          <Box marginTop={1}>
            <Quiz
              perguntas={capitulo.quiz}
              onConcluir={(ac) => {
                setAcertos(ac);
                avancar();
              }}
            />
          </Box>
        </Box>
      )}

      {etapa === 'concluido' && (
        <Box flexDirection="column">
          <Text color="green" bold>
            ✓ Capítulo {capitulo.id} concluído!
          </Text>
          <Box marginTop={1}>
            <Text>
              Quiz: {acertos}/{capitulo.quiz.length} acertos · +{capitulo.xp} XP
            </Text>
          </Box>
          {progressoFinal && (
            <Box marginTop={1}>
              <ProgressBar xp={progressoFinal.xp} />
            </Box>
          )}
          <Rodape texto="Enter volta ao menu · q sai" />
        </Box>
      )}
    </Box>
  );
}

function Teoria({ capitulo }: { capitulo: Capitulo }) {
  return (
    <Box flexDirection="column">
      <Box borderStyle="round" borderColor="yellow" paddingX={1} flexDirection="column">
        <Text color="yellowBright" bold>
          💡 Conceito em foco: {capitulo.conceitoEmFoco.termo}
        </Text>
        <Text>{capitulo.conceitoEmFoco.explicacao}</Text>
      </Box>

      <Box marginTop={1} flexDirection="column">
        <Text bold>Objetivos</Text>
        {capitulo.objetivos.map((o, i) => (
          <Text key={i}>
            <Text color="green">✓ </Text>
            {o}
          </Text>
        ))}
      </Box>

      <Box marginTop={1} flexDirection="column">
        {capitulo.teoria.map((sec, i) => (
          <Box key={i} flexDirection="column" marginBottom={1}>
            <Text color="cyan" bold>
              {sec.titulo}
            </Text>
            {sec.paragrafos.map((p, j) => (
              <Text key={j}>{p}</Text>
            ))}
          </Box>
        ))}
      </Box>

      <Rodape texto="Enter vê o código comentado · q sai" />
    </Box>
  );
}

function Rodape({ texto }: { texto: string }) {
  return (
    <Box marginTop={1}>
      <Text dimColor>{texto}</Text>
    </Box>
  );
}
