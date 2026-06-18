import { execa } from 'execa';
import { caminhoExemplo } from './paths.js';

const TIMEOUT_MS = 10_000;
const MAX_SAIDA = 20_000; // corta saídas absurdamente grandes

export interface ResultadoExecucao {
  /** Código Python (caminho relativo) que foi executado. */
  arquivo: string;
  stdout: string;
  stderr: string;
  /** Código de saída do processo (0 = sucesso). */
  codigo: number | null;
  /** Tempo de execução em milissegundos. */
  duracaoMs: number;
  /** true se o processo foi morto pelo timeout. */
  timeout: boolean;
  /** Linha do erro extraída do traceback, quando houver. */
  linhaErro?: number;
}

function cortar(texto: string): string {
  if (texto.length <= MAX_SAIDA) return texto;
  return texto.slice(0, MAX_SAIDA) + '\n…(saída truncada)…';
}

/**
 * Extrai do traceback o número da linha do arquivo executado em que o erro
 * ocorreu. Ex.: 'File "ola.py", line 7, in <module>' → 7.
 */
function extrairLinhaErro(stderr: string, nomeArquivo: string): number | undefined {
  const regex = new RegExp(`File "[^"]*${nomeArquivo}", line (\\d+)`, 'g');
  let ultima: number | undefined;
  for (const m of stderr.matchAll(regex)) {
    ultima = Number(m[1]); // a última ocorrência é a mais próxima do erro
  }
  return ultima;
}

/**
 * Executa um arquivo .py de verdade com o interpretador detectado.
 * Captura stdout/stderr, mede o tempo, respeita timeout e suporta stdin
 * simulado (para demos que usam input()).
 */
export async function rodarPython(
  comandoPython: string,
  arquivoRelativo: string,
  entradaSimulada?: string
): Promise<ResultadoExecucao> {
  const absoluto = caminhoExemplo(arquivoRelativo);
  const inicio = Date.now();

  try {
    const resultado = await execa(comandoPython, [absoluto], {
      input: entradaSimulada,
      timeout: TIMEOUT_MS,
      reject: false, // não lança em código de saída != 0; tratamos manualmente
      stripFinalNewline: false,
      encoding: 'utf8',
    });

    const stderr = cortar(resultado.stderr ?? '');
    const nome = arquivoRelativo.split('/').pop() ?? arquivoRelativo;

    return {
      arquivo: arquivoRelativo,
      stdout: cortar(resultado.stdout ?? ''),
      stderr,
      codigo: resultado.exitCode ?? null,
      duracaoMs: Date.now() - inicio,
      timeout: Boolean(resultado.timedOut),
      linhaErro: stderr ? extrairLinhaErro(stderr, nome) : undefined,
    };
  } catch (erro: unknown) {
    // Erro inesperado (ex.: interpretador sumiu). Devolve como stderr.
    const mensagem = erro instanceof Error ? erro.message : String(erro);
    return {
      arquivo: arquivoRelativo,
      stdout: '',
      stderr: mensagem,
      codigo: null,
      duracaoMs: Date.now() - inicio,
      timeout: false,
    };
  }
}
