/**
 * Modelo de dados (data-driven) do curso de Testes Automatizados.
 * Cada módulo é um objeto `Modulo` exportado de /content/moduloNN.ts.
 * A UI nunca tem conteúdo hardcoded: ela apenas renderiza estes dados.
 *
 * Fio condutor do curso: a PIRÂMIDE DE TESTES (muitos testes de unidade na
 * base, alguns de integração no meio, poucos de E2E no topo).
 */

/** As camadas da pirâmide (eixos do currículo). */
export type Camada =
  | 'fundamentos' // 🧭 por que testar, vocabulário, a pirâmide
  | 'unidade' //     🧱 base: funções/classes puras, isoladas
  | 'integracao' //  🔗 meio: API + Supertest, contratos, status HTTP
  | 'e2e' //         🌐 topo: navegador de verdade com Playwright
  | 'transversal'; // 🛠 TDD, cobertura, mocks, CI — cortam todas as camadas

/** Runner que executa o exemplo/desafio de verdade. */
export type Runner = 'vitest' | 'playwright';

export interface Anotacao {
  /** Número da linha do arquivo (base 1) ao qual a nota se refere. */
  linha: number;
  nota: string;
}

export interface ExemploTeste {
  /** Caminho do arquivo de teste real, relativo à raiz. Ex.: 'examples/unit/nivel.test.ts'. */
  arquivo: string;
  /** Alvo passado ao runner (arquivo ou pasta). Costuma ser igual a `arquivo`. */
  alvo: string;
  runner: Runner;
  descricao: string;
  anotacoes: Anotacao[];
  /** Arquivo do código sob teste (SUT) exibido junto, quando ajuda a entender. */
  sut?: string;
}

export interface Desafio {
  enunciado: string;
  /** Arquivo de teste base que o aluno vai editar/completar. */
  arquivoBase: string;
  /** Alvo passado ao runner ao rodar o desafio. */
  alvo: string;
  runner: Runner;
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

export interface Modulo {
  id: number;
  titulo: string;
  camada: Camada;
  conceitoEmFoco: ConceitoEmFoco;
  objetivos: string[];
  teoria: SecaoTeoria[];
  exemplo: ExemploTeste;
  discussao: string[];
  desafio: Desafio;
  quiz: PerguntaQuiz[];
  xp: number;
}

/**
 * Metadados leves de um módulo para o menu/manifesto.
 * Permite listar todo o currículo (e marcar bloqueado/concluído)
 * mesmo antes do conteúdo completo (`Modulo`) ter sido escrito.
 */
export interface ModuloMeta {
  id: number;
  titulo: string;
  camada: Camada;
  /** Resumo de uma linha do "conceito em foco". */
  resumo: string;
  /** true quando o arquivo de conteúdo completo já existe. */
  disponivel: boolean;
}
