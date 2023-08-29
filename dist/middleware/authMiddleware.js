"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoggedIn = exports.protect = void 0;
const authorModel_1 = __importDefault(require("../models/authorModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const protect = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        else if (req.cookies.jwt) {
            token = req.cookies.jwt;
        }
        if (token) {
            try {
                const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
                req.author = decoded.userId;
                const currentAuthor = await authorModel_1.default.findById(req.author);
                if (!currentAuthor) {
                    return res.status(401).json({ message: "Author not found" });
                }
                // Store the authenticated author
                res.locals.author = currentAuthor;
                next();
            }
            catch (error) {
                return res.status(401).json({
                    message: "Not authorized, Invalid token",
                    Error: error.message,
                });
            }
        }
        else {
            return res
                .status(401)
                // .json({ message: "Not authorized, no token", Error: Error });
                .render("error", {
                title: "Not authorized, no token",
                message: "Please login to get access",
            });
        }
    }
    catch (error) {
        res.status(500).json({ Error: error.message });
    }
};
exports.protect = protect;
const isLoggedIn = async (req, res, next) => {
    if (req.cookies.jwt) {
        try {
            const decoded = jsonwebtoken_1.default.verify(req.cookies.jwt, process.env.JWT_SECRET);
            req.author = decoded.userId;
            // Check if author exists
            const currentAuthor = await authorModel_1.default.findById(req.author);
            if (!currentAuthor) {
                return res.status(401).json({ message: "Author not found" });
            }
            // Store the authenticated author
            res.locals.author = currentAuthor;
            return next();
        }
        catch (error) {
            return next();
        }
    }
    else {
        next();
    }
};
exports.isLoggedIn = isLoggedIn;
