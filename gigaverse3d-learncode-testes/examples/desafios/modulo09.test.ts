import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { criarApp } from '../../sut/api/app';
import type { Express } from 'express';

// DESAFIO — Módulo 9 (integração com Supertest)
// Depois de criar UM jogador, a listagem deve responder 200 e conter 1 item.
// Os valores abaixo estão errados de propósito. Corrija para deixar VERDE.
describe('desafio: criar e listar jogadores', () => {
  let app: Express;
  beforeEach(() => {
    app = criarApp();
  });

  it('após criar um jogador, a lista tem 1 item', async () => {
    await request(app).post('/jogadores').send({ nome: 'Aria', nivel: 3 });

    const res = await request(app).get('/jogadores');
    expect(res.status).toBe(404); // TODO: qual status para um GET bem-sucedido?
    expect(res.body).toHaveLength(0); // TODO: quantos jogadores após criar 1?
  });
});
