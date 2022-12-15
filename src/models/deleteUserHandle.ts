import { HandleRequestFN, getId } from '.';
import { withHandlingErrorSync, writeResponse, userNotFoundMsg } from '../uitls';

const deleteUserHandle = ({ response, request, store }: HandleRequestFN): void => {
  const id = getId(request?.url);
  const user = store.removeUser(id);
  if (!user) {
    throw new Error(userNotFoundMsg);
  }
  writeResponse({ response, responseType: 'JSON', code: 204, data: JSON.stringify(user) });
};

export default withHandlingErrorSync(deleteUserHandle);
