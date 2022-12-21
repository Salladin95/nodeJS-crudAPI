"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const writeResponse = ({ response, code, responseType, data }) => {
    response.writeHead(code, (0, _1.getContentType)(responseType));
    response.end(data);
};
exports.default = writeResponse;
