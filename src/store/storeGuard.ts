import { UserActions } from './';

const userActionsFieldsArr = ['addUser', 'getUserByID', 'removeUser', 'updateUser', 'getUsers'];

const isStore = (store: unknown): store is UserActions => {
  let flag = false;
  if (store instanceof Object) {
    const storeKeys = Object.keys(store);
    if (storeKeys.length === userActionsFieldsArr.length) {
      flag = storeKeys.every((key) => userActionsFieldsArr.includes(key));
    }
  }
  return flag;
};

export default isStore;
