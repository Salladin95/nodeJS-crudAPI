import { isUpdateUserPayload, UpdateUserPayload } from '../cp/eventPayload';
import {
  createStore,
  createUser,
  isUserWithoutId,
  UserActionFields,
  UserWithoutID,
} from '../store';
import { checkForUserFields, safeJsonParse, sendMessage, userNotFoundMsg } from '../utils';

type StoreAction = Record<UserActionFields, (data: string) => void>;

const createStoreWithActions = (): StoreAction => {
  const store = createStore();
  return {
    getUsers: () => {
      const users = JSON.stringify(store.getUsers());
      sendMessage(users);
    },
    getUserByID: (data) => {
      const user = store.getUserByID(data);
      if (!user) {
        throw new Error(userNotFoundMsg);
      }
      sendMessage(JSON.stringify(user));
    },
    removeUser: (data) => {
      const user = store.getUserByID(data);
      if (!user) {
        throw new Error(userNotFoundMsg);
      }
      store.removeUser(user.uuid);
      sendMessage(JSON.stringify(user));
    },
    addUser: (data) => {
      const userWithoutID = safeJsonParse<UserWithoutID>(isUserWithoutId)(data);
      const user = createUser(userWithoutID);
      store.addUser(user);
      sendMessage(JSON.stringify(user));
    },
    updateUser: (data) => {
      const payload = safeJsonParse<UpdateUserPayload>(isUpdateUserPayload)(data);
      const user = store.getUserByID(payload.id);
      const userWithoutID = safeJsonParse<UserWithoutID>(isUserWithoutId)(payload.user);
      checkForUserFields(userWithoutID);
      if (!user) {
        throw new Error(userNotFoundMsg);
      }
      const updatedUser = { ...userWithoutID, uuid: user.uuid };
      store.updateUser(updatedUser);
      sendMessage(JSON.stringify(updatedUser));
    },
  };
};

export default createStoreWithActions;
