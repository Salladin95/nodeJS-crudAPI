import { UserActionFields } from '../store';
type StoreAction = Record<UserActionFields, (data: string) => void>;
declare const createStoreWithActions: () => StoreAction;
export default createStoreWithActions;
