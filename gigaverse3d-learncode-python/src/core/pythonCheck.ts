import { execa } from 'execa';

export interface PythonInfo {
  /** true se um interpretador Python 3 foi encontrado no PATH. */
  disponivel: boolean;
  /** Comando que funcionou ('python3' ou 'python'). */
  comando?: string;
  /** Versão detectada, ex.: '3.14.5'. */
  versao?: string;
  /** Instrução de instalação quando não encontrado (Fedora). */
  instrucaoInstalacao?: string;
}

const INSTRUCAO_FEDORA =
  'Python 3 não foi encontrado. No Fedora instale com:\n' +
  '  sudo dnf install python3 python3-pip\n' +
  'O capítulo do turtle (cap. 4) também precisa de:\n' +
  '  sudo dnf install python3-tkinter';

/**
 * Detecta um interpretador Python 3 no PATH.
 * Tenta `python3` e, como fallback, `python` (validando que é a versão 3).
 */
export async function verificarPython(): Promise<PythonInfo> {
  for (const comando of ['python3', 'python']) {
    try {
      const { stdout } = await execa(comando, ['--version']);
      // Saída típica: "Python 3.14.5"
      const match = stdout.match(/Python\s+(\d+)\.(\d+)\.(\d+)/i);
      if (match && Number(match[1]) >= 3) {
        return {
          disponivel: true,
          comando,
          versao: `${match[1]}.${match[2]}.${match[3]}`,
        };
      }
    } catch {
      // tenta o próximo comando
    }
  }

  return {
    disponivel: false,
    instrucaoInstalacao: INSTRUCAO_FEDORA,
  };
}
