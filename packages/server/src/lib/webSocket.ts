import { App } from 'uWebSockets.js';
import { Server } from 'socket.io';

const io = new Server();

io.on('connection', (socket) => {
  console.log('received connection');
  socket.emit('hello', 'world');
});

export const wss = App();
io.attachApp(wss);
