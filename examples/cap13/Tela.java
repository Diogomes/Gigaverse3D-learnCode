// Tela.java
// Imagens graficas e o sistema de coordenadas.
//
// JavaFX nao esta disponivel aqui, entao desenhamos numa GRADE de caracteres
// (uma matriz char[linhas][colunas]) que imita a tela. O importante e o conceito:
// a origem (0,0) fica no canto SUPERIOR ESQUERDO, X cresce para a DIREITA e
// Y cresce para BAIXO -- exatamente como num Canvas/GraphicsContext do JavaFX.

public class Tela {
    public static void main(String[] args) {
        // Cria uma "tela" de 12 linhas (Y) por 28 colunas (X), toda em branco.
        Grade tela = new Grade(28, 12);

        // (0,0) e o topo-esquerda: marcamos esse ponto com 'O'.
        tela.pixel(0, 0, 'O');

        // Retangulo: x=2, y=1, largura=10, altura=4. Como em fillRect(2,1,10,4).
        tela.retangulo(2, 1, 10, 4, '#');

        // Linha diagonal: comeca em (16,1) e desce para a direita,
        // mostrando que ao aumentar X vamos para a direita e Y para baixo.
        tela.linha(16, 1, 25, 8, '*');

        // "Circulo" aproximado: centro (20,7), raio 3.
        tela.circulo(20, 7, 3, '@');

        tela.desenhar();
    }
}

// Grade de caracteres que representa a tela. Coordenadas (x, y):
// x = coluna (cresce para a direita), y = linha (cresce para baixo).
class Grade {
    private final int largura;   // numero de colunas (eixo X)
    private final int altura;    // numero de linhas  (eixo Y)
    private final char[][] pixels;

    public Grade(int largura, int altura) {
        this.largura = largura;
        this.altura = altura;
        this.pixels = new char[altura][largura];   // [linha=Y][coluna=X]
        for (int y = 0; y < altura; y++) {
            for (int x = 0; x < largura; x++) {
                this.pixels[y][x] = '.';           // fundo "vazio"
            }
        }
    }

    // Acende um unico pixel, se estiver dentro da tela.
    public void pixel(int x, int y, char cor) {
        if (x >= 0 && x < largura && y >= 0 && y < altura) {
            pixels[y][x] = cor;                    // note: [y][x], Y vem primeiro!
        }
    }

    // Retangulo preenchido a partir do canto (x,y) com a largura e a altura dadas.
    public void retangulo(int x, int y, int larg, int alt, char cor) {
        for (int j = 0; j < alt; j++) {
            for (int i = 0; i < larg; i++) {
                pixel(x + i, y + j, cor);
            }
        }
    }

    // Linha entre dois pontos usando interpolacao simples (algoritmo de Bresenham).
    public void linha(int x0, int y0, int x1, int y1, char cor) {
        int dx = Math.abs(x1 - x0);
        int dy = -Math.abs(y1 - y0);
        int sx = x0 < x1 ? 1 : -1;
        int sy = y0 < y1 ? 1 : -1;
        int erro = dx + dy;
        while (true) {
            pixel(x0, y0, cor);
            if (x0 == x1 && y0 == y1) break;
            int e2 = 2 * erro;
            if (e2 >= dy) { erro += dy; x0 += sx; }
            if (e2 <= dx) { erro += dx; y0 += sy; }
        }
    }

    // "Circulo" aproximado: marca os pontos cuja distancia ao centro ~= raio.
    public void circulo(int cx, int cy, int raio, char cor) {
        for (int y = 0; y < altura; y++) {
            for (int x = 0; x < largura; x++) {
                double dist = Math.sqrt((x - cx) * (x - cx) + (y - cy) * (y - cy));
                if (Math.abs(dist - raio) < 0.5) {
                    pixel(x, y, cor);
                }
            }
        }
    }

    // Imprime a grade no terminal, com uma regua de X em cima e de Y na lateral.
    public void desenhar() {
        System.out.println("Origem (0,0) no canto superior esquerdo.");
        System.out.println("X cresce -> (direita)   Y cresce v (baixo)\n");

        System.out.print("   ");
        for (int x = 0; x < largura; x++) {
            System.out.print(x % 10);          // regua do eixo X
        }
        System.out.println("  <- X");

        for (int y = 0; y < altura; y++) {
            System.out.printf("%2d ", y);      // regua do eixo Y
            for (int x = 0; x < largura; x++) {
                System.out.print(pixels[y][x]);
            }
            System.out.println();
        }
        System.out.println(" ^\n Y");
    }
}
