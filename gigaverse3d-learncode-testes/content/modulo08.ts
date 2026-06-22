import type { Modulo } from '../src/types.js';

/**
 * Módulo 8 — TDD: red, green, refactor.
 * Exemplo: examples/unit/tdd.test.ts (calcularDano, construída test-first).
 */
const modulo: Modulo = {
  id: 8,
  titulo: 'TDD: red, green, refactor',
  camada: 'transversal',
  conceitoEmFoco: {
    termo: 'TDD (Test-Driven Development)',
    explicacao:
      'É escrever o teste ANTES do código. O ciclo tem três passos curtos: 🔴 red (um teste que falha ' +
      'porque o comportamento ainda não existe), 🟢 green (o mínimo de código para passar) e 🔧 refactor ' +
      '(limpar o código com a rede de segurança dos testes verdes). Repete-se, um pedacinho por vez.',
  },
  objetivos: [
    'Entender e aplicar o ciclo red → green → refactor',
    'Escrever o teste antes da implementação para guiar o design',
    'Implementar o MÍNIMO necessário para passar (sem adivinhar o futuro)',
    'Refatorar com segurança, apoiado nos testes verdes',
  ],
  teoria: [
    {
      titulo: 'O ciclo em três passos',
      paragrafos: [
        '🔴 Red: escreva um teste para o próximo comportamento desejado. Ele falha (a função nem existe ainda).',
        '🟢 Green: escreva o MENOR código que faz o teste passar — sem se preocupar com elegância.',
        '🔧 Refactor: agora que está verde, melhore o código (nomes, duplicação) sem mudar o comportamento.',
        'Volte ao red para o próximo comportamento. Cada volta é pequena e segura.',
      ],
    },
    {
      titulo: 'Por que escrever o teste primeiro',
      paragrafos: [
        'O teste vira a primeira pessoa a USAR o seu código — então você projeta uma interface boa de usar.',
        'Você só escreve código que é necessário (guiado por um teste), evitando over-engineering.',
        'E ganha, de graça, uma suíte que descreve o comportamento e protege contra regressões.',
      ],
    },
    {
      titulo: 'Disciplina do passo pequeno',
      paragrafos: [
        'O segredo é o tamanho do passo: um comportamento por ciclo. calcularDano nasceu assim — primeiro',
        '"ataque - defesa", depois a regra do "dano mínimo 1". Cada regra entrou com seu próprio ciclo.',
      ],
    },
  ],
  exemplo: {
    arquivo: 'examples/unit/tdd.test.ts',
    alvo: 'examples/unit/tdd.test.ts',
    runner: 'vitest',
    descricao: 'calcularDano foi construída em dois ciclos de TDD; os testes contam essa história.',
    sut: 'sut/core/combate.ts',
    anotacoes: [
      { linha: 4, nota: 'O comentário descreve a ordem real: cada teste veio de um ciclo red→green→refactor.' },
      { linha: 8, nota: '1º ciclo (red→green): a primeira regra, "dano = ataque - defesa".' },
      { linha: 12, nota: '2º ciclo: a segunda regra, "dano mínimo 1", que forçou o Math.max no código.' },
    ],
  },
  discussao: [
    'A parte contraintuitiva do TDD é ver o teste FALHAR de propósito antes de implementar. Esse "red" confirma que o teste realmente testa algo — um teste que nunca foi vermelho pode estar verde por engano.',
    'No "green", resista à tentação de já resolver tudo. Faça o mínimo para passar; os próximos casos virão em ciclos seguintes. Isso evita escrever código para requisitos que talvez nunca existam.',
    'O "refactor" só é seguro por causa dos testes verdes: você muda a forma do código com a confiança de que, se quebrar o comportamento, um teste fica vermelho na hora.',
    'TDD não é obrigatório em tudo, mas é poderoso para regras de negócio e bugs: ao corrigir um bug, escreva primeiro o teste que o reproduz (red), depois conserte (green). O bug não volta sem avisar.',
  ],
  desafio: {
    enunciado:
      'No espírito do TDD, o teste descreve o comportamento antes de tudo. Aqui ataque e defesa são iguais ' +
      '(5 e 5); pela regra do dano mínimo, o resultado não pode ser 0. O Assert está como 0 e fica VERMELHO. ' +
      'Aperte [r] para ver, depois [e] para corrigir o valor esperado. Salve e rode com [r].',
    arquivoBase: 'examples/desafios/modulo08.test.ts',
    alvo: 'examples/desafios/modulo08.test.ts',
    runner: 'vitest',
    dica: 'calcularDano usa Math.max(1, ataque - defesa). Com 5 e 5, ataque - defesa = 0, mas o mínimo é 1.',
    solucao: 'expect(dano).toBe(1);',
  },
  quiz: [
    {
      pergunta: 'Qual é a ordem correta do ciclo de TDD?',
      opcoes: [
        'Green → Red → Refactor',
        'Red → Green → Refactor',
        'Refactor → Red → Green',
        'Code → Test → Deploy',
      ],
      correta: 1,
      explicacao: 'Primeiro um teste que falha (red), depois o mínimo para passar (green), depois limpar (refactor).',
    },
    {
      pergunta: 'Por que é importante VER o teste falhar antes de implementar?',
      opcoes: [
        'Para ganhar tempo',
        'Para confirmar que o teste realmente verifica o comportamento (e não passa por engano)',
        'Porque o Vitest exige',
        'Não é importante',
      ],
      correta: 1,
      explicacao: 'Um teste que nunca foi vermelho pode estar verde por acaso. O red prova que ele tem efeito.',
    },
    {
      pergunta: 'No passo "green", o que você deve escrever?',
      opcoes: [
        'A solução mais completa e geral possível',
        'O mínimo de código necessário para o teste passar',
        'Apenas comentários',
        'Outro teste',
      ],
      correta: 1,
      explicacao: 'O mínimo para passar. Generalizações e melhorias vêm no refactor e nos próximos ciclos.',
    },
  ],
  xp: 100,
};

export default modulo;
