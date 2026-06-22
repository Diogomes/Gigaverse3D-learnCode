import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { raizProjeto } from './paths.js';

export interface AmbienteInfo {
  /** true se o ambiente mínimo para rodar os testes está pronto. */
  pronto: boolean;
  /** Versão do Node detectada (process.version, ex.: 'v20.11.0'). */
  versaoNode: string;
  /** true se o Vitest está instalado em node_modules. */
  vitest: boolean;
  /** true se o Playwright (@playwright/test) está instalado. */
  playwright: boolean;
  /** Instrução de correção quando algo falta. */
  instrucao?: string;
}

/** Caminho de um binário dentro do node_modules/.bin do projeto. */
function temBin(nome: string): boolean {
  return existsSync(join(raizProjeto(), 'node_modules', '.bin', nome));
}

/**
 * Verifica o ambiente do curso de testes: Node e os runners instalados.
 * Não roda nada pesado — só inspeciona node_modules e a versão do Node.
 */
export function verificarAmbiente(): AmbienteInfo {
  const versaoNode = process.version;
  const maior = Number(versaoNode.replace(/^v/, '').split('.')[0] ?? 0);
  const nodeOk = maior >= 18;

  const vitest = temBin('vitest');
  const playwright = temBin('playwright');

  // O Vitest é a base do curso (módulos de unidade e integração). É o mínimo.
  const pronto = nodeOk && vitest;

  let instrucao: string | undefined;
  if (!nodeOk) {
    instrucao =
      `Node ${versaoNode} é antigo. O curso precisa de Node 18+.\n` +
      'No Fedora:  sudo dnf install nodejs npm';
  } else if (!vitest) {
    instrucao =
      'As dependências do curso não estão instaladas.\n' +
      'Na pasta do curso, rode:  npm install';
  } else if (!playwright) {
    instrucao =
      'Vitest pronto. O Playwright (módulos de E2E) ainda não está instalado;\n' +
      'os navegadores chegam com:  npx playwright install --with-deps';
  }

  return { pronto, versaoNode, vitest, playwright, instrucao };
}
