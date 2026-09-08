import path from 'node:path';
import fs from 'node:fs';
import { showBanner, promptModeSelection, colors } from './ui.js';
import { scaffoldProject } from './scaffolder.js';
import { runDoctor } from './doctor.js';
import { PACKAGE_ROOT } from './utils.js';

export async function main() {
  const args = process.argv.slice(2);

  // Leer versión de package.json
  const pkg = JSON.parse(fs.readFileSync(path.join(PACKAGE_ROOT, 'package.json'), 'utf8'));

  if (args.includes('-v') || args.includes('--version')) {
    console.log(`${pkg.name} v${pkg.version}`);
    process.exit(0);
  }

  if (args.includes('-h') || args.includes('--help')) {
    showBanner();
    console.log(`
${colors.bold}USO:${colors.reset}
  npx @arcav-ia/flow [directorio] [opciones]
  npx github:arcavcwb/arcav-ia-flow [directorio] [opciones]

${colors.bold}COMANDOS & EJEMPLOS:${colors.reset}
  npx @arcav-ia/flow init              Inyecta el flujo en el proyecto actual
  npx @arcav-ia/flow .                 Inyecta el flujo en el proyecto actual
  npx @arcav-ia/flow mi-proyecto       Crea un nuevo proyecto en ./mi-proyecto
  npx @arcav-ia/flow --doctor          Ejecuta el chequeo de salud del entorno

${colors.bold}OPCIONES:${colors.reset}
  --mode <operative|enterprise>    Selecciona el modo sin interacción
  --doctor, --check-env            Ejecuta únicamente el diagnóstico de salud
  -y, --yes                        Acepta los valores predeterminados
  -v, --version                    Muestra la versión instalada
  -h, --help                       Muestra esta ayuda
`);
    process.exit(0);
  }

  showBanner();

  if (args.includes('--doctor') || args.includes('--check-env')) {
    const code = runDoctor(process.cwd());
    process.exit(code);
  }

  // Parsear argumentos posicionales y flags
  let targetDir = process.cwd();
  let mode = null;
  let nonFlagArgs = [];

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--mode' && args[i + 1]) {
      mode = args[i + 1];
      i++;
    } else if (arg.startsWith('--mode=')) {
      mode = arg.split('=')[1];
    } else if (!arg.startsWith('-')) {
      nonFlagArgs.push(arg);
    }
  }

  if (nonFlagArgs.length > 0) {
    const targetArg = nonFlagArgs[0];
    if (targetArg !== 'init' && targetArg !== '.') {
      targetDir = path.resolve(process.cwd(), targetArg);
    }
  }

  if (!mode) {
    if (args.includes('-y') || args.includes('--yes')) {
      mode = 'operative';
    } else {
      mode = await promptModeSelection();
    }
  }

  try {
    await scaffoldProject({ targetDir, mode });
  } catch (error) {
    console.error(`\n${colors.red}${colors.bold}Error al desplegar el flujo:${colors.reset}`, error.message);
    process.exit(1);
  }
}
