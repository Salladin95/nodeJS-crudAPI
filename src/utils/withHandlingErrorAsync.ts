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
    store,
    errorCode = 400,
    errorType = 'text',
  }: WithHandlingError) => {
    try {
      await fn({ response, request, store });
    } catch (err) {
      const errMsg = getErrorMessage(err);
      const code = userNotFoundMsg === errMsg ? 404 : errorCode;
      writeResponse({
        response,
        code,
        responseType: errorType,
        data: errMsg,
      });
    }
  };
};

export default withHandlingErrorAsync;
