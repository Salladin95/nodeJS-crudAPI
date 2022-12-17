import { isUser, User } from './';
import isArrayOf from '../utils/isArrayOf';

const isArrayOfUsers = (data: unknown): data is User[] => {
  return isArrayOf<User>(isUser)(data);
};

export default isArrayOfUsers;
