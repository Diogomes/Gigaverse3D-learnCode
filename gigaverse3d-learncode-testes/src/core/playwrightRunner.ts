import { execa } from 'execa';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { raizProjeto } from './paths.js';
import type { ResultadoTeste, TesteIndividual } from './testRunner.js';

const TIMEOUT_MS = 120_000;

/**
 * Roda um alvo E2E com o Playwright e devolve o resultado parseado (✅/❌ por
 * teste). Usa o reporter JSON gravado em arquivo (via PLAYWRIGHT_JSON_OUTPUT_NAME),
 * mais robusto que parsear o stdout colorido.
 *
 * O Playwright sobe a página do SUT sozinho (webServer no playwright.config.ts).
 *
 * @param alvo caminho relativo do .spec.ts (ex.: 'examples/e2e/home.spec.ts').
 */
export async function rodarPlaywright(alvo: string, cwd: string = raizProjeto()): Promise<ResultadoTeste> {
  const inicio = Date.now();
  const temp = mkdtempSync(join(tmpdir(), 'giga-e2e-'));
  const saidaJson = join(temp, 'resultado.json');

  try {
    const r = await execa('npx', ['playwright', 'test', alvo, '--reporter=json'], {
      cwd,
      reject: false,
      timeout: TIMEOUT_MS,
      env: { ...process.env, PLAYWRIGHT_JSON_OUTPUT_NAME: saidaJson },
    });

    let dados: PlaywrightJson | null = null;
    try {
      dados = JSON.parse(readFileSync(saidaJson, 'utf-8')) as PlaywrightJson;
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
        erro:
          'Não foi possível ler o relatório do Playwright. ' +
          'Os navegadores estão instalados? Rode: npx playwright install',
      };
    }

    const testes: TesteIndividual[] = [];
    const visitar = (suites?: PlaywrightSuite[]) => {
      for (const suite of suites ?? []) {
        for (const spec of suite.specs ?? []) {
          const status = spec.tests?.[0]?.results?.[0]?.status;
          testes.push({
            nome: spec.title,
            status: status === 'passed' ? 'passou' : status === 'skipped' ? 'pulado' : 'falhou',
          });
        }
        visitar(suite.suites);
      }
    };
    visitar(dados.suites);

    const stats = dados.stats ?? {};
    const passou = stats.expected ?? testes.filter((t) => t.status === 'passou').length;
    const falhou = stats.unexpected ?? testes.filter((t) => t.status === 'falhou').length;
    const pulados = stats.skipped ?? testes.filter((t) => t.status === 'pulado').length;

    return {
      ok: falhou === 0 && r.exitCode === 0,
      total: passou + falhou + pulados || testes.length,
      passou,
      falhou,
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

// Forma (parcial) do relatório JSON do Playwright.
interface PlaywrightJson {
  stats?: { expected?: number; unexpected?: number; skipped?: number; flaky?: number };
  suites?: PlaywrightSuite[];
}
interface PlaywrightSuite {
  title?: string;
  specs?: Array<{ title: string; ok?: boolean; tests?: Array<{ results?: Array<{ status?: string }> }> }>;
  suites?: PlaywrightSuite[];
}
