import { Response, Request, NextFunction } from "express"
import Book from "../models/bookModel"
import Author from "../models/authorModel"


export const getOverview = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get all books data from collection and populate AuthorId with AuthorName
        const books = await Book.find({})
            .populate('AuthorId', 'AuthorName'); // Populate the AuthorId field with AuthorName
        const currentPageNumber = parseInt(req.query.page as string) || 1;

        return res.status(200).render('overview', {
            title: "All Books",
            books: books,
            currentPageNumber: currentPageNumber
        });
    } catch (error: any) {
        res.status(500).render('error', {
            message: "Failed to get books overview"
        });
    }
}


export const getBook = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const book = await Book.findById(req.params.id)
            .populate('AuthorId', 'AuthorName')
        if (book) {
            return res.status(200).render('bookDetails', {
                title: book?.Title,
                book: book,
            });
        } else {
            return res.status(404).render('error', {
                message: "Book not found"
            });
        }
    } catch (error: any) {
        res
            .status(500)
            .render('error', {
                message: "Failed to get book details"
            });
    }
};

export const getLoginForm = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        return res.status(200).render('login', {
            title: "Log into your account"
        });
    } catch (error: any) {
        res
            .status(500)
            .render('error', {
                title: "Something went wrong!",
                message: "Login failed, please try again later"
            });
    }
};

export const getSignupForm = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        return res.status(200).render('signup', {
            title: "Create an account"
        });
    } catch (error: any) {
        res
            .status(500)
            .render('error', {
                message: "Signup failed, lease try again later"
            });
    }
};

export const addBookForm = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        return res.status(200).render('addBook', {
            title: "Add a new book"
        });
    } catch (error: any) {
        res
            .status(500)
            .render('error', {
                message: "Failed to add book, please try again later"
            });
    }
};


export const getAccount = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        return res.status(200).render('account', {
            title: "Your account"
        });
    } catch (error: any) {
        res
            .status(500)
            .render('error', {
                message: "Failed to get account, please try again later"
            });
    }
}


export const updateAuthorData = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const author = await Author.findByIdAndUpdate(
            req.author,
            {
                AuthorName: req.body.AuthorName,
                Email: req.body.Email,
                PhoneNumber: req.body.PhoneNumber,
            },
            { new: true }
        );

        res.status(200).render('account', {
            title: "Your account",
            author: author
        });
    } catch (error: any) {
        res.status(500).render('error', {
            message: "Failed to update author data"
        });
    }
}

export const getMyBooks = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const books = await Book.find({ AuthorId: req.author })
        const currentPageNumber = parseInt(req.query.page as string) || 1;
        res.status(200).render('overview', {
            title: "My Books",
            books: books,
            currentPageNumber: currentPageNumber
        });
    } catch (error: any) {
        res.status(500).render('error', {
            message: "Failed to get my books"
        });
    }
}

export const deleteBookForm = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        return res.status(200).render('deleteBook', {
            title: "Delete a book"
        });
    } catch (error: any) {
        res.status(500).render('error', {
            message: "Failed to delete book"
        });
    }
}


export const updateBookForm = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        return res.status(200).render('updateBook', {
            title: "Update a book"
        });
    } catch (error: any) {
        res.status(500).render('error', {
            message: "Failed to update book"
        });
    }
}