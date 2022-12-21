"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileNameAndDirname = exports.getDirname = void 0;
const url_1 = require("url");
const path_1 = require("path");
const getFileNameAndDirname = (url) => ({
    filename: (0, url_1.fileURLToPath)(url),
    dirname: (0, path_1.dirname)((0, url_1.fileURLToPath)(url)),
});
exports.getFileNameAndDirname = getFileNameAndDirname;
const getDirname = (url) => (0, path_1.dirname)((0, url_1.fileURLToPath)(url));
exports.getDirname = getDirname;
