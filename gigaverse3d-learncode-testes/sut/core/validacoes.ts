// Validações simples reutilizadas pelo domínio e pela API.

/** Nome de jogador é válido se tiver entre 3 e 20 caracteres (sem contar espaços nas pontas). */
export function nomeJogadorValido(nome: string): boolean {
  const limpo = nome.trim();
  return limpo.length >= 3 && limpo.length <= 20;
}
