import { isUser, User } from '../store';
import { HandleRequestFN, getId } from '.';
import {
  actionEvents,
  safeJsonParse,
  userNotFoundMsg,
  withHandlingErrorSync,
  writeResponse,
} from '../utils';

const getUserByIDHandle = ({ response, request, emitter }: HandleRequestFN) => {
  const id = getId(request?.url);
  const message = JSON.stringify({ message: 'getUserByID', data: id });
  emitter.emit(actionEvents.action, message);
  emitter.once(actionEvents.actionResponse, (msg) => {
    if (msg === userNotFoundMsg) {
      writeResponse({ response, responseType: 'JSON', code: 404, data: userNotFoundMsg });
      return;
    }
    const user = safeJsonParse<User>(isUser)(msg);
    writeResponse({ response, responseType: 'JSON', code: 200, data: JSON.stringify(user) });
  });
};

export default withHandlingErrorSync(getUserByIDHandle);
