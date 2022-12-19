import { HandleRequestFN, getId } from '.';
import { actionEvents, safeJsonParse, withHandlingErrorAsync, writeResponse } from '../utils';
import isErrorInChildProcc, { CPError } from '../cp/isErrorInChildProcess';

const getUserByIDHandle = ({ response, request, emitter }: HandleRequestFN): Promise<void> => {
  return new Promise((res, rej) => {
    const id = getId(request?.url);
    const message = JSON.stringify({ message: 'getUserByID', data: id });
    emitter.emit(actionEvents.action, message);
    emitter.once(actionEvents.actionResponse, (msg) => {
      try {
        const err = safeJsonParse<CPError>(isErrorInChildProcc)(msg);
        rej(err.errorMessage);
      } catch {
        writeResponse({ response, responseType: 'JSON', code: 200, data: msg });
        res();
      }
    });
  });
};

export default withHandlingErrorAsync(getUserByIDHandle);
