import cluster from 'cluster';
import EventEmitter from 'events';
import { Server } from 'http';

import { PORT } from '../utils';
import primaryCluster from './primaryCluster';
import workerCluster from './workerCluster';

const runWithWorkers = (app: Server, emitter: EventEmitter) => {
  if (cluster.isPrimary) {
    primaryCluster(+PORT);
  } else if (cluster.isWorker) {
    workerCluster(+PORT, emitter, app);
  }
};

export default runWithWorkers;
