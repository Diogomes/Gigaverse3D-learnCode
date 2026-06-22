import type { Modulo } from '../src/types.js';

/**
 * Módulo 14 — Organizando a suíte e rodando no CI.
 * Exemplo: examples/unit/organizacao.test.ts (describe aninhado + it.each).
 */
const modulo: Modulo = {
  id: 14,
  titulo: 'Organizando a suíte e rodando no CI',
  camada: 'transversal',
  conceitoEmFoco: {
    termo: 'Suíte de testes no CI',
    explicacao:
      'É o conjunto de todos os testes rodando automaticamente a cada push/PR no servidor de Integração ' +
      'Contínua (CI). Para ser útil, a suíte precisa ser rápida, organizada e CONFIÁVEL — sem falhas ' +
      'intermitentes (flaky). A pirâmide guia o ritmo: a base (unidade) roda sempre; o topo (E2E), com mais critério.',
  },
  objetivos: [
    'Organizar testes com describe aninhado e parametrização (it.each)',
    'Entender o papel do CI: rodar a suíte a cada mudança e barrar regressões',
    'Aplicar a pirâmide ao CI: unidade a cada commit, E2E nos momentos certos',
    'Reconhecer e combater a flakiness (testes intermitentes)',
  ],
  teoria: [
    {
      titulo: 'Organizar para escalar',
      paragrafos: [
        'describe agrupa testes por assunto e pode aninhar (tema → subtema). it.each parametriza:',
        'um mesmo teste roda para uma tabela de casos, sem copiar-colar. Menos repetição, mais cobertura.',
        'Nomes claros tornam o relatório uma documentação viva do comportamento do sistema.',
      ],
    },
    {
      titulo: 'O que é CI e por que importa',
      paragrafos: [
        'CI (Integração Contínua) roda a suíte automaticamente a cada push/PR, num ambiente limpo.',
        'Se algo fica vermelho, o merge é barrado — a regressão não chega na branch principal.',
        'Os scripts npm (test:unit, test:api, test:e2e) são os pontos de entrada que o CI chama.',
      ],
    },
    {
      titulo: 'A pirâmide aplicada ao CI',
      paragrafos: [
        'Unidade e integração são rápidas e estáveis → rodam em todo commit, dando feedback em segundos.',
        'E2E é lento e precisa de navegador → costuma rodar em cada PR ou agendado (nightly), não a cada commit.',
        'No CI, E2E roda headless e os navegadores ficam em cache para não baixar a cada execução.',
      ],
    },
    {
      titulo: 'Flakiness: o inimigo da confiança',
      paragrafos: [
        'Um teste flaky passa e falha sem o código mudar — destrói a confiança na suíte (vira "roda de novo").',
        'Causas comuns: sleeps fixos, dependência de ordem, estado compartilhado, rede real. As defesas você',
        'já viu: isolamento (Módulo 5), doubles nas fronteiras (Módulo 6) e auto-waiting (Módulo 13).',
      ],
    },
  ],
  exemplo: {
    arquivo: 'examples/unit/organizacao.test.ts',
    alvo: 'examples/unit/organizacao.test.ts',
    runner: 'vitest',
    descricao: 'describe aninhado por assunto e it.each parametrizando tabelas de casos.',
    sut: 'sut/core/nivel.ts',
    anotacoes: [
      { linha: 7, nota: 'describe externo agrupa o tema "regras de progressão".' },
      { linha: 9, nota: 'it.each recebe uma tabela; o teste roda uma vez por linha. Pressione [c] para ver o SUT.' },
      { linha: 14, nota: 'No nome, $xp e $nivel são interpolados — cada caso vira uma linha legível no relatório.' },
      { linha: 19, nota: 'describe aninhado: um subtema ("nome do jogador") dentro do tema maior.' },
      { linha: 20, nota: 'it.each com %s: parametrização por valores simples (uma string por caso).' },
      { linha: 24, nota: 'Os casos de rejeição reunidos num it.each — caminho infeliz sem repetir código.' },
    ],
  },
  discussao: [
    'it.each transforma "copiei o teste e mudei um número" em uma tabela declarativa. Adicionar um caso vira adicionar uma linha — e o relatório mostra cada caso com seu próprio nome.',
    'Ordene a suíte do rápido para o lento no CI: rode unidade/integração primeiro e falhe cedo (fail-fast). Não faz sentido gastar minutos de E2E se um teste de unidade de 10 ms já reprovou o build.',
    'Cache de dependências e de navegadores no CI é o que mantém a suíte rápida. Sem cache, cada execução baixaria o Playwright e os browsers de novo — minutos jogados fora a cada push.',
    'Trate teste flaky como bug, não como "azar". Quarentenar (marcar como skip) é paliativo; a cura é remover a fonte de não-determinismo — sleep fixo, ordem, estado ou rede real.',
    'Com este módulo você fechou a pirâmide: unidade (base), integração (meio), E2E (topo) e os temas transversais (doubles, cobertura, TDD, organização/CI) que sustentam tudo. 🎉',
  ],
  desafio: {
    enunciado:
      'A tabela do it.each tem um caso com o nível errado de propósito (XP 500 → nível 9), deixando a suíte ' +
      'VERMELHA. Aperte [r] para ver qual caso falhou, depois [e] para corrigir o nível esperado para 500 de XP. ' +
      'Salve e rode com [r].',
    arquivoBase: 'examples/desafios/modulo14.test.ts',
    alvo: 'examples/desafios/modulo14.test.ts',
    runner: 'vitest',
    dica: 'A cada 100 de XP sobe 1 nível, e 0 XP já é nível 1: 500 // 100 + 1 = 6.',
    solucao: '{ xp: 500, nivel: 6 },',
  },
  quiz: [
    {
      pergunta: 'Para que serve o it.each?',
      opcoes: [
        'Pular um teste',
        'Rodar o mesmo teste para vários casos de uma tabela, sem repetir código',
        'Rodar testes em paralelo',
        'Medir cobertura',
      ],
      correta: 1,
      explicacao: 'it.each parametriza: uma linha por caso, cada um com seu nome no relatório.',
    },
    {
      pergunta: 'Na pirâmide aplicada ao CI, o que normalmente roda a CADA commit?',
      opcoes: [
        'Só os testes E2E',
        'Os testes de unidade e integração (rápidos e estáveis)',
        'Nada — só no deploy',
        'Apenas o lint',
      ],
      correta: 1,
      explicacao: 'A base da pirâmide é rápida e estável: roda sempre. E2E costuma rodar por PR ou agendado.',
    },
    {
      pergunta: 'O que é um teste "flaky"?',
      opcoes: [
        'Um teste muito lento',
        'Um teste que passa e falha sem o código mudar (intermitente)',
        'Um teste sem asserção',
        'Um teste de E2E',
      ],
      correta: 1,
      explicacao: 'Flaky = intermitente. Mina a confiança na suíte; a cura é remover o não-determinismo.',
    },
  ],
  xp: 100,
};

export default modulo;
