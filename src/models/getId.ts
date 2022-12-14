import { parse } from 'url';
import { validate } from 'uuid';

import { checkLength } from '../uitls';

export const idNotProvidedMsg = 'ID not provided';
export const idIsNotUUID = 'ID is not a is a valid UUID';

const getId = (requestUrl: string | undefined): string => {
  if (!requestUrl) {
    throw new Error(idNotProvidedMsg);
  }
  const url = parse(requestUrl).pathname?.split('/');
  if (url && checkLength(url, 4)) {
    const id = url[3];
    if (!validate(id)) {
      throw new Error(idIsNotUUID);
    }
    return id;
  } else {
    throw new Error(idNotProvidedMsg);
  }
};

export default getId;
