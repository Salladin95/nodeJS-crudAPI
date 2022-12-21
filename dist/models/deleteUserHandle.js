"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isErrorInChildProcess_1 = __importDefault(require("../cp/isErrorInChildProcess"));
const _1 = require(".");
const utils_1 = require("../utils");
const deleteUserHandle = ({ response, request, emitter }) => {
    return new Promise((res, rej) => {
        const id = (0, _1.getId)(request?.url);
        const message = JSON.stringify({ message: 'removeUser', data: id });
        emitter.emit(utils_1.actionEvents.action, message);
        emitter.once(utils_1.actionEvents.actionResponse, (msg) => {
            try {
                const err = (0, utils_1.safeJsonParse)(isErrorInChildProcess_1.default)(msg);
                rej(err.errorMessage);
            }
            catch {
                (0, utils_1.writeResponse)({
                    response,
                    responseType: 'text',
                    code: 204,
                    data: `user: ${msg} is removed`,
                });
                res();
            }
        });
    });
};
exports.default = (0, utils_1.withHandlingErrorAsync)(deleteUserHandle);
