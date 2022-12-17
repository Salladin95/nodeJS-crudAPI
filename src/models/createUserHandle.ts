import { HandleRequestFN } from './';
import { createUser, UserWithoutID, isUserWithoutId } from '../store';
import {
  safeJsonParse,
  badJsonMessage,
  checkForUserFields,
  writeResponse,
  withHandlingErrorAsync,
} from '../utils';

const createUserHandle = ({ request, response, store }: HandleRequestFN): Promise<void> => {
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
          const user = createUser(parsedBody);
          await store.addUser(user);
          writeResponse({ code: 200, response, data: JSON.stringify(user), responseType: 'json' });
          resolve();
        }
      } catch {
        reject(badJsonMessage);
      }
    });
  });
};

export default withHandlingErrorAsync(createUserHandle);
