import { execa } from 'execa';

export interface ResultadoJdk {
  /** true se `javac` (compilador) está disponível no PATH. */
  temJavac: boolean;
  /** true se `java` (runtime) está disponível no PATH. */
  temJava: boolean;
  /** Versão detectada (ex.: "21.0.10"), se possível. */
  versao?: string;
  /** true quando dá para compilar E rodar. */
  ok: boolean;
}

/**
 * Detecta o JDK no PATH rodando `javac -version` e `java -version`.
 *
 * Tanto `javac` quanto `java` imprimem a versão em stderr (comportamento antigo
 * do JDK), por isso lemos as duas saídas.
 */
export async function checarJdk(): Promise<ResultadoJdk> {
  let temJavac = false;
  let temJava = false;
  let versao: string | undefined;

  try {
    const r = await execa('javac', ['-version'], { reject: false });
    const saida = `${r.stdout ?? ''} ${r.stderr ?? ''}`;
    if (r.exitCode === 0) {
      temJavac = true;
      versao = extrairVersao(saida);
    }
  } catch {
    temJavac = false;
  }

  try {
    const r = await execa('java', ['-version'], { reject: false });
    const saida = `${r.stdout ?? ''} ${r.stderr ?? ''}`;
    if (r.exitCode === 0) {
      temJava = true;
      versao = versao ?? extrairVersao(saida);
    }
  } catch {
    temJava = false;
  }

  return { temJavac, temJava, versao, ok: temJavac && temJava };
}

function extrairVersao(texto: string): string | undefined {
  // Captura padrões como: javac 21.0.10  |  openjdk version "21.0.10"
  const m = texto.match(/(\d+(?:\.\d+)+)/);
  return m ? m[1] : undefined;
}

/** Instrução de instalação exibida quando o JDK não é encontrado. */
export const INSTRUCAO_INSTALACAO_FEDORA =
  'sudo dnf install java-latest-openjdk-devel';
