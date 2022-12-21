"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userWithoutIdFieldsArr = ['name', 'age', 'hobbies'];
const isUserWithoutId = (user) => {
    let flag = false;
    if (user instanceof Object) {
        const userKeys = Object.keys(user);
        if (userKeys.length === userWithoutIdFieldsArr.length) {
            flag = userKeys.every((key) => userWithoutIdFieldsArr.includes(key));
        }
    }
    return flag;
};
exports.default = isUserWithoutId;
