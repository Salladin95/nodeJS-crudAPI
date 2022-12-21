"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createUsersStore = () => {
    let users = [];
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
        updateUser: (updatedUser) => {
            users = users.map((user) => {
                if (updatedUser.uuid !== user.uuid) {
                    return user;
                }
                return updatedUser;
            });
        },
    };
};
exports.default = createUsersStore;
