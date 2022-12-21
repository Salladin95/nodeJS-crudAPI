import { HandleRequestFN } from '.';
import { actionEvents, getContentType } from '../utils/';

const getUsersHandle = ({ response, emitter }: HandleRequestFN) => {
  const message = JSON.stringify({ message: 'getUsers' });
  emitter.emit(actionEvents.action, message);
  emitter.once(actionEvents.actionResponse, (msg) => {
    response.writeHead(200, getContentType('json'));
    response.end(msg);
  });
};

export default getUsersHandle;
