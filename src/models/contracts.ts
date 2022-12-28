import { IncomingMessage, ServerResponse } from 'http';
import { EventEmitter } from 'stream';

export type HandleRequestParams = {
  request?: IncomingMessage;
  response: ServerResponse<IncomingMessage> & {
    req: IncomingMessage;
  };
  emitter: EventEmitter;
};
