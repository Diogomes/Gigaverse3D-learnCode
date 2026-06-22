import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { criarApp } from '../../sut/api/app';
import type { Express } from 'express';

// Supertest dispara requisições direto no app Express, sem abrir porta de rede.
describe('integração da API de jogadores', () => {
  let app: Express;

  // App novo antes de cada teste → store em memória sempre limpa (isolamento).
  beforeEach(() => {
    app = criarApp();
  });

  it('GET /health responde 200 com {status:"ok"}', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });

  it('GET /jogadores começa vazio', async () => {
    const res = await request(app).get('/jogadores');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('POST cria o jogador e ele aparece na listagem (ida e volta)', async () => {
    const criado = await request(app).post('/jogadores').send({ nome: 'Aria', nivel: 3 });
    expect(criado.status).toBe(201);

    const lista = await request(app).get('/jogadores');
    expect(lista.body).toHaveLength(1);
    expect(lista.body[0]).toMatchObject({ nome: 'Aria', nivel: 3 });
  });
});
