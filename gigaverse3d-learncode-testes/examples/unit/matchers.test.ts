import { describe, it, expect } from 'vitest';
import { criarPersonagem, equipar } from '../../sut/core/personagem';

// Vitrine de matchers: a "afirmação" certa para cada tipo de valor.
describe('matchers do Vitest', () => {
  it('toBe compara valores primitivos por identidade (===)', () => {
    const p = criarPersonagem('Aria');
    expect(p.nivel).toBe(1); // número: toBe é o ideal
    expect(p.nome).toBe('Aria'); // string também
  });

  it('toEqual compara objetos/arrays por conteúdo (não por referência)', () => {
    const p = criarPersonagem('Aria');
    // toBe FALHARIA aqui (referências diferentes); toEqual olha o conteúdo.
    expect(p).toEqual({ nome: 'Aria', nivel: 1, itens: [] });
  });

  it('toMatchObject verifica só um subconjunto do objeto', () => {
    const p = criarPersonagem('Bo');
    expect(p).toMatchObject({ nivel: 1 }); // ignora os demais campos
  });

  it('toContain e toHaveLength inspecionam arrays', () => {
    const p = equipar(criarPersonagem('Aria'), 'espada');
    expect(p.itens).toContain('espada');
    expect(p.itens).toHaveLength(1);
  });

  it('matchers numéricos e de negação', () => {
    const p = criarPersonagem('Aria');
    expect(p.nivel).toBeGreaterThan(0);
    expect(p.nome).not.toBe('Outro');
  });
});
