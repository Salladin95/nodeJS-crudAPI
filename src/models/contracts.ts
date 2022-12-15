import { IncomingMessage, ServerResponse } from 'http';
import { UserActions } from '../store';

export type HandleRequestParams = {
  request?: IncomingMessage;
  response: ServerResponse<IncomingMessage> & {
    req: IncomingMessage;
  };
  store: UserActions;
};
