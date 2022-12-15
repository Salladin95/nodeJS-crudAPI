import { User, UserActions, UserWithoutID } from '.';

const createUsersStore = (): UserActions => {
  let users: User[] = [];

  return {
    getUsers: () => users,
    addUser: (user) => users.push(user),
    getUserByID: (uuid) => users.find((user) => user.uuid === uuid),
    removeUser: (uuid) => {
      const userIndex = users.findIndex((user) => user.uuid === uuid);
      if (userIndex === -1) {
        return false;
      }
      users = users.filter((user) => user.uuid !== uuid);
      return true;
    },
    updateUser: (uuid: string, updatedUser: UserWithoutID) => {
      users = users.map((user) => {
        if (uuid !== user.uuid) {
          return user;
        }
        return { uuid, ...updatedUser };
      });
    },
  };
};

export default createUsersStore;
