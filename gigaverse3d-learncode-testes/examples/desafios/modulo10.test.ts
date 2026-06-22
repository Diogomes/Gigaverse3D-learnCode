import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { criarApp } from '../../sut/api/app';
import type { Express } from 'express';

// DESAFIO — Módulo 10 (contratos e status HTTP)
// Cada caso espera o status errado de propósito. Corrija os dois para VERDE.
describe('desafio: status HTTP corretos', () => {
  let app: Express;
  beforeEach(() => {
    app = criarApp();
  });

  it('POST com dado inválido responde 400', async () => {
    const res = await request(app).post('/jogadores').send({ nome: 'xy' });
    expect(res.status).toBe(201); // TODO: dado inválido → qual status?
  });

  it('GET de um id inexistente responde 404', async () => {
    const res = await request(app).get('/jogadores/999');
    expect(res.status).toBe(200); // TODO: recurso não encontrado → qual status?
  });
});
