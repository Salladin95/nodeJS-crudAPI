type User = { uuid: string; name: string; age: number; hobbies: string[] };
type UserFields = keyof Omit<User, 'uuid'>;
type UserWithoutID = Omit<User, 'uuid'>;

type UserActions = {
  addUser: (user: User) => Promise<void>;
  getUserByID: (id: string) => Promise<User | undefined>;
  removeUser: (id: string) => Promise<boolean>;
  updateUser: (id: string, user: UserWithoutID) => Promise<void>;
  getUsers: () => Promise<User[]>;
};
type UserActionFields = keyof UserActions;

export { User, UserActions, UserActionFields, UserFields, UserWithoutID };
