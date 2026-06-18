/**
 * Modelo de dados (data-driven) do curso.
 * Cada capítulo é um objeto `Capitulo` exportado de /content/capNN.ts.
 * A UI nunca tem conteúdo hardcoded: ela apenas renderiza estes dados.
 */

/** Os quatro paradigmas/eixos cobertos pelo curso. */
export type Paradigma =
  | 'procedural' // 🧱 fundamentos imperativos
  | 'estruturas' // 🧩 listas, dicionários, tuplas, sets
  | 'oo' //        🎭 classes, objetos, herança
  | 'funcional' // λ  comprehensions, lambda, ordem superior
  | 'transversal'; // 🛠 depuração, análise de algoritmos

export interface Anotacao {
  /** Número da linha do arquivo .py (base 1) ao qual a nota se refere. */
  linha: number;
  nota: string;
}

export interface Exemplo {
  /** Caminho do .py real, relativo à raiz do projeto. Ex.: 'examples/cap01/ola.py'. */
  arquivo: string;
  descricao: string;
  anotacoes: Anotacao[];
  /** Texto enviado ao stdin para demos que usam input(). */
  entradaSimulada?: string;
}

export interface Desafio {
  enunciado: string;
  /** Arquivo .py base que o aluno vai editar. */
  arquivoBase: string;
  dica: string;
  solucao: string;
}

export interface PerguntaQuiz {
  pergunta: string;
  opcoes: string[];
  /** Índice (base 0) da opção correta em `opcoes`. */
  correta: number;
  explicacao: string;
}

export interface SecaoTeoria {
  titulo: string;
  paragrafos: string[];
}

export interface ConceitoEmFoco {
  termo: string;
  explicacao: string;
}

export interface Capitulo {
  id: number;
  titulo: string;
  paradigma: Paradigma;
  conceitoEmFoco: ConceitoEmFoco;
  objetivos: string[];
  teoria: SecaoTeoria[];
  exemplo: Exemplo;
  discussao: string[];
  desafio: Desafio;
  quiz: PerguntaQuiz[];
  xp: number;
}

/**
 * Metadados leves de um capítulo para o menu/manifesto.
 * Permite listar todo o currículo (e marcar bloqueado/concluído)
 * mesmo antes do conteúdo completo (`Capitulo`) ter sido escrito.
 */
export interface CapituloMeta {
  id: number;
  titulo: string;
  paradigma: Paradigma;
  /** Resumo de uma linha do "conceito em foco". */
  resumo: string;
  /** true quando o arquivo de conteúdo completo já existe. */
  disponivel: boolean;
}
