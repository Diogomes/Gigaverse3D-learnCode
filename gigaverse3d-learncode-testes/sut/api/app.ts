import express, { type Express } from 'express';
import { z } from 'zod';

export interface Jogador {
  id: number;
  nome: string;
  nivel: number;
}

/** Token de exemplo exigido pela rota protegida (DELETE). */
export const TOKEN_EXEMPLO = 'gigatoken';

// Schema do contrato: o formato esperado no corpo das requisições.
const jogadorSchema = z.object({
  nome: z.string().min(3).max(20),
  nivel: z.number().int().min(1).default(1),
});

/**
 * Cria uma instância nova do app Express (store em memória).
 * Cada chamada começa com a lista zerada — útil para isolar os testes.
 */
export function criarApp(): Express {
  const app = express();
  app.use(express.json());

  let jogadores: Jogador[] = [];
  let proximoId = 1;

  // Healthcheck: forma simples de verificar se o serviço está no ar.
  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  // READ (lista) — GET não altera nada.
  app.get('/jogadores', (_req, res) => {
    res.json(jogadores);
  });

  // READ (um) — 404 quando não existe.
  app.get('/jogadores/:id', (req, res) => {
    const jogador = jogadores.find((j) => j.id === Number(req.params.id));
    if (!jogador) {
      res.status(404).json({ erro: 'jogador não encontrado' });
      return;
    }
    res.json(jogador);
  });

  // CREATE — valida o contrato; 400 se inválido, 201 se criado.
  app.post('/jogadores', (req, res) => {
    const parsed = jogadorSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ erro: 'dados inválidos', detalhes: parsed.error.issues });
      return;
    }
    const novo: Jogador = { id: proximoId++, nome: parsed.data.nome, nivel: parsed.data.nivel };
    jogadores.push(novo);
    res.status(201).json(novo);
  });

  // UPDATE — 404 se não existe; aceita campos parciais.
  app.put('/jogadores/:id', (req, res) => {
    const jogador = jogadores.find((j) => j.id === Number(req.params.id));
    if (!jogador) {
      res.status(404).json({ erro: 'jogador não encontrado' });
      return;
    }
    const parsed = jogadorSchema.partial().safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ erro: 'dados inválidos' });
      return;
    }
    Object.assign(jogador, parsed.data);
    res.json(jogador);
  });

  // DELETE — rota PROTEGIDA: exige header Authorization: Bearer <token>.
  app.delete('/jogadores/:id', (req, res) => {
    if (req.header('authorization') !== `Bearer ${TOKEN_EXEMPLO}`) {
      res.status(401).json({ erro: 'token ausente ou inválido' });
      return;
    }
    const indice = jogadores.findIndex((j) => j.id === Number(req.params.id));
    if (indice === -1) {
      res.status(404).json({ erro: 'jogador não encontrado' });
      return;
    }
    jogadores.splice(indice, 1);
    res.status(204).end();
  });

  return app;
}
