import { User } from './';

const userFieldsArr = ['name', 'age', 'hobbies', 'uuid'];

const isUser = (user: unknown): user is User => {
  let flag = false;
  if (user instanceof Object) {
    const userKeys = Object.keys(user);
    if (userKeys.length === userFieldsArr.length) {
      flag = userKeys.every((key) => userFieldsArr.includes(key));
    }
  }
  return flag;
};

export default isUser;
