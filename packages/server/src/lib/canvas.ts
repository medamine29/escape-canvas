import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';

export type Canvas = string[][];

export const canvas: Canvas = JSON.parse(
  readFileSync(
    fileURLToPath(new URL('canvas.json', import.meta.url))
  ).toString()
);

const persistCanvas = () => {
  const filePath = fileURLToPath(new URL('canvas.json', import.meta.url));
  writeFileSync(filePath, JSON.stringify(canvas, null, 2));
};

export const updateCanvas = (
  rowIndex: number,
  colIndex: number,
  color: string
) => {
  if (canvas && canvas.length > rowIndex) {
    const canvasRow = canvas[rowIndex];
    if (canvasRow && canvasRow.length > colIndex) {
      canvas[rowIndex]![colIndex] = color;
      persistCanvas();
    }
  }
};
