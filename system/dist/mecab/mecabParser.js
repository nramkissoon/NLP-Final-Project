"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _mecab;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MecabParser = void 0;
const mecab_async_1 = __importDefault(require("mecab-async"));
class MecabParser {
    constructor() {
        _mecab.set(this, void 0);
        this.parse = (text) => __awaiter(this, void 0, void 0, function* () {
            const promise = yield new Promise((resolve, reject) => {
                __classPrivateFieldGet(this, _mecab).parse(text, (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                });
            }).then(result => result)
                .catch(err => {
                return null;
            });
            return promise;
        });
        __classPrivateFieldSet(this, _mecab, mecab_async_1.default);
        __classPrivateFieldGet(this, _mecab).options = {
            maxBuffer: 300 * 1024 * 8
        };
    }
}
exports.MecabParser = MecabParser;
_mecab = new WeakMap();
//# sourceMappingURL=mecabParser.js.map