import isErrorInChildProcc, { CPError } from '../cp/isErrorInChildProcess';
import { HandleRequestFN, getId } from '.';
import { writeResponse, actionEvents, withHandlingErrorAsync, safeJsonParse } from '../utils';

const deleteUserHandle = ({ response, request, emitter }: HandleRequestFN): Promise<void> => {
  return new Promise((res, rej) => {
    const id = getId(request?.url);
    const message = JSON.stringify({ message: 'removeUser', data: id });
    emitter.emit(actionEvents.action, message);
    emitter.once(actionEvents.actionResponse, (msg) => {
      try {
        const err = safeJsonParse<CPError>(isErrorInChildProcc)(msg);
        rej(err.errorMessage);
      } catch {
        writeResponse({
          response,
          responseType: 'text',
          code: 204,
          data: `user: ${msg} is removed`,
        });
        res();
      }
    });
  });
};

export default withHandlingErrorAsync(deleteUserHandle);
