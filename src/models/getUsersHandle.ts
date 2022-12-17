import { HandleRequestFN } from '.';
import { getContentType, withHandlingErrorAsync } from '../utils/';

const getUsersHandle = async ({ response, store }: HandleRequestFN) => {
  const users = await store.getUsers();
  response.writeHead(200, getContentType('json'));
  response.end(JSON.stringify(users));
};

export default withHandlingErrorAsync(getUsersHandle);
