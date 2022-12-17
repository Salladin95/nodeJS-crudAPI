import { spawn } from 'child_process';
import cluster from 'cluster';
import { Server } from 'http';
import { cpus } from 'os';
import { resolve } from 'path';
import { cwd } from 'process';

import { PORT } from '../utils';

const amountOfCpus = cpus().length;
const targetFile = resolve(cwd(), 'db', 'db.ts');
const child = spawn('node', [targetFile]).once();

const runWithWorkers = (app: Server) => {
  if (cluster.isPrimary) {
    console.log(`Master ${process.pid} is running`);
    for (let index = 0; index < amountOfCpus; index++) {
      cluster.fork({ port: +PORT + index + 1 });
    }
    cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died, code: ${code}, signal: ${signal}`);
      // cluster.fork();
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
