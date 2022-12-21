"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cluster_1 = __importDefault(require("cluster"));
const child_process_1 = require("child_process");
const path_1 = require("path");
const process_1 = require("process");
const os_1 = require("os");
const loadBalancer_1 = __importDefault(require("./loadBalancer"));
const utils_1 = require("../utils");
const primaryCluster = () => {
    const amountOfCpus = (0, os_1.cpus)().length;
    const targetFile = (0, path_1.resolve)((0, process_1.cwd)(), 'src', 'cp/cp.ts');
    const child = (0, child_process_1.fork)(targetFile);
    (0, loadBalancer_1.default)();
    cluster_1.default.on('message', (worker, msg) => {
        child.send(msg);
        child.once('message', (msg) => worker.send(msg));
    });
    for (let index = 0; index < amountOfCpus; index++) {
        cluster_1.default.fork({ port: +utils_1.PORT + index + 1 });
    }
    cluster_1.default.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died, code: ${code}, signal: ${signal}`);
    });
};
exports.default = primaryCluster;
