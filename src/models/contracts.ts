import { IncomingMessage, ServerResponse } from 'http';
import { UserActions } from '../store';

export type HandleRequestFN = {
  request?: IncomingMessage;
  response: ServerResponse<IncomingMessage> & {
    req: IncomingMessage;
  };
  store: UserActions;
};
