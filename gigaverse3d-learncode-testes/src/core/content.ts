import type { ModuloMeta } from '../types.js';

/**
 * Manifesto do currículo completo do curso de Testes Automatizados.
 *
 * É a fonte de verdade do MENU. Cada item ganha `disponivel: false` até que o
 * arquivo de conteúdo completo (content/moduloNN.ts) seja escrito numa fase
 * futura. Mantenha este manifesto data-driven: a UI só lê daqui, nunca hardcoda
 * títulos.
 *
 * Organização = a pirâmide de testes, de baixo para cima:
 *   fundamentos → unidade (base) → integração (meio) → e2e (topo) + transversais.
 */
export const CURRICULO: ModuloMeta[] = [
  { id: 1, titulo: 'Por que testar? A pirâmide e o primeiro teste verde', camada: 'fundamentos', resumo: 'O que é teste automatizado e a pirâmide', disponivel: false },
  { id: 2, titulo: 'Anatomia de um teste: o padrão AAA', camada: 'unidade', resumo: 'Arrange, Act, Assert', disponivel: false },
  { id: 3, titulo: 'Asserções e matchers do Vitest', camada: 'unidade', resumo: 'toBe, toEqual, toThrow…', disponivel: false },
  { id: 4, titulo: 'Casos de borda e erros esperados', camada: 'unidade', resumo: 'Testar o caminho infeliz', disponivel: false },
  { id: 5, titulo: 'Estado entre testes: beforeEach/afterEach', camada: 'unidade', resumo: 'Setup, teardown e isolamento', disponivel: false },
  { id: 6, titulo: 'Test doubles: mocks, spies e stubs', camada: 'unidade', resumo: 'Isolar dependências', disponivel: false },
  { id: 7, titulo: 'Cobertura de código (coverage)', camada: 'transversal', resumo: 'Medir o que foi testado', disponivel: false },
  { id: 8, titulo: 'TDD: red, green, refactor', camada: 'transversal', resumo: 'Deixe o teste guiar o código', disponivel: false },
  { id: 9, titulo: 'Integração de API com Supertest', camada: 'integracao', resumo: 'Requisições direto no app Express', disponivel: false },
  { id: 10, titulo: 'Contratos, status HTTP e validação', camada: 'integracao', resumo: '200/201/400/404 e o corpo certo', disponivel: false },
  { id: 11, titulo: 'Rotas protegidas e autenticação', camada: 'integracao', resumo: 'Testar 401 e o header Authorization', disponivel: false },
  { id: 12, titulo: 'Testes end-to-end com Playwright', camada: 'e2e', resumo: 'Navegador de verdade no topo', disponivel: false },
  { id: 13, titulo: 'Locators semânticos e auto-waiting', camada: 'e2e', resumo: 'Selecionar por papel/label, sem sleep', disponivel: false },
  { id: 14, titulo: 'Organizando a suíte e rodando no CI', camada: 'transversal', resumo: 'Velocidade, flakiness e integração contínua', disponivel: false },
];
