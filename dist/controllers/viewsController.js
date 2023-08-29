"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBookForm = exports.deleteBookForm = exports.getMyBooks = exports.updateAuthorData = exports.getAccount = exports.addBookForm = exports.getSignupForm = exports.getLoginForm = exports.getBook = exports.getOverview = void 0;
const bookModel_1 = __importDefault(require("../models/bookModel"));
const authorModel_1 = __importDefault(require("../models/authorModel"));
const getOverview = async (req, res, next) => {
    try {
        // Get all books data from collection and populate AuthorId with AuthorName
        const books = await bookModel_1.default.find({})
            .populate('AuthorId', 'AuthorName'); // Populate the AuthorId field with AuthorName
        const currentPageNumber = parseInt(req.query.page) || 1;
        return res.status(200).render('overview', {
            title: "All Books",
            books: books,
            currentPageNumber: currentPageNumber
        });
    }
    catch (error) {
        res.status(500).render('error', {
            message: "Failed to get books overview"
        });
    }
};
exports.getOverview = getOverview;
const getBook = async (req, res, next) => {
    try {
        const book = await bookModel_1.default.findById(req.params.id)
            .populate('AuthorId', 'AuthorName');
        if (book) {
            return res.status(200).render('bookDetails', {
                title: book?.Title,
                book: book,
            });
        }
        else {
            return res.status(404).render('error', {
                message: "Book not found"
            });
        }
    }
    catch (error) {
        res
            .status(500)
            .render('error', {
            message: "Failed to get book details"
        });
    }
};
exports.getBook = getBook;
const getLoginForm = async (req, res, next) => {
    try {
        return res.status(200).render('login', {
            title: "Log into your account"
        });
    }
    catch (error) {
        res
            .status(500)
            .render('error', {
            title: "Something went wrong!",
            message: "Login failed, please try again later"
        });
    }
};
exports.getLoginForm = getLoginForm;
const getSignupForm = async (req, res, next) => {
    try {
        return res.status(200).render('signup', {
            title: "Create an account"
        });
    }
    catch (error) {
        res
            .status(500)
            .render('error', {
            message: "Signup failed, lease try again later"
        });
    }
};
exports.getSignupForm = getSignupForm;
const addBookForm = async (req, res, next) => {
    try {
        return res.status(200).render('addBook', {
            title: "Add a new book"
        });
    }
    catch (error) {
        res
            .status(500)
            .render('error', {
            message: "Failed to add book, please try again later"
        });
    }
};
exports.addBookForm = addBookForm;
const getAccount = async (req, res, next) => {
    try {
        return res.status(200).render('account', {
            title: "Your account"
        });
    }
    catch (error) {
        res
            .status(500)
            .render('error', {
            message: "Failed to get account, please try again later"
        });
    }
};
exports.getAccount = getAccount;
const updateAuthorData = async (req, res, next) => {
    try {
        const author = await authorModel_1.default.findByIdAndUpdate(req.author, {
            AuthorName: req.body.AuthorName,
            Email: req.body.Email,
            PhoneNumber: req.body.PhoneNumber,
        }, { new: true });
        res.status(200).render('account', {
            title: "Your account",
            author: author
        });
    }
    catch (error) {
        res.status(500).render('error', {
            message: "Failed to update author data"
        });
    }
};
exports.updateAuthorData = updateAuthorData;
const getMyBooks = async (req, res, next) => {
    try {
        const books = await bookModel_1.default.find({ AuthorId: req.author });
        const currentPageNumber = parseInt(req.query.page) || 1;
        res.status(200).render('overview', {
            title: "My Books",
            books: books,
            currentPageNumber: currentPageNumber
        });
    }
    catch (error) {
        res.status(500).render('error', {
            message: "Failed to get my books"
        });
    }
};
exports.getMyBooks = getMyBooks;
const deleteBookForm = async (req, res, next) => {
    try {
        return res.status(200).render('deleteBook', {
            title: "Delete a book"
        });
    }
    catch (error) {
        res.status(500).render('error', {
            message: "Failed to delete book"
        });
    }
};
exports.deleteBookForm = deleteBookForm;
const updateBookForm = async (req, res, next) => {
    try {
        return res.status(200).render('updateBook', {
            title: "Update a book"
        });
    }
    catch (error) {
        res.status(500).render('error', {
            message: "Failed to update book"
        });
    }
};
exports.updateBookForm = updateBookForm;
