import { getId, HandleRequestFN } from './';
import { isUser, UserWithoutID } from '../store';
import {
  safeJsonParse,
  badJsonMessage,
  checkForUserFields,
  writeResponse,
  withHandlingErrorAsync,
  userNotFoundMsg,
} from '../uitls';

const updateUserHandle = ({ request, response, store }: HandleRequestFN): Promise<void> => {
  return new Promise((resolve, reject) => {
    let body = '';
    request?.on('data', (chunk) => {
      body += chunk.toString();
    });

    request?.on('end', async () => {
      try {
        const parsedBody = safeJsonParse<UserWithoutID>(isUser)(body);
        if (!parsedBody) {
          reject(badJsonMessage);
        } else {
          checkForUserFields(parsedBody);
          const id = getId(request?.url);
          const user = store.getUserByID(id);
          if (!user) {
            throw new Error(userNotFoundMsg);
          }
          store.updateUser(id, parsedBody);
          const updatedUser = store.getUserByID(id);
          writeResponse({
            code: 200,
            response,
            data: JSON.stringify(updatedUser),
            responseType: 'json',
          });
          resolve();
        }
      } catch (err) {
        reject(err);
      }
    });
  });
};

export default withHandlingErrorAsync(updateUserHandle);
