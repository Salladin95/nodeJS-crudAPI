import { HandleRequestFN } from './';
import { isUser, User } from '../store';
import { actionEvents, badJsonMessage, safeJsonParse, writeResponse } from '../utils';

const createUserHandle = ({ request, response, emitter }: HandleRequestFN): void => {
  let body = '';
  request?.on('data', (chunk) => {
    body += chunk.toString();
  });

  request?.on('end', async () => {
    const message = JSON.stringify({ message: 'addUser', data: body });
    emitter.emit(actionEvents.action, message);
    emitter.once(actionEvents.actionResponse, (msg) => {
      if (msg === badJsonMessage) {
        writeResponse({ response, responseType: 'JSON', code: 400, data: badJsonMessage });
        return;
      }
      const user = safeJsonParse<User>(isUser)(msg);
      writeResponse({
        response,
        responseType: 'JSON',
        code: 200,
        data: JSON.stringify(user),
      });
    });
  });
};

export default createUserHandle;
