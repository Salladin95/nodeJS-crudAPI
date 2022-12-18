type EventPayload = { message: string; data?: string };

const isEventPayload = (event: unknown): event is EventPayload =>
  event instanceof Object && event.hasOwnProperty('message') ? true : false;

export { EventPayload, isEventPayload };
