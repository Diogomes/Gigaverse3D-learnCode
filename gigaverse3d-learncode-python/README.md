# 🐍 Gigaverse3D learnCode: python

Curso interativo de terminal que ensina **Python** capítulo por capítulo,
seguindo *Pense em Python* (Think Python, 2ª ed.) + um **Módulo Funcional**.
Para cada capítulo: mostra o código comentado → discute → **roda Python de verdade**.

App de terminal em **Node.js + TypeScript + Ink** (React para CLI). Irmão do
app de Java, construído standalone com a mesma stack.

## Status

**Fase 5 — paradigma funcional concluída.** O app roda Python de verdade e já
tem os capítulos **1, 2, 3, 5–19 e 22** completos (teoria → código comentado →
discussão → execução ao vivo → desafio → quiz → XP salvo em
`~/.gigaverse-learncode/progress-python.json`). Faltam apenas o **Cap. 4
(turtle)** e os apêndices **20–21**, que chegam na Fase 6.

## Pré-requisitos

- **Node.js ≥ 18** e **npm**
- **Python 3** no `PATH` (o app executa `python3`/`python` de verdade)
- (opcional) **tkinter**, só para o cap. 4 (turtle), que chega na Fase 6

No **Fedora**:

```bash
sudo dnf install nodejs npm
sudo dnf install python3 python3-pip
sudo dnf install python3-tkinter   # opcional, só p/ o cap. 4 (turtle)
```

No **Debian/Ubuntu**:

```bash
sudo apt install nodejs npm
sudo apt install python3 python3-pip
sudo apt install python3-tk        # opcional, só p/ o cap. 4 (turtle)
```

Confirme as versões:

```bash
node --version && python3 --version
```

## Setup

Clone o repositório (monorepo que abriga os cursos de Java e Python) e instale
as dependências **dentro da pasta do curso de Python**:

```bash
git clone git@github.com:Diogomes/Gigaverse3D-learnCode.git
cd Gigaverse3D-learnCode/gigaverse3d-learncode-python
npm install
```

## Como rodar

**Opção A — direto na pasta do curso de Python** (recomendado):

```bash
# dentro de gigaverse3d-learncode-python/
npm run dev
```

**Opção B — pelo dispatcher do monorepo** (a partir da raiz do repositório):

```bash
# dentro de Gigaverse3D-learnCode/  (raiz)
npm run dev python      # abre o curso de Python
npm run dev java        # abre o curso de Java
```

> O dispatcher (`scripts/dev.mjs`) só lança o curso de Python se as dependências
> dele já estiverem instaladas — ou seja, rode o `npm install` da etapa de Setup
> antes.

**Build de produção** (opcional):

```bash
# dentro de gigaverse3d-learncode-python/
npm run build && npm start
```

> Precisa de um **terminal interativo** (TTY) para a navegação por teclado.

### Controles

- `↑`/`↓` (ou `j`/`k`) — navega entre capítulos / opções
- `Enter` — seleciona / avança de etapa / roda o código
- `←` — volta uma etapa (dentro de um capítulo)
- `q` — sai
- 🔒 — capítulo ainda não disponível · ✓ — capítulo concluído

### Fluxo de cada capítulo

Teoria (💡 Conceito em foco + paradigma) → Código comentado (nota por linha) →
Discussão → **Execução ao vivo** (roda Python de verdade) → Desafio (`e` edita no
`$EDITOR`, `r` roda, `d` dica, `s` solução) → Quiz → ganha XP e salva o progresso.

O progresso fica em `~/.gigaverse-learncode/progress-python.json`.

### Problemas comuns

- **"Python 3 não encontrado"**: instale o `python3` (veja Pré-requisitos) e
  garanta que está no `PATH` (`python3 --version`).
- **"Dependências do curso de Python não instaladas"** (ao usar o dispatcher):
  rode `cd gigaverse3d-learncode-python && npm install`.
- **A tela não responde ao teclado**: rode em um terminal de verdade (a TUI
  precisa de TTY; não funciona com a entrada redirecionada).

## Roadmap (fases)

- **Fase 0** ✅ scaffold + menu + detecção de Python
- **Fase 1** ✅ núcleo (`pythonRunner`, `CodeBlock`, `OutputPanel`, progresso) + Cap. 1 completo
- **Fase 2** ✅ caps. 2, 3, 5–9 (procedural) — cap. 4 (turtle) adiado p/ Fase 6
- **Fase 3** ✅ caps. 10–14 (estruturas de dados + arquivos)
- **Fase 4** ✅ caps. 15–18 (orientação a objetos)
- **Fase 5** ✅ cap. 19 + módulo funcional (cap. 22)
- **Fase 6** caps. 20–21 + cap. 4 (turtle/fallback)
- **Fase 7** polimento + filtro "estudar por paradigma"
