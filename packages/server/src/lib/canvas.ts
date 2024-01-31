import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';

export type Canvas = string[][];

export const canvas: Canvas = JSON.parse(
  readFileSync(
    fileURLToPath(new URL('canvas.json', import.meta.url))
  ).toString()
);
