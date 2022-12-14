import { HandleRequestFN } from '.';
import getContentType from '../uitls/getContentType';

const getUsersHandle = ({ response, store }: HandleRequestFN): void => {
  response.writeHead(200, getContentType('json'));
  response.end(JSON.stringify(store.getUsers()));
};

export default getUsersHandle;
