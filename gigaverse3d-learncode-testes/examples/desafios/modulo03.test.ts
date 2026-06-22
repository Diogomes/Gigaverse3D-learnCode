import { describe, it, expect } from 'vitest';
import { criarPersonagem, equipar } from '../../sut/core/personagem';

// DESAFIO — Módulo 3 (matchers)
// Equipamos DOIS itens. Escolha os matchers certos para deixar tudo VERDE.
describe('desafio: matchers para um personagem equipado', () => {
  it('o personagem tem os dois itens na ordem em que foram equipados', () => {
    let p = criarPersonagem('Aria');
    p = equipar(p, 'espada');
    p = equipar(p, 'escudo');

    // 1) Compare a mochila INTEIRA por conteúdo (dica: não use toBe em array).
    expect(p.itens).toBe(['espada', 'escudo']); // TODO: matcher errado de propósito

    // 2) Afirme que a mochila tem 2 itens.
    expect(p.itens).toHaveLength(0); // TODO: corrija o número
  });
});
