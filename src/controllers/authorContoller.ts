import { Request, Response, NextFunction } from "express";
import Author from "../models/authorModel";
import { generateToken } from "../utils/generateToken";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { AuthorName, Email, Password, PhoneNumber } = req.body;
  const normalisedEmail = Email.toLowerCase();
  const authorExists = await Author.findOne({ Email: normalisedEmail });
  if (authorExists) {
    return res.status(400).json({ message: "Author already exists" });
  }
  try {
    const author = await Author.create({
      AuthorName,
      Email: normalisedEmail,
      Password,
      PhoneNumber,
    });
    if (author) {
      const token = generateToken(res, author._id);
      res.status(201).json({
        token: token,
        _id: author._id,
        AuthorName: author.AuthorName,
        Email: author.Email,
        PhoneNumber: author.PhoneNumber,
        Books: author.Books,
      });
    } else {
      return res.status(400).json({ error: "Invalid author data" });
    }
  } catch (error: any) {
    res
      .status(400)
      .json({ message: "Couldn't create user", Error: error.message });
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { Email, Password } = req.body;
  const normalisedEmail = Email.toLowerCase();
  try {
    const author = await Author.findOne({ Email: normalisedEmail });
    if (author && (await author.matchPassword(Password))) {
      const token = generateToken(res, author._id);
      res.json({
        token: token,
        _id: author._id,
        AuthorName: author.AuthorName,
        Email: author.Email,
        PhoneNumber: author.PhoneNumber,
        Books: author.Books,
      });
    } else {
      return res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error: any) {
    res
      .status(400)
      .json({ message: "Author login failed", Error: error.message });
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
    res.status(200).json({ message: "Author logged out" });
  } catch (error: any) {
    res
      .status(400)
      .json({ messahe: "Author failed to log out", Error: error.message });
  }
};

export const getAllAuthors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authors = await Author.find({}).select(
      "-createdAt -updatedAt -__v -Password -_id"
    );
    res.status(200).json(authors);
  } catch (error) {
    res.status(400).json({ message: "Couldnt fetch authors" });
  }
};

export const getUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const author = await Author.findById(req.author);
    if (author) {
      res.status(200).json({
        AuthorName: author.AuthorName,
        Email: author.Email,
        PhoneNumber: author.PhoneNumber,
        Books: author.Books,
      });
    } else {
      return res.status(404).json({ message: "Author not found in database" });
    }
  } catch (error: any) {
    res
      .status(400)
      .json({ message: "Failed to get user database", Error: error.message });
  }
};

export const updateAuthorProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const author = await Author.findById(req.author);
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
    } else {
      return res.status(404).json({ message: "Author not found in database" });
    }
  } catch (error: any) {
    res
      .status(400)
      .json({ message: "Failed to update user database", Error: error.message });
  }
}
