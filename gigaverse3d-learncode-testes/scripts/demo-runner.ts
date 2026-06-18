// Demonstra o testRunner: dispara o Vitest num alvo e imprime o resultado parseado.
// Uso: npx tsx scripts/demo-runner.ts [alvo]   (padrão: examples/unit)
import { rodarVitest } from '../src/core/testRunner';

const alvo = process.argv[2] ?? 'examples/unit';
const r = await rodarVitest(alvo);

console.log(`\nAlvo: ${alvo}`);
console.log(`${r.ok ? '✅ SUÍTE VERDE' : '❌ SUÍTE VERMELHA'} — ${r.passou}/${r.total} passaram` + (r.falhou ? `, ${r.falhou} falharam` : '') + ` (${r.duracaoMs}ms)`);
for (const t of r.testes) {
  console.log(`  ${t.status === 'passou' ? '✅' : t.status === 'falhou' ? '❌' : '⚪'} ${t.nome}`);
}
if (r.erro) console.log('erro:', r.erro);
process.exit(r.ok ? 0 : 1);
