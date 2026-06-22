import type { Modulo } from '../src/types.js';

/**
 * Módulo 11 — Rotas protegidas e autenticação.
 * Exemplo: examples/api/auth.test.ts (DELETE exige Bearer token).
 */
const modulo: Modulo = {
  id: 11,
  titulo: 'Rotas protegidas e autenticação',
  camada: 'integracao',
  conceitoEmFoco: {
    termo: 'Rota protegida',
    explicacao:
      'É uma rota que só executa se a requisição provar quem é — normalmente com o header ' +
      'Authorization: Bearer <token>. Testar isso significa cobrir os três cenários: sem token (401), ' +
      'token inválido (401) e token válido (a ação acontece, ex.: 204). Segurança também se testa.',
  },
  objetivos: [
    'Enviar headers numa requisição de teste com .set("Authorization", ...)',
    'Cobrir os três cenários de auth: ausente, inválido e válido',
    'Distinguir 401 (não autenticado) de 404 (não encontrado)',
    'Confirmar o efeito da ação autorizada (o recurso realmente sumiu)',
  ],
  teoria: [
    {
      titulo: 'Como a rota se protege',
      paragrafos: [
        'A rota DELETE só prossegue se o header Authorization for "Bearer <token>" com o token certo.',
        'Sem isso, ela responde 401 Unauthorized e NÃO executa a ação. É a primeira linha de defesa.',
      ],
    },
    {
      titulo: 'Os três cenários que você precisa cobrir',
      paragrafos: [
        '1) Sem token → 401: o caso mais esquecido, e o mais perigoso de deixar passar.',
        '2) Token inválido → 401: provar que não basta mandar QUALQUER coisa no header.',
        '3) Token válido → a ação acontece (aqui, 204 No Content) e o efeito é real.',
      ],
    },
    {
      titulo: '401 não é 404',
      paragrafos: [
        '401 = "não sei quem você é" (faltou/errou a credencial). 404 = "isso não existe".',
        'A ordem importa: a checagem de auth vem ANTES de procurar o recurso — por isso, sem token,',
        'você recebe 401 mesmo que o id nem exista.',
      ],
    },
  ],
  exemplo: {
    arquivo: 'examples/api/auth.test.ts',
    alvo: 'examples/api/auth.test.ts',
    runner: 'vitest',
    descricao: 'DELETE sem token, com token inválido, com token válido e com id inexistente.',
    sut: 'sut/api/app.ts',
    anotacoes: [
      { linha: 3, nota: 'Importamos TOKEN_EXEMPLO do próprio SUT para usar o token correto. Pressione [c] para ver a rota.' },
      { linha: 11, nota: 'beforeEach assíncrono: cria um jogador (e guarda o id) antes de cada teste de remoção.' },
      { linha: 19, nota: 'Cenário 1 — sem header Authorization.' },
      { linha: 20, nota: '401 Unauthorized: a ação foi bloqueada por falta de credencial.' },
      { linha: 24, nota: 'Cenário 2 — header presente, mas com token errado: ainda 401.' },
      { linha: 31, nota: 'Cenário 3 — token válido via .set("Authorization", `Bearer ${TOKEN_EXEMPLO}`).' },
      { linha: 32, nota: '204 No Content: removeu com sucesso, sem corpo na resposta.' },
      { linha: 35, nota: 'E confirmamos o efeito: a lista voltou a ficar vazia.' },
      { linha: 42, nota: 'Com token válido mas id inexistente → 404 (autenticado, mas não há o que remover).' },
    ],
  },
  discussao: [
    'O teste mais importante aqui é o "sem token → 401". É justamente o que se esquece de escrever — e o buraco de segurança mais comum: uma rota que deveria ser protegida e não é. Se esse teste passa, a porta está trancada.',
    'Cubra também o token inválido, não só o ausente. Senão um bug que aceite "qualquer Authorization" passaria despercebido.',
    'Distinga 401 de 403: 401 é "não autenticado" (não sei quem é); 403 seria "autenticado, mas sem permissão". Aqui usamos 401. Já o 404 é sobre existência do recurso — categoria diferente.',
    'Depois da ação autorizada, verifique o EFEITO (a lista esvaziou), não só o status 204. Status certo com efeito errado ainda é bug.',
  ],
  desafio: {
    enunciado:
      'Dois cenários de auth, ambos errados de propósito: (1) DELETE sem token espera 204 — mas deveria ser ' +
      '401; (2) o DELETE manda "Bearer token-errado" e espera 204 — mas com token inválido dá 401. Aperte [r] ' +
      'para ver vermelho, [e] para corrigir: ajuste o status do 1º caso para 401 e, no 2º, use o token correto ' +
      '(importe e use TOKEN_EXEMPLO). Salve e rode com [r].',
    arquivoBase: 'examples/desafios/modulo11.test.ts',
    alvo: 'examples/desafios/modulo11.test.ts',
    runner: 'vitest',
    dica: 'Sem credencial válida → 401. O token correto está exportado como TOKEN_EXEMPLO em sut/api/app.ts (use `Bearer ${TOKEN_EXEMPLO}`).',
    solucao:
      "// 1º teste:\nexpect(res.status).toBe(401);\n// 2º teste — header correto:\n.set('Authorization', `Bearer ${TOKEN_EXEMPLO}`)",
  },
  quiz: [
    {
      pergunta: 'Qual status indica "credencial ausente ou inválida"?',
      opcoes: ['400', '401', '404', '204'],
      correta: 1,
      explicacao: '401 Unauthorized = não autenticado. 404 é recurso inexistente; 400 é dado inválido.',
    },
    {
      pergunta: 'Como enviar um token num teste com Supertest?',
      opcoes: [
        '.send("Bearer token")',
        '.set("Authorization", `Bearer ${token}`)',
        '.auth(token)',
        '.get("/token")',
      ],
      correta: 1,
      explicacao: '.set define um header HTTP; a autorização vai em Authorization: Bearer <token>.',
    },
    {
      pergunta: 'Qual é o teste de auth mais crítico e mais esquecido?',
      opcoes: [
        'Token válido → ação funciona',
        'Sem token → 401 (provar que a rota está realmente protegida)',
        'Listar recursos',
        'Health check',
      ],
      correta: 1,
      explicacao: 'Sem o teste de "sem token", uma rota desprotegida por engano passaria despercebida.',
    },
  ],
  xp: 100,
};

export default modulo;
