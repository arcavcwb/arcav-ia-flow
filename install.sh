#!/usr/bin/env bash
set -e

# Colores
BOLD="\033[1m"
GREEN="\033[0;32m"
CYAN="\033[0;36m"
YELLOW="\033[1;33m"
RED="\033[0;31m"
NC="\033[0m"

echo -e "${CYAN}${BOLD}"
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║             ⚡ @arcav-ia/flow — Antigravity CLI ⚡             ║"
echo "║             Universal Agentic Flow One-Liner                  ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

TARGET_DIR="${1:-.}"

# Si Node.js y NPX están disponibles, delegar a npx github
if command -v npx >/dev/null 2>&1; then
  echo -e "  ${GREEN}✓${NC} Node.js y NPX detectados. Ejecutando flujo vía NPX..."
  exec npx github:arcavcwb/arcav-ia-flow "$@"
fi

echo -e "  ${YELLOW}ℹ${NC} Node.js/NPX no detectado. Ejecutando instalador Bash portable..."

TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

echo -e "  ${CYAN}•${NC} Descargando @arcav-ia/flow desde GitHub..."
curl -fsSL "https://github.com/arcavcwb/arcav-ia-flow/archive/refs/heads/main.tar.gz" | tar -xz -C "$TMP_DIR"

SOURCE_DIR="$TMP_DIR/arcav-ia-flow-main"

if [[ ! -d "$SOURCE_DIR" ]]; then
  echo -e "${RED}Error al descargar y extraer la plantilla.${NC}"
  exit 1
fi

mkdir -p "$TARGET_DIR"

# Inicializar Git si no existe
if ! git -C "$TARGET_DIR" rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo -e "  ${CYAN}•${NC} Inicializando Git en $TARGET_DIR..."
  git -C "$TARGET_DIR" init >/dev/null 2>&1 || true
fi

# Copiar reglas, skills y templates
mkdir -p "$TARGET_DIR/.agents/rules"
mkdir -p "$TARGET_DIR/.agents/skills"
mkdir -p "$TARGET_DIR/.agents/agents"
mkdir -p "$TARGET_DIR/docs/walkthroughs"

cp "$SOURCE_DIR/templates/mode-operative/rules/superules.md" "$TARGET_DIR/.agents/rules/superules.md"
cp "$SOURCE_DIR/templates/mode-operative/AGENTS.md" "$TARGET_DIR/AGENTS.md"
cp "$SOURCE_DIR/templates/mode-operative/task-template.md" "$TARGET_DIR/task.md"
cp -r "$SOURCE_DIR/templates/core-skills/"* "$TARGET_DIR/.agents/skills/"
cp -r "$SOURCE_DIR/templates/core-agents/"* "$TARGET_DIR/.agents/agents/"

if [[ ! -f "$TARGET_DIR/.env" ]]; then
  cp "$SOURCE_DIR/templates/mode-operative/.env.example" "$TARGET_DIR/.env"
fi
cp "$SOURCE_DIR/templates/mode-operative/.env.example" "$TARGET_DIR/.env.example"
cp "$SOURCE_DIR/templates/mode-operative/mcp_config.template.json" "$TARGET_DIR/.agents/mcp_config.json"

echo -e "\n${GREEN}${BOLD}✨ ¡@arcav-ia/flow instalado con éxito en $TARGET_DIR!${NC}\n"
