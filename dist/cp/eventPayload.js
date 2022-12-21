"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUpdateUserPayload = exports.isEventPayload = void 0;
const utils_1 = require("../utils");
const isEventPayload = (event) => event instanceof Object && event.hasOwnProperty('message') ? true : false;
exports.isEventPayload = isEventPayload;
const isUpdateUserPayload = (data) => {
    if ((0, utils_1.isObject)(data)) {
        if (data.hasOwnProperty('id') && data.hasOwnProperty('user')) {
            if (typeof data.id === 'string' && typeof data.user === 'string') {
                return true;
            }
        }
    }
    return false;
};
exports.isUpdateUserPayload = isUpdateUserPayload;
