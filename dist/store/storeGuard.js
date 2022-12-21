"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userActionsFieldsArr = ['addUser', 'getUserByID', 'removeUser', 'updateUser', 'getUsers'];
const isStore = (store) => {
    let flag = false;
    if (store instanceof Object) {
        const storeKeys = Object.keys(store);
        if (storeKeys.length === userActionsFieldsArr.length) {
            flag = storeKeys.every((key) => userActionsFieldsArr.includes(key));
        }
    }
    return flag;
};
exports.default = isStore;
