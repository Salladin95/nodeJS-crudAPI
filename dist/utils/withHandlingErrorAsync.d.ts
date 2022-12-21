import { HandleRequestFN } from '../models';
export type WithHandlingError = HandleRequestFN & {
    errorCode?: number;
    errorType?: string;
};
declare const withHandlingErrorAsync: (fn: (params: WithHandlingError) => Promise<void>) => ({ response, request, emitter, errorCode, errorType, }: WithHandlingError) => Promise<void>;
export default withHandlingErrorAsync;
