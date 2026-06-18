# 🎮 Gigaverse3D learnCode: java

Curso interativo de terminal que ensina **Java** capítulo por capítulo, seguindo o
livro **Deitel "Java: Como Programar", 10ª edição** (25 capítulos).

Para cada capítulo o app: **mostra o código → discute o código → roda o código** de
verdade (compila com `javac` e executa com `java`), exibindo a saída real no terminal.

> Construído com **Node.js + TypeScript + Ink** (React para CLI).

---

## Pré-requisitos (Fedora)

```bash
# Node.js (>= 18)
sudo dnf install nodejs npm

# JDK para compilar e rodar Java
sudo dnf install java-latest-openjdk-devel

# Confirmar
node -v && javac -version && java -version
```

## Como rodar (desenvolvimento)

```bash
npm install

npm run dev java     # abre o curso de Java (este projeto)
npm run dev python   # abre o curso de Python (gigaverse3d-learncode-python/)
npm run dev          # padrão: Java
```

> `npm run dev python` lança o curso da pasta `gigaverse3d-learncode-python/`.
> Na primeira vez, instale as dependências dele: `cd gigaverse3d-learncode-python && npm install`.
> Atalhos equivalentes: `npm run dev:java` e `npm run dev:python`.

## Build

```bash
npm run build   # gera dist/
npm start       # roda a versão compilada
```

---

## Status do desenvolvimento (incremental, por fases)

- [x] **Fase 0** — Scaffold: Ink + TS, logo, menu dos 25 capítulos, verificação do JDK.
- [x] **Fase 1** — Núcleo: `javaRunner`, `CodeBlock`, `OutputPanel`, `progress` + Cap. 1 completo.
- [x] **Fase 2** — Caps. 2–8 (fundamentos).
- [x] **Fase 3** — Caps. 9–11 (POO + exceções).
- [x] **Fase 4** — Caps. 14, 16–21.
- [x] **Fase 5** — Caps. 15 e 24 (arquivos e JDBC).
- [x] **Fase 6** — Caps. 12, 13, 22, 23, 25 (GUI e concorrência).
- [x] **Fase 7** — Polimento: gamificação, navegação, README final.

**Os 25 capítulos estão completos** — cada um com teoria, código comentado, discussão,
execução ao vivo (compila e roda Java de verdade), desafio prático e quiz.

## Sobre os capítulos de GUI e banco de dados

JavaFX (caps. 12, 13, 22, 25) precisa de display gráfico, e drivers JDBC (cap. 24) precisam
de um `.jar` externo — nada disso roda dentro do terminal nem vem no JDK puro. Por isso o
exemplo **executável** desses capítulos é um **equivalente didático em console**, em Java
puro, que ensina o mesmo conceito (eventos, sistema de coordenadas, componentes compostos,
MVC/controller, CRUD/SQL). O código JavaFX/JDBC real aparece explicado na teoria e nos
comentários como referência. O cap. 23 (concorrência) usa **threads de verdade** do JDK.

## Navegação

- `↑`/`↓` — navegar pelos capítulos
- `Enter` — selecionar
- `q` ou `Ctrl+C` — sair
