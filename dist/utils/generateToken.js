"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (res, userId) => {
    const token = jsonwebtoken_1.default.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
    res.setHeader("Set-Cookie", `jwt=${token}; HttpOnly; Max-Age=${1 * 24 * 60 * 60 * 100}; SameSite=Strict; Path=/;`);
    return token;
};
exports.generateToken = generateToken;
