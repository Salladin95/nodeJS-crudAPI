import { UserActions } from './';
declare const isStore: (store: unknown) => store is UserActions;
export default isStore;
