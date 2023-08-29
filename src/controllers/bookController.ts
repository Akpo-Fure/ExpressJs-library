import { Request, Response, NextFunction } from "express";
import Book from "../models/bookModel";
import Author from "../models/authorModel";

//Function to add a book to the database
export const addBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { Title, DatePublished, Description, PageCount, Genre, BookImage, BookLandscapeImages, Summary, Publisher } =
    req.body;
  try {
    //Create a book based on the inputs from our request body
    const book = await Book.create({
      Title,
      DatePublished,
      Description,
      PageCount,
      Genre,
      BookImage,
      BookLandscapeImages,
      Summary,
      Publisher,
      AuthorId: req.author,
    });

    //Add the book ID to the books array of the author that created it
    await Author.findByIdAndUpdate(
      req.author,
      { $push: { Books: book._id } },
      { new: true }
    ).populate("Books");

    //If book successfully created send a 201 response code and display book details as JSON
    if (book) {
      res.status(201).json({
        Title: book.Title,
        DatePublished: book.DatePublished,
        Description: book.Description,
        PageCount: book.PageCount,
        Genre: book.Genre,
        BookId: book.BookId,
        BookImage: book.BookImage,
        BookLandscapeImages: book.BookLandscapeImages,
        Summary: book.Summary,
        Publisher: book.Publisher,
        AuthorId: book.AuthorId,
      });
    } else {
      return res.status(400).json({ error: "Couldnt create book" });
    }
  } catch (error: any) {
    res.status(500).json({ Error: error.message });
  }
};

//Function to get all books in the database
export const getBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //Function to get all books in the database
    const books = await Book.find({}).select(
      "-createdAt -updatedAt -__v -Password -_id"
    );
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: "Couldnt fetch books" });
  }
};

//Function to get a particular book by ID in the database
export const getBookById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const book = await Book.findById(req.params.id).select(
      "-createdAt -updatedAt -__v -_id"
    );
    if (book) {
      res.status(200).json(book);
    } else {
      return res.status(404).json({ error: "Book not found" });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ error: "Failed to fetch book", Error: error.message });
  }
};

//function to delete a particular book by ID in the database
export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book) {
      //initialise who the creator of the book is and convert Object ID to string
      const bookCreator = book.AuthorId.toString();
      //initialise who the current logged in author is
      const currentAuthor = req.author;
      //Check if the creator of the book is equal to the currently loggged in author
      if (bookCreator === currentAuthor) {
        await book.deleteOne({ _id: req.params.id });

        //delete book from the books array in the creators model upon successful deletion
        await Author.findByIdAndUpdate(
          bookCreator,
          { $pull: { Books: req.params.id } },
          { new: true }
        ).populate("Books");

        return res.json({ message: "Book removed successfully" });
      } else {
        return res.status(401).json({
          error: "Not authorized to delete book. You didn't create the book",
        });
      }
    } else {
      return res.status(404).json({ error: "Book not found" });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ error: "Failed to delete book" });
  }
};

//Function to update details of a particular book by ID in the database
export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book) {
      //initialise who the creator of the book is and convert Object ID to string
      const bookCreator = book.AuthorId.toString();
      //initialise who the current logged in author is
      const currentAuthor = req.author;
      //Check if the creator of the book is equal to the currently loggged in author
      if (bookCreator === currentAuthor) {
        book.Title = req.body.Title || book.Title;
        book.DatePublished = req.body.DatePublished || book.DatePublished;
        book.Description = req.body.Description || book.Description;
        book.PageCount = req.body.PageCount || book.PageCount;
        book.Genre = req.body.Genre || book.Genre;
        book.BookImage = req.body.BookImage || book.BookImage;
        book.BookLandscapeImages = req.body.BookLandscapeImages || book.BookLandscapeImages;
        book.Summary = req.body.Summary || book.Summary;
        book.Publisher = req.body.Publisher || book.Publisher;
        const updatedBook = await book.save();
        return res.status(200).json(updatedBook);
      } else {
        return res.status(401).json({
          error: "Not authorized to update book. You didn't create the book",
        });
      }
    } else {
      return res.status(404).json({ error: "Book not found" });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ error: "Failed to update book" });
  }
};
