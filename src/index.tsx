#!/usr/bin/env node
import React from 'react';
import { render } from 'ink';
import { App } from './App.js';

// O app é interativo (navegação por teclado) e precisa de um terminal real.
// Sem TTY, o Ink falha com "Raw mode is not supported"; aqui damos uma
// mensagem clara em vez de um stack trace.
if (!process.stdin.isTTY) {
  console.error(
    'Este app é interativo e precisa rodar em um terminal de verdade (TTY).\n' +
      'Rode diretamente no seu terminal com:  npm run dev',
  );
  process.exit(1);
}

render(<App />);
