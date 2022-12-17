import { HandleRequestFN } from '../models';
import getErrorMessage from './getErrorMessage';
import writeResponse from './writeResponse';
import { userNotFoundMsg } from '../utils';

export type WithHandlingError = HandleRequestFN & {
  errorCode?: number;
  errorType?: string;
};

type ErrorHandlingWrappedFN = (params: WithHandlingError) => void;

const withHandlingErrorSync = (fn: ErrorHandlingWrappedFN) => {
  return ({ response, errorType = 'text', errorCode = 400, store, request }: WithHandlingError) => {
    try {
      fn({ response, request, store });
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

export default withHandlingErrorSync;
