/**
 * Modelo de dados do curso (data-driven).
 *
 * Cada capítulo do livro vira um objeto `Capitulo`. A UI NUNCA tem conteúdo
 * hardcoded: ela apenas renderiza o que vem desses objetos. Assim, adicionar
 * um capítulo = criar um arquivo de dados + os .java reais.
 */

/** Card "💡 Conceito em foco": o termo central do capítulo em linguagem simples. */
export interface ConceitoEmFoco {
  termo: string;
  explicacao: string;
}

/** Uma seção de teoria com um título e parágrafos curtos. */
export interface SecaoTeoria {
  titulo: string;
  paragrafos: string[];
}

/** Anotação de uma linha específica do exemplo de código. */
export interface AnotacaoLinha {
  linha: number;
  nota: string;
}

/** O exemplo .java que o app mostra, discute e EXECUTA de verdade. */
export interface Exemplo {
  /** Caminho do .java relativo à raiz do projeto (ex.: "examples/cap01/OlaGigaverse.java"). */
  arquivo: string;
  descricao: string;
  /** Explicações linha a linha exibidas ao lado do código. */
  anotacoes: AnotacaoLinha[];
  /** stdin simulado para demos que usam Scanner (opcional). */
  entradaSimulada?: string;
}

/** Desafio prático: o aluno edita um .java base e roda. */
export interface Desafio {
  enunciado: string;
  /** .java editável pelo aluno (relativo à raiz). */
  arquivoBase: string;
  dica: string;
  solucao: string;
}

/** Pergunta de múltipla escolha do quiz. */
export interface PerguntaQuiz {
  pergunta: string;
  opcoes: string[];
  /** Índice (0-based) da opção correta. */
  correta: number;
  explicacao: string;
}

/** Um capítulo completo do curso. */
export interface Capitulo {
  id: number;
  titulo: string;
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
 * Metadados mínimos de um capítulo (para o menu).
 * Permite listar os 25 capítulos antes de o conteúdo completo existir.
 */
export interface CapituloMeta {
  id: number;
  titulo: string;
  /** Subtítulo curto / conceito em foco resumido (opcional). */
  foco?: string;
}

/** Progresso salvo em disco. */
export interface Progresso {
  /** XP total acumulado. */
  xp: number;
  /** IDs dos capítulos concluídos. */
  capitulosConcluidos: number[];
  /** Badges conquistadas (por id de capítulo). */
  badges: number[];
}
