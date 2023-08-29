import createError from "http-errors";
import { errorHandler } from "./middleware/errorHandler";
import express, { NextFunction, Request, Response } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from "dotenv";

import viewRouter from './routes/viewRoutes'
import bookRouter from "./routes/bookRoutes";
import usersRouter from "./routes/authorRoutes";
import connectDB from "./config/db";

dotenv.config();
connectDB();
const app = express();


// view engine setup
app.set("views", path.join(__dirname, "..", "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "..", "public")));



app.use('/api', viewRouter)
app.use("/books", bookRouter);
app.use("/authors", usersRouter);

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// Error handler
app.use(errorHandler);

export default app;
