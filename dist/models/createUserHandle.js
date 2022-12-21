"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const isErrorInChildProcess_1 = __importDefault(require("../cp/isErrorInChildProcess"));
const createUserHandle = ({ request, response, emitter }) => {
    return new Promise((res, rej) => {
        let body = '';
        request?.on('data', (chunk) => {
            body += chunk.toString();
        });
        request?.on('end', async () => {
            const message = JSON.stringify({ message: 'addUser', data: body });
            emitter.emit(utils_1.actionEvents.action, message);
            emitter.once(utils_1.actionEvents.actionResponse, (msg) => {
                try {
                    const err = (0, utils_1.safeJsonParse)(isErrorInChildProcess_1.default)(msg);
                    rej(err.errorMessage);
                }
                catch {
                    (0, utils_1.writeResponse)({
                        response,
                        responseType: 'JSON',
                        code: 201,
                        data: msg,
                    });
                    res(msg);
                }
            });
        });
    });
};
exports.default = (0, utils_1.withHandlingErrorAsync)(createUserHandle);
