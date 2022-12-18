import cluster from 'cluster';
import EventEmitter from 'events';
import { fork } from 'child_process';
import { Server } from 'http';
import { cpus } from 'os';
import { resolve } from 'path';
import { cwd } from 'process';

import { actionEvents, PORT, sendMessage } from '../utils';

const amountOfCpus = cpus().length;

const runWithWorkers = (app: Server, emitter: EventEmitter) => {
  if (cluster.isPrimary) {
    console.log(`Master ${process.pid} is running`);
    const targetFile = resolve(cwd(), 'src', 'cp/cp.ts');

    const child = fork(targetFile);
    cluster.on('message', (worker, msg) => {
      child.send(msg);
      child.once('message', (msg) => worker.send(msg));
    });

    for (let index = 0; index < amountOfCpus; index++) {
      cluster.fork({ port: +PORT + index });
    }
    cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died, code: ${code}, signal: ${signal}`);
    });
  } else if (cluster.isWorker) {
    emitter.on(actionEvents.action, (msg) => sendMessage(msg));
    process.on('message', (msg) => emitter.emit(actionEvents.actionResponse, msg));

    const env = process.env.port;
    const currentPort = env ? +env : PORT;
    app.listen(currentPort, () =>
      console.log(`server: ${process.pid} is running on port: ${currentPort}`)
    );
  }
};

export default runWithWorkers;
