"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getCLIArgs = () => {
    const myArgs = process.argv.slice(2);
    const startCustomArgsIndex = process.argv.indexOf('--') + 1;
    return myArgs.slice(startCustomArgsIndex);
};
exports.default = getCLIArgs;
