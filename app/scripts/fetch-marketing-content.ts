import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const CONTENT_DIR = join(__dirname, '..', 'src', 'content');

function writeJson(filename: string, data: unknown): void {
  const path = join(CONTENT_DIR, filename);
  writeFileSync(path, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

function readJsonOrDefault<T>(filename: string, fallback: T): T {
  const path = join(CONTENT_DIR, filename);
  if (!existsSync(path)) return fallback;
  try {
    return JSON.parse(readFileSync(path, 'utf8')) as T;
  } catch {
    return fallback;
  }
}

async function fetchGoogleReviews(): Promise<void> {
  console.log('[reviews] not yet wired — skipping');
}

async function fetchSocialPosts(): Promise<void> {
  console.log('[social] not yet wired — skipping');
}

async function main(): Promise<void> {
  console.log('[fetch-marketing-content] start');
  await fetchGoogleReviews();
  await fetchSocialPosts();
  console.log('[fetch-marketing-content] done');
}

main().catch((err) => {
  console.error('[fetch-marketing-content] fatal:', err);
  process.exit(1);
});
