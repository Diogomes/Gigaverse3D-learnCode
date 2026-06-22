// Personagem do Gigaverse. Funções que devolvem OBJETOS e ARRAYS — ótimas para
// demonstrar matchers de igualdade estrutural (toEqual, toMatchObject, toContain).

export interface Personagem {
  nome: string;
  nivel: number;
  itens: string[];
}

/** Cria um personagem novo, sempre no nível 1 e com a mochila vazia. */
export function criarPersonagem(nome: string): Personagem {
  return { nome, nivel: 1, itens: [] };
}

/**
 * Equipa um item. Não muta o personagem original: devolve uma CÓPIA nova
 * (imutabilidade), o que torna o resultado previsível e fácil de testar.
 */
export function equipar(p: Personagem, item: string): Personagem {
  return { ...p, itens: [...p.itens, item] };
}
