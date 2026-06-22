import type { Modulo } from '../src/types.js';

/**
 * Módulo 12 — Testes end-to-end com Playwright.
 * Exemplo: examples/e2e/home.spec.ts (abre a página do SUT num navegador real).
 */
const modulo: Modulo = {
  id: 12,
  titulo: 'Testes end-to-end com Playwright',
  camada: 'e2e',
  conceitoEmFoco: {
    termo: 'Teste end-to-end (E2E)',
    explicacao:
      'É o topo da pirâmide: abre o sistema inteiro num NAVEGADOR de verdade e age como um usuário — ' +
      'navega, digita, clica, confere a tela. Dá a maior confiança ("funciona de ponta a ponta"), mas é ' +
      'o teste mais lento e frágil; por isso são poucos, cobrindo os fluxos críticos.',
  },
  objetivos: [
    'Entender o que um teste E2E cobre que unidade e integração não cobrem',
    'Escrever um teste com page.goto, fill e click simulando um usuário',
    'Usar locators semânticos (getByRole, getByLabel) em vez de seletores frágeis',
    'Saber que o Playwright sobe a página do SUT sozinho antes dos testes',
  ],
  teoria: [
    {
      titulo: 'O topo da pirâmide',
      paragrafos: [
        'E2E exercita tudo junto: HTML, JavaScript, eventos, navegação — no navegador real.',
        'É o que mais se parece com o uso de verdade, então pega bugs de integração visual e de fluxo.',
        'Em troca, é lento (abre o navegador) e mais sujeito a falhas intermitentes. Use com parcimônia.',
      ],
    },
    {
      titulo: 'Como o Playwright funciona aqui',
      paragrafos: [
        'O playwright.config.ts tem um webServer: antes dos testes, ele sobe a página do SUT (npm run',
        'sut:web) e espera ela responder. Cada teste recebe um objeto page — uma aba isolada do navegador.',
        'As ações são assíncronas: sempre await page.goto/fill/click e await nas asserções.',
      ],
    },
    {
      titulo: 'Agir como um usuário',
      paragrafos: [
        'page.goto("/") abre a baseURL; getByLabel("Nome").fill("Aria") digita no campo;',
        'getByRole("button", { name: "Adicionar" }).click() clica no botão. É a jornada real, automatizada.',
      ],
    },
  ],
  exemplo: {
    arquivo: 'examples/e2e/home.spec.ts',
    alvo: 'examples/e2e/home.spec.ts',
    runner: 'playwright',
    descricao: 'Abre a home do SUT, confere o título e adiciona um jogador à lista.',
    sut: 'sut/web/index.html',
    anotacoes: [
      { linha: 1, nota: 'test e expect vêm de @playwright/test (não do Vitest). Pressione [c] para ver a página.' },
      { linha: 5, nota: 'test() declara um caso E2E; o objeto { page } é a aba do navegador para este teste.' },
      { linha: 6, nota: 'page.goto("/") navega até a baseURL — o Playwright já subiu a página do SUT.' },
      { linha: 7, nota: 'toHaveTitle verifica o <title> da aba (com auto-waiting).' },
      { linha: 8, nota: 'getByRole("heading", ...): locator semântico, encontra o título pela acessibilidade.' },
      { linha: 14, nota: 'getByLabel("Nome").fill("Aria") digita no campo associado à label.' },
      { linha: 15, nota: 'getByRole("button", { name }).click() clica no botão como um usuário faria.' },
      { linha: 17, nota: 'toHaveText espera (retry automático) até a lista mostrar o jogador adicionado.' },
    ],
  },
  discussao: [
    'Quantos E2E ter: poucos. Cubra os fluxos que, se quebrarem, o produto está quebrado (login, checkout, cadastrar e listar). Detalhes e regras finas pertencem à unidade/integração, que são mais rápidas e estáveis.',
    'O webServer do playwright.config evita o clássico "esqueci de subir o servidor": o Playwright o inicia e espera ficar pronto. Com reuseExistingServer, ele reaproveita um servidor já no ar no seu ambiente local.',
    'E2E é onde mora a "flakiness" (falha intermitente). A defesa principal é o auto-waiting do Playwright (tema do Módulo 13) e locators semânticos — nunca sleeps fixos.',
    'Quando um E2E falha, o Playwright guarda trace e screenshot (configurados no projeto). Abra com `npx playwright show-trace ...` para ver exatamente o que a página mostrava no momento da falha.',
  ],
  desafio: {
    enunciado:
      'O teste abre a home e adiciona "Aria", mas as asserções estão erradas de propósito (contagem 0 e ' +
      'texto "Outro"), deixando-o VERMELHO. Aperte [r] para ver, depois [e] para corrigir: após adicionar, ' +
      'a lista deve ter 1 item com o texto "Aria". Ajuste o toHaveCount e o toHaveText. Salve e rode com [r].',
    arquivoBase: 'examples/e2e/desafios/modulo12.spec.ts',
    alvo: 'examples/e2e/desafios/modulo12.spec.ts',
    runner: 'playwright',
    dica: 'Você adicionou 1 jogador chamado "Aria": toHaveCount(1) e toHaveText(["Aria"]).',
    solucao:
      "await expect(page.getByRole('listitem')).toHaveCount(1);\nawait expect(page.getByRole('listitem')).toHaveText(['Aria']);",
  },
  quiz: [
    {
      pergunta: 'Na pirâmide, por que ter POUCOS testes E2E?',
      opcoes: [
        'Porque são fáceis de escrever',
        'Porque são lentos e mais sujeitos a falhas intermitentes',
        'Porque não pegam bugs',
        'Porque o Playwright cobra por teste',
      ],
      correta: 1,
      explicacao: 'E2E dá muita confiança, mas é lento e frágil; reserve-os para os fluxos críticos.',
    },
    {
      pergunta: 'Como o Playwright disponibiliza a página do SUT para os testes?',
      opcoes: [
        'Você precisa subir o servidor manualmente antes',
        'Pelo webServer no config: ele sobe a página e espera ficar pronta',
        'Ele não precisa de servidor',
        'Usando Supertest',
      ],
      correta: 1,
      explicacao: 'O webServer do playwright.config inicia o SUT e aguarda a URL responder antes de testar.',
    },
    {
      pergunta: 'O que { page } representa em test(async ({ page }) => ...)?',
      opcoes: [
        'O arquivo de teste',
        'Uma aba isolada do navegador para aquele teste',
        'O servidor HTTP',
        'O relatório',
      ],
      correta: 1,
      explicacao: 'page é a aba do navegador onde o teste navega, digita e clica.',
    },
  ],
  xp: 100,
};

export default modulo;
