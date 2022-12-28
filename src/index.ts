import { resolve } from 'path';
import { cwd } from 'process';
import { EventEmitter } from 'stream';

import createApp from './server';
import runWithWorkers from './withWorkers';
import { isWithWorkers, MODE, PORT } from './utils';
import launchChildProcess from './cp/launchChildProces';

const emitter = new EventEmitter();
const app = createApp(emitter);

if (isWithWorkers()) {
  runWithWorkers(app, emitter);
} else {
  const options =
    MODE === 'production' ? { folder: 'dist', ext: '.js' } : { folder: 'src', ext: '.ts' };
  const targetFile = resolve(cwd(), options.folder, `cp/cp${options.ext}`);
  launchChildProcess({ emitter, targetFile });
  app.listen(PORT, () => console.log(`server is running on port: ${PORT}`));
}
