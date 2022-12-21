"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idIsNotUUID = exports.idNotProvidedMsg = void 0;
const url_1 = require("url");
const uuid_1 = require("uuid");
const utils_1 = require("../utils");
exports.idNotProvidedMsg = 'ID not provided';
exports.idIsNotUUID = 'ID is not a is a valid UUID';
const getId = (requestUrl) => {
    if (!requestUrl) {
        throw new Error(exports.idNotProvidedMsg);
    }
    const url = (0, url_1.parse)(requestUrl).pathname?.split('/');
    if (url && (0, utils_1.checkLength)(url, 4)) {
        const id = url[3];
        if (!(0, uuid_1.validate)(id)) {
            throw new Error(exports.idIsNotUUID);
        }
        return id;
    }
    else {
        throw new Error(exports.idNotProvidedMsg);
    }
};
exports.default = getId;
