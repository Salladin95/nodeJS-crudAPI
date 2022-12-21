"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isArrayOf = (guard) => (data) => {
    if (data instanceof Array && data.every((item) => guard(item))) {
        return true;
    }
    return false;
};
exports.default = isArrayOf;
