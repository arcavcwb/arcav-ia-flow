# 🏛️ Filosofía de Gobernanza y Protocolo Zero-Trust

El **Antigravity Agentic Flow** no es un conjunto pasivo de prompts. Es un sistema operativo disciplinado para agentes de IA autónomos y desarrolladores humanos trabajando en paridad.

---

## 🛡️ Principio Fundamental: Zero-Trust (Cero Confianza)

1. **Prohibición de Asunciones:**
   El agente no asume estructuras de bases de datos, contratos de API ni requerimientos previos. Todo conocimiento debe provenir **exclusivamente de archivos leídos y verificados en la sesión actual**.

2. **Verificación Mecánica Inmediata:**
   Ningún cambio de código se da por completado sin haber pasado por:
   - Verificación estática (`build` / tipado TypeScript).
   - Verificación de diseño Impeccable (`pnpm run check:design`).
   - Pruebas unitarias o de integración relevantes.

---

## 🚨 Regla Estricta Anti-Olvido (IDE Memory Anchor)

Para evitar la pérdida de contexto en sesiones largas o truncadas por límites de tokens, **todo plan de trabajo (`task.md`) generado por un agente debe contener obligatoriamente el siguiente bloque final**:

```markdown
- [ ] **Gobernanza y Git Flow (CRÍTICO):**
  - [ ] NUNCA comitear directamente a `main`.
  - [ ] Verificar estar en una rama feature (`git checkout -b feat/...`).
  - [ ] Si la tarea involucra UI/UX o Frontend: Ejecutar verificación Impeccable (`pnpm run check:design`) y certificar 0 violaciones.
  - [ ] Ejecutar `git add .` y `git commit -m "..."`.
  - [ ] Ejecutar `git push -u origin feat/...`.
  - [ ] Actualizar descripción del Pull Request con detalles técnicos.
  - [ ] Generar reporte `walkthrough.md` y subirlo a Git (`docs/walkthroughs/`).
  - [ ] Actualizar Plane (si opera en Modo Enterprise).
```

---

## 🌿 Disciplina de Git Flow

- **`main` es Sagrada:** Queda estrictamente prohibido comitear directamente a la rama principal.
- **Nomenclatura de Ramas:**
  - `feat/nombre-feature` para nuevas funcionalidades.
  - `fix/nombre-bug` para correcciones de errores.
  - `docs/nombre-doc` para documentación técnica.
  - `chore/nombre-tarea` para mantenimiento y dependencias.
- **Pull Requests Atómicos:** Cada PR debe resolver un objetivo concreto, acompañarse de descripción técnica y pasar todas las verificaciones de CI.

---

## 📝 Registro de Walkthroughs

Al finalizar cualquier tarea o sprint, el agente genera un reporte técnico en:
`docs/walkthroughs/<identificador-de-tarea>.md`

Este documento contiene:
1. Resumen de archivos modificados y creados.
2. Contratos y tipos actualizados.
3. Comandos ejecutados y resultados de pruebas.
4. Hash del commit y enlaces a PRs.
