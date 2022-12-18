import { writeResponse } from '../utils';
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

const router = ({ method, endpoint, emitter, response, request }: RouterParams) => {
  if (!endpoint?.match(baseUrlReg) && !endpoint?.match(userIDReg)) {
    writeResponse({ code: 404, response, data: 'PAGE NOUT FOUND', responseType: 'text' });
    return;
  }

  if (endpoint.match(baseUrlReg)) {
    if (method === 'GET') {
      getUsersHandle({ response, emitter });
    } else if (method === 'POST') {
      createUserHandle({ request, response, emitter });
    }
  } else if (method === 'GET') {
    getUserByIDHandle({ response, request, emitter });
  } else if (method === 'DELETE') {
    deleteUserHandle({ response, emitter, request });
  } else if (method === 'PUT') {
    updateUserHandle({ response, request, emitter });
  }
};

export default router;
