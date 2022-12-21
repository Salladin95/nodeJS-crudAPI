"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("../store/");
const utils_1 = require("../utils");
const eventPayload_1 = require("./eventPayload");
console.log('laucn child process');
const store = (0, store_1.createStoreWithActions)();
process.on('uncaughtException', (err) => {
    const errMessage = { errorMessage: (0, utils_1.getErrorMessage)(err) };
    (0, utils_1.sendMessage)(JSON.stringify(errMessage));
});
process.on('message', (request) => {
    if (typeof request === 'string') {
        const parsedRequest = (0, utils_1.safeJsonParse)(eventPayload_1.isEventPayload)(request);
        if (parsedRequest.message === 'getUsers') {
            store.getUsers('');
            return;
        }
        if (!parsedRequest.data) {
            throw new Error(utils_1.unExpectedJSON);
        }
        store[parsedRequest.message](parsedRequest.data);
    }
});
