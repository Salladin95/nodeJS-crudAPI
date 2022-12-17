import { isWithWorkers, PORT } from './utils';
import { createStore } from './store';
import createApp from './server';
import runWithWorkers from './worker';
import cluster from 'cluster';

const store = createStore();

if (isWithWorkers()) {
  const app = createApp(store, cluster);
  runWithWorkers(app);
} else {
  const app = createApp(store);
  app.listen(PORT, () => console.log(`server is running on port: ${PORT}`));
}
