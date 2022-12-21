import { resolve } from 'path';
import { cwd } from 'process';
import { fork } from 'child_process';
import { EventEmitter } from 'stream';

import createApp from './server';

import { actionEvents, isWithWorkers, PORT } from './utils';
import runWithWorkers from './withWorkers';

const emitter = new EventEmitter();
const app = createApp(emitter);

if (isWithWorkers()) {
  runWithWorkers(app, emitter);
} else {
  const targetFile = resolve(cwd(), 'dist', 'cp/cp.js');
  const child = fork(targetFile);

  emitter.on(actionEvents.action, (msg) => child.send(msg));
  child.on('message', (msg) => emitter.emit(actionEvents.actionResponse, msg));

  app.listen(PORT, () => console.log(`server is running on port: ${PORT}`));
}
