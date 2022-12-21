/// <reference types="node" />
import http from 'http';
export type WriteResponeFN = {
    response: http.ServerResponse<http.IncomingMessage> & {
        req: http.IncomingMessage;
    };
    code: number;
    responseType: string;
    data: string;
};
declare const writeResponse: ({ response, code, responseType, data }: WriteResponeFN) => void;
export default writeResponse;
