import fs from 'node:fs';
import path from 'node:path';
import { colors } from './ui.js';
import {
  TEMPLATES_DIR,
  copyDirRecursive,
  isGitRepo,
  initGitRepo,
  ensureGitIgnoreEntries,
  injectDesignCheckScript,
} from './utils.js';
import { runDoctor } from './doctor.js';

export async function scaffoldProject({ targetDir, mode = 'operative' }) {
  const selectedMode = mode.toLowerCase() === 'enterprise' ? 'enterprise' : 'operative';
  const modeTemplateDir = path.join(TEMPLATES_DIR, `mode-${selectedMode}`);
  const coreSkillsDir = path.join(TEMPLATES_DIR, 'core-skills');

  if (!fs.existsSync(modeTemplateDir)) {
    throw new Error(`Plantilla no encontrada para el modo: ${selectedMode}`);
  }

  console.log(`\n${colors.cyan}🚀 Configurando Antigravity Flow en:${colors.reset} ${colors.bold}${targetDir}${colors.reset}`);
  console.log(`${colors.cyan}📦 Modo seleccionado:${colors.reset} ${colors.bold}${selectedMode.toUpperCase()}${colors.reset}\n`);

  // 1. Crear directorio destino si no existe
  fs.mkdirSync(targetDir, { recursive: true });

  // 2. Inicializar Git si no existe
  if (!isGitRepo(targetDir)) {
    console.log(`  ${colors.cyan}•${colors.reset} Inicializando repositorio Git...`);
    initGitRepo(targetDir);
  }

  // 3. Crear directorios base
  fs.mkdirSync(path.join(targetDir, '.agents', 'rules'), { recursive: true });
  fs.mkdirSync(path.join(targetDir, '.agents', 'skills'), { recursive: true });
  fs.mkdirSync(path.join(targetDir, '.agents', 'agents'), { recursive: true });
  fs.mkdirSync(path.join(targetDir, 'docs', 'walkthroughs'), { recursive: true });

  // 4. Desplegar reglas, AGENTS.md y task.md
  console.log(`  ${colors.cyan}•${colors.reset} Desplegando reglas de gobernanza y AGENTS.md...`);
  fs.copyFileSync(
    path.join(modeTemplateDir, 'rules', 'superules.md'),
    path.join(targetDir, '.agents', 'rules', 'superules.md')
  );
  fs.copyFileSync(
    path.join(modeTemplateDir, 'AGENTS.md'),
    path.join(targetDir, 'AGENTS.md')
  );

  const taskPath = path.join(targetDir, 'task.md');
  if (!fs.existsSync(taskPath)) {
    fs.copyFileSync(
      path.join(modeTemplateDir, 'task-template.md'),
      taskPath
    );
  }

  // 5. Copiar Core Skills
  console.log(`  ${colors.cyan}•${colors.reset} Instalando las 8 Skills maestras...`);
  copyDirRecursive(coreSkillsDir, path.join(targetDir, '.agents', 'skills'));

  // 5b. Desplegar los 10 Agentes Autónomos del Squad
  console.log(`  ${colors.cyan}•${colors.reset} Desplegando los 10 Agentes especializados del Squad...`);
  const coreAgentsDir = path.join(TEMPLATES_DIR, 'core-agents');
  if (fs.existsSync(coreAgentsDir)) {
    copyDirRecursive(coreAgentsDir, path.join(targetDir, '.agents', 'agents'));
  }

  // 6. Configuración de variables de entorno (.env.example y .env)
  console.log(`  ${colors.cyan}•${colors.reset} Configurando variables de entorno...`);
  const envExampleSrc = path.join(modeTemplateDir, '.env.example');
  if (fs.existsSync(envExampleSrc)) {
    fs.copyFileSync(envExampleSrc, path.join(targetDir, '.env.example'));
    const envDest = path.join(targetDir, '.env');
    if (!fs.existsSync(envDest)) {
      fs.copyFileSync(envExampleSrc, envDest);
      console.log(`    ${colors.green}✓${colors.reset} Archivo .env inicial creado a partir de .env.example`);
    } else {
      console.log(`    ${colors.yellow}ℹ${colors.reset} Archivo .env preexistente preservado`);
    }
  }

  // 7. Configuración MCP
  console.log(`  ${colors.cyan}•${colors.reset} Generando configuración MCP (.agents/mcp_config.json)...`);
  const mcpSrc = path.join(modeTemplateDir, 'mcp_config.template.json');
  if (fs.existsSync(mcpSrc)) {
    const mcpDest = path.join(targetDir, '.agents', 'mcp_config.json');
    if (!fs.existsSync(mcpDest)) {
      fs.copyFileSync(mcpSrc, mcpDest);
    }
  }

  // 8. Blindar .gitignore
  console.log(`  ${colors.cyan}•${colors.reset} Blindando .gitignore...`);
  ensureGitIgnoreEntries(targetDir, [
    '.env',
    '.env.local',
    '*.log',
    'node_modules/',
    '.turbo/',
    'dist/',
    'coverage/',
    'playwright-report/',
    'test-results/',
  ]);

  // 9. Inyectar check:design en package.json si existe
  if (injectDesignCheckScript(targetDir)) {
    console.log(`  ${colors.green}✓${colors.reset} Script 'check:design' inyectado en package.json`);
  }

  // 10. Walkthroughs README inicial
  const walkthroughReadme = path.join(targetDir, 'docs', 'walkthroughs', 'README.md');
  if (!fs.existsSync(walkthroughReadme)) {
    fs.writeFileSync(
      walkthroughReadme,
      `# Registro de Walkthroughs y Entregas

Este directorio almacena los reportes técnicos detallados generados al finalizar cada tarea o Issue.
Cada archivo documenta: cambios realizados, contratos modificados, comandos ejecutados y resultados de pruebas.\n`,
      'utf8'
    );
  }

  console.log(`\n${colors.green}${colors.bold}🎉 ¡Flujo Agéntico desplegado con éxito en Modo ${selectedMode.toUpperCase()}!${colors.reset}\n`);
  
  // Diagnóstico final
  runDoctor(targetDir);
}
