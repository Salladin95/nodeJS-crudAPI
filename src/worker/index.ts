import cluster from 'cluster';
import { fork } from 'child_process';
import { Server } from 'http';
import { cpus } from 'os';
import { resolve } from 'path';

import { PORT } from '../utils';
import { cwd } from 'process';

const amountOfCpus = cpus().length;

const runWithWorkers = (app: Server) => {
  if (cluster.isPrimary) {
    console.log(`Master ${process.pid} is running`);
    const targetFile = resolve(cwd(), 'src', 'cp/cp.ts');

    const child = fork(targetFile);
    cluster.on('message', (worker, msg) => {
      console.log(`get message from worker: ${worker.id}, messasge: ${msg}`);
    });

    process.on('message', (d) => console.log(d));

    for (let index = 0; index < amountOfCpus; index++) {
      cluster.fork({ port: +PORT + index + 1 });
    }
    cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died, code: ${code}, signal: ${signal}`);
    });
  } else if (cluster.isWorker) {
    const env = process.env.port;
    const currentPort = env ? +env : PORT;
    app.listen(currentPort, () =>
      console.log(`server: ${process.pid} is running on port: ${currentPort}`)
    );
  }
};

export default runWithWorkers;
