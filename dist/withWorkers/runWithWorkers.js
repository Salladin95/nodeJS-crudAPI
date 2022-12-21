"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cluster_1 = __importDefault(require("cluster"));
const primaryCluster_1 = __importDefault(require("./primaryCluster"));
const workerCluster_1 = __importDefault(require("./workerCluster"));
const runWithWorkers = (app, emitter) => {
    if (cluster_1.default.isPrimary) {
        (0, primaryCluster_1.default)();
    }
    else if (cluster_1.default.isWorker) {
        (0, workerCluster_1.default)(emitter, app);
    }
};
exports.default = runWithWorkers;
