import { User, UserActions } from '.';

const createUsersStore = (): UserActions => {
  let users: User[] = [];

  return {
    getUsers: () => users,
    addUser: (user) => users.push(user),
    getUserByID: (uuid) => users.find((user) => user.uuid === uuid),
    removeUser: (uuid) => {
      users = users.filter((user) => user.uuid !== uuid);
    },
    updateUser: (updatedUser) => {
      users = users.map((user) => {
        if (user.uuid !== updatedUser.uuid) {
          return user;
        }
        return updatedUser;
      });
    },
  };
};

export default createUsersStore;
