"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
const isArrayOf_1 = __importDefault(require("../utils/isArrayOf"));
const isArrayOfUsers = (data) => {
    return (0, isArrayOf_1.default)(_1.isUser)(data);
};
exports.default = isArrayOfUsers;
