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
const mongoose_1 = __importStar(require("mongoose"));
const joi_1 = __importDefault(require("joi"));
const bcrypt_1 = __importDefault(require("bcrypt"));
//Used JOI to validate the user details
const userValidationSchema = joi_1.default.object({
    AuthorName: joi_1.default.string().required(),
    Email: joi_1.default.string().email().required(),
    Password: joi_1.default.string().required(),
    PhoneNumber: joi_1.default
        .string()
        .required()
        .pattern(/^\d{11}$/),
});
//Defined what the mongoose userSchema would look like
const authorSchema = new mongoose_1.Schema({
    AuthorName: { type: String, required: true },
    Email: { type: String, required: true, unique: true, trim: true },
    Password: { type: String, required: true, minlength: 4 },
    PhoneNumber: { type: String, required: true },
    Books: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Book" }],
}, { timestamps: true });
authorSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt_1.default.compare(enteredPassword, this.Password);
};
authorSchema.pre("save", async function (next) {
    if (!this.isModified("Password")) {
        next();
    }
    try {
        const salt = await bcrypt_1.default.genSalt(Number(process.env.SALT_ROUNDS));
        this.Password = await bcrypt_1.default.hash(this.Password, salt);
    }
    catch (error) {
        next(error);
    }
});
authorSchema.pre("validate", async function (next) {
    try {
        const { AuthorName, Email, Password, PhoneNumber } = this;
        const validatedUser = await userValidationSchema.validateAsync({
            AuthorName,
            Email,
            Password,
            PhoneNumber,
        }, {
            abortEarly: false,
        });
        this.set(validatedUser);
        next();
    }
    catch (error) {
        next(error);
    }
});
const Author = mongoose_1.default.model("Author", authorSchema);
exports.default = Author;
