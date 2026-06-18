import { execa } from 'execa';
import { mkdtempSync, rmSync, copyFileSync, readdirSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, basename, dirname, resolve } from 'node:path';

export interface ResultadoExecucao {
  /** true se compilou e rodou sem erro. */
  ok: boolean;
  /** Em qual etapa falhou, se falhou. */
  etapa: 'compilacao' | 'execucao' | 'ok';
  stdout: string;
  stderr: string;
  /** Mensagem de erro amigável (timeout, classe não encontrada etc.). */
  erro?: string;
  /** Tempo total de compilação + execução em milissegundos. */
  duracaoMs: number;
  /** true se foi interrompido pelo timeout. */
  timeout: boolean;
}

const TIMEOUT_MS = 10_000;

/**
 * Compila e EXECUTA um arquivo .java de verdade.
 *
 * Passos:
 *  1. Cria um diretório temporário.
 *  2. Copia TODOS os .java da pasta do exemplo (alguns capítulos têm várias classes).
 *  3. Roda `javac *.java`.
 *  4. Roda `java <ClasseMain>` capturando stdout/stderr.
 *  5. Limpa o diretório temporário.
 *
 * @param arquivoJava  caminho do .java principal (a classe com `main`).
 * @param entradaSimulada  texto enviado ao stdin (para demos com Scanner).
 * @param tempoLimiteMs  limite de tempo total (padrão 10s).
 */
export async function compilarERodar(
  arquivoJava: string,
  entradaSimulada?: string,
  tempoLimiteMs: number = TIMEOUT_MS,
): Promise<ResultadoExecucao> {
  const inicio = nowMs();
  const arquivoAbs = resolve(arquivoJava);
  const pastaOrigem = dirname(arquivoAbs);
  const classeMain = basename(arquivoAbs).replace(/\.java$/, '');

  const temp = mkdtempSync(join(tmpdir(), 'gigaverse-java-'));

  try {
    // 1. Copia todos os .java da pasta do exemplo para o temp.
    const fontes = readdirSync(pastaOrigem).filter((f) => f.endsWith('.java'));
    for (const f of fontes) {
      copyFileSync(join(pastaOrigem, f), join(temp, f));
    }

    // 2. Compila.
    const comp = await execa('javac', ['-encoding', 'UTF-8', ...fontes], {
      cwd: temp,
      reject: false,
      timeout: tempoLimiteMs,
    });

    if (comp.exitCode !== 0) {
      return {
        ok: false,
        etapa: 'compilacao',
        stdout: comp.stdout ?? '',
        stderr: comp.stderr ?? '',
        erro: 'Erro de compilação (javac).',
        duracaoMs: nowMs() - inicio,
        timeout: Boolean(comp.timedOut),
      };
    }

    // 3. Executa.
    const exec = await execa('java', ['-Dfile.encoding=UTF-8', classeMain], {
      cwd: temp,
      reject: false,
      timeout: tempoLimiteMs,
      input: entradaSimulada ?? undefined,
    });

    if (exec.timedOut) {
      return {
        ok: false,
        etapa: 'execucao',
        stdout: exec.stdout ?? '',
        stderr: exec.stderr ?? '',
        erro: `Tempo limite de ${tempoLimiteMs / 1000}s excedido (possível laço infinito?).`,
        duracaoMs: nowMs() - inicio,
        timeout: true,
      };
    }

    return {
      ok: exec.exitCode === 0,
      etapa: exec.exitCode === 0 ? 'ok' : 'execucao',
      stdout: exec.stdout ?? '',
      stderr: exec.stderr ?? '',
      erro: exec.exitCode === 0 ? undefined : 'O programa terminou com erro em tempo de execução.',
      duracaoMs: nowMs() - inicio,
      timeout: false,
    };
  } catch (e) {
    return {
      ok: false,
      etapa: 'execucao',
      stdout: '',
      stderr: e instanceof Error ? e.message : String(e),
      erro: 'Falha inesperada ao compilar/executar.',
      duracaoMs: nowMs() - inicio,
      timeout: false,
    };
  } finally {
    // 4. Limpa o temp.
    try {
      rmSync(temp, { recursive: true, force: true });
    } catch {
      /* ignora falha de limpeza */
    }
  }
}

/** Lê o conteúdo de um .java (para exibir no CodeBlock). */
export function lerCodigo(arquivoJava: string): string {
  return readFileSync(resolve(arquivoJava), 'utf-8');
}

// Date.now() é proibido em alguns contextos; aqui no app normal é permitido.
function nowMs(): number {
  return Date.now();
}
