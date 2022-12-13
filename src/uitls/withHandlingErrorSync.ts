import { HandleRequestFN } from '../models';
import getErrorMessage from './getErrorMessage';
import writeResponse from './writeResponse';

export type WithHandlingError = HandleRequestFN & {
	errorCode?: number;
	errorType?: string;
};

const withHandlingErrorSync = (fn: (params: WithHandlingError) => void) => {
	return ({ response, request, store, errorCode = 400, errorType = 'text' }: WithHandlingError) => {
		try {
			console.log('lets go');
			fn({ response, request, store });
		} catch (err) {
			console.error('lalalala', err);
			writeResponse({
				code: errorCode,
				response,
				data: getErrorMessage(err),
				responseType: errorType,
			});
		}
	};
};

export default withHandlingErrorSync;
