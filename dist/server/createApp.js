"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const router_1 = __importDefault(require("../router"));
const createApp = (emitter) => (0, http_1.createServer)((request, response) => {
    const method = request.method;
    const endpoint = request.url;
    (0, router_1.default)({ method, emitter, endpoint, response, request });
});
exports.default = createApp;
