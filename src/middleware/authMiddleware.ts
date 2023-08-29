import { Request, Response, NextFunction } from "express";
import Author from "../models/authorModel";
import jwt from "jsonwebtoken";



export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token;
    if (
      req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1]
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt
    }
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
          userId: string;
        };
        req.author = decoded.userId;
        const currentAuthor = await Author.findById(req.author);
        if (!currentAuthor) {
          return res.status(401).json({ message: "Author not found" });
        }
        // Store the authenticated author
        res.locals.author = currentAuthor;
        next();
      } catch (error: any) {
        return res.status(401).json({
          message: "Not authorized, Invalid token",
          Error: error.message,
        });
      }
    } else {
      return res
        .status(401)
        // .json({ message: "Not authorized, no token", Error: Error });
        .render("error", {
          title: "Not authorized, no token",
          message: "Please login to get access",
        });
    }
  } catch (error: any) {
    res.status(500).json({ Error: error.message });
  }
};



export const isLoggedIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.cookies.jwt) {
    try {
      const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET!) as {
        userId: string;
      };
      req.author = decoded.userId;

      // Check if author exists
      const currentAuthor = await Author.findById(req.author);
      if (!currentAuthor) {
        return res.status(401).json({ message: "Author not found" });
      }
      // Store the authenticated author
      res.locals.author = currentAuthor;
      return next();
    } catch (error: any) {
      return next()
    }
  } else {
    next();
  }
}


