"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const createProxy = (clientRequest, clientResponse, options) => {
    const proxy = http_1.default.request(options, (res) => {
        const code = res.statusCode ?? 200;
        clientResponse.writeHead(code, res.headers);
        res.pipe(clientResponse, { end: true });
    });
    clientRequest.pipe(proxy, { end: true });
};
exports.default = createProxy;
