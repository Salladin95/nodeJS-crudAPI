import http from 'http';
import { UserActions } from '../store/contracts';
import getContentType from '../uitls/getContentType';

const getUsersHandle = (
	response: http.ServerResponse<http.IncomingMessage> & {
		req: http.IncomingMessage;
	},
	store: UserActions,
): void => {
	response.writeHead(201, getContentType('json'));
	response.end(JSON.stringify(store.getUsers()));
};

export default getUsersHandle;
