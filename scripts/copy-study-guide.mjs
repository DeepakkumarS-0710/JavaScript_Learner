import { copyFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const publicDirectory = resolve(projectRoot, 'public');
await mkdir(publicDirectory, { recursive: true });
await copyFile(resolve(projectRoot, 'STUDY_GUIDE.md'), resolve(publicDirectory, 'STUDY_GUIDE.md'));
