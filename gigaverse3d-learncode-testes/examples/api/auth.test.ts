import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { criarApp, TOKEN_EXEMPLO } from '../../sut/api/app';
import type { Express } from 'express';

// DELETE é uma rota PROTEGIDA: exige o header Authorization: Bearer <token>.
describe('autenticação na rota protegida (DELETE)', () => {
  let app: Express;
  let id: number;

  beforeEach(async () => {
    app = criarApp();
    // Cria um jogador para então tentar removê-lo.
    const res = await request(app).post('/jogadores').send({ nome: 'Aria', nivel: 1 });
    id = res.body.id;
  });

  it('sem token → 401', async () => {
    const res = await request(app).delete(`/jogadores/${id}`);
    expect(res.status).toBe(401);
  });

  it('token inválido → 401', async () => {
    const res = await request(app).delete(`/jogadores/${id}`).set('Authorization', 'Bearer errado');
    expect(res.status).toBe(401);
  });

  it('token válido → 204 e o jogador some da lista', async () => {
    const res = await request(app)
      .delete(`/jogadores/${id}`)
      .set('Authorization', `Bearer ${TOKEN_EXEMPLO}`);
    expect(res.status).toBe(204);

    const lista = await request(app).get('/jogadores');
    expect(lista.body).toHaveLength(0);
  });

  it('token válido mas id inexistente → 404', async () => {
    const res = await request(app)
      .delete('/jogadores/999')
      .set('Authorization', `Bearer ${TOKEN_EXEMPLO}`);
    expect(res.status).toBe(404);
  });
});
