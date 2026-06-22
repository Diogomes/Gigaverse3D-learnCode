import type { Modulo } from '../src/types.js';

/**
 * Módulo 10 — Contratos, status HTTP e validação.
 * Exemplo: examples/api/contratos.test.ts (usa sut/api/app.ts).
 */
const modulo: Modulo = {
  id: 10,
  titulo: 'Contratos, status HTTP e validação',
  camada: 'integracao',
  conceitoEmFoco: {
    termo: 'Contrato da API',
    explicacao:
      'É a promessa que a API faz: para cada requisição, qual STATUS HTTP ela devolve e qual o FORMATO ' +
      'do corpo. Testar o contrato é fixar essa promessa — 201 ao criar, 400 para dado inválido, 404 ' +
      'para algo que não existe — de modo que uma mudança acidental quebre um teste, não o cliente.',
  },
  objetivos: [
    'Conhecer os status HTTP mais comuns: 200, 201, 400, 404',
    'Verificar o formato do corpo sem fixar campos voláteis (toMatchObject)',
    'Testar a validação de entrada (400) e os valores padrão',
    'Entender contrato como documentação executável da API',
  ],
  teoria: [
    {
      titulo: 'Os status que você mais vai testar',
      paragrafos: [
        '200 OK: deu certo (GET, em geral). 201 Created: criou um recurso novo (POST).',
        '400 Bad Request: o cliente mandou dados inválidos. 404 Not Found: o recurso não existe.',
        'Escolher o status certo faz parte do contrato — um POST que cria deve responder 201, não 200.',
      ],
    },
    {
      titulo: 'Validação e o 400',
      paragrafos: [
        'A API valida a entrada (aqui com Zod: nome de 3 a 20 caracteres, nível inteiro ≥ 1).',
        'Entrada fora do contrato → 400, sem nem tocar na lógica. Campos opcionais podem ter padrão',
        '(nível assume 1 quando omitido) — e isso também merece um teste.',
      ],
    },
    {
      titulo: 'Verificar o corpo sem ser frágil',
      paragrafos: [
        'Use toMatchObject para afirmar só os campos que você controla (nome, nível) e ignorar os',
        'voláteis (id gerado). Fixar o id no teste o tornaria frágil sem ganho nenhum.',
      ],
    },
  ],
  exemplo: {
    arquivo: 'examples/api/contratos.test.ts',
    alvo: 'examples/api/contratos.test.ts',
    runner: 'vitest',
    descricao: 'Os status 201/400/404, o valor padrão de nível e o formato do corpo criado.',
    sut: 'sut/api/app.ts',
    anotacoes: [
      { linha: 6, nota: 'Contrato = status certo + corpo no formato esperado. Pressione [c] para ver a API e o schema Zod.' },
      { linha: 15, nota: '201 Created: o POST criou um recurso novo.' },
      { linha: 17, nota: 'toMatchObject checa só nome e nível; ignora o id volátil gerado pela API.' },
      { linha: 18, nota: 'Ainda assim garantimos que veio um id (toBeDefined).' },
      { linha: 22, nota: 'Nome com 2 caracteres viola o contrato (mínimo 3)…' },
      { linha: 23, nota: '…então a resposta é 400 Bad Request — a validação barrou antes da lógica.' },
      { linha: 29, nota: 'Campo opcional: sem "nivel", a API aplica o padrão 1 (também testamos isso).' },
      { linha: 34, nota: '404 Not Found: pedir um id que não existe.' },
    ],
  },
  discussao: [
    'O contrato é o que seus clientes (front-end, outros serviços) dependem. Um teste de contrato transforma "a gente combinou que cria com 201" em algo que falha automaticamente se alguém mudar para 200 sem querer.',
    'Status semântico importa: 400 é culpa do cliente (dado inválido); 404 é recurso ausente; 500 seria erro do servidor. Trocar um pelo outro confunde quem consome a API e atrapalha o tratamento de erro do cliente.',
    'toMatchObject versus toEqual no corpo: prefira toMatchObject quando há campos gerados (id, timestamps). Com toEqual você teria que prever o id exato — um acoplamento frágil e inútil.',
    'Validação merece testes dos dois lados: um caso que passa (entrada boa → 201) e um que falha (entrada ruim → 400). Só o caminho feliz não prova que a validação realmente barra algo.',
  ],
  desafio: {
    enunciado:
      'Dois casos de status, ambos com o valor errado de propósito: um POST inválido (deve ser 400) e um GET ' +
      'de id inexistente (deve ser 404). Aperte [r] para ver vermelho, depois [e] para corrigir os dois toBe. ' +
      'Salve e rode com [r].',
    arquivoBase: 'examples/desafios/modulo10.test.ts',
    alvo: 'examples/desafios/modulo10.test.ts',
    runner: 'vitest',
    dica: 'Dado inválido → 400 (Bad Request). Recurso inexistente → 404 (Not Found).',
    solucao: 'expect(res.status).toBe(400);\n// e no outro teste:\nexpect(res.status).toBe(404);',
  },
  quiz: [
    {
      pergunta: 'Qual status HTTP é o correto para um POST que criou um recurso?',
      opcoes: ['200 OK', '201 Created', '204 No Content', '400 Bad Request'],
      correta: 1,
      explicacao: '201 Created sinaliza que um recurso novo foi criado. 200 seria genérico demais para isso.',
    },
    {
      pergunta: 'O cliente envia um nome inválido. Qual status a API deve responder?',
      opcoes: ['200', '201', '400', '500'],
      correta: 2,
      explicacao: '400 Bad Request: a entrada do cliente é inválida. 500 seria erro interno do servidor.',
    },
    {
      pergunta: 'Por que usar toMatchObject em vez de toEqual no corpo da resposta?',
      opcoes: [
        'É mais rápido',
        'Para checar só os campos que controlamos e ignorar os voláteis (como o id)',
        'toEqual não funciona com JSON',
        'Para testar o status',
      ],
      correta: 1,
      explicacao: 'toMatchObject evita fixar campos gerados pela API (id), deixando o teste robusto.',
    },
  ],
  xp: 100,
};

export default modulo;
