import type { Camada } from '../types.js';

export interface InfoCamada {
  rotulo: string;
  icone: string;
  /** Cor de primeiro plano aceita pelo chalk/Ink (nome ou hex). */
  cor: string;
}

/** Rótulo, ícone e cor de cada camada da pirâmide — usados nos badges da UI. */
export const CAMADAS: Record<Camada, InfoCamada> = {
  fundamentos: { rotulo: 'Fundamentos', icone: '🧭', cor: '#94a3b8' },
  unidade: { rotulo: 'Unidade', icone: '🧱', cor: '#34d399' },
  integracao: { rotulo: 'Integração', icone: '🔗', cor: '#22d3ee' },
  e2e: { rotulo: 'E2E', icone: '🌐', cor: '#a78bfa' },
  transversal: { rotulo: 'Transversal', icone: '🛠', cor: '#f59e0b' },
};

export function infoCamada(c: Camada): InfoCamada {
  return CAMADAS[c];
}
