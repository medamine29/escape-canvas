import { App } from 'uWebSockets.js';
import { Server } from 'socket.io';
import { canvas, updateCanvas } from './canvas.js';

const io = new Server({
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  // send canvas state upon client connection
  socket.emit('canvasUpdate', canvas);

  // Handling messages for each socket
  socket.on('updateCell', (message) => {
    const { rowIndex, colIndex, color } = message;

    // update canvas cell if fields are present
    if (color && rowIndex && colIndex) {
      updateCanvas(rowIndex, colIndex, color);
      // send canvas field to all onlineSockets
      io.emit('canvasUpdate', canvas);
    }
  });
});

export const wss = App();
io.attachApp(wss);
