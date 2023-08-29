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
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = __importStar(require("mongoose"));
const bookValidationSchema = joi_1.default.object({
    Title: joi_1.default.string().required(),
    DatePublished: joi_1.default.date().required(),
    Description: joi_1.default.string().required(),
    PageCount: joi_1.default.number().required(),
    Genre: joi_1.default.string().required(),
    BookImage: joi_1.default.string().required(),
    BookLandscapeImages: joi_1.default.any().required(),
    Summary: joi_1.default.string().required(),
    BookId: joi_1.default.any(),
    Publisher: joi_1.default.string().required(),
});
const bookSchema = new mongoose_1.Schema({
    Title: { type: String, required: true },
    DatePublished: { type: Date, required: true },
    Description: { type: String, required: true },
    PageCount: { type: Number, required: true },
    Genre: { type: String, required: true },
    BookId: { type: mongoose_1.default.Schema.Types.ObjectId },
    BookImage: { type: String, required: true },
    BookLandscapeImages: [{ type: String, required: true }],
    Summary: { type: String, required: true },
    Publisher: { type: String, required: true },
    AuthorId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Author",
        required: true,
    },
}, { timestamps: true });
//Change  BookId to equal default mongoose Id
bookSchema.pre("save", function (next) {
    if (!this._id) {
        this._id = new mongoose_1.default.Types.ObjectId();
    }
    if (!this.BookId) {
        this.BookId = this._id;
    }
    next();
});
bookSchema.pre("validate", async function (next) {
    try {
        const { Title, DatePublished, Description, PageCount, Genre, BookImage, BookLandscapeImages, Summary, BookId, Publisher, } = this;
        const validatedBook = await bookValidationSchema.validateAsync({
            Title,
            DatePublished,
            Description,
            PageCount,
            Genre,
            BookImage,
            BookLandscapeImages,
            Summary,
            BookId,
            Publisher,
        }, {
            abortEarly: false,
        });
        this.set(validatedBook);
        next();
    }
    catch (error) {
        next(error);
    }
});
const Book = mongoose_1.default.model("Book", bookSchema);
exports.default = Book;
