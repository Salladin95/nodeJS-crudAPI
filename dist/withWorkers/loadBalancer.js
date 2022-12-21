"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const os_1 = require("os");
const createProxy_1 = __importDefault(require("../server/createProxy"));
const getOptions_1 = __importDefault(require("../server/getOptions"));
const index_1 = require("../utils/index");
const launcLoadBalancer = () => {
    const amountOfCpus = (0, os_1.cpus)().length;
    let portNumber = 1;
    http_1.default
        .createServer((clientRequest, clientResponse) => {
        const options = (0, getOptions_1.default)({ PORT: index_1.PORT, amountOfCpus, portNumber, clientRequest });
        (0, createProxy_1.default)(clientRequest, clientResponse, options);
        if (amountOfCpus > portNumber) {
            portNumber++;
        }
        else {
            portNumber = 1;
        }
    })
        .listen(index_1.PORT, () => console.log(`Master server: ${process.pid} is running on port: ${index_1.PORT}`));
};
exports.default = launcLoadBalancer;
