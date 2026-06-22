import type { Modulo } from '../src/types.js';

/**
 * Módulo 1 — Por que testar? A pirâmide e o primeiro teste verde.
 * Exemplo executável: a suíte de unidade já existente (examples/unit/nivel.test.ts),
 * que testa a função pura `calcularNivel` (sut/core/nivel.ts).
 */
const modulo: Modulo = {
  id: 1,
  titulo: 'Por que testar? A pirâmide e o primeiro teste verde',
  camada: 'fundamentos',
  conceitoEmFoco: {
    termo: 'Teste automatizado',
    explicacao:
      'É um código que verifica outro código sozinho: prepara uma situação, executa a função e ' +
      'confere se o resultado é o esperado. Roda em segundos, sempre do mesmo jeito, e avisa na hora ' +
      'quando uma mudança quebra algo que já funcionava.',
  },
  objetivos: [
    'Entender o que um teste automatizado faz e por que ele economiza tempo',
    'Conhecer a pirâmide de testes: muitos de unidade, alguns de integração, poucos de E2E',
    'Ler uma suíte de testes de unidade e rodá-la de verdade, vendo a suíte ficar VERDE',
    'Identificar o padrão AAA (Arrange, Act, Assert) dentro de um teste',
  ],
  teoria: [
    {
      titulo: 'O que é um teste automatizado',
      paragrafos: [
        'Testar à mão é abrir o programa, digitar valores e olhar a tela. Funciona uma vez, mas não',
        'escala: a cada mudança você teria que repetir tudo. Um teste automatizado captura essa',
        'verificação em código — ele "usa" sua função e afirma qual deveria ser o resultado.',
        'Quando os testes passam, ficam VERDES; quando algo quebra, ficam VERMELHOS e apontam onde.',
      ],
    },
    {
      titulo: 'A pirâmide de testes (o fio condutor do curso)',
      paragrafos: [
        '🧱 Base — testes de UNIDADE: testam uma função/classe isolada. São muitos, rápidos e baratos.',
        '🔗 Meio — testes de INTEGRAÇÃO: testam peças conversando (ex.: uma API HTTP). São alguns.',
        '🌐 Topo — testes E2E: abrem o sistema inteiro num navegador de verdade. São poucos e lentos.',
        'A forma de pirâmide é proposital: concentre esforço na base, onde os testes são velozes e estáveis.',
      ],
    },
    {
      titulo: 'O padrão AAA',
      paragrafos: [
        'Quase todo teste tem três partes: Arrange (preparar os dados), Act (executar o que está sob teste)',
        'e Assert (verificar o resultado). Reconhecer essas três fases deixa qualquer teste fácil de ler.',
      ],
    },
  ],
  exemplo: {
    arquivo: 'examples/unit/nivel.test.ts',
    alvo: 'examples/unit/nivel.test.ts',
    runner: 'vitest',
    descricao: 'Três testes de unidade para a função pura calcularNivel (a base da pirâmide).',
    sut: 'sut/core/nivel.ts',
    anotacoes: [
      { linha: 1, nota: 'describe, it e expect são as três funções básicas do Vitest — agrupar, declarar e afirmar.' },
      { linha: 2, nota: 'Importa o código sob teste (SUT): a função pura calcularNivel. Pressione [c] para vê-la.' },
      { linha: 4, nota: 'O padrão AAA descrito num comentário — você vai vê-lo no corpo do primeiro teste.' },
      { linha: 5, nota: 'describe agrupa testes relacionados numa "suíte" com um nome.' },
      { linha: 6, nota: 'it (sinônimo de test) declara um caso de teste. A frase deve descrever o comportamento esperado.' },
      { linha: 8, nota: 'Arrange: preparamos a entrada (100 de XP).' },
      { linha: 10, nota: 'Act: executamos a função sob teste e guardamos o resultado.' },
      { linha: 12, nota: 'Assert: expect(valor).toBe(esperado) falha o teste se forem diferentes.' },
      { linha: 16, nota: 'Caso de borda: 0 de XP. Bons testes cobrem os limites, não só o "caminho feliz".' },
      { linha: 20, nota: 'toThrow verifica o caminho infeliz: XP negativo deve lançar erro.' },
    ],
  },
  discussao: [
    'Uma função PURA (mesma entrada → mesma saída, sem efeitos colaterais) é o código mais fácil de testar. Por isso a base da pirâmide é tão grande: a maior parte da lógica deveria viver em funções assim.',
    'Um bom nome de teste descreve o comportamento ("0 de XP é nível 1"), não a implementação. Ao ler o relatório, você entende o sistema sem abrir o código.',
    'toBe compara por identidade (===), ótimo para números, strings e booleanos. Para comparar objetos/arrays por conteúdo use toEqual — isso é tema do Módulo 3.',
    'Testar o caminho infeliz (erros, entradas inválidas) costuma pegar mais bugs do que repetir o caminho feliz com valores diferentes.',
  ],
  desafio: {
    enunciado:
      'O arquivo do desafio tem um teste VERMELHO de propósito. Aperte [r] para rodar e vê-lo falhar. ' +
      'Depois aperte [e] para editar e corrija o valor esperado para deixar a suíte VERDE: descubra qual ' +
      'nível corresponde a 250 de XP (a cada 100 de XP sobe 1 nível, e 0 XP já é o nível 1). Salve, feche e rode de novo com [r].',
    arquivoBase: 'examples/desafios/modulo01.test.ts',
    alvo: 'examples/desafios/modulo01.test.ts',
    runner: 'vitest',
    dica: '250 dividido por 100 (parte inteira) é 2; soma-se 1 porque 0 XP já é o nível 1.',
    solucao: 'expect(nivel).toBe(3);',
  },
  quiz: [
    {
      pergunta: 'Na pirâmide de testes, qual camada deve ter MAIS testes?',
      opcoes: ['E2E (topo)', 'Integração (meio)', 'Unidade (base)', 'Todas iguais'],
      correta: 2,
      explicacao: 'A base (unidade) tem muitos testes rápidos e baratos; o topo (E2E) tem poucos, pois são lentos.',
    },
    {
      pergunta: 'No padrão AAA, o que faz a fase "Assert"?',
      opcoes: [
        'Prepara os dados de entrada',
        'Executa a função sob teste',
        'Verifica se o resultado é o esperado',
        'Importa as dependências',
      ],
      correta: 2,
      explicacao: 'Assert é a verificação — em geral um expect(...). Arrange prepara e Act executa.',
    },
    {
      pergunta: 'Por que uma função pura é fácil de testar?',
      opcoes: [
        'Porque é sempre curta',
        'Porque a mesma entrada sempre dá a mesma saída, sem efeitos colaterais',
        'Porque não precisa de import',
        'Porque roda no navegador',
      ],
      correta: 1,
      explicacao: 'Sem estado externo nem efeitos colaterais, basta comparar saída × entrada — nada para montar ou limpar.',
    },
  ],
  xp: 100,
};

export default modulo;
