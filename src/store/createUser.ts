import { v4 } from 'uuid';
import { User, UserWithoutID } from './';

const createUser = ({ name, age, hobbies }: UserWithoutID): User => ({
  uuid: v4(),
  name,
  age,
  hobbies,
});

export default createUser;
