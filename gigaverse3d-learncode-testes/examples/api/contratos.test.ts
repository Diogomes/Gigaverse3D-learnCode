import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { criarApp } from '../../sut/api/app';
import type { Express } from 'express';

// O "contrato" da API: o status HTTP certo + um corpo no formato esperado.
describe('contratos e status HTTP', () => {
  let app: Express;
  beforeEach(() => {
    app = criarApp();
  });

  it('POST válido responde 201 e devolve o recurso com id', async () => {
    const res = await request(app).post('/jogadores').send({ nome: 'Boris', nivel: 2 });
    expect(res.status).toBe(201);
    // toMatchObject ignora o id (volátil) e checa só o que controlamos.
    expect(res.body).toMatchObject({ nome: 'Boris', nivel: 2 });
    expect(res.body.id).toBeDefined();
  });

  it('POST com nome curto demais responde 400 (validação do contrato)', async () => {
    const res = await request(app).post('/jogadores').send({ nome: 'xy' });
    expect(res.status).toBe(400);
  });

  it('nivel é opcional e assume 1 por padrão', async () => {
    const res = await request(app).post('/jogadores').send({ nome: 'Eco' });
    expect(res.status).toBe(201);
    expect(res.body.nivel).toBe(1);
  });

  it('GET de um id inexistente responde 404', async () => {
    const res = await request(app).get('/jogadores/999');
    expect(res.status).toBe(404);
  });
});
