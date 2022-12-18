import createApp from './server';
import { resolve } from 'path';
import { cwd } from 'process';
import { fork } from 'child_process';
import { EventEmitter } from 'stream';

import { actionEvents, isWithWorkers, PORT } from './utils';
import runWithWorkers from './worker';

const emitter = new EventEmitter();

if (isWithWorkers()) {
  const app = createApp(emitter);
  runWithWorkers(app, emitter);
} else {
  const targetFile = resolve(cwd(), 'src', 'cp/cp.ts');
  const child = fork(targetFile);

  emitter.on(actionEvents.action, (msg) => child.send(msg));
  child.on('message', (msg) => emitter.emit(actionEvents.actionResponse, msg));

  const app = createApp(emitter);
  app.listen(PORT, () => console.log(`server is running on port: ${PORT}`));
}
