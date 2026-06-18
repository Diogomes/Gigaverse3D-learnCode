import { execa } from 'execa';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

/** Raiz do projeto de testes (dois níveis acima de src/core/). */
const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');

export interface TesteIndividual {
  nome: string;
  status: 'passou' | 'falhou' | 'pulado';
}

export interface ResultadoTeste {
  /** true se TODOS passaram e o runner saiu com código 0. */
  ok: boolean;
  total: number;
  passou: number;
  falhou: number;
  testes: TesteIndividual[];
  stdout: string;
  stderr: string;
  duracaoMs: number;
  erro?: string;
}

const TIMEOUT_MS = 120_000;

/**
 * Roda um alvo com o Vitest e devolve o resultado parseado (✅/❌ por teste).
 * Usa o reporter JSON gravado em arquivo temporário (mais robusto que parsear stdout).
 *
 * @param alvo  caminho relativo (ex.: "examples/unit" ou um arquivo .test.ts).
 */
export async function rodarVitest(alvo: string, cwd: string = RAIZ): Promise<ResultadoTeste> {
  const inicio = Date.now();
  const temp = mkdtempSync(join(tmpdir(), 'giga-testes-'));
  const saidaJson = join(temp, 'resultado.json');

  try {
    const r = await execa(
      'npx',
      ['vitest', 'run', alvo, '--reporter=json', `--outputFile=${saidaJson}`],
      { cwd, reject: false, timeout: TIMEOUT_MS },
    );

    let dados: VitestJson | null = null;
    try {
      dados = JSON.parse(readFileSync(saidaJson, 'utf-8')) as VitestJson;
    } catch {
      dados = null;
    }

    if (!dados) {
      return {
        ok: false,
        total: 0,
        passou: 0,
        falhou: 0,
        testes: [],
        stdout: r.stdout ?? '',
        stderr: r.stderr ?? '',
        duracaoMs: Date.now() - inicio,
        erro: 'Não foi possível ler o relatório do Vitest.',
      };
    }

    const testes: TesteIndividual[] = [];
    for (const suite of dados.testResults ?? []) {
      for (const a of suite.assertionResults ?? []) {
        testes.push({
          nome: a.fullName || a.title,
          status: a.status === 'passed' ? 'passou' : a.status === 'failed' ? 'falhou' : 'pulado',
        });
      }
    }

    return {
      ok: Boolean(dados.success) && r.exitCode === 0,
      total: dados.numTotalTests ?? testes.length,
      passou: dados.numPassedTests ?? testes.filter((t) => t.status === 'passou').length,
      falhou: dados.numFailedTests ?? testes.filter((t) => t.status === 'falhou').length,
      testes,
      stdout: r.stdout ?? '',
      stderr: r.stderr ?? '',
      duracaoMs: Date.now() - inicio,
    };
  } finally {
    try {
      rmSync(temp, { recursive: true, force: true });
    } catch {
      /* ignora falha de limpeza */
    }
  }
}

// Forma (parcial) do relatório JSON do Vitest, no estilo Jest.
interface VitestJson {
  success?: boolean;
  numTotalTests?: number;
  numPassedTests?: number;
  numFailedTests?: number;
  testResults?: Array<{
    assertionResults?: Array<{ title: string; fullName?: string; status: string }>;
  }>;
}
