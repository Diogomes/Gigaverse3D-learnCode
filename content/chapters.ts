import type { CapituloMeta } from '../src/types.js';

/**
 * Metadados dos 25 capítulos do livro Deitel "Java: Como Programar", 10ª ed.
 *
 * Esta é a fonte da verdade para o MENU. O conteúdo completo de cada capítulo
 * (objeto `Capitulo`) será adicionado em `content/capNN.ts` nas próximas fases.
 */
export const CAPITULOS_META: CapituloMeta[] = [
  { id: 1, titulo: 'Introdução aos computadores, à Internet e a Java', foco: 'JVM e bytecode' },
  { id: 2, titulo: 'Aplicativos Java; entrada/saída e operadores', foco: 'Variável e tipo primitivo' },
  { id: 3, titulo: 'Introdução a classes, objetos, métodos e Strings', foco: 'Classe vs. objeto' },
  { id: 4, titulo: 'Estruturas de controle: parte 1', foco: 'Fluxo de controle' },
  { id: 5, titulo: 'Estruturas de controle: parte 2', foco: 'Operadores lógicos' },
  { id: 6, titulo: 'Métodos: um exame mais profundo', foco: 'Método' },
  { id: 7, titulo: 'Arrays e ArrayLists', foco: 'Array' },
  { id: 8, titulo: 'Classes e objetos: um exame mais profundo', foco: 'Referência this' },
  { id: 9, titulo: 'POO: herança', foco: 'Herança' },
  { id: 10, titulo: 'POO: polimorfismo e interfaces', foco: 'Polimorfismo' },
  { id: 11, titulo: 'Tratamento de exceções', foco: 'Exceção' },
  { id: 12, titulo: 'Componentes GUI: parte 1 (JavaFX)', foco: 'Event-driven' },
  { id: 13, titulo: 'Imagens gráficas e Java 2D', foco: 'Sistema de coordenadas' },
  { id: 14, titulo: 'Strings, caracteres e expressões regulares', foco: 'Regex' },
  { id: 15, titulo: 'Arquivos, fluxos e serialização de objetos', foco: 'Persistência' },
  { id: 16, titulo: 'Coleções genéricas', foco: 'Genéricos' },
  { id: 17, titulo: 'Java SE Lambdas e Streams', foco: 'Stream' },
  { id: 18, titulo: 'Recursão', foco: 'Recursão' },
  { id: 19, titulo: 'Pesquisa, classificação e Big O', foco: 'Notação Big O' },
  { id: 20, titulo: 'Classes e métodos genéricos', foco: 'Parâmetro de tipo' },
  { id: 21, titulo: 'Estruturas de dados genéricas personalizadas', foco: 'Lista ligada' },
  { id: 22, titulo: 'Componentes GUI: parte 2', foco: 'Componentes compostos' },
  { id: 23, titulo: 'Simultaneidade (concorrência)', foco: 'Thread' },
  { id: 24, titulo: 'Acesso a bancos de dados com JDBC', foco: 'JDBC' },
  { id: 25, titulo: 'JavaFX GUI: parte 1', foco: 'MVC e controller' },
];
