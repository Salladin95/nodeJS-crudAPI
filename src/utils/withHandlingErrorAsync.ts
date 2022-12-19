import { userNotFoundMsg } from '../utils';
import { HandleRequestFN } from '../models';
import getErrorMessage from './getErrorMessage';
import writeResponse from './writeResponse';

export type WithHandlingError = HandleRequestFN & {
  errorCode?: number;
  errorType?: string;
};

const withHandlingErrorAsync = (fn: (params: WithHandlingError) => Promise<void>) => {
  return async ({
    response,
    request,
    emitter,
    errorCode = 400,
    errorType = 'text',
  }: WithHandlingError) => {
    try {
      await fn({ response, request, emitter });
    } catch (err) {
      const msg = typeof err === 'string' ? err : getErrorMessage(err);
      const code = msg === userNotFoundMsg ? 404 : errorCode;
      writeResponse({
        response,
        code,
        responseType: errorType,
        data: msg,
      });
    }
  };
};

export default withHandlingErrorAsync;
