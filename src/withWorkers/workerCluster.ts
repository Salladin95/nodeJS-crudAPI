import { Server } from 'http';
import { EventEmitter } from 'stream';

import { actionEvents, sendMessage } from '../utils';
import { PORT } from '../utils';

const workerCluster = (emitter: EventEmitter, app: Server) => {
  emitter.on(actionEvents.action, (msg) => sendMessage(msg));
  process.on('message', (msg) => emitter.emit(actionEvents.actionResponse, msg));

  const env = process.env.port;
  const currentPort = env ? +env : PORT;
  app.listen(currentPort, () =>
    console.log(`server: ${process.pid} is running on port: ${currentPort}`)
  );
};

export default workerCluster;
