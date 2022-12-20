import cluster from 'cluster';
import { fork } from 'child_process';
import { resolve } from 'path';
import { cwd } from 'process';
import { cpus } from 'os';

import launcLoadBalancer from './loadBalancer';
import { PORT } from '../utils';

const primaryCluster = () => {
  const amountOfCpus = cpus().length;
  const targetFile = resolve(cwd(), 'src', 'cp/cp.ts');
  const child = fork(targetFile);

  launcLoadBalancer();
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
};

export default primaryCluster;
