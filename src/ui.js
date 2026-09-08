import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

export const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  magenta: '\x1b[35m',
  blue: '\x1b[34m',
};

export function showBanner() {
  console.log(`
${colors.cyan}${colors.bold}╔═══════════════════════════════════════════════════════════════╗
║             ⚡ @arcav-ia/flow — Antigravity CLI ⚡             ║
║         Zero-Trust Agentic Architecture & Governance          ║
║      Impeccable • Caveman • Ponytail • Contract-First         ║
╚═══════════════════════════════════════════════════════════════╝${colors.reset}
`);
}

export async function askQuestion(query, defaultValue = '') {
  const rl = readline.createInterface({ input, output });
  try {
    const answer = await rl.question(query);
    return answer.trim() || defaultValue;
  } finally {
    rl.close();
  }
}

export async function promptModeSelection() {
  console.log(`${colors.bold}¿Qué modo de flujo deseas desplegar en este proyecto?${colors.reset}`);
  console.log(`  ${colors.green}${colors.bold}1) Modo Operativo${colors.reset} (Recomendado: Git-First, sin Plane ni Scrum, máxima velocidad)`);
  console.log(`  ${colors.blue}${colors.bold}2) Modo Enterprise${colors.reset} (Gobernanza completa: Plane.so + Sprints + Scrum)\n`);
  
  const answer = await askQuestion(`${colors.bold}Selecciona una opción [1 o 2, default: 1]: ${colors.reset}`, '1');
  if (answer === '2' || answer.toLowerCase() === 'enterprise') {
    return 'enterprise';
  }
  return 'operative';
}
