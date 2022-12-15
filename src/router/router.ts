import { BASE_URL, writeResponse } from '../uitls';
import { createUserHandle, getUserByIDHandle, getUsersHandle } from '../models';
import { HandleRequestParams } from '../models/contracts';

const userIDReg = /api\/users\/[a-z0-9]/gi;

export type RouterParams = {
  method: string | undefined;
  url: string | undefined;
} & HandleRequestParams;

const router = ({ method, url, store, response, request }: RouterParams) => {
  if ((method === 'GET' && url === BASE_URL) || url === BASE_URL + '/') {
    getUsersHandle({ response, store });
  } else if (method === 'GET' && url?.match(userIDReg)) {
    getUserByIDHandle({ response, request, store });
  } else if (method === 'POST' && url === BASE_URL) {
    (async () => {
      await createUserHandle({ request, response, store });
    })();
  } else {
    writeResponse({ code: 404, response, data: 'PAGE NOUT FOUND', responseType: 'text' });
  }
};

export default router;
