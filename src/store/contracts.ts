type User = { uuid: string; name: string; age: number; hobbies: string[] };
type UserFields = keyof Omit<User, 'uuid'>;

const userFieldsArr = ['name', 'age', 'hobbies'];

type UserActions = {
  addUser: (user: User) => void;
  getUserByID: (id: string) => User | undefined;
  removeUser: (id: string) => boolean;
  updateUser: (newUser: User) => void;
  getUsers: () => User[];
};

type UserActionFields = keyof UserActions;

const isUser = (user: unknown): user is User => {
  let flag = false;
  if (user instanceof Object) {
    const userKeys = Object.keys(user);
    if (userKeys.length === userFieldsArr.length) {
      flag = userKeys.every((key) => userFieldsArr.includes(key));
    }
  }
  return flag;
};

export { User, UserActions, UserActionFields, UserFields, isUser };
