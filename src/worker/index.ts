import cluster from 'cluster';
import EventEmitter from 'events';
import { fork } from 'child_process';
import { createServer, Server } from 'http';
import { cpus } from 'os';
import { resolve } from 'path';
import { cwd } from 'process';

import { actionEvents, getMinOf, PORT, sendMessage } from '../utils';

const amountOfCpus = cpus().length;

const runWithWorkers = (app: Server, emitter: EventEmitter) => {
  if (cluster.isPrimary) {
    let hostNumber = 1;
    createServer((request, response) => {
      const currentHost = +PORT + getMinOf(hostNumber, amountOfCpus);
      const newUrl = `http://localhost:${currentHost}${request.url}`;
      response.writeHead(302, { Location: newUrl });
      response.end('');
      if (amountOfCpus > hostNumber) {
        hostNumber++;
      } else {
        hostNumber = 1;
      }
    }).listen(PORT, () => console.log(`Master server: ${process.pid} is running on port: ${PORT}`));

    const targetFile = resolve(cwd(), 'src', 'cp/cp.ts');

    const child = fork(targetFile);
    cluster.on('message', (worker, msg) => {
      child.send(msg);
      child.once('message', (msg) => worker.send(msg));
    });

    for (let index = 0; index < amountOfCpus; index++) {
      cluster.fork({ port: +PORT + index + 1 });
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
