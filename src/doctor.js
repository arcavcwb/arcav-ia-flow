import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { colors } from './ui.js';
import { isGitRepo } from './utils.js';

export const CORE_SKILLS = [
  'impeccable',
  'caveman',
  'ponytail',
  'contract-first-api',
  'vite-modernizer',
  'web-vitals-heavy-media',
  'pnpm-monorepo-architect',
  'playwright-e2e-suite',
];

export const SQUAD_AGENTS = [
  'architect-agent',
  'pr-reviewer-agent',
  'po-agent',
  'scrum-master-agent',
  'designer-agent',
  'frontend-dev-agent',
  'backend-dev-agent',
  'qa-agent',
  'devops-agent',
  'automation-agent',
];

export function runDoctor(targetDir = process.cwd()) {
  console.log(`${colors.cyan}${colors.bold}🩺 Ejecutando Antigravity Doctor en:${colors.reset} ${targetDir}\n`);
  let issues = 0;

  // 1. Git Repository
  if (isGitRepo(targetDir)) {
    console.log(`  ${colors.green}✓${colors.reset} Repositorio Git detectado e inicializado`);
  } else {
    console.log(`  ${colors.yellow}⚠${colors.reset} No es un repositorio Git (ejecuta 'git init')`);
    issues++;
  }

  // 2. GitHub CLI
  try {
    execSync('gh --version', { stdio: 'ignore' });
    try {
      const user = execSync('gh api user -q .login', { encoding: 'utf8' }).trim();
      console.log(`  ${colors.green}✓${colors.reset} GitHub CLI (gh) autenticado como: ${colors.cyan}@${user}${colors.reset}`);
    } catch {
      console.log(`  ${colors.yellow}⚠${colors.reset} GitHub CLI (gh) instalado pero no autenticado (ejecuta 'gh auth login')`);
      issues++;
    }
  } catch {
    console.log(`  ${colors.yellow}⚠${colors.reset} GitHub CLI (gh) no encontrado en PATH`);
    issues++;
  }

  // 3. Node & Environment
  console.log(`  ${colors.green}✓${colors.reset} Entorno de ejecución: Node.js ${process.version}`);

  // 4. .env Check
  const envPath = path.join(targetDir, '.env');
  if (fs.existsSync(envPath)) {
    console.log(`  ${colors.green}✓${colors.reset} Archivo .env presente`);
    const envContent = fs.readFileSync(envPath, 'utf8');
    if (envContent.includes('PLANE_API_KEY')) {
      console.log(`    ${colors.cyan}•${colors.reset} Plane API Key configurada`);
    }
    if (envContent.includes('SUPABASE')) {
      console.log(`    ${colors.cyan}•${colors.reset} Variables Supabase detectadas`);
    }
  } else {
    console.log(`  ${colors.yellow}⚠${colors.reset} Archivo .env no encontrado en ${targetDir} (crea uno desde .env.example)`);
    issues++;
  }

  // 5. Core Skills Check
  const skillsDir = path.join(targetDir, '.agents', 'skills');
  let foundSkills = 0;
  for (const skill of CORE_SKILLS) {
    if (fs.existsSync(path.join(skillsDir, skill))) {
      foundSkills++;
    }
  }

  if (foundSkills === CORE_SKILLS.length) {
    console.log(`  ${colors.green}✓${colors.reset} Todas las skills maestras presentes (${foundSkills}/${CORE_SKILLS.length})`);
  } else {
    console.log(`  ${colors.yellow}⚠${colors.reset} Faltan skills maestras en .agents/skills/ (${foundSkills}/${CORE_SKILLS.length} encontradas)`);
    issues++;
  }

  // 5b. Squad Agents Check
  const agentsDir = path.join(targetDir, '.agents', 'agents');
  let foundAgents = 0;
  for (const agent of SQUAD_AGENTS) {
    if (fs.existsSync(path.join(agentsDir, agent))) {
      foundAgents++;
    }
  }

  if (foundAgents === SQUAD_AGENTS.length) {
    console.log(`  ${colors.green}✓${colors.reset} Todos los agentes del Squad presentes (${foundAgents}/${SQUAD_AGENTS.length})`);
  } else {
    console.log(`  ${colors.yellow}⚠${colors.reset} Faltan agentes del Squad en .agents/agents/ (${foundAgents}/${SQUAD_AGENTS.length} encontrados)`);
    issues++;
  }

  // 6. Impeccable Design Check in package.json
  const pkgPath = path.join(targetDir, 'package.json');
  if (fs.existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
      if (pkg.scripts && pkg.scripts['check:design']) {
        console.log(`  ${colors.green}✓${colors.reset} Script 'check:design' configurado en package.json`);
      } else {
        console.log(`  ${colors.yellow}⚠${colors.reset} Script 'check:design' no configurado en package.json`);
      }
    } catch {
      // ignore
    }
  }

  // 7. Rules and Context files
  const superulesPath = path.join(targetDir, '.agents', 'rules', 'superules.md');
  const agentsPath = path.join(targetDir, 'AGENTS.md');
  if (fs.existsSync(superulesPath) && fs.existsSync(agentsPath)) {
    console.log(`  ${colors.green}✓${colors.reset} Reglas de gobernanza y AGENTS.md sincronizados`);
  } else {
    console.log(`  ${colors.yellow}⚠${colors.reset} Faltan superules.md o AGENTS.md`);
    issues++;
  }

  console.log('');
  if (issues === 0) {
    console.log(`${colors.green}${colors.bold}✨ Todo en orden. Tu entorno agéntico está 100% operativo.${colors.reset}\n`);
    return 0;
  } else {
    console.log(`${colors.yellow}${colors.bold}⚠ Se detectaron ${issues} observación(es). Revisa los detalles anteriores.${colors.reset}\n`);
    return 1;
  }
}
