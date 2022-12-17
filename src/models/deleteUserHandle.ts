import { HandleRequestFN, getId } from '.';
import { writeResponse, userNotFoundMsg, withHandlingErrorAsync } from '../utils';

const deleteUserHandle = async ({ response, request, store }: HandleRequestFN) => {
  const id = getId(request?.url);
  const user = await store.removeUser(id);
  if (!user) {
    throw new Error(userNotFoundMsg);
  }
  writeResponse({ response, responseType: 'JSON', code: 204, data: JSON.stringify(user) });
};

export default withHandlingErrorAsync(deleteUserHandle);
