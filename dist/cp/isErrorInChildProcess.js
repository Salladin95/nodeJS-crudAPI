"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isErrorInChildProcc = (msg) => {
    if (msg instanceof Object) {
        return Object.keys(msg).length === 1 && msg.hasOwnProperty('errorMessage');
    }
    return false;
};
exports.default = isErrorInChildProcc;
