import { HandleRequestFN, getId } from '.';
import { withHandlingErrorSync, writeResponse, userNotFoundMsg } from '../uitls';

const getUserByIDHandle = ({ response, request, store }: HandleRequestFN): void => {
  const id = getId(request?.url);
  const user = store.getUserByID(id);
  if (!user) {
    throw new Error(userNotFoundMsg);
  }
  writeResponse({ response, responseType: 'JSON', code: 200, data: JSON.stringify(user) });
};

export default withHandlingErrorSync(getUserByIDHandle);
