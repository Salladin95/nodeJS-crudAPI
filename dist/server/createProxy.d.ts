/// <reference types="node" />
import http from 'http';
export type RequestOptions = {
    host: string;
    port: number;
    path: string | undefined;
    method: string | undefined;
    headers: http.IncomingHttpHeaders;
};
declare const createProxy: (clientRequest: http.IncomingMessage, clientResponse: http.ServerResponse<http.IncomingMessage> & {
    req: http.IncomingMessage;
}, options: RequestOptions) => void;
export default createProxy;
