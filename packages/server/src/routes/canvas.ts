import { Response } from 'fets';
import { router } from '../lib/server.js';
import { canvas, updateCanvas } from '../lib/canvas.js';

const CANVAS_PATH = '/canvas';

router.route({
  path: CANVAS_PATH,
  method: 'GET',
  schemas: {
    responses: {
      200: {
        type: 'array',
        items: {
          type: 'array',
          items: {
            type: 'string'
          }
        }
      } as const
    }
  },
  handler() {
    return Response.json(canvas);
  }
});

router.route({
  path: CANVAS_PATH,
  method: 'PUT',
  request: {
    json: {
      type: 'object',
      properties: {
        color: { type: 'string' },
        rowIndex: { type: 'number' },
        colIndex: { type: 'number' }
      },
      additionalProperties: false,
      required: ['color', 'rowIndex', 'colIndex']
    }
  },
  handler: async (request: any) => {
    try {
      // Parse the request body as JSON
      const { rowIndex, colIndex, color } = await request.json();

      console.log('here !', color, colIndex, rowIndex);
      // Update the canvas
      updateCanvas(rowIndex, colIndex, color);
      return Response.json({ success: true }); // No content response
    } catch (error) {
      throw new Error('Erreur lors du traitement');
    }
  }
});
