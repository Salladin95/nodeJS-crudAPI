"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unExpectedJSON = exports.actionEvents = exports.operationErrMsg = exports.userNotFoundMsg = exports.badJsonMessage = void 0;
const badJsonMessage = 'Bad JSON';
exports.badJsonMessage = badJsonMessage;
const unExpectedJSON = 'Unexpected JSON';
exports.unExpectedJSON = unExpectedJSON;
const userNotFoundMsg = 'User not found';
exports.userNotFoundMsg = userNotFoundMsg;
const operationErrMsg = 'FS operations failed';
exports.operationErrMsg = operationErrMsg;
const actionEvents = {
    action: 'action',
    actionResponse: 'actionResponse',
    error: 'anErrorOccured',
};
exports.actionEvents = actionEvents;
