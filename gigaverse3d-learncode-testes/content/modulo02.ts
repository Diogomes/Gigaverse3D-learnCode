import type { Modulo } from '../src/types.js';

/**
 * Módulo 2 — Anatomia de um teste: o padrão AAA.
 * Exemplo: examples/unit/validacoes.test.ts (testa nomeJogadorValido).
 */
const modulo: Modulo = {
  id: 2,
  titulo: 'Anatomia de um teste: o padrão AAA',
  camada: 'unidade',
  conceitoEmFoco: {
    termo: 'AAA — Arrange, Act, Assert',
    explicacao:
      'Quase todo teste tem três fases: Arrange (preparar os dados de entrada), Act (executar o que ' +
      'está sob teste) e Assert (verificar o resultado). Separar essas fases — mesmo com comentários — ' +
      'deixa o teste óbvio de ler e fácil de manter.',
  },
  objetivos: [
    'Identificar Arrange, Act e Assert em qualquer teste',
    'Escrever um teste de unidade do zero seguindo o AAA',
    'Dar nomes de teste que descrevem o comportamento, não a implementação',
    'Entender por que um teste deve verificar UMA ideia de cada vez',
  ],
  teoria: [
    {
      titulo: 'As três fases',
      paragrafos: [
        'Arrange: monte o cenário — variáveis, objetos, entradas que o teste precisa.',
        'Act: chame a função/método sob teste e guarde o resultado.',
        'Assert: compare o resultado com o esperado usando expect(...).',
        'Em testes curtos as fases podem virar uma linha só, mas a ordem de raciocínio é sempre essa.',
      ],
    },
    {
      titulo: 'Um bom nome conta uma história',
      paragrafos: [
        'O nome do it() aparece no relatório. "rejeita um nome curto demais" explica o sistema;',
        '"testa nomeJogadorValido 2" não explica nada. Descreva o COMPORTAMENTO esperado.',
      ],
    },
    {
      titulo: 'Uma ideia por teste',
      paragrafos: [
        'Cada it() deve checar um comportamento. Assim, quando ele fica vermelho, você sabe',
        'exatamente o que quebrou — sem precisar caçar entre dez asserções qual delas falhou.',
      ],
    },
  ],
  exemplo: {
    arquivo: 'examples/unit/validacoes.test.ts',
    alvo: 'examples/unit/validacoes.test.ts',
    runner: 'vitest',
    descricao: 'Três testes para nomeJogadorValido, com Arrange/Act/Assert explícitos.',
    sut: 'sut/core/validacoes.ts',
    anotacoes: [
      { linha: 2, nota: 'Importa o código sob teste (SUT): nomeJogadorValido. Pressione [c] para vê-lo.' },
      { linha: 6, nota: 'O nome do teste descreve o comportamento esperado, não a implementação.' },
      { linha: 8, nota: 'Arrange: preparamos a entrada (um nome válido).' },
      { linha: 10, nota: 'Act: executamos a função e guardamos o resultado numa variável.' },
      { linha: 12, nota: 'Assert: uma única verificação — o resultado deve ser true.' },
      { linha: 15, nota: 'Segundo teste: o caminho de rejeição (nome curto). Sempre cubra os dois lados.' },
      { linha: 24, nota: 'Terceiro teste: a regra do trim. Aqui as três fases cabem numa linha só.' },
    ],
  },
  discussao: [
    'Comentários // Arrange // Act // Assert são opcionais, mas ajudam quem está aprendendo a enxergar a estrutura. Com o tempo o olho reconhece as fases sem eles.',
    'Evite lógica (if, for) dentro do teste: um teste deve ser uma sequência linear e óbvia. Se precisa de um laço para testar vários casos, prefira it.each (tema das próximas fases).',
    'Asserções demais num teste só escondem qual comportamento falhou. "Uma ideia por teste" não significa "um expect por teste" — significa um comportamento por teste.',
    'O nome no it() é documentação executável: lendo o relatório verde você entende as regras do sistema sem abrir o código.',
  ],
  desafio: {
    enunciado:
      'O teste do desafio segue o AAA, mas a fase Act está incompleta (o resultado está fixo em false). ' +
      'Aperte [r] para ver falhar, depois [e] para editar: na fase Act, chame nomeJogadorValido(nome) e ' +
      'guarde em `valido`. Um nome com exatamente 20 caracteres é válido (é o limite superior). Salve e rode com [r].',
    arquivoBase: 'examples/desafios/modulo02.test.ts',
    alvo: 'examples/desafios/modulo02.test.ts',
    runner: 'vitest',
    dica: 'Troque `const valido = false;` por `const valido = nomeJogadorValido(nome);`.',
    solucao: 'const valido = nomeJogadorValido(nome);',
  },
  quiz: [
    {
      pergunta: 'No padrão AAA, em qual fase você CHAMA a função sob teste?',
      opcoes: ['Arrange', 'Act', 'Assert', 'Em nenhuma — isso é no setup'],
      correta: 1,
      explicacao: 'Act é a ação: executar o código sob teste. Arrange prepara e Assert verifica.',
    },
    {
      pergunta: 'Qual é o melhor nome para um teste?',
      opcoes: [
        'teste1',
        'testa a função',
        'rejeita um nome curto demais (2 caracteres)',
        'nomeJogadorValido',
      ],
      correta: 2,
      explicacao: 'Um bom nome descreve o comportamento esperado — vira documentação no relatório.',
    },
    {
      pergunta: 'Por que evitar muitas asserções não relacionadas no mesmo teste?',
      opcoes: [
        'Porque deixa o teste mais lento',
        'Porque quando falha você não sabe de imediato qual comportamento quebrou',
        'Porque o Vitest só permite um expect por teste',
        'Não há problema nenhum nisso',
      ],
      correta: 1,
      explicacao: 'Um comportamento por teste torna a falha autoexplicativa. Não é um limite técnico do Vitest.',
    },
  ],
  xp: 100,
};

export default modulo;
