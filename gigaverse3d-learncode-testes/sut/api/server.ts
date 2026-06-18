import { criarApp } from './app';

// Sobe a API do SUT numa porta real (útil para explorar manualmente).
// Nos testes de API com Supertest, a porta nem é necessária.
const porta = Number(process.env.PORT ?? 3001);
criarApp().listen(porta, () => {
  console.log(`SUT API no ar em http://localhost:${porta}`);
});
