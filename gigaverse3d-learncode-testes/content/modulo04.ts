import type { Modulo } from '../src/types.js';

/**
 * Módulo 4 — Casos de borda e erros esperados.
 * Exemplo: examples/unit/bordas.test.ts (usa nivel.ts e carteira.ts).
 */
const modulo: Modulo = {
  id: 4,
  titulo: 'Casos de borda e erros esperados',
  camada: 'unidade',
  conceitoEmFoco: {
    termo: 'Caminho infeliz',
    explicacao:
      'Testar o "caminho feliz" (entradas válidas) é só metade do trabalho. Os bugs se escondem nas ' +
      'BORDAS (zero, limites, vazio, negativo) e no "caminho infeliz" — quando o código deve recusar a ' +
      'entrada e lançar um erro. toThrow é o matcher que verifica esse comportamento.',
  },
  objetivos: [
    'Identificar valores de borda (limites, zero, vazio) que merecem um teste',
    'Verificar que uma função lança erro com expect(() => ...).toThrow()',
    'Afirmar a mensagem do erro, não só que "algum erro" ocorreu',
    'Confirmar que o estado não foi corrompido depois de um erro',
  ],
  teoria: [
    {
      titulo: 'Onde os bugs se escondem',
      paragrafos: [
        'Se a regra muda em 100 ("100 de XP vira nível 2"), teste 99, 100 e 101: o exato ponto da virada',
        'é onde erros de < vs <= aparecem. Outras bordas clássicas: 0, lista vazia, string vazia, negativos.',
      ],
    },
    {
      titulo: 'Testando erros com toThrow',
      paragrafos: [
        'Para capturar um erro, passe uma FUNÇÃO ao expect: expect(() => f(-1)).toThrow().',
        'Se você escrever expect(f(-1)) o erro estoura ANTES do expect e o teste quebra por engano.',
        'toThrow("texto") confere que a mensagem contém aquele trecho — bem mais específico que só toThrow().',
      ],
    },
    {
      titulo: 'O erro deixou tudo consistente?',
      paragrafos: [
        'Depois de um erro esperado, vale checar que nada foi alterado pela metade — por exemplo, que o',
        'saldo continua o mesmo após um saque recusado. Isso pega bugs de estado parcial.',
      ],
    },
  ],
  exemplo: {
    arquivo: 'examples/unit/bordas.test.ts',
    alvo: 'examples/unit/bordas.test.ts',
    runner: 'vitest',
    descricao: 'Bordas de nível (99/100/101) e erros esperados em calcularNivel e na Carteira.',
    sut: 'sut/core/carteira.ts',
    anotacoes: [
      { linha: 7, nota: 'Bordas em torno da regra: 99, 100 e 101 — o ponto exato da virada de nível.' },
      { linha: 9, nota: 'O limite 100 vira nível 2: aqui um bug de < vs <= apareceria na hora.' },
      { linha: 13, nota: 'Início do caminho infeliz: entrada inválida deve lançar erro.' },
      { linha: 15, nota: 'expect(() => ...).toThrow(): passamos uma FUNÇÃO; o Vitest a chama e captura o erro.' },
      { linha: 17, nota: 'toThrow("negativo") confere que a MENSAGEM contém esse trecho — mais específico.' },
      { linha: 25, nota: 'Erro esperado na Carteira: sacar acima do saldo lança "saldo insuficiente".' },
      { linha: 26, nota: 'Depois do erro, o saldo continua intacto (50) — o estado não corrompeu.' },
    ],
  },
  discussao: [
    'A pergunta "quais são as bordas?" rende mais testes úteis do que repetir o caminho feliz com números diferentes. Pense em: menor valor, maior valor, zero, vazio, negativo, o ponto exato de uma regra.',
    'O erro mais comum aqui é escrever expect(f(-1)).toThrow() — sem a arrow function. Aí f(-1) executa e lança ANTES do expect, e o teste falha por motivo errado. Sempre embrulhe em () => ....',
    'Afirmar a mensagem (toThrow("saldo insuficiente")) documenta QUAL erro você espera. Mas não cole a mensagem inteira: um trecho estável basta e não quebra a cada ajuste de texto.',
    'Verificar o estado após o erro (saldo intacto) protege contra bugs de "meio-caminho" — quando a função altera algo e só depois decide falhar.',
  ],
  desafio: {
    enunciado:
      'O teste do desafio quer verificar que sacar de uma carteira vazia lança erro — mas chama c.sacar(10) ' +
      'DIRETO dentro do expect, então o erro estoura antes da hora e o teste fica vermelho. Aperte [r] para ver, ' +
      'depois [e] para corrigir: embrulhe a chamada numa arrow function — expect(() => c.sacar(10)).toThrow(...). Rode com [r].',
    arquivoBase: 'examples/desafios/modulo04.test.ts',
    alvo: 'examples/desafios/modulo04.test.ts',
    runner: 'vitest',
    dica: 'Para testar um erro, passe uma FUNÇÃO ao expect: () => c.sacar(10).',
    solucao: "expect(() => c.sacar(10)).toThrow('saldo insuficiente');",
  },
  quiz: [
    {
      pergunta: 'A regra é "100 de XP vira nível 2". Quais valores melhor testam a borda?',
      opcoes: ['1, 2, 3', '99, 100, 101', '50, 60, 70', '1000, 2000'],
      correta: 1,
      explicacao: 'Testar logo abaixo, no ponto e logo acima do limite pega erros de < vs <=.',
    },
    {
      pergunta: 'Qual forma testa corretamente que uma função lança erro?',
      opcoes: [
        'expect(f(-1)).toThrow()',
        'expect(() => f(-1)).toThrow()',
        'expect(f).toThrow(-1)',
        'expect(f(-1)).toBe(Error)',
      ],
      correta: 1,
      explicacao: 'Passe uma função: expect(() => f(-1)).toThrow(). Sem a arrow, o erro estoura antes do expect.',
    },
    {
      pergunta: 'Por que verificar o estado depois de um erro esperado?',
      opcoes: [
        'Para deixar o teste mais longo',
        'Para garantir que a operação não alterou nada pela metade',
        'Porque o Vitest exige isso',
        'Não faz sentido testar isso',
      ],
      correta: 1,
      explicacao: 'Confirma que a função falhou de forma limpa, sem corromper o estado (ex.: saldo intacto).',
    },
  ],
  xp: 100,
};

export default modulo;
