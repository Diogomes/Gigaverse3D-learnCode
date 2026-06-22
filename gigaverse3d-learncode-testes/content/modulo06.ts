import type { Modulo } from '../src/types.js';

/**
 * Módulo 6 — Test doubles: mocks, spies e stubs.
 * Exemplo: examples/unit/loja.test.ts (usa sut/core/loja.ts com deps injetadas).
 */
const modulo: Modulo = {
  id: 6,
  titulo: 'Test doubles: mocks, spies e stubs',
  camada: 'unidade',
  conceitoEmFoco: {
    termo: 'Test double',
    explicacao:
      'É um "dublê" que substitui uma dependência real durante o teste. Um STUB devolve valores ' +
      'controlados (uma consulta fingida); um SPY registra como foi chamado (para você verificar a ' +
      'interação). No Vitest, vi.fn() cria os dois — e vi.spyOn()/vi.mock() agem sobre código existente.',
  },
  objetivos: [
    'Entender por que isolar a função sob teste de suas dependências',
    'Criar um stub com vi.fn().mockReturnValue(...) para controlar uma consulta',
    'Usar um spy (vi.fn()) e verificar a interação com toHaveBeenCalledWith/Times',
    'Afirmar que algo NÃO foi chamado com not.toHaveBeenCalled()',
  ],
  teoria: [
    {
      titulo: 'Por que dublar uma dependência',
      paragrafos: [
        'Às vezes a função sob teste depende de algo lento, imprevisível ou com efeito colateral:',
        'rede, banco, relógio, aleatoriedade, envio de e-mail. Testar com o real deixa o teste lento e',
        'instável. O double troca isso por algo rápido e determinístico que VOCÊ controla.',
      ],
    },
    {
      titulo: 'O vocabulário (sem neura com os nomes)',
      paragrafos: [
        'STUB: devolve uma resposta pronta (ex.: "o preço é 30"). Foca na ENTRADA da função.',
        'SPY/MOCK: grava as chamadas para você verificar depois. Foca na INTERAÇÃO (foi chamado? com quê?).',
        'No Vitest, vi.fn() é a ferramenta única: .mockReturnValue() o torna stub; as asserções',
        'toHaveBeenCalled* o usam como spy. Não se prenda às fronteiras dos termos — entenda a intenção.',
      ],
    },
    {
      titulo: 'Verificar estado × verificar interação',
      paragrafos: [
        'Há duas perguntas: "qual o resultado?" (estado, via toBe/toEqual) e "como as peças',
        'conversaram?" (interação, via toHaveBeenCalledWith). Doubles brilham na segunda.',
      ],
    },
  ],
  exemplo: {
    arquivo: 'examples/unit/loja.test.ts',
    alvo: 'examples/unit/loja.test.ts',
    runner: 'vitest',
    descricao: 'comprar() recebe as dependências injetadas; o teste as substitui por doubles.',
    sut: 'sut/core/loja.ts',
    anotacoes: [
      { linha: 1, nota: 'vi é o objeto do Vitest para criar e controlar doubles.' },
      { linha: 8, nota: 'STUB: vi.fn().mockReturnValue(30) devolve sempre 30 — preço controlado, sem consultar nada real.' },
      { linha: 10, nota: 'SPY: vi.fn() sem retorno; só registra as chamadas para verificarmos depois.' },
      { linha: 15, nota: 'Verificação de ESTADO: o saldo final retornado é 70.' },
      { linha: 17, nota: 'Verificação de INTERAÇÃO: a notificação foi chamada exatamente uma vez.' },
      { linha: 18, nota: 'toHaveBeenCalledWith confere os argumentos exatos da chamada.' },
      { linha: 25, nota: 'Caminho infeliz: preço acima do saldo lança erro (note a arrow function no expect).' },
      { linha: 29, nota: 'not.toHaveBeenCalled(): provamos que a venda NÃO foi notificada quando deu erro.' },
    ],
  },
  discussao: [
    'Injetar dependências (passá-las por parâmetro) é o que torna o código testável sem mágica. Quando não dá para injetar, vi.spyOn(obj, "metodo") e vi.mock("modulo") substituem código já existente.',
    'Cuidado com o excesso de mocks: se você dubla tudo, o teste só verifica que "o código chama o que você mandou chamar" — e passa mesmo com a lógica errada. Duble as FRONTEIRAS (rede, relógio), não a lógica que você quer validar.',
    'Stub responde "o que retorna"; spy responde "como foi chamado". Muitos bugs aparecem só na interação — ex.: notificar a venda duas vezes, ou com o valor errado.',
    'Resete os doubles entre testes (vi.clearAllMocks() em afterEach, ou a opção clearMocks) para que a contagem de chamadas de um teste não vaze para o outro — conecta com o Módulo 5 (isolamento).',
  ],
  desafio: {
    enunciado:
      'No desafio, o spy aoVender é verificado com número de chamadas e argumentos ERRADOS, então fica ' +
      'VERMELHO. Aperte [r] para ver, depois [e] para corrigir: aoVender deve ter sido chamado 1 vez, com ' +
      "('poção', 60). Ajuste o toHaveBeenCalledTimes e o toHaveBeenCalledWith. Salve e rode com [r].",
    arquivoBase: 'examples/desafios/modulo06.test.ts',
    alvo: 'examples/desafios/modulo06.test.ts',
    runner: 'vitest',
    dica: 'O item custa 40 e o saldo era 100 → saldoFinal 60. A venda é notificada uma única vez.',
    solucao:
      "expect(aoVender).toHaveBeenCalledTimes(1);\nexpect(aoVender).toHaveBeenCalledWith('poção', 60);",
  },
  quiz: [
    {
      pergunta: 'Qual a diferença entre um STUB e um SPY?',
      opcoes: [
        'Stub é mais rápido que spy',
        'Stub devolve valores controlados; spy registra como foi chamado',
        'São exatamente a mesma coisa',
        'Spy só funciona com rede',
      ],
      correta: 1,
      explicacao: 'Stub foca na resposta (entrada da função); spy foca na interação (como/se foi chamado).',
    },
    {
      pergunta: 'Como verificar que um spy foi chamado com argumentos específicos?',
      opcoes: [
        'expect(spy).toBe(args)',
        'expect(spy).toHaveBeenCalledWith(...args)',
        'expect(spy).toContain(args)',
        'expect(spy).toEqual(args)',
      ],
      correta: 1,
      explicacao: 'toHaveBeenCalledWith confere os argumentos da chamada. Há também toHaveBeenCalledTimes.',
    },
    {
      pergunta: 'Qual é o RISCO de mockar demais?',
      opcoes: [
        'O teste fica lento',
        'O teste passa mesmo com a lógica errada, pois só verifica chamadas combinadas',
        'O Vitest trava',
        'Não há risco nenhum',
      ],
      correta: 1,
      explicacao: 'Dublar a própria lógica faz o teste virar um espelho do código. Duble as fronteiras, não a lógica sob teste.',
    },
  ],
  xp: 100,
};

export default modulo;
