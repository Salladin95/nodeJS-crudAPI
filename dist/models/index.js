"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersHandle = exports.getUserByIDHandle = exports.getId = exports.createUserHandle = exports.idIsNotUUID = exports.idNotProvidedMsg = exports.deleteUserHandle = exports.updateUserHandle = exports.getContentType = void 0;
const createUserHandle_1 = __importDefault(require("./createUserHandle"));
exports.createUserHandle = createUserHandle_1.default;
const getUsersHandle_1 = __importDefault(require("./getUsersHandle"));
exports.getUsersHandle = getUsersHandle_1.default;
const updateUserHandle_1 = __importDefault(require("./updateUserHandle"));
exports.updateUserHandle = updateUserHandle_1.default;
const getUserByIDHandle_1 = __importDefault(require("./getUserByIDHandle"));
exports.getUserByIDHandle = getUserByIDHandle_1.default;
const getId_1 = __importStar(require("./getId"));
exports.getId = getId_1.default;
Object.defineProperty(exports, "idIsNotUUID", { enumerable: true, get: function () { return getId_1.idIsNotUUID; } });
Object.defineProperty(exports, "idNotProvidedMsg", { enumerable: true, get: function () { return getId_1.idNotProvidedMsg; } });
const deleteUserHandle_1 = __importDefault(require("./deleteUserHandle"));
exports.deleteUserHandle = deleteUserHandle_1.default;
const utils_1 = require("../utils");
Object.defineProperty(exports, "getContentType", { enumerable: true, get: function () { return utils_1.getContentType; } });
