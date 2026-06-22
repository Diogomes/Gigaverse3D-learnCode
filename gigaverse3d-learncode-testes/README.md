# 🧪 Gigaverse3D learnCode: testes

Curso interativo de terminal que ensina **testes automatizados** módulo por módulo,
tendo como fio condutor a **pirâmide de testes**: muitos testes de **unidade** na base
(Vitest), alguns de **integração** no meio (Supertest + Express) e poucos **end-to-end**
no topo (Playwright).

Para cada módulo o app: **mostra o teste comentado → discute → roda os testes de verdade**,
exibindo a suíte ficar 🟢 verde ou 🔴 vermelha ali no terminal.

> App de terminal em **Node.js + TypeScript + Ink** (React para CLI). Irmão dos cursos
> de Java e Python, construído standalone com a mesma stack.

---

## Status

**Curso COMPLETO — os 14 módulos estão prontos.** Cada um com o fluxo
teoria → teste comentado → discussão → execução ao vivo → desafio → quiz,
cobrindo a pirâmide inteira: fundamentos, unidade (AAA, matchers, bordas/erros,
setup/teardown), transversais (test doubles, cobertura, TDD, organização/CI),
integração com **Supertest** (API, contratos/status HTTP, autenticação) e E2E com
**Playwright** (navegador real, locators semânticos, auto-waiting). O runner roda
Vitest **e** Playwright de verdade; o progresso/XP fica em
`~/.gigaverse-learncode/progress-testes.json`. Cada desafio começa VERMELHO de
propósito, para o aluno deixá-lo VERDE.

> Os módulos de E2E exigem os navegadores do Playwright: `npx playwright install`.

O scaffold de **Fase 0** (runner, SUT e exemplos das três camadas) continua disponível
pelos scripts `test:unit`, `test:api` e `test:e2e`.

## Pré-requisitos

- **Node.js ≥ 18** e **npm**
- (opcional) navegadores do **Playwright**, só para os módulos de E2E:
  `npx playwright install --with-deps`

## Setup

```bash
# dentro de gigaverse3d-learncode-testes/
npm install
```

## Como rodar o curso interativo

**Opção A — direto na pasta do curso** (recomendado):

```bash
npm run dev
```

**Opção B — pelo dispatcher do monorepo** (a partir da raiz do repositório):

```bash
npm run dev testes     # abre o curso de Testes
npm run dev java       # abre o curso de Java
npm run dev python     # abre o curso de Python
```

> Precisa de um **terminal interativo** (TTY) para a navegação por teclado.

### Controles

- `↑`/`↓` (ou `j`/`k`) — navega entre módulos / opções
- `Enter` — seleciona / avança de etapa / roda os testes
- `←` — volta uma etapa (dentro de um módulo)
- `q` — sai · 🔒 = módulo ainda não disponível · ✓ = concluído

### Fluxo de cada módulo

Teoria (💡 conceito em foco + a pirâmide) → Teste comentado (nota por linha; `[c]` mostra o
código sob teste) → Discussão → **Execução ao vivo** (roda os testes de verdade) → Desafio
(`e` edita no `$EDITOR`, `r` roda, `d` dica, `s` solução) → Quiz → ganha XP e salva o progresso.

## Rodar os exemplos do scaffold direto (sem o app)

```bash
npm run test:unit   # testes de unidade (Vitest)
npm run test:api    # testes de API (Supertest + Express, sob o Vitest)
npm run test:e2e    # testes E2E (Playwright) — exige os navegadores instalados
```

## Build de produção (opcional)

```bash
npm run build && npm start
```

---

## Roadmap (fases)

- **Fase 0** ✅ scaffold: runner do Vitest, SUT (domínio + API + página web) e exemplos das três camadas.
- **Fase 1** ✅ app interativo (Ink): menu, núcleo, execução ao vivo de testes + **Módulo 1** completo.
- **Fase 2** ✅ módulos 2–5 (unidade): AAA, matchers, casos de borda, setup/teardown.
- **Fase 3** ✅ módulos 6–8 (transversais): test doubles, cobertura, TDD.
- **Fase 4** ✅ módulos 9–11 (integração): Supertest, contratos/status HTTP, rotas protegidas.
- **Fase 5** ✅ módulos 12–13 (E2E): Playwright na UI, locators e auto-waiting + runner do Playwright plugado.
- **Fase 6** ✅ módulo 14 + polimento: organização da suíte (describe/it.each), flakiness e CI. **Curso completo (14/14).**

---

Desenvolvido por **Diogo Gomes**.
