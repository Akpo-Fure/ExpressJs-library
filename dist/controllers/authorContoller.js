"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAuthorProfile = exports.getUserProfile = exports.getAllAuthors = exports.logout = exports.login = exports.signup = void 0;
const authorModel_1 = __importDefault(require("../models/authorModel"));
const generateToken_1 = require("../utils/generateToken");
const signup = async (req, res, next) => {
    const { AuthorName, Email, Password, PhoneNumber } = req.body;
    const normalisedEmail = Email.toLowerCase();
    const authorExists = await authorModel_1.default.findOne({ Email: normalisedEmail });
    if (authorExists) {
        return res.status(400).json({ message: "Author already exists" });
    }
    try {
        const author = await authorModel_1.default.create({
            AuthorName,
            Email: normalisedEmail,
            Password,
            PhoneNumber,
        });
        if (author) {
            const token = (0, generateToken_1.generateToken)(res, author._id);
            res.status(201).json({
                token: token,
                _id: author._id,
                AuthorName: author.AuthorName,
                Email: author.Email,
                PhoneNumber: author.PhoneNumber,
                Books: author.Books,
            });
        }
        else {
            return res.status(400).json({ error: "Invalid author data" });
        }
    }
    catch (error) {
        res
            .status(400)
            .json({ message: "Couldn't create user", Error: error.message });
    }
};
exports.signup = signup;
const login = async (req, res, next) => {
    const { Email, Password } = req.body;
    const normalisedEmail = Email.toLowerCase();
    try {
        const author = await authorModel_1.default.findOne({ Email: normalisedEmail });
        if (author && (await author.matchPassword(Password))) {
            const token = (0, generateToken_1.generateToken)(res, author._id);
            res.json({
                token: token,
                _id: author._id,
                AuthorName: author.AuthorName,
                Email: author.Email,
                PhoneNumber: author.PhoneNumber,
                Books: author.Books,
            });
        }
        else {
            return res.status(400).json({ message: "Invalid credentials" });
        }
    }
    catch (error) {
        res
            .status(400)
            .json({ message: "Author login failed", Error: error.message });
    }
};
exports.login = login;
const logout = async (req, res, next) => {
    try {
        res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
        res.status(200).json({ message: "Author logged out" });
    }
    catch (error) {
        res
            .status(400)
            .json({ messahe: "Author failed to log out", Error: error.message });
    }
};
exports.logout = logout;
const getAllAuthors = async (req, res, next) => {
    try {
        const authors = await authorModel_1.default.find({}).select("-createdAt -updatedAt -__v -Password -_id");
        res.status(200).json(authors);
    }
    catch (error) {
        res.status(400).json({ message: "Couldnt fetch authors" });
    }
};
exports.getAllAuthors = getAllAuthors;
const getUserProfile = async (req, res, next) => {
    try {
        const author = await authorModel_1.default.findById(req.author);
        if (author) {
            res.status(200).json({
                AuthorName: author.AuthorName,
                Email: author.Email,
                PhoneNumber: author.PhoneNumber,
                Books: author.Books,
            });
        }
        else {
            return res.status(404).json({ message: "Author not found in database" });
        }
    }
    catch (error) {
        res
            .status(400)
            .json({ message: "Failed to get user database", Error: error.message });
    }
};
exports.getUserProfile = getUserProfile;
const updateAuthorProfile = async (req, res, next) => {
    try {
        const author = await authorModel_1.default.findById(req.author);
        if (author) {
            author.AuthorName = req.body.AuthorName || author.AuthorName;
            author.Email = req.body.Email || author.Email;
            author.PhoneNumber = req.body.PhoneNumber || author.PhoneNumber;
            const updatedAuthor = await author.save();
            res.status(200).json({
                AuthorName: updatedAuthor.AuthorName,
                Email: updatedAuthor.Email,
                PhoneNumber: updatedAuthor.PhoneNumber,
                Books: updatedAuthor.Books,
            });
        }
        else {
            return res.status(404).json({ message: "Author not found in database" });
        }
    }
    catch (error) {
        res
            .status(400)
            .json({ message: "Failed to update user database", Error: error.message });
    }
};
exports.updateAuthorProfile = updateAuthorProfile;
