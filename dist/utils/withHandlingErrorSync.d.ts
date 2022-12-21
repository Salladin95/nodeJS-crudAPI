import { HandleRequestFN } from '../models';
export type WithHandlingError = HandleRequestFN & {
    errorCode?: number;
    errorType?: string;
};
type ErrorHandlingWrappedFN = (params: WithHandlingError) => void;
declare const withHandlingErrorSync: (fn: ErrorHandlingWrappedFN) => ({ response, errorType, errorCode, emitter, request, }: WithHandlingError) => void;
export default withHandlingErrorSync;
