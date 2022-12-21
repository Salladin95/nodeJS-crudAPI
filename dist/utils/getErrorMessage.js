"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getErrorMessage = (err) => {
    if (err instanceof Error) {
        return err.message;
    }
    return JSON.stringify(err);
};
exports.default = getErrorMessage;
