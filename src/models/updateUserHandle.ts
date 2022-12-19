import { getId, HandleRequestFN } from './';
import { safeJsonParse, writeResponse, actionEvents, withHandlingErrorAsync } from '../utils';
import isErrorInChildProcc, { CPError } from '../cp/isErrorInChildProcess';

const updateUserHandle = ({ request, response, emitter }: HandleRequestFN): Promise<void> => {
  return new Promise((res, rej) => {
    let body = '';
    request?.on('data', (chunk) => {
      body += chunk.toString();
    });

    request?.on('end', async () => {
      const id = getId(request?.url);
      const data = JSON.stringify({ user: body, id });
      const message = JSON.stringify({ message: 'updateUser', data });
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
          res();
        }
      });
    });
  });
};

export default withHandlingErrorAsync(updateUserHandle);
