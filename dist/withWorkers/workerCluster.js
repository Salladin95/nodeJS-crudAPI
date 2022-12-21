"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils/");
const workerCluster = (emitter, app) => {
    emitter.on(utils_1.actionEvents.action, (msg) => (0, utils_1.sendMessage)(msg));
    process.on('message', (msg) => emitter.emit(utils_1.actionEvents.actionResponse, msg));
    const env = process.env.port;
    const currentPort = env ? +env : utils_1.PORT;
    app.listen(currentPort, () => console.log(`server: ${process.pid} is running on port: ${currentPort}`));
};
exports.default = workerCluster;
