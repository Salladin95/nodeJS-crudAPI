import * as dotenv from 'dotenv';
import http from 'http';

import { writeResponse } from './uitls';
import { createUserHandle, getUserByIDHandle, getUsersHandle } from './models';
import { createUsersStore } from './store';

dotenv.config();

const PORT = process.env.PORT ?? 4000;
const BASE_URL = process.env.BASE_URL;

const userIDReg = /api\/users\/[a-z0-9]/gi;

const store = createUsersStore();

const myServer = http.createServer((request, response) => {
  const method = request.method;
  const url = request.url;

  if ((method === 'GET' && url === BASE_URL) || url === BASE_URL + '/') {
    getUsersHandle({ response, store });
  } else if (method === 'GET' && url?.match(userIDReg)) {
    getUserByIDHandle({ response, request, store });
  } else if (method === 'POST' && url === BASE_URL) {
    (async () => {
      await createUserHandle({ request, response, store });
    })();
  } else {
    writeResponse({ code: 404, response, data: 'PAGE NOUT FOUND', responseType: 'text' });
  }
});

myServer.listen(PORT, () => console.log(`server is running on port: ${PORT}`));
