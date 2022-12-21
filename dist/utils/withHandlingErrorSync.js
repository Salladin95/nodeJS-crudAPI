"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getErrorMessage_1 = __importDefault(require("./getErrorMessage"));
const writeResponse_1 = __importDefault(require("./writeResponse"));
const utils_1 = require("../utils");
const withHandlingErrorSync = (fn) => {
    return ({ response, errorType = 'text', errorCode = 400, emitter, request, }) => {
        try {
            fn({ response, request, emitter });
        }
        catch (err) {
            const msg = (0, getErrorMessage_1.default)(err);
            const code = msg === utils_1.userNotFoundMsg ? 404 : errorCode;
            (0, writeResponse_1.default)({
                response,
                code,
                responseType: errorType,
                data: msg,
            });
        }
    };
};
exports.default = withHandlingErrorSync;
