import { HandleRequestFN } from '.';
import { createUser, isUser, User, UserActions, UserWithoutID } from '../store';
import { checkForUserFields, safeJsonParse, badJsonMessage, withHandlingErrorAsync, writeResponse } from '../uitls';

const createUserHandle = ({ request, response, store }: HandleRequestFN) => {
	return new Promise((resolve, reject) => {
		let body = '';
		request.on('data', (chunk) => {
			body += chunk.toString();
		});		
		
		request.on('end', async () => {
			try {
				const parsedBody = safeJsonParse<UserWithoutID>(isUser)(body);
				if (!parsedBody) {
					reject(badJsonMessage);	
				} else {
					checkForUserFields(parsedBody);
					const user = createUser(parsedBody);
					store.addUser(user);
					writeResponse({ code: 200, response, data: JSON.stringify(user), responseType: 'json' });
					resolve('done');		
				} 
			} catch {
				reject(badJsonMessage);
			}
			});	
		});
	};

	export default withHandlingErrorAsync(createUserHandle);
