"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getContentType = (type) => ({
    'Content-Type': `application/${type}`,
});
exports.default = getContentType;
