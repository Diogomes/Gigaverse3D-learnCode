import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { criarApp } from '../../sut/api/app';
import type { Express } from 'express';

// Supertest dispara requisições direto no app Express, sem abrir porta real.
describe('API /jogadores', () => {
  let app: Express;

  // Recria o app antes de cada teste → store sempre limpa (testes isolados).
  beforeEach(() => {
    app = criarApp();
  });

  it('GET /health responde 200 e {status:"ok"}', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });

  it('GET /jogadores começa com lista vazia', async () => {
    const res = await request(app).get('/jogadores');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('POST /jogadores válido cria e responde 201', async () => {
    const res = await request(app).post('/jogadores').send({ nome: 'Aria', nivel: 3 });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ nome: 'Aria', nivel: 3 });
    expect(res.body.id).toBeDefined();
  });

  it('POST /jogadores inválido responde 400', async () => {
    const res = await request(app).post('/jogadores').send({ nome: 'xy' });
    expect(res.status).toBe(400);
  });
});
