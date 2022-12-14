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
    store,
    errorCode = 400,
    errorType = 'text',
  }: WithHandlingError) => {
    try {
      await fn({ response, request, store });
    } catch (err) {
      writeResponse({
        code: errorCode,
        response,
        data: getErrorMessage(err),
        responseType: errorType,
      });
    }
  };
};

export default withHandlingErrorAsync;
