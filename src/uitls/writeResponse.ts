import http from 'http';
import { getContentType } from '.';

export type WriteResponeFN = {
	response: http.ServerResponse<http.IncomingMessage> & {
		req: http.IncomingMessage;
	};
	code: number;
	responseType: string;
	data: string;
};

const writeResponse = ({ response, code, responseType, data }: WriteResponeFN) => {
	response.writeHead(code, getContentType(responseType));
	response.end(data);
};

export default writeResponse;
