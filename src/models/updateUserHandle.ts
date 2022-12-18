import { getId, HandleRequestFN } from './';
import { isUser, User } from '../store';
import {
  safeJsonParse,
  badJsonMessage,
  writeResponse,
  userNotFoundMsg,
  actionEvents,
  getErrorMessage,
} from '../utils';

const updateUserHandle = ({ request, response, emitter }: HandleRequestFN): void => {
  let body = '';
  request?.on('data', (chunk) => {
    body += chunk.toString();
  });

  request?.on('end', async () => {
    try {
      const id = getId(request?.url);
      const data = JSON.stringify({ user: body, id });
      const message = JSON.stringify({ message: 'updateUser', data });
      emitter.emit(actionEvents.action, message);
      emitter.once(actionEvents.actionResponse, (msg) => {
        if (msg === badJsonMessage) {
          writeResponse({ response, responseType: 'text', code: 400, data: badJsonMessage });
          return;
        } else if (msg === userNotFoundMsg) {
          writeResponse({ response, responseType: 'text', code: 404, data: userNotFoundMsg });
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
    } catch (err) {
      const message = getErrorMessage(err);
      writeResponse({ response, responseType: 'text', code: 400, data: message });
    }
  });
};

export default updateUserHandle;
