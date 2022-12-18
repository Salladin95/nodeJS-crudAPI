import { UserFields, UserWithoutID } from '../store/';

const isItString = (str: unknown) => typeof str === 'string';
const isItNumber = (num: unknown) => typeof num === 'number';
const isItArray = (arr: unknown) => arr instanceof Array;
const isItEmpty = (data: string | []) => data.length <= 0;

const checkUser: Record<UserFields, <DataT>(data: DataT) => boolean> = {
  name: <DataT>(name: DataT) => isItString(name) && !isItEmpty(name as string),
  age: <DataT>(age: DataT) => isItNumber(age),
  hobbies: <DataT>(hobbies: DataT) => isItArray(hobbies) && (hobbies as DataT[]).every(isItString),
};

const checkForUserFields = (user: UserWithoutID): boolean => {
  if (!Object.keys(user).every((key) => checkUser[key as UserFields](user[key as UserFields]))) {
    return false;
  }
  return true;
};

export default checkForUserFields;
