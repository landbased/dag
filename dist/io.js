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
Object.defineProperty(exports, "__esModule", { value: true });
exports.readSource = exports.getFileNameFromCommandLine = void 0;
const fs = __importStar(require("fs"));
const utils_1 = require("./utils");
function getFileNameFromCommandLine() {
    return process.argv[2];
}
exports.getFileNameFromCommandLine = getFileNameFromCommandLine;
function readSource(filename) {
    try {
        const raw = fs.readFileSync(filename, 'utf8');
        return [raw, true];
    }
    catch (error) {
        if ((0, utils_1.isNodeError)(error) && error.code === 'ENOENT') {
            console.error(`File ${error.path} couldn't be read`);
        }
        return ['', false];
    }
}
exports.readSource = readSource;
