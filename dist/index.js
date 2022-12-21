"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const process_1 = require("process");
const child_process_1 = require("child_process");
const stream_1 = require("stream");
const server_1 = __importDefault(require("./server"));
const utils_1 = require("./utils");
const withWorkers_1 = __importDefault(require("./withWorkers"));
const emitter = new stream_1.EventEmitter();
const app = (0, server_1.default)(emitter);
if ((0, utils_1.isWithWorkers)()) {
    (0, withWorkers_1.default)(app, emitter);
}
else {
    const targetFile = (0, path_1.resolve)((0, process_1.cwd)(), 'src', 'cp/cp.ts');
    const child = (0, child_process_1.fork)(targetFile);
    emitter.on(utils_1.actionEvents.action, (msg) => child.send(msg));
    child.on('message', (msg) => emitter.emit(utils_1.actionEvents.actionResponse, msg));
    app.listen(utils_1.PORT, () => console.log(`server is running on port: ${utils_1.PORT}`));
}
