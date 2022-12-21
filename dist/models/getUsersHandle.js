"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils/");
const getUsersHandle = ({ response, emitter }) => {
    const message = JSON.stringify({ message: 'getUsers' });
    emitter.emit(utils_1.actionEvents.action, message);
    emitter.once(utils_1.actionEvents.actionResponse, (msg) => {
        response.writeHead(200, (0, utils_1.getContentType)('json'));
        response.end(msg);
    });
};
exports.default = getUsersHandle;
