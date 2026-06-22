import type { Modulo } from '../src/types.js';

/**
 * Módulo 5 — Estado entre testes: beforeEach/afterEach.
 * Exemplo: examples/unit/carteira.test.ts (classe Carteira, com estado).
 */
const modulo: Modulo = {
  id: 5,
  titulo: 'Estado entre testes: beforeEach/afterEach',
  camada: 'unidade',
  conceitoEmFoco: {
    termo: 'Isolamento de testes',
    explicacao:
      'Cada teste deve rodar como se fosse o único: sem depender do que outro teste fez antes. Quando há ' +
      'estado (uma classe, um banco, um arquivo), use beforeEach para montar um cenário novo antes de cada ' +
      'teste e afterEach para limpar. Assim a ordem dos testes deixa de importar.',
  },
  objetivos: [
    'Explicar por que estado compartilhado entre testes causa falhas intermitentes',
    'Usar beforeEach para recriar o cenário antes de cada teste',
    'Conhecer afterEach/beforeAll/afterAll e quando cada um se aplica',
    'Reconhecer um teste que "vaza" estado para o próximo',
  ],
  teoria: [
    {
      titulo: 'O problema do estado compartilhado',
      paragrafos: [
        'Se uma mesma Carteira é usada por vários testes, o depósito de um vira a "bagunça" do outro.',
        'O teste pode passar sozinho e falhar quando roda junto — ou falhar só quando a ordem muda.',
        'Esse tipo de falha intermitente (flaky) é dos mais chatos de depurar.',
      ],
    },
    {
      titulo: 'Os ganchos (hooks) do Vitest',
      paragrafos: [
        'beforeEach(fn): roda antes de CADA teste — ideal para recriar o objeto sob teste.',
        'afterEach(fn): roda depois de cada teste — ideal para limpar (fechar conexão, apagar arquivo).',
        'beforeAll/afterAll: rodam UMA vez para o bloco inteiro — use para setup caro e somente-leitura.',
      ],
    },
    {
      titulo: 'Regra prática',
      paragrafos: [
        'Prefira beforeEach a beforeAll quando há mutação: recriar é mais seguro que reaproveitar.',
        'beforeAll só quando o recurso é pesado E os testes não o modificam.',
      ],
    },
  ],
  exemplo: {
    arquivo: 'examples/unit/carteira.test.ts',
    alvo: 'examples/unit/carteira.test.ts',
    runner: 'vitest',
    descricao: 'beforeEach recria a Carteira antes de cada teste, garantindo isolamento.',
    sut: 'sut/core/carteira.ts',
    anotacoes: [
      { linha: 4, nota: 'A Carteira tem estado (saldo) — é o caso clássico que exige isolamento. Pressione [c] para ver o SUT.' },
      { linha: 7, nota: 'Declaramos a variável aqui (let), mas só a preenchemos dentro do beforeEach.' },
      { linha: 9, nota: 'beforeEach: este bloco roda antes de CADA it().' },
      { linha: 11, nota: 'A cada teste, uma Carteira NOVA — nenhum saldo vaza do teste anterior.' },
      { linha: 15, nota: 'Primeiro teste: confia que o saldo começa em 0 (garantido pelo beforeEach).' },
      { linha: 23, nota: 'Terceiro teste deposita e saca; só passa porque começou do zero.' },
      { linha: 28, nota: 'Sem o beforeEach, o saldo aqui seria 100+100-30 = 170 e o teste falharia.' },
    ],
  },
  discussao: [
    'Sintoma típico de estado vazado: o teste passa quando roda sozinho, mas falha na suíte completa — ou só quando você muda a ordem. Se vir isso, desconfie de estado compartilhado.',
    'beforeEach versus beforeAll: o primeiro recria a cada teste (seguro, isola); o segundo roda uma vez (rápido, mas perigoso se os testes mutam o recurso). Na dúvida, beforeEach.',
    'afterEach é onde mora a limpeza: fechar conexões, remover arquivos temporários, restaurar mocks. Em testes de API/E2E ele evita que um teste deixe lixo para o próximo.',
    'Declarar a variável fora (let carteira) e atribuir dentro do beforeEach é o padrão: o escopo do describe enxerga a variável, mas o valor é renovado a cada teste.',
  ],
  desafio: {
    enunciado:
      'No desafio, a Carteira é criada UMA vez e compartilhada: o depósito do "teste A" vaza para o "teste B", ' +
      'que fica VERMELHO. Aperte [r] para ver a falha, depois [e] para consertar o isolamento: troque a criação ' +
      'fixa por um beforeEach que recria a carteira antes de cada teste (lembre de importar beforeEach). Rode com [r].',
    arquivoBase: 'examples/desafios/modulo05.test.ts',
    alvo: 'examples/desafios/modulo05.test.ts',
    runner: 'vitest',
    dica: 'Importe beforeEach, declare `let carteira: Carteira;` e faça `beforeEach(() => { carteira = new Carteira(); });`.',
    solucao:
      "import { describe, it, expect, beforeEach } from 'vitest';\n" +
      '...\n' +
      'let carteira: Carteira;\n' +
      'beforeEach(() => {\n' +
      '  carteira = new Carteira();\n' +
      '});',
  },
  quiz: [
    {
      pergunta: 'Para que serve o beforeEach?',
      opcoes: [
        'Rodar uma vez antes de todos os testes',
        'Rodar antes de CADA teste, montando um cenário novo',
        'Rodar depois de cada teste',
        'Pular um teste',
      ],
      correta: 1,
      explicacao: 'beforeEach executa antes de cada it(), garantindo que todo teste comece de um estado limpo.',
    },
    {
      pergunta: 'Um teste passa sozinho mas falha quando roda com os outros. Causa provável?',
      opcoes: [
        'O Vitest está com bug',
        'Estado compartilhado vazando entre os testes',
        'Falta de await',
        'Matcher errado',
      ],
      correta: 1,
      explicacao: 'É o sintoma clássico de falta de isolamento — estado de um teste influencia o outro.',
    },
    {
      pergunta: 'Quando beforeAll é preferível a beforeEach?',
      opcoes: [
        'Sempre, porque é mais rápido',
        'Quando o setup é caro E os testes NÃO modificam o recurso',
        'Nunca se deve usar beforeAll',
        'Quando há muitos testes',
      ],
      correta: 1,
      explicacao: 'beforeAll roda uma vez só; vale quando o recurso é pesado e somente-leitura. Se há mutação, use beforeEach.',
    },
  ],
  xp: 100,
};

export default modulo;
