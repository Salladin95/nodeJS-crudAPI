import { UserWithoutID } from './';

const userWithoutIdFieldsArr = ['name', 'age', 'hobbies'];

const isUserWithoutId = (user: unknown): user is UserWithoutID => {
  let flag = false;
  if (user instanceof Object) {
    const userKeys = Object.keys(user);
    if (userKeys.length === userWithoutIdFieldsArr.length) {
      flag = userKeys.every((key) => userWithoutIdFieldsArr.includes(key));
    }
  }
  return flag;
};

export default isUserWithoutId;
