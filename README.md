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
npm run dev
```

## Build

```bash
npm run build   # gera dist/
npm start       # roda a versão compilada
```

---

## Status do desenvolvimento (incremental, por fases)

- [x] **Fase 0** — Scaffold: Ink + TS, logo, menu dos 25 capítulos, verificação do JDK.
- [ ] **Fase 1** — Núcleo: `javaRunner`, `CodeBlock`, `OutputPanel`, `progress` + Cap. 1 completo.
- [ ] **Fase 2** — Caps. 2–8 (fundamentos).
- [ ] **Fase 3** — Caps. 9–11 (POO + exceções).
- [ ] **Fase 4** — Caps. 14–21.
- [ ] **Fase 5** — Caps. 15 e 24 (arquivos e JDBC/SQLite).
- [ ] **Fase 6** — Caps. 12, 13, 22, 23, 25 (GUI e concorrência).
- [ ] **Fase 7** — Polimento: gamificação, navegação, README final.

## Navegação

- `↑`/`↓` — navegar pelos capítulos
- `Enter` — selecionar
- `q` ou `Ctrl+C` — sair
