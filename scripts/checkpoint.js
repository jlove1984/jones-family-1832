#!/usr/bin/env node

/**
 * Checkpoint: run gate (type-check) then commit.
 * Use at logical checkpoints so only passing code is committed.
 *
 * Usage:
 *   pnpm run checkpoint -- "feat(layout): add app sidebar"
 *   pnpm run checkpoint "fix: typo in header"
 *
 * Steps:
 * 1. Run `pnpm run gate`; exit non-zero if it fails.
 * 2. Run `git add -A` (stage all changes).
 * 3. Run `git commit -m "<message>"`.
 */

const { execSync } = require('child_process');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const message = process.argv.slice(2).join(' ').trim();

if (!message) {
  console.error('Usage: pnpm run checkpoint -- "your commit message"');
  process.exit(1);
}

function run(cmd, options = {}) {
  return execSync(cmd, {
    cwd: repoRoot,
    stdio: 'inherit',
    shell: true,
    ...options,
  });
}

try {
  console.log('Running gate (type-check)...');
  run('pnpm run gate');
} catch (e) {
  console.error('Gate failed. Fix errors before committing.');
  process.exit(1);
}

try {
  run('git add -A');
  run(`git commit -m ${JSON.stringify(message)}`);
  console.log('Checkpoint commit created.');
} catch (e) {
  console.error('Commit failed (e.g. nothing to commit or git error).');
  process.exit(1);
}
