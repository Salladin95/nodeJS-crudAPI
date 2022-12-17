import cluster from 'cluster';
import { Server } from 'http';
import { cpus } from 'os';

import { PORT } from '../utils';

const amountOfCpus = cpus().length;

const runWithWorkers = (app: Server) => {
  if (cluster.isPrimary) {
    for (let index = 0; index < amountOfCpus; index++) {
      cluster.fork({ index });
    }
    cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died, code: ${code}, signal: ${signal}`);
      // cluster.fork();
    });
  } else if (cluster.isWorker) {
    const env = process.env.index;
    console.log({ env });
    app.listen(PORT, () => console.log(`server: ${process.pid} is running on port: ${PORT}`));
  }
};

export default runWithWorkers;
