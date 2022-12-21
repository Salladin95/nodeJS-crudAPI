"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const isItString = (str) => typeof str === 'string';
const isItNumber = (num) => typeof num === 'number';
const isItArray = (arr) => arr instanceof Array;
const isItEmpty = (data) => data.length <= 0;
const checkUser = {
    name: (name) => isItString(name) && !isItEmpty(name),
    age: (age) => isItNumber(age),
    hobbies: (hobbies) => isItArray(hobbies) && hobbies.every(isItString),
};
const checkForUserFields = (user) => {
    if (!Object.keys(user).every((key) => checkUser[key](user[key]))) {
        throw new Error(constants_1.unExpectedJSON);
    }
    return true;
};
exports.default = checkForUserFields;
