import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { criarApp, TOKEN_EXEMPLO } from '../../sut/api/app';
import type { Express } from 'express';

// DESAFIO — Módulo 11 (rotas protegidas)
// (1) Sem token, o DELETE deve responder 401.
// (2) Com o token CORRETO, deve responder 204.
// Corrija o status esperado e o header para deixar tudo VERDE.
describe('desafio: rota protegida com token', () => {
  let app: Express;
  let id: number;
  beforeEach(async () => {
    app = criarApp();
    const res = await request(app).post('/jogadores').send({ nome: 'Aria', nivel: 1 });
    id = res.body.id;
  });

  it('DELETE sem token responde 401', async () => {
    const res = await request(app).delete(`/jogadores/${id}`);
    expect(res.status).toBe(204); // TODO: sem Authorization → qual status?
  });

  it('DELETE com o token correto responde 204', async () => {
    const res = await request(app)
      .delete(`/jogadores/${id}`)
      .set('Authorization', 'Bearer token-errado'); // TODO: use o token correto
    expect(res.status).toBe(204);
  });
});
