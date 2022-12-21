"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const getOptions = ({ PORT, amountOfCpus, clientRequest, portNumber, }) => {
    const currentPort = +PORT + (0, utils_1.getMinOf)(portNumber, amountOfCpus);
    const options = {
        host: 'localhost',
        port: currentPort,
        path: clientRequest.url,
        method: clientRequest.method,
        headers: clientRequest.headers,
    };
    return options;
};
exports.default = getOptions;
