import { getId, HandleRequestFN } from './';
import { isUserWithoutId, UserWithoutID } from '../store';
import {
  safeJsonParse,
  badJsonMessage,
  checkForUserFields,
  writeResponse,
  withHandlingErrorAsync,
  userNotFoundMsg,
} from '../utils';

const updateUserHandle = ({ request, response, store }: HandleRequestFN): Promise<void> => {
  return new Promise((resolve, reject) => {
    let body = '';
    request?.on('data', (chunk) => {
      body += chunk.toString();
    });

    request?.on('end', async () => {
      try {
        const parsedBody = safeJsonParse<UserWithoutID>(isUserWithoutId)(body);
        if (!parsedBody) {
          reject(badJsonMessage);
        } else {
          checkForUserFields(parsedBody);
          const id = getId(request?.url);
          const user = await store.getUserByID(id);
          if (!user) {
            throw new Error(userNotFoundMsg);
          }
          await store.updateUser(id, parsedBody);
          const updatedUser = await store.getUserByID(id);
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
