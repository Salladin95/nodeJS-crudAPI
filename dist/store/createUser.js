"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const createUser = ({ name, age, hobbies }) => ({
    uuid: (0, uuid_1.v4)(),
    name,
    age,
    hobbies,
});
exports.default = createUser;
