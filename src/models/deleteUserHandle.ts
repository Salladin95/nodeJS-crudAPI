import { HandleRequestFN, getId } from '.';
import { writeResponse, userNotFoundMsg, actionEvents, withHandlingErrorSync } from '../utils';

const deleteUserHandle = ({ response, request, emitter }: HandleRequestFN) => {
  const id = getId(request?.url);
  const message = JSON.stringify({ message: 'removeUser', data: id });
  emitter.emit(actionEvents.action, message);
  emitter.once(actionEvents.actionResponse, (msg) => {
    if (msg === userNotFoundMsg) {
      writeResponse({ response, responseType: 'text', code: 404, data: userNotFoundMsg });
      return;
    }
    writeResponse({ response, responseType: 'text', code: 204, data: msg });
  });
};

export default withHandlingErrorSync(deleteUserHandle);
