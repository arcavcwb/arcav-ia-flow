#!/usr/bin/env node

import { main } from '../src/index.js';

main().catch((err) => {
  console.error('Error no controlado en @arcav-ia/flow:', err);
  process.exit(1);
});
