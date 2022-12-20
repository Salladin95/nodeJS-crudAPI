import { createStore, createUser, isUserWithoutId, UserWithoutID } from '../store';
import {
  checkForUserFields,
  getErrorMessage,
  safeJsonParse,
  sendMessage,
  unExpectedJSON,
  userNotFoundMsg,
} from '../utils';
import {
  EventPayload,
  isEventPayload,
  isUpdateUserPayload,
  UpdateUserPayload,
} from './eventPayload';

console.log('laucn child process');

const store = createStore();

process.on('uncaughtException', (err) => {
  const errMessage = { errorMessage: getErrorMessage(err) };
  sendMessage(JSON.stringify(errMessage));
});

process.on('message', (request) => {
  if (typeof request === 'string') {
    const parsedRequest = safeJsonParse<EventPayload>(isEventPayload)(request);
    if (parsedRequest.message === 'getUsers') {
      const users = JSON.stringify(store.getUsers());
      sendMessage(users);
      return;
    }
    if (!parsedRequest.data) {
      throw new Error(unExpectedJSON);
    }
    if (parsedRequest.message === 'getUserByID') {
      const user = store.getUserByID(parsedRequest.data);
      if (!user) {
        throw new Error(userNotFoundMsg);
      }
      sendMessage(JSON.stringify(user));
    } else if (parsedRequest.message === 'removeUser') {
      if (parsedRequest.data) {
        const user = store.getUserByID(parsedRequest.data);
        if (!user) {
          throw new Error(userNotFoundMsg);
        }
        store.removeUser(user.uuid);
        sendMessage(JSON.stringify(user));
      }
    } else if (parsedRequest.message === 'addUser') {
      const userWithoutID = safeJsonParse<UserWithoutID>(isUserWithoutId)(parsedRequest.data);
      const user = createUser(userWithoutID);
      store.addUser(user);
      sendMessage(JSON.stringify(user));
    } else if (parsedRequest.message === 'updateUser') {
      const payload = safeJsonParse<UpdateUserPayload>(isUpdateUserPayload)(parsedRequest.data);
      const user = store.getUserByID(payload.id);
      const userWithoutID = safeJsonParse<UserWithoutID>(isUserWithoutId)(payload.user);
      checkForUserFields(userWithoutID);
      if (!user) {
        throw new Error(userNotFoundMsg);
      }
      const updatedUser = { ...userWithoutID, uuid: user.uuid };
      store.updateUser(updatedUser);
      sendMessage(JSON.stringify(updatedUser));
    }
  }
});
