import { isObject } from '../utils';

type EventPayload = { message: string; data?: string };
type UpdateUserPayload = { id: string; user: string };

const isEventPayload = (event: unknown): event is EventPayload =>
  event instanceof Object && event.hasOwnProperty('message') ? true : false;

const isUpdateUserPayload = (data: unknown): data is UpdateUserPayload => {
  if (isObject(data)) {
    if (data.hasOwnProperty('id') && data.hasOwnProperty('user')) {
      if (typeof data.id === 'string' && typeof data.user === 'string') {
        return true;
      }
    }
  }

  return false;
};

export { EventPayload, isEventPayload, isUpdateUserPayload, UpdateUserPayload };
