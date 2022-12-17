import { HandleRequestFN, getId } from '.';
import { withHandlingErrorAsync, writeResponse, userNotFoundMsg } from '../utils';

const getUserByIDHandle = async ({ response, request, store }: HandleRequestFN) => {
  const id = getId(request?.url);
  const user = await store.getUserByID(id);
  if (!user) {
    throw new Error(userNotFoundMsg);
  }
  writeResponse({ response, responseType: 'JSON', code: 200, data: JSON.stringify(user) });
};

export default withHandlingErrorAsync(getUserByIDHandle);
