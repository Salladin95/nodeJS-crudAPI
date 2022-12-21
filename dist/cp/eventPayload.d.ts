import { UserActionFields } from '../store';
type EventPayload = {
    message: UserActionFields;
    data?: string;
};
type UpdateUserPayload = {
    id: string;
    user: string;
};
declare const isEventPayload: (event: unknown) => event is EventPayload;
declare const isUpdateUserPayload: (data: unknown) => data is UpdateUserPayload;
export { EventPayload, isEventPayload, isUpdateUserPayload, UpdateUserPayload };
