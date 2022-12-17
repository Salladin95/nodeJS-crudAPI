import { join } from 'path';
import { cwd } from 'process';

import { readFile, writeFile } from '../fs';
import { safeJsonParse } from '../utils';
import { isArrayOfUsers, User, UserActions, UserWithoutID } from '.';

const createUsersStore = (): UserActions => {
  const path = join(cwd(), 'src/db', 'index.txt');
  const getUsers = async () => {
    try {
      const fileContent = await readFile(path);
      const users = safeJsonParse<User[]>(isArrayOfUsers)(fileContent) ?? [];
      return users;
    } catch {
      await writeFile(path, '');
      return [];
    }
  };
  return {
    getUsers: async () => {
      const users = await getUsers();
      return users;
    },
    addUser: async (user) => {
      const users = await getUsers();
      users.push(user);
      await writeFile(path, JSON.stringify(users));
    },
    getUserByID: async (uuid) => {
      const users = await getUsers();
      return users.find((user) => user.uuid === uuid);
    },
    removeUser: async (uuid) => {
      let users = await getUsers();
      const userIndex = users.findIndex((user) => user.uuid === uuid);
      if (userIndex === -1) {
        return false;
      }
      users = users.filter((user) => user.uuid !== uuid);
      await writeFile(path, JSON.stringify(users));
      return true;
    },
    updateUser: async (uuid: string, updatedUser: UserWithoutID) => {
      let users = await getUsers();
      users = users.map((user) => {
        if (uuid !== user.uuid) {
          return user;
        }
        return { uuid, ...updatedUser };
      });
      await writeFile(path, JSON.stringify(users));
    },
  };
};

export default createUsersStore;
