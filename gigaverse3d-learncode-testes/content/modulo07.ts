import type { Modulo } from '../src/types.js';

/**
 * Módulo 7 — Cobertura de código (coverage).
 * Exemplo: examples/unit/cobertura.test.ts (cobre todos os ramos de classificar).
 */
const modulo: Modulo = {
  id: 7,
  titulo: 'Cobertura de código (coverage)',
  camada: 'transversal',
  conceitoEmFoco: {
    termo: 'Cobertura de testes',
    explicacao:
      'É a medida de quanto do seu código foi EXECUTADO pelos testes — por linha, por ramo (cada lado ' +
      'de um if), por função. Ajuda a achar caminhos esquecidos. Mas é um guia, não uma nota: 100% de ' +
      'cobertura não significa zero bugs — significa que tudo rodou ao menos uma vez.',
  },
  objetivos: [
    'Entender cobertura por linha, por ramo e por função',
    'Identificar um ramo (branch) não coberto e escrever o teste que falta',
    'Saber rodar a cobertura com Vitest (vitest run --coverage)',
    'Reconhecer por que cobertura alta não garante ausência de bugs',
  ],
  teoria: [
    {
      titulo: 'O que a cobertura mede',
      paragrafos: [
        'Linha: a linha foi executada? Ramo: cada lado de um if/else/?: rodou? Função: foi chamada?',
        'A cobertura de RAMOS é a mais reveladora: um if sem o caso "else" testado esconde meio comportamento.',
        'No Vitest: npm run coverage (vitest run --coverage). Ele aponta exatamente as linhas/ramos não cobertos.',
      ],
    },
    {
      titulo: 'Cobertura é um guia, não a meta',
      paragrafos: [
        'Dá para ter 100% de cobertura e ainda assim ter bugs: o teste pode executar a linha sem afirmar',
        'nada útil sobre ela. Cobertura mostra o que NUNCA foi testado (ótimo sinal de alerta), mas não',
        'prova que o que foi testado está correto. Persiga comportamento, não a porcentagem.',
      ],
    },
    {
      titulo: 'Como usar bem',
      paragrafos: [
        'Use a cobertura para caçar ramos esquecidos e código morto. Foque nos caminhos de risco',
        '(erros, condições raras). Não escreva testes vazios só para "pintar de verde" o relatório.',
      ],
    },
  ],
  exemplo: {
    arquivo: 'examples/unit/cobertura.test.ts',
    alvo: 'examples/unit/cobertura.test.ts',
    runner: 'vitest',
    descricao: 'Quatro testes que, juntos, percorrem todos os ramos de classificar().',
    sut: 'sut/core/classificacao.ts',
    anotacoes: [
      { linha: 5, nota: 'A meta: cada um dos quatro caminhos de classificar() exercitado por um teste.' },
      { linha: 8, nota: 'Ramo 1: xp < 100 → novato.' },
      { linha: 12, nota: 'Ramo 2: 100 ≤ xp < 1000 → veterano.' },
      { linha: 16, nota: 'Ramo 3: xp ≥ 1000 → lenda.' },
      { linha: 20, nota: 'Ramo de guarda: xp < 0 lança erro. Sem este teste, faltaria 1 ramo na cobertura.' },
    ],
  },
  discussao: [
    'Rode `npm run coverage` (script já incluído) — na primeira vez o Vitest se oferece para instalar o provedor @vitest/coverage-v8. O relatório lista arquivo por arquivo o % de linhas/ramos/funções e marca as linhas vermelhas (não cobertas).',
    'Meta de cobertura como política de equipe é comum (ex.: 80%+), mas trate o número como piso de sanidade, não como prova de qualidade. Um teste que executa a linha sem um expect significativo infla a cobertura sem proteger nada.',
    'A maior utilidade prática: a cobertura aponta o "você esqueceu este caminho". Quase sempre o ramo não coberto é justamente um caso de erro ou uma condição rara — onde os bugs gostam de morar.',
    'Combine com o Módulo 4: cobrir um ramo geralmente é cobrir uma BORDA. Cobertura e teste de bordas se reforçam.',
  ],
  desafio: {
    enunciado:
      'O ramo "lenda" (1000+ XP) está sem cobertura. O teste do desafio tenta cobri-lo, mas afirma a faixa ' +
      'errada e fica VERMELHO. Aperte [r] para ver, depois [e] para corrigir a asserção com a faixa certa ' +
      'para 1000 de XP. Ao acertar, esse ramo passa a ser coberto. Salve e rode com [r].',
    arquivoBase: 'examples/desafios/modulo07.test.ts',
    alvo: 'examples/desafios/modulo07.test.ts',
    runner: 'vitest',
    dica: 'classificar devolve "lenda" quando xp ≥ 1000. E 1000 é exatamente o limite.',
    solucao: "expect(faixa).toBe('lenda');",
  },
  quiz: [
    {
      pergunta: 'O que a cobertura de RAMOS mede?',
      opcoes: [
        'Quantos arquivos existem',
        'Se cada caminho de um if/else foi executado por algum teste',
        'A velocidade dos testes',
        'O número de asserções',
      ],
      correta: 1,
      explicacao: 'Cobertura de ramos verifica se cada lado das decisões (if/else/?:) foi exercitado.',
    },
    {
      pergunta: '100% de cobertura significa que o código não tem bugs?',
      opcoes: [
        'Sim, é prova de ausência de bugs',
        'Não — significa que tudo rodou ao menos uma vez, mas as asserções podem ser fracas',
        'Sim, desde que use Vitest',
        'Só com testes E2E',
      ],
      correta: 1,
      explicacao: 'Cobertura mostra o que NUNCA foi testado; não prova que o que rodou está correto.',
    },
    {
      pergunta: 'Qual o uso mais valioso de um relatório de cobertura?',
      opcoes: [
        'Bater 100% a qualquer custo',
        'Descobrir caminhos/ramos esquecidos, geralmente casos de erro',
        'Medir a produtividade do time',
        'Substituir a revisão de código',
      ],
      correta: 1,
      explicacao: 'Ele aponta o que você esqueceu de testar — quase sempre condições raras e de erro.',
    },
  ],
  xp: 100,
};

export default modulo;
