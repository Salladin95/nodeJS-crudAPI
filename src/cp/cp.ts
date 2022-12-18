import { createStore, createUser, isUserWithoutId, UserWithoutID } from '../store';
import {
  badJsonMessage,
  checkForUserFields,
  safeJsonParse,
  sendMessage,
  userNotFoundMsg,
} from '../utils';
import { EventPayload, isEventPayload } from './eventPayload';

console.log('laucn child process');

const store = createStore();

process.on('message', (request) => {
  if (typeof request === 'string') {
    const parsedRequest = safeJsonParse<EventPayload>(isEventPayload)(request);
    if (!parsedRequest) {
      return;
    }
    if (parsedRequest.message === 'getUsers') {
      const users = JSON.stringify(store.getUsers());
      sendMessage(users);
    } else if (parsedRequest.message === 'getUserByID') {
      if (parsedRequest.data) {
        const user = store.getUserByID(parsedRequest.data);
        if (user) {
          sendMessage(JSON.stringify(user));
        } else {
          sendMessage(userNotFoundMsg);
        }
      }
    } else if (parsedRequest.message === 'removeUser') {
      if (parsedRequest.data) {
        const user = store.getUserByID(parsedRequest.data);
        if (user) {
          store.removeUser(user.uuid);
          sendMessage(`user: ${user.name} is removed`);
        } else {
          sendMessage(userNotFoundMsg);
        }
      }
    } else if (parsedRequest.message === 'addUser') {
      if (parsedRequest.data) {
        const userWithoutID = safeJsonParse<UserWithoutID>(isUserWithoutId)(parsedRequest.data);
        if (userWithoutID && checkForUserFields(userWithoutID)) {
          const user = createUser(userWithoutID);
          store.addUser(user);
          sendMessage(JSON.stringify(user));
        } else {
          sendMessage(badJsonMessage);
        }
      }
    } else if (parsedRequest.message === 'updateUser') {
      if (parsedRequest.data) {
        try {
          const payload = JSON.parse(parsedRequest.data) as { id: string; user: string };
          const user = store.getUserByID(payload.id);
          const userWithoutID = safeJsonParse<UserWithoutID>(isUserWithoutId)(payload.user);
          if (!user) {
            sendMessage(userNotFoundMsg);
          } else if (!userWithoutID || !checkForUserFields(userWithoutID)) {
            sendMessage(badJsonMessage);
          } else {
            const updatedUser = { ...userWithoutID, uuid: user.uuid };
            store.updateUser(updatedUser);
            sendMessage(JSON.stringify(updatedUser));
          }
        } catch (err) {
          sendMessage(badJsonMessage);
        }
      }
    }
  }
});
