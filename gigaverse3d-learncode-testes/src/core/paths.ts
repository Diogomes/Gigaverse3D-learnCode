import { fileURLToPath } from 'node:url';
import { dirname, join, isAbsolute } from 'node:path';
import { existsSync } from 'node:fs';

let raizMemo: string | null = null;

/**
 * Descobre a raiz do projeto subindo a partir deste módulo até achar o
 * package.json. Funciona tanto rodando via tsx (src/) quanto compilado (dist/).
 */
export function raizProjeto(): string {
  if (raizMemo) return raizMemo;
  let dir = dirname(fileURLToPath(import.meta.url));
  while (!existsSync(join(dir, 'package.json'))) {
    const pai = dirname(dir);
    if (pai === dir) break; // chegou na raiz do sistema de arquivos
    dir = pai;
  }
  raizMemo = dir;
  return dir;
}

/** Resolve um caminho de exemplo (ex.: 'examples/unit/nivel.test.ts') para absoluto. */
export function caminhoExemplo(relativo: string): string {
  return isAbsolute(relativo) ? relativo : join(raizProjeto(), relativo);
}
