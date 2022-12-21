"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userFieldsArr = ['name', 'age', 'hobbies', 'uuid'];
const isUser = (user) => {
    let flag = false;
    if (user instanceof Object) {
        const userKeys = Object.keys(user);
        if (userKeys.length === userFieldsArr.length) {
            flag = userKeys.every((key) => userFieldsArr.includes(key));
        }
    }
    return flag;
};
exports.default = isUser;
