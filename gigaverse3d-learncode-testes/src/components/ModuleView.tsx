import React, { useEffect, useState } from 'react';
import { Box, Text, useInput, useStdin } from 'ink';
import { execa } from 'execa';
import type { Modulo } from '../types.js';
import { infoCamada } from '../core/camada.js';
import { caminhoExemplo } from '../core/paths.js';
import { rodarTestes, type ResultadoTeste } from '../core/runner.js';
import { concluirModulo, type Progresso } from '../core/progress.js';
import { CodeBlock } from './CodeBlock.js';
import { TestOutputPanel } from './TestOutputPanel.js';
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
  modulo: Modulo;
  onSair: (progresso?: Progresso) => void;
}

export function ModuleView({ modulo, onSair }: Props) {
  const { setRawMode } = useStdin();
  const [idxEtapa, setIdxEtapa] = useState(0);
  const etapa = ETAPAS[idxEtapa]!;

  // código comentado
  const [idxAnotacao, setIdxAnotacao] = useState(0);
  const [verSut, setVerSut] = useState(false);
  // execução do exemplo
  const [rodando, setRodando] = useState(false);
  const [resultado, setResultado] = useState<ResultadoTeste | null>(null);
  // desafio
  const [mostrarDica, setMostrarDica] = useState(false);
  const [mostrarSolucao, setMostrarSolucao] = useState(false);
  const [rodandoDes, setRodandoDes] = useState(false);
  const [resultadoDes, setResultadoDes] = useState<ResultadoTeste | null>(null);
  const [editando, setEditando] = useState(false);
  // conclusão
  const [acertos, setAcertos] = useState(0);
  const [progressoFinal, setProgressoFinal] = useState<Progresso | null>(null);

  const info = infoCamada(modulo.camada);

  // salva o progresso ao chegar na etapa final (uma vez)
  useEffect(() => {
    if (etapa === 'concluido' && !progressoFinal) {
      setProgressoFinal(concluirModulo(modulo.id, modulo.xp));
    }
  }, [etapa, progressoFinal, modulo.id, modulo.xp]);

  const avancar = () => setIdxEtapa((i) => Math.min(i + 1, ETAPAS.length - 1));
  const voltar = () => setIdxEtapa((i) => Math.max(i - 1, 0));

  async function executarExemplo() {
    setRodando(true);
    const r = await rodarTestes(modulo.exemplo.alvo, modulo.exemplo.runner);
    setResultado(r);
    setRodando(false);
  }

  async function executarDesafio() {
    setRodandoDes(true);
    const r = await rodarTestes(modulo.desafio.alvo, modulo.desafio.runner);
    setResultadoDes(r);
    setRodandoDes(false);
  }

  async function abrirEditor() {
    const editor = process.env.VISUAL || process.env.EDITOR || 'nano';
    setEditando(true);
    setRawMode?.(false);
    try {
      await execa(editor, [caminhoExemplo(modulo.desafio.arquivoBase)], { stdio: 'inherit' });
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
      if (input === 'c' && modulo.exemplo.sut) return setVerSut((v) => !v);
      const n = modulo.exemplo.anotacoes.length;
      if (key.upArrow && n) return setIdxAnotacao((i) => (i - 1 + n) % n);
      if (key.downArrow && n) return setIdxAnotacao((i) => (i + 1) % n);
      if (key.return) return avancar();
      return;
    }

    if (etapa === 'execucao') {
      if (key.return) {
        if (!resultado && !rodando) return void executarExemplo();
        if (resultado) return avancar();
      }
      return;
    }

    if (etapa === 'desafio') {
      if (input === 'd') return setMostrarDica((v) => !v);
      if (input === 's') return setMostrarSolucao((v) => !v);
      if (input === 'e') return void abrirEditor();
      if (input === 'r') return void executarDesafio();
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
          {info.icone} Módulo {modulo.id} · {modulo.titulo}
        </Text>
      </Box>
      <Box marginBottom={1}>
        <Text dimColor>
          {info.rotulo} · {modulo.xp} XP ·{' '}
          {ETAPAS.slice(0, -1)
            .map((e) => (e === etapa ? `[${ROTULOS[e]}]` : ROTULOS[e]))
            .join(' › ')}
        </Text>
      </Box>

      {etapa === 'teoria' && <Teoria modulo={modulo} />}

      {etapa === 'codigo' && (
        <Box flexDirection="column">
          <Text bold>
            {verSut && modulo.exemplo.sut
              ? `Código sob teste: ${modulo.exemplo.sut}`
              : modulo.exemplo.descricao}
          </Text>
          <Box marginTop={1}>
            {verSut && modulo.exemplo.sut ? (
              <CodeBlock arquivo={modulo.exemplo.sut} anotacoes={[]} />
            ) : (
              <CodeBlock
                arquivo={modulo.exemplo.arquivo}
                anotacoes={modulo.exemplo.anotacoes}
                linhaFoco={modulo.exemplo.anotacoes[idxAnotacao]?.linha}
              />
            )}
          </Box>
          <Rodape
            texto={
              modulo.exemplo.sut
                ? `↑/↓ percorre os comentários · [c] alterna teste/código sob teste · Enter avança · ← volta · q sai`
                : '↑/↓ percorre os comentários · Enter avança · ← volta · q sai'
            }
          />
        </Box>
      )}

      {etapa === 'discussao' && (
        <Box flexDirection="column">
          <Text bold>Discussão — boas práticas e armadilhas</Text>
          <Box flexDirection="column" marginTop={1}>
            {modulo.discussao.map((d, i) => (
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
          <Text bold>Execução ao vivo — roda os testes de verdade ({modulo.exemplo.runner})</Text>
          <Box marginTop={1}>
            <TestOutputPanel resultado={resultado} rodando={rodando} runner={modulo.exemplo.runner} />
          </Box>
          <Rodape
            texto={
              resultado
                ? 'Enter avança para o desafio · ← volta · q sai'
                : 'Enter roda a suíte · ← volta · q sai'
            }
          />
        </Box>
      )}

      {etapa === 'desafio' && (
        <Box flexDirection="column">
          <Text bold>Desafio prático</Text>
          <Box marginTop={1}>
            <Text>{modulo.desafio.enunciado}</Text>
          </Box>
          <Box marginTop={1}>
            <Text dimColor>arquivo: {modulo.desafio.arquivoBase}</Text>
          </Box>

          {mostrarDica && (
            <Box marginTop={1} borderStyle="round" borderColor="cyan" paddingX={1}>
              <Text>
                <Text color="cyan" bold>
                  dica:{' '}
                </Text>
                {modulo.desafio.dica}
              </Text>
            </Box>
          )}
          {mostrarSolucao && (
            <Box
              marginTop={1}
              borderStyle="round"
              borderColor="magenta"
              paddingX={1}
              flexDirection="column"
            >
              <Text color="magenta" bold>
                solução (um caminho possível):
              </Text>
              {modulo.desafio.solucao.split('\n').map((l, i) => (
                <Text key={i}>{l}</Text>
              ))}
            </Box>
          )}

          {(rodandoDes || resultadoDes) && (
            <Box marginTop={1}>
              <TestOutputPanel
                resultado={resultadoDes}
                rodando={rodandoDes}
                runner={modulo.desafio.runner}
              />
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
              perguntas={modulo.quiz}
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
            ✓ Módulo {modulo.id} concluído!
          </Text>
          <Box marginTop={1}>
            <Text>
              Quiz: {acertos}/{modulo.quiz.length} acertos · +{modulo.xp} XP
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

function Teoria({ modulo }: { modulo: Modulo }) {
  return (
    <Box flexDirection="column">
      <Box borderStyle="round" borderColor="yellow" paddingX={1} flexDirection="column">
        <Text color="yellowBright" bold>
          💡 Conceito em foco: {modulo.conceitoEmFoco.termo}
        </Text>
        <Text>{modulo.conceitoEmFoco.explicacao}</Text>
      </Box>

      <Box marginTop={1} flexDirection="column">
        <Text bold>Objetivos</Text>
        {modulo.objetivos.map((o, i) => (
          <Text key={i}>
            <Text color="green">✓ </Text>
            {o}
          </Text>
        ))}
      </Box>

      <Box marginTop={1} flexDirection="column">
        {modulo.teoria.map((sec, i) => (
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
