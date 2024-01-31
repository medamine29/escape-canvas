import { App } from 'uWebSockets.js';
import { Server } from 'socket.io';
import { canvas, updateCanvas } from './canvas.js';

const io = new Server({
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const RATE_LIMIT = 5; // Max number of updates per IP per interval
const TIME_LIMIT = 60 * 1000; // Time limit in milliseconds (e.g., 60 seconds)

let ipUpdateCounts: Record<string, any> = {};

io.on('connection', (socket) => {
  // send canvas state upon client connection
  socket.emit('canvasUpdate', canvas);

  // get ip on connection
  let ips =
    socket.handshake.headers['x-forwarded-for'] || socket.conn.remoteAddress;

  // check wether is single ip or an array
  let ip;
  if (Array.isArray(ips)) ip = ips[0];
  else ip = ips;

  if (ip && !ipUpdateCounts[ip]) {
    // Initialize count for the new IP
    ipUpdateCounts[ip] = { count: 0, timestamp: Date.now() };
  }

  // Handling messages for each socket
  socket.on('updateCell', (message) => {
    const currentTime = Date.now();
    const userData = ipUpdateCounts[ip!];

    // Reset count if time limit has passed
    if (userData && currentTime - userData.timestamp > TIME_LIMIT) {
      userData.count = 0;
      userData.timestamp = currentTime;
    }

    // Check rate limit
    if (userData.count < RATE_LIMIT) {
      const { rowIndex, colIndex, color } = message;

      if (color && rowIndex && colIndex) {
        updateCanvas(rowIndex, colIndex, color);
        io.emit('canvasUpdate', canvas);
        userData.count += 1;
      }
    } else {
      socket.emit(
        'rateLimitExceeded',
        'You have exceeded the number of allowed updates. Please wait.'
      );
    }
  });
});

export const wss = App();
io.attachApp(wss);
