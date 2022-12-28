import { createStoreWithActions } from '../store/';
import { getErrorMessage, safeJsonParse, sendMessage, unExpectedJSON } from '../utils';
import { EventPayload, isEventPayload } from './eventPayload';

console.log('laucn child process');

const store = createStoreWithActions();

process.on('uncaughtException', (err) => {
  const errMessage = { errorMessage: getErrorMessage(err) };
  sendMessage(JSON.stringify(errMessage));
});

process.on('message', (request) => {
  if (typeof request === 'string') {
    const parsedRequest = safeJsonParse<EventPayload>(isEventPayload)(request);
    if (parsedRequest.message === 'getUsers') {
      store.getUsers('');
      return;
    }
    if (!parsedRequest.data) {
      throw new Error(unExpectedJSON);
    }
    store[parsedRequest.message](parsedRequest.data);
  }
});
