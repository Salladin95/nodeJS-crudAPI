import { User, UserWithoutID } from './';
declare const createUser: ({ name, age, hobbies }: UserWithoutID) => User;
export default createUser;
