import { v4 } from 'uuid';
import { User } from './contracts';

export type UserWithoutID = Omit<User, 'uuid'>;

const createUser = ({ name, age, hobbies }: UserWithoutID): User => ({
  uuid: v4(),
  name,
  age,
  hobbies,
});

export default createUser;
