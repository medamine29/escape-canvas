import { router } from './lib/server.js';
import { createServer } from 'http';
import { wss } from './lib/webSocket.js';

import './routes';

createServer(router).listen(3003, () => {
  console.log('Server listening at http://localhost:3003');
});

wss.listen(3004, () => {
  console.info(`WSS is listening on http://localhost:3004`);
});
