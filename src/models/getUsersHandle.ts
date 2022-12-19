import { isArrayOfUsers, User } from '../store';
import { HandleRequestFN } from '.';
import { actionEvents, getContentType, safeJsonParse } from '../utils/';

const getUsersHandle = ({ response, emitter }: HandleRequestFN) => {
  const message = JSON.stringify({ message: 'getUsers' });
  emitter.emit(actionEvents.action, message);
  emitter.once(actionEvents.actionResponse, (msg) => {
    const users = safeJsonParse<User[]>(isArrayOfUsers)(msg) ?? [];
    response.writeHead(200, getContentType('json'));
    response.end(JSON.stringify(users));
  });
};

export default getUsersHandle;
