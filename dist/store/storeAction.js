"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const eventPayload_1 = require("../cp/eventPayload");
const store_1 = require("../store");
const utils_1 = require("../utils");
const createStoreWithActions = () => {
    const store = (0, store_1.createStore)();
    return {
        getUsers: () => {
            const users = JSON.stringify(store.getUsers());
            (0, utils_1.sendMessage)(users);
        },
        getUserByID: (data) => {
            const user = store.getUserByID(data);
            if (!user) {
                throw new Error(utils_1.userNotFoundMsg);
            }
            (0, utils_1.sendMessage)(JSON.stringify(user));
        },
        removeUser: (data) => {
            const user = store.getUserByID(data);
            if (!user) {
                throw new Error(utils_1.userNotFoundMsg);
            }
            store.removeUser(user.uuid);
            (0, utils_1.sendMessage)(JSON.stringify(user));
        },
        addUser: (data) => {
            const userWithoutID = (0, utils_1.safeJsonParse)(store_1.isUserWithoutId)(data);
            const user = (0, store_1.createUser)(userWithoutID);
            store.addUser(user);
            (0, utils_1.sendMessage)(JSON.stringify(user));
        },
        updateUser: (data) => {
            const payload = (0, utils_1.safeJsonParse)(eventPayload_1.isUpdateUserPayload)(data);
            const user = store.getUserByID(payload.id);
            const userWithoutID = (0, utils_1.safeJsonParse)(store_1.isUserWithoutId)(payload.user);
            (0, utils_1.checkForUserFields)(userWithoutID);
            if (!user) {
                throw new Error(utils_1.userNotFoundMsg);
            }
            const updatedUser = { ...userWithoutID, uuid: user.uuid };
            store.updateUser(updatedUser);
            (0, utils_1.sendMessage)(JSON.stringify(updatedUser));
        },
    };
};
exports.default = createStoreWithActions;
