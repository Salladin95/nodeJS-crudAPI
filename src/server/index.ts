import { createServer } from 'http';
import { EventEmitter } from 'stream';

import router from '../router';

const createApp = (emitter: EventEmitter) =>
  createServer((request, response) => {
    const method = request.method;
    const endpoint = request.url;
    router({ method, emitter, endpoint, response, request });
  });

export default createApp;
