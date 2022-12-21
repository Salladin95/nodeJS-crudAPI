"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getCLIargs_1 = __importDefault(require("./getCLIargs"));
const isWithWorkers = () => {
    const args = (0, getCLIargs_1.default)();
    return args.includes('-withWorkers');
};
exports.default = isWithWorkers;
