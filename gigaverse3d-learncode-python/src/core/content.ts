import type { CapituloMeta } from '../types.js';

/**
 * Manifesto do currículo completo (Pense em Python 2e + Módulo Funcional).
 *
 * É a fonte de verdade do MENU. Cada item ganha `disponivel: false` até que o
 * arquivo de conteúdo completo (content/capNN.ts) seja escrito numa fase futura.
 * Mantenha este manifesto data-driven: a UI só lê daqui, nunca hardcoda títulos.
 */
export const CURRICULO: CapituloMeta[] = [
  { id: 1, titulo: 'A jornada do programa', paradigma: 'procedural', resumo: 'Interpretador e REPL', disponivel: false },
  { id: 2, titulo: 'Variáveis, expressões e instruções', paradigma: 'procedural', resumo: 'Tipagem dinâmica', disponivel: false },
  { id: 3, titulo: 'Funções', paradigma: 'procedural', resumo: 'Definir e chamar com def', disponivel: false },
  { id: 4, titulo: 'Estudo de caso: interface (turtle)', paradigma: 'procedural', resumo: 'Encapsulamento e generalização', disponivel: false },
  { id: 5, titulo: 'Condicionais e recursão', paradigma: 'procedural', resumo: 'Recursão e caso-base', disponivel: false },
  { id: 6, titulo: 'Funções com resultado', paradigma: 'procedural', resumo: 'return vs. efeito colateral', disponivel: false },
  { id: 7, titulo: 'Iteração', paradigma: 'procedural', resumo: 'Laço while e atualização', disponivel: false },
  { id: 8, titulo: 'Strings', paradigma: 'procedural', resumo: 'Índice, fatiamento, imutabilidade', disponivel: false },
  { id: 9, titulo: 'Estudo de caso: jogo de palavras', paradigma: 'procedural', resumo: 'Filtragem com condições', disponivel: false },
  { id: 10, titulo: 'Listas', paradigma: 'estruturas', resumo: 'Sequência mutável', disponivel: false },
  { id: 11, titulo: 'Dicionários', paradigma: 'estruturas', resumo: 'Mapeamento chave→valor', disponivel: false },
  { id: 12, titulo: 'Tuplas', paradigma: 'estruturas', resumo: 'Imutável e desempacotamento', disponivel: false },
  { id: 13, titulo: 'Estudo de caso: escolha de estrutura', paradigma: 'estruturas', resumo: 'Estrutura certa para o problema', disponivel: false },
  { id: 14, titulo: 'Arquivos', paradigma: 'procedural', resumo: 'Persistência e try/except', disponivel: false },
  { id: 15, titulo: 'Classes e objetos', paradigma: 'oo', resumo: 'Classe vs. instância', disponivel: false },
  { id: 16, titulo: 'Classes e funções', paradigma: 'oo', resumo: 'Função pura vs. modificadora', disponivel: false },
  { id: 17, titulo: 'Classes e métodos', paradigma: 'oo', resumo: 'Método e self', disponivel: false },
  { id: 18, titulo: 'Herança', paradigma: 'oo', resumo: 'Classe filha reaproveita a pai', disponivel: false },
  { id: 19, titulo: 'Os agrados (extra)', paradigma: 'funcional', resumo: 'Comprehensions e geradores', disponivel: false },
  { id: 20, titulo: 'Depuração (apêndice)', paradigma: 'transversal', resumo: 'Ler o traceback', disponivel: false },
  { id: 21, titulo: 'Análise de algoritmos (apêndice)', paradigma: 'transversal', resumo: 'Ordem de crescimento (Big O)', disponivel: false },
  { id: 22, titulo: 'Módulo extra: Programação Funcional', paradigma: 'funcional', resumo: 'Funções de primeira classe', disponivel: false },
];
