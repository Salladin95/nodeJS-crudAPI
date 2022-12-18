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
  return ({
    response,
    errorType = 'text',
    errorCode = 400,
    emitter,
    request,
  }: WithHandlingError) => {
    try {
      fn({ response, request, emitter });
    } catch (err) {
      const errMsg = getErrorMessage(err);
      writeResponse({
        response,
        code: errorCode,
        responseType: errorType,
        data: errMsg,
      });
    }
  };
};

export default withHandlingErrorSync;
