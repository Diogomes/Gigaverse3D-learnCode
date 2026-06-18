#!/usr/bin/env node
// Dispatcher do "npm run dev":
//   npm run dev java     -> abre o curso de Java (este projeto)
//   npm run dev python   -> abre o curso de Python (gigaverse3d-learncode-python/)
//   npm run dev          -> padrão: Java
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { existsSync } from 'node:fs';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const alvo = (process.argv[2] || 'java').toLowerCase();

/** Caminho do tsx local de um projeto (ou null se não houver node_modules). */
function tsxLocal(dirProjeto) {
  const bin = join(dirProjeto, 'node_modules', '.bin', 'tsx');
  return existsSync(bin) ? bin : null;
}

/** Lança um app Ink com TTY herdado (necessário para a TUI interativa). */
function abrir(dirProjeto, rotulo) {
  const tsx = tsxLocal(dirProjeto);
  if (!tsx) {
    console.error(
      `Dependências do curso de ${rotulo} não instaladas.\n` +
        `Rode:  cd ${dirProjeto} && npm install`,
    );
    process.exit(1);
  }
  console.error(`\x1b[36m▸ Abrindo o curso de ${rotulo}...\x1b[0m`);
  const filho = spawn(tsx, ['src/index.tsx'], { cwd: dirProjeto, stdio: 'inherit' });
  filho.on('exit', (code) => process.exit(code ?? 0));
  filho.on('error', (e) => {
    console.error(e.message);
    process.exit(1);
  });
}

switch (alvo) {
  case 'java':
    abrir(raiz, 'Java');
    break;
  case 'python': {
    const dir = join(raiz, 'gigaverse3d-learncode-python');
    if (!existsSync(dir)) {
      console.error(`Curso de Python não encontrado em: ${dir}`);
      process.exit(1);
    }
    abrir(dir, 'Python');
    break;
  }
  default:
    console.error(`Uso: npm run dev [java|python]   (recebido: "${alvo}")`);
    process.exit(1);
}
