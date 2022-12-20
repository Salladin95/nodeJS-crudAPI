import { HandleRequestFN } from './';
import { actionEvents, safeJsonParse, withHandlingErrorAsync, writeResponse } from '../utils';
import isErrorInChildProcc, { CPError } from '../cp/isErrorInChildProcess';

const createUserHandle = ({ request, response, emitter }: HandleRequestFN): Promise<void> => {
  return new Promise((res, rej) => {
    let body = '';
    request?.on('data', (chunk) => {
      body += chunk.toString();
    });

    request?.on('end', async () => {
      const message = JSON.stringify({ message: 'addUser', data: body });
      emitter.emit(actionEvents.action, message);
      emitter.once(actionEvents.actionResponse, (msg) => {
        try {
          const err = safeJsonParse<CPError>(isErrorInChildProcc)(msg);
          rej(err.errorMessage);
        } catch {
          writeResponse({
            response,
            responseType: 'JSON',
            code: 200,
            data: msg,
          });
          res(msg);
        }
      });
    });
  });
};

export default withHandlingErrorAsync(createUserHandle);
