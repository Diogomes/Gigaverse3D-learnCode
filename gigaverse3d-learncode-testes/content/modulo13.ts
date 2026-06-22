import type { Modulo } from '../src/types.js';

/**
 * Módulo 13 — Locators semânticos e auto-waiting.
 * Exemplo: examples/e2e/locators.spec.ts (getByRole/getByLabel + retry automático).
 */
const modulo: Modulo = {
  id: 13,
  titulo: 'Locators semânticos e auto-waiting',
  camada: 'e2e',
  conceitoEmFoco: {
    termo: 'Locator semântico',
    explicacao:
      'É selecionar elementos pelo PAPEL e pelo texto acessível (getByRole, getByLabel, getByText), como ' +
      'um usuário os percebe — em vez de seletores CSS frágeis (#id, .classe) que quebram a cada ajuste de ' +
      'layout. Junto vem o auto-waiting: as asserções do Playwright esperam sozinhas, sem sleep fixo.',
  },
  objetivos: [
    'Preferir getByRole/getByLabel a seletores CSS frágeis',
    'Entender o auto-waiting: o Playwright tenta de novo até a condição valer ou estourar o tempo',
    'Evitar sleeps fixos como fonte de testes intermitentes (flaky)',
    'Afirmar conteúdo de listas com toHaveText e toHaveCount',
  ],
  teoria: [
    {
      titulo: 'Selecione como o usuário enxerga',
      paragrafos: [
        'getByRole("button", { name: "Adicionar" }) acha o botão pela função e pelo nome acessível.',
        'getByLabel("Nome") acha o campo pela <label> associada. Esses locators sobrevivem a mudanças de',
        'CSS, classe e posição — porque dependem da SEMÂNTICA, não da aparência. Bônus: incentivam acessibilidade.',
      ],
    },
    {
      titulo: 'Auto-waiting: o fim dos sleeps',
      paragrafos: [
        'A web é assíncrona: o item aparece um instante depois do clique. Um sleep(500) é um chute — às',
        'vezes curto (falha), às vezes longo (lento). As asserções do Playwright (toHaveText, toBeVisible)',
        'fazem retry automático até a condição valer ou estourar o timeout. Confiável e rápido.',
      ],
    },
    {
      titulo: 'Asserções de lista',
      paragrafos: [
        'toHaveText(["Aria", "Bo"]) afirma o conteúdo e a ORDEM dos itens; toHaveCount(0) afirma a',
        'quantidade. Ambas esperam o DOM se estabilizar antes de decidir — sem você gerenciar tempo.',
      ],
    },
  ],
  exemplo: {
    arquivo: 'examples/e2e/locators.spec.ts',
    alvo: 'examples/e2e/locators.spec.ts',
    runner: 'playwright',
    descricao: 'Seleção por papel/label, ordem da lista (auto-waiting) e o caso do nome vazio.',
    sut: 'sut/web/index.html',
    anotacoes: [
      { linha: 3, nota: 'A ideia central: locators por semântica + asserções que esperam sozinhas. Pressione [c] para a página.' },
      { linha: 6, nota: 'beforeEach navega até a home antes de cada teste (isolamento, como nos módulos de unidade).' },
      { linha: 12, nota: 'getByRole("heading", { name }) — encontra o título pelo papel acessível, não por CSS.' },
      { linha: 14, nota: 'getByLabel("Nome") — encontra o input pela <label> a ele associada.' },
      { linha: 16, nota: 'getByRole("button", { name: "Adicionar" }) — botão pelo nome acessível.' },
      { linha: 26, nota: 'toHaveText([...]) faz retry automático até a lista ter os dois itens, na ordem certa — sem sleep.' },
      { linha: 31, nota: 'toHaveCount(0): nome vazio não adiciona nada (o caso de borda da UI).' },
    ],
  },
  discussao: [
    'Hierarquia de preferência de locators (recomendação do próprio Playwright): getByRole > getByLabel/getByPlaceholder > getByText > getByTestId > CSS/XPath. Quanto mais semântico, mais resistente a refatorações de layout.',
    'Seletores CSS como #form .btn:nth-child(2) quebram quando alguém mexe no HTML, mesmo sem mudar o comportamento. O locator semântico só quebra se o COMPORTAMENTO/acessibilidade mudar — que é exatamente quando você QUER que quebre.',
    'Sleep fixo é a causa nº 1 de flakiness em E2E. Troque page.waitForTimeout(500) por uma asserção que espera o estado desejado (toBeVisible, toHaveText). O Playwright já faz o retry por você.',
    'Bônus de acessibilidade: se você consegue selecionar tudo por getByRole/getByLabel, sua página provavelmente está acessível para leitores de tela. Testes semânticos e a11y andam juntos.',
  ],
  desafio: {
    enunciado:
      'O teste usa um seletor CSS quebrado (#nao-existe) para o botão e afirma o texto errado, ficando ' +
      'VERMELHO. Aperte [r] para ver, depois [e] para corrigir: troque o locator por um SEMÂNTICO ' +
      "— getByRole('button', { name: 'Adicionar' }) — e ajuste a lista para ['Aria']. Salve e rode com [r].",
    arquivoBase: 'examples/e2e/desafios/modulo13.spec.ts',
    alvo: 'examples/e2e/desafios/modulo13.spec.ts',
    runner: 'playwright',
    dica: "Use page.getByRole('button', { name: 'Adicionar' }).click() e toHaveText(['Aria']).",
    solucao:
      "await page.getByRole('button', { name: 'Adicionar' }).click();\nawait expect(page.getByRole('listitem')).toHaveText(['Aria']);",
  },
  quiz: [
    {
      pergunta: 'Por que preferir getByRole a um seletor CSS como #lista .item?',
      opcoes: [
        'É mais curto de digitar',
        'Resiste a mudanças de layout/CSS, pois depende da semântica do elemento',
        'É o único que o Playwright aceita',
        'Roda mais rápido',
      ],
      correta: 1,
      explicacao: 'Locators semânticos só quebram quando o comportamento/acessibilidade muda — não o CSS.',
    },
    {
      pergunta: 'O que o auto-waiting do Playwright dispensa?',
      opcoes: [
        'O navegador',
        'Os sleeps fixos: a asserção tenta de novo até a condição valer ou estourar o tempo',
        'A asserção',
        'O servidor',
      ],
      correta: 1,
      explicacao: 'As asserções fazem retry automático, eliminando sleeps fixos e a flakiness que eles causam.',
    },
    {
      pergunta: 'Qual asserção verifica o conteúdo e a ordem dos itens de uma lista?',
      opcoes: ['toBeVisible', 'toHaveText(["Aria", "Bo"])', 'toBe', 'toContain'],
      correta: 1,
      explicacao: 'toHaveText com um array afirma o texto de cada item na ordem, com auto-waiting.',
    },
  ],
  xp: 100,
};

export default modulo;
