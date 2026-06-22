import type { Modulo } from '../src/types.js';

/**
 * Módulo 9 — Integração de API com Supertest.
 * Exemplo: examples/api/integracao.test.ts (usa sut/api/app.ts).
 */
const modulo: Modulo = {
  id: 9,
  titulo: 'Integração de API com Supertest',
  camada: 'integracao',
  conceitoEmFoco: {
    termo: 'Teste de integração de API',
    explicacao:
      'É o meio da pirâmide: em vez de testar uma função isolada, exercitamos a API HTTP inteira — ' +
      'roteamento, parsing de JSON, validação e resposta — fazendo requisições de verdade. O Supertest ' +
      'dispara essas requisições direto no app Express, sem precisar abrir uma porta de rede.',
  },
  objetivos: [
    'Entender o que um teste de integração cobre a mais que um de unidade',
    'Fazer requisições com request(app).get/post(...) e ler status e body',
    'Usar beforeEach(criarApp) para isolar o estado entre testes',
    'Verificar um fluxo de ida e volta (criar e depois listar)',
  ],
  teoria: [
    {
      titulo: 'Por que testar a API integrada',
      paragrafos: [
        'Um teste de unidade prova que uma função está certa; um de integração prova que as peças',
        'conversam: a rota chama o handler, o JSON é parseado, a validação roda, o status volta correto.',
        'É onde aparecem bugs de "fiação" que a unidade não pega — rota errada, status trocado, body fora do formato.',
      ],
    },
    {
      titulo: 'Supertest sem abrir porta',
      paragrafos: [
        'request(app) recebe o próprio app Express e simula a requisição internamente — rápido e sem',
        'conflito de portas. Os métodos espelham o HTTP: .get(url), .post(url).send(corpo), .set(header, valor).',
        'Tudo é assíncrono: use async/await e await em cada requisição.',
      ],
    },
    {
      titulo: 'Isolamento com uma store nova',
      paragrafos: [
        'criarApp() devolve um app com store em memória zerada. Chamando-o no beforeEach, cada teste',
        'começa do zero — o jogador criado num teste não vaza para o outro (Módulo 5 aplicado à API).',
      ],
    },
  ],
  exemplo: {
    arquivo: 'examples/api/integracao.test.ts',
    alvo: 'examples/api/integracao.test.ts',
    runner: 'vitest',
    descricao: 'Health check, listagem vazia e o fluxo criar→listar, tudo via Supertest.',
    sut: 'sut/api/app.ts',
    anotacoes: [
      { linha: 2, nota: 'supertest: a biblioteca que dispara requisições HTTP direto no app. Pressione [c] para ver a API.' },
      { linha: 3, nota: 'criarApp() é a fábrica do app Express — cada chamada nasce com a store vazia.' },
      { linha: 11, nota: 'beforeEach recria o app antes de cada teste → estado sempre limpo.' },
      { linha: 16, nota: 'request(app).get(...) simula a requisição internamente; await porque é assíncrono.' },
      { linha: 17, nota: 'res.status traz o código HTTP (200 = OK).' },
      { linha: 18, nota: 'res.body é o JSON da resposta já parseado — comparamos com toEqual.' },
      { linha: 28, nota: '.post(url).send(corpo) envia o JSON do novo jogador.' },
      { linha: 32, nota: 'Ida e volta: criamos e então listamos; a lista deve ter exatamente 1 item.' },
    ],
  },
  discussao: [
    'Onde fica o teste de integração na pirâmide: no meio. São mais lentos que os de unidade (sobem o framework HTTP) e mais rápidos que os E2E (não abrem navegador). Tenha vários, mas não cubra cada regra de validação aqui — isso é trabalho da unidade.',
    'request(app) versus subir um servidor: passar o app direto evita abrir porta, elimina conflitos e deixa o teste determinístico. Você só subiria uma porta real para um teste de fumaça do processo completo.',
    'Sempre await as requisições. Esquecer o await é a causa nº 1 de teste de API "verde por engano": a asserção roda antes da resposta chegar.',
    'O fluxo de ida e volta (criar e depois ler) testa a integração de verdade — não só "o POST respondeu 201", mas "o dado realmente passou a existir".',
  ],
  desafio: {
    enunciado:
      'O teste cria um jogador e depois lista, mas espera o status e o tamanho errados, ficando VERMELHO. ' +
      'Aperte [r] para ver, depois [e] para corrigir: um GET bem-sucedido responde 200 e, após criar 1 jogador, ' +
      'a lista tem 1 item. Ajuste o toBe do status e o toHaveLength. Salve e rode com [r].',
    arquivoBase: 'examples/desafios/modulo09.test.ts',
    alvo: 'examples/desafios/modulo09.test.ts',
    runner: 'vitest',
    dica: 'GET que deu certo → 200. Você criou 1 jogador, então a lista tem comprimento 1.',
    solucao: 'expect(res.status).toBe(200);\nexpect(res.body).toHaveLength(1);',
  },
  quiz: [
    {
      pergunta: 'O que o Supertest faz com request(app)?',
      opcoes: [
        'Abre uma porta de rede real e conecta via TCP',
        'Dispara a requisição direto no app Express, sem abrir porta',
        'Substitui o Express por um mock',
        'Roda os testes no navegador',
      ],
      correta: 1,
      explicacao: 'Ele injeta a requisição no próprio app — rápido, determinístico e sem conflito de portas.',
    },
    {
      pergunta: 'Por que usar beforeEach(() => app = criarApp()) num teste de API?',
      opcoes: [
        'Para deixar mais rápido',
        'Para que cada teste comece com a store em memória limpa (isolamento)',
        'Porque o Supertest exige',
        'Para abrir a porta',
      ],
      correta: 1,
      explicacao: 'App novo a cada teste = estado zerado; o dado de um teste não vaza para o outro.',
    },
    {
      pergunta: 'Qual erro deixa um teste de API "verde por engano"?',
      opcoes: [
        'Usar toEqual',
        'Esquecer o await na requisição, fazendo a asserção rodar antes da resposta',
        'Usar beforeEach',
        'Testar o status',
      ],
      correta: 1,
      explicacao: 'Sem await, o teste segue antes da resposta chegar e pode passar sem realmente verificar nada.',
    },
  ],
  xp: 100,
};

export default modulo;
