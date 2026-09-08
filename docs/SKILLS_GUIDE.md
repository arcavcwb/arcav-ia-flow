# 🧠 Catálogo Maestro de Core Skills

Este documento detalla las **8 Skills Maestras** incluidas en `@arcav-ia/flow`, sus principios rectores, condiciones de disparo y comandos de verificación.

---

## Índice de Skills
1. [Impeccable (Craft Floor UI/UX)](#1-impeccable)
2. [Caveman (Token Efficiency & Lean Communication)](#2-caveman)
3. [Ponytail (Lean Architecture & YAGNI Ladder)](#3-ponytail)
4. [Contract-First API (Zod Runtime Validation)](#4-contract-first-api)
5. [Vite-Modernizer (Legacy to Modern SPA)](#5-vite-modernizer)
6. [Web-Vitals-Heavy-Media (Performance & Core Web Vitals)](#6-web-vitals-heavy-media)
7. [Pnpm-Monorepo-Architect (Turborepo & Workspaces)](#7-pnpm-monorepo-architect)
8. [Playwright-E2E-Suite (Deterministic E2E Testing)](#8-playwright-e2e-suite)

---

## 1. Impeccable
- **Propósito:** Elevar el estándar de diseño frontend, erradicar el *AI-Slop* visual y garantizar accesibilidad WCAG 2.1 AA.
- **Ubicación:** `.agents/skills/impeccable/`
- **Reglas Innegociables:**
  - **0 Emojis Unicode en UI:** Prohibido usar `🛵`, `📦`, `🎁` en interfaces de producción. Todo icono debe ser SVG vectorial (ej. Lucide icons).
  - **Touch Targets Táctiles:** En interfaces móviles, todo botón o enlace interactivo debe medir mínimo 48×48px.
  - **Contraste Solar Estricto:** Prohibido texto gris sobre fondos de color tenue. Ratios de contraste ≥ 4.5:1.
  - **Zoom Móvil:** Prohibido bloquear zoom con `maximum-scale=1, user-scalable=0`.
- **Verificación Mecánica:**
  ```bash
  pnpm run check:design
  # o directamente:
  .agents/skills/impeccable/scripts/impeccable detect
  ```

---

## 2. Caveman
- **Propósito:** Reducir drásticamente el consumo de tokens en contexto y prompts, manteniendo precisión técnica absoluta.
- **Ubicación:** `.agents/skills/caveman/`
- **Filosofía:**
  - Cero saludos vacíos, cero rodeos ni rellenos decorativos.
  - Formato: `[sujeto] [acción] [motivo]. [siguiente paso]`.
  - Reduce el gasto de tokens entre un 40% y 70% sin perder un solo comando o nombre de función.
- **Disparadores:** `/caveman`, "caveman mode", "sé breve", "menos tokens".

---

## 3. Ponytail
- **Propósito:** Erradicar la sobre-ingeniería, abstracciones prematuras y código especulativo.
- **Ubicación:** `.agents/skills/ponytail/`
- **Escalera YAGNI:**
  1. ¿Tiene que existir esto? Si es especulativo -> **SKIP (YAGNI)**.
  2. ¿Ya existe en el proyecto? -> **REUTILIZAR**.
  3. ¿La biblioteca estándar (stdlib) lo resuelve? -> **USAR STDLIB** (ej. `Intl.NumberFormat`, `crypto.randomUUID`).
  4. ¿La plataforma nativa lo cubre? -> **USAR PLATAFORMA** (HTML nativo, constraints SQL).
  5. ¿Una dependencia ya instalada lo soluciona? -> **USARLA** (prohibido agregar librerías para tareas triviales).
  6. ¿Puede ser una sola línea? -> **UNA LÍNEA**.
- **Disparadores:** `/ponytail`, "hazlo simple", "solución mínima", "YAGNI".

---

## 4. Contract-First API
- **Propósito:** Garantizar que toda comunicación con APIs externas (Webhooks, BaaS, servicios de mensajería) esté modelada y validada en runtime.
- **Ubicación:** `.agents/skills/contract-first-api/`
- **Reglas:**
  - Prohibido el uso de `any` o asunciones sobre payloads externos.
  - Tipado inferido estáticamente vía `z.infer<typeof Schema>`.
  - Manejo defensivo obligatorio mediante `schema.safeParse(data)` antes de procesar cualquier dato.

---

## 5. Vite-Modernizer
- **Propósito:** Protocolo de migración quirúrgica para SPAs heredadas (CRA, Webpack obsoleto, Create React App).
- **Ubicación:** `.agents/skills/vite-modernizer/`
- **Capacidades:**
  - Sustitución de `react-scripts` por Vite + Rollup.
  - Configuración de aliases `@/*` limpios en `vite.config.ts` y `tsconfig.json`.
  - Limpieza de polyfills obsoletos y configuración HMR instantánea.

---

## 6. Web-Vitals-Heavy-Media
- **Propósito:** Optimización agresiva de Core Web Vitals (LCP, CLS, INP) en aplicaciones con alto contenido de imágenes y video.
- **Ubicación:** `.agents/skills/web-vitals-heavy-media/`
- **Técnicas Clave:**
  - Placeholders SVG progresivos y dimensiones fijas `aspect-ratio` para evitar saltos de diseño (CLS = 0).
  - Lazy loading nativo (`loading="lazy"`) y decoding asíncrono (`decoding="async"`).
  - Preconexión a CDN de medios y formatos de última generación (WebP, AVIF).

---

## 7. Pnpm-Monorepo-Architect
- **Propósito:** Gobernanza y gestión de repositorios multi-paquete con `pnpm workspaces` y Turborepo.
- **Ubicación:** `.agents/skills/pnpm-monorepo-architect/`
- **Reglas:**
  - Dependencias internas enlazadas con `workspace:*`.
  - Prevención de dependencias fantasma (*phantom dependencies*).
  - Pipeline incremental con caché en `turbo.json`.

---

## 8. Playwright-E2E-Suite
- **Propósito:** Automatización de pruebas End-to-End deterministas basadas en el comportamiento real del usuario.
- **Ubicación:** `.agents/skills/playwright-e2e-suite/`
- **Principios:**
  - Selectores accesibles obligatorios (`getByRole`, `getByLabel`, `getByText`). Prohibido acoplar a clases CSS o IDs frágiles.
  - Cobertura multi-viewport: móvil (390×844px) y desktop (1280×720px).
  - Cero dependencias de `page.waitForTimeout()` arbitrarios: esperas basadas en assertions web-first.
