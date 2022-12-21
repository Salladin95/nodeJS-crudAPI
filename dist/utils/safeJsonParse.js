"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const safeJsonParse = (guard) => (text) => {
    try {
        const parsed = JSON.parse(text);
        if (!guard(parsed)) {
            throw new Error(constants_1.unExpectedJSON);
        }
        return parsed;
    }
    catch (err) {
        throw err;
    }
};
exports.default = safeJsonParse;
