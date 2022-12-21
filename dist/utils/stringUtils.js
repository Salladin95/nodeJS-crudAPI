"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValueFromStringBeforeSeparator = exports.getValueFromStringAfterSeparator = void 0;
const getValueFromStringAfterSeparator = (string, separator) => string.slice(string.indexOf(separator) + 1);
exports.getValueFromStringAfterSeparator = getValueFromStringAfterSeparator;
const getValueFromStringBeforeSeparator = (string, separator) => string.slice(0, string.indexOf(separator));
exports.getValueFromStringBeforeSeparator = getValueFromStringBeforeSeparator;
