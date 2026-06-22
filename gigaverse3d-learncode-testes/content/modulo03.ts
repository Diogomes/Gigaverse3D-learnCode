import type { Modulo } from '../src/types.js';

/**
 * Módulo 3 — Asserções e matchers do Vitest.
 * Exemplo: examples/unit/matchers.test.ts (usa sut/core/personagem.ts).
 */
const modulo: Modulo = {
  id: 3,
  titulo: 'Asserções e matchers do Vitest',
  camada: 'unidade',
  conceitoEmFoco: {
    termo: 'Matcher',
    explicacao:
      'Um matcher é a parte do expect que diz O QUE comparar: .toBe(), .toEqual(), .toContain(), ' +
      '.toThrow()… Escolher o matcher certo para cada tipo de valor é o que torna a falha clara — e ' +
      'evita o erro clássico de comparar objetos com toBe.',
  },
  objetivos: [
    'Distinguir toBe (identidade) de toEqual (conteúdo) e saber quando usar cada um',
    'Usar toMatchObject para verificar só parte de um objeto',
    'Inspecionar arrays com toContain e toHaveLength',
    'Negar uma asserção com .not e usar matchers numéricos',
  ],
  teoria: [
    {
      titulo: 'toBe × toEqual — o erro mais comum',
      paragrafos: [
        'toBe usa === : perfeito para números, strings e booleanos.',
        'Para objetos e arrays, === compara REFERÊNCIA — dois objetos iguais "no conteúdo" mas',
        'criados separadamente são diferentes para o ===. Por isso use toEqual, que compara o',
        'conteúdo recursivamente. Trocar um pelo outro é a pegadinha nº 1 de quem começa.',
      ],
    },
    {
      titulo: 'Matchers parciais e de coleção',
      paragrafos: [
        'toMatchObject verifica um subconjunto: útil quando o objeto tem campos que não importam.',
        'toContain checa se um item está no array (ou substring numa string); toHaveLength checa o tamanho.',
      ],
    },
    {
      titulo: 'Negação e números',
      paragrafos: [
        'Qualquer matcher pode ser negado com .not (ex.: expect(x).not.toBe(y)).',
        'Para números há toBeGreaterThan, toBeLessThan, toBeCloseTo (para floats), entre outros.',
      ],
    },
  ],
  exemplo: {
    arquivo: 'examples/unit/matchers.test.ts',
    alvo: 'examples/unit/matchers.test.ts',
    runner: 'vitest',
    descricao: 'Uma vitrine de matchers aplicada a um Personagem (objeto + array).',
    sut: 'sut/core/personagem.ts',
    anotacoes: [
      { linha: 2, nota: 'SUT: criarPersonagem devolve um objeto; equipar devolve uma cópia nova. Pressione [c].' },
      { linha: 8, nota: 'toBe em primitivos (número, string): compara por identidade (===).' },
      { linha: 14, nota: 'Comentário-chave: toBe falharia aqui porque as referências são diferentes.' },
      { linha: 15, nota: 'toEqual compara o CONTEÚDO do objeto, campo a campo — é o matcher certo aqui.' },
      { linha: 20, nota: 'toMatchObject só exige o subconjunto informado; os outros campos são ignorados.' },
      { linha: 25, nota: 'toContain verifica que "espada" está no array de itens.' },
      { linha: 26, nota: 'toHaveLength checa o tamanho do array sem você comparar o array inteiro.' },
      { linha: 31, nota: 'Matcher numérico: toBeGreaterThan(0).' },
      { linha: 32, nota: '.not inverte a asserção — o nome NÃO deve ser "Outro".' },
    ],
  },
  discussao: [
    'Regra de bolso: primitivo → toBe; objeto/array → toEqual. Se errar e usar toBe num objeto, a mensagem de falha do Vitest até sugere o toEqual.',
    'toEqual ignora campos com valor undefined; se você quer ser estrito quanto a isso, existe o toStrictEqual.',
    'toMatchObject brilha em respostas de API, onde o corpo tem campos voláteis (id, data) que você não quer fixar no teste — tema dos módulos de integração.',
    'Prefira o matcher mais específico: toHaveLength(2) dá uma falha mais clara do que expect(arr.length).toBe(2).',
  ],
  desafio: {
    enunciado:
      'O teste do desafio equipa dois itens (espada e escudo), mas usa os matchers errados de propósito ' +
      'e fica VERMELHO. Aperte [r] para ver, depois [e] para corrigir: (1) compare a mochila inteira por ' +
      'conteúdo com toEqual(["espada","escudo"]); (2) ajuste o toHaveLength para 2. Salve e rode com [r].',
    arquivoBase: 'examples/desafios/modulo03.test.ts',
    alvo: 'examples/desafios/modulo03.test.ts',
    runner: 'vitest',
    dica: 'Array por conteúdo nunca usa toBe — use toEqual. E a mochila tem 2 itens, não 0.',
    solucao: "expect(p.itens).toEqual(['espada', 'escudo']);\nexpect(p.itens).toHaveLength(2);",
  },
  quiz: [
    {
      pergunta: 'Qual matcher usar para comparar dois objetos por CONTEÚDO?',
      opcoes: ['toBe', 'toEqual', 'toContain', 'toBeGreaterThan'],
      correta: 1,
      explicacao: 'toEqual compara o conteúdo recursivamente. toBe usa === e falharia para objetos distintos.',
    },
    {
      pergunta: 'Por que expect({a:1}).toBe({a:1}) falha?',
      opcoes: [
        'Porque toBe não existe',
        'Porque === compara referência, e são dois objetos diferentes na memória',
        'Porque objetos não podem ser testados',
        'Porque falta o await',
      ],
      correta: 1,
      explicacao: 'São objetos distintos: mesma forma, referências diferentes. Para conteúdo, use toEqual.',
    },
    {
      pergunta: 'Como afirmar que um array tem exatamente 3 itens?',
      opcoes: ['toContain(3)', 'toBe(3)', 'toHaveLength(3)', 'toEqual(3)'],
      correta: 2,
      explicacao: 'toHaveLength(3) verifica o tamanho e dá uma mensagem de falha clara.',
    },
  ],
  xp: 100,
};

export default modulo;
