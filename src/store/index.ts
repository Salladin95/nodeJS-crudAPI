import { User, UserActions, UserFields, UserActionFields, UserWithoutID } from './contracts';
import createUser from './createUser';
import createStore from './createStore';
import isUserWithoutId from './isUserWithoutId';
import isUser from './isUser';
import isArrayOfUsers from './isArrayOfUsers';
import createStoreWithActions from './storeAction';

export {
  createStoreWithActions,
  isArrayOfUsers,
  isUserWithoutId,
  isUser,
  User,
  UserActionFields,
  UserActions,
  UserFields,
  UserWithoutID,
  createUser,
  createStore,
};
