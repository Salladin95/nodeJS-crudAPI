import cluster from 'cluster';
import EventEmitter from 'events';
import { Server } from 'http';

import primaryCluster from './primaryCluster';
import workerCluster from './workerCluster';

const runWithWorkers = (app: Server, emitter: EventEmitter) => {
  if (cluster.isPrimary) {
    primaryCluster();
  } else if (cluster.isWorker) {
    workerCluster(emitter, app);
  }
};

export default runWithWorkers;
