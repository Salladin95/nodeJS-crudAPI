import http from 'http';
import { PORT } from './uitls';

import router from './router';
import { createUsersStore } from './store';

const store = createUsersStore();

const myServer = http.createServer((request, response) => {
  const method = request.method;
  const url = request.url;
  router({ method, store, url, response, request });
});

myServer.listen(PORT, () => console.log(`server is running on port: ${PORT}`));
