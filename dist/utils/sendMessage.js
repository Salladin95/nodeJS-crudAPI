"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendMessage = (message) => {
    process.send && process.send(message);
};
exports.default = sendMessage;
