import { writeResponse } from '../uitls';
import {
  createUserHandle,
  updateUserHandle,
  deleteUserHandle,
  getUserByIDHandle,
  getUsersHandle,
} from '../models';
import { HandleRequestParams } from '../models/contracts';

const userIDReg = /^\/api\/users\/[a-z0-9\-]+\/?$/;
const baseUrlReg = /^\/api\/users\/?$/;

export type RouterParams = {
  method: string | undefined;
  endpoint: string | undefined;
} & HandleRequestParams;

const router = async ({ method, endpoint, store, response, request }: RouterParams) => {
  if (!endpoint?.match(baseUrlReg) && !endpoint?.match(userIDReg)) {
    writeResponse({ code: 404, response, data: 'PAGE NOUT FOUND', responseType: 'text' });
    return;
  }

  if (endpoint.match(baseUrlReg)) {
    if (method === 'GET') {
      getUsersHandle({ response, store });
    } else if (method === 'POST') {
      await createUserHandle({ request, response, store });
    }
  } else if (method === 'GET') {
    getUserByIDHandle({ response, request, store });
  } else if (method === 'DELETE') {
    deleteUserHandle({ response, store, request });
  } else if (method === 'PUT') {
    await updateUserHandle({ response, request, store });
  }
};

export default router;
