type User = {
    uuid: string;
    name: string;
    age: number;
    hobbies: string[];
};
type UserFields = keyof Omit<User, 'uuid'>;
type UserWithoutID = Omit<User, 'uuid'>;
type UserActions = {
    addUser: (user: User) => void;
    getUserByID: (id: string) => User | undefined;
    removeUser: (id: string) => boolean;
    updateUser: (user: User) => void;
    getUsers: () => User[];
};
type UserActionFields = keyof UserActions;
export { User, UserActions, UserActionFields, UserFields, UserWithoutID };
