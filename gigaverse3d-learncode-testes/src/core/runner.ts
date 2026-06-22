import { rodarVitest, type ResultadoTeste } from './testRunner.js';
import { rodarPlaywright } from './playwrightRunner.js';
import { raizProjeto } from './paths.js';
import type { Runner } from '../types.js';

export type { ResultadoTeste, TesteIndividual } from './testRunner.js';

/**
 * Dispara um alvo de teste de verdade com o runner adequado e devolve o
 * resultado parseado (✅/❌ por teste). É a porta única que a UI usa.
 *
 * - `vitest`     → módulos de unidade e integração (Supertest roda sob o Vitest).
 * - `playwright` → módulos de E2E (sobe a página do SUT e abre o navegador).
 */
export async function rodarTestes(alvo: string, runner: Runner): Promise<ResultadoTeste> {
  if (runner === 'playwright') {
    return rodarPlaywright(alvo, raizProjeto());
  }
  return rodarVitest(alvo, raizProjeto());
}
