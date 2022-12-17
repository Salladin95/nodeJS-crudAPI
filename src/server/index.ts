import { Cluster } from 'cluster';
import { createServer } from 'http';

import { UserActions } from 'store';
import router from '../router';

const createApp = (store: UserActions, cluster?: Cluster) =>
  createServer((request, response) => {
    const method = request.method;
    const endpoint = request.url;
    (async () => {
      await router({ method, store, endpoint, response, request });
      // cluster && cluster.worker?.kill();
    })();
  });

export default createApp;
