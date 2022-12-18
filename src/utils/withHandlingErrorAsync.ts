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
      writeResponse({
        response,
        code: errorCode,
        responseType: errorType,
        data: getErrorMessage(err),
      });
    }
  };
};

export default withHandlingErrorAsync;
