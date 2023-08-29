import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';

export const errorHandler = (err: createError.HttpError, req: Request, res: Response, next: NextFunction) => {
    let statusCode = err.status || 500;
    let message = err.message;

    if (req.originalUrl.startsWith('/api')) {
        if (err.name === 'ValidationError') {
            statusCode = 400;
            message = 'Invalid input data';
        } else if (err.name === 'CastError') {
            statusCode = 400;
            if (err.kind === 'ObjectId') {
                message = 'Invalid ID';
            } else {
                message = 'Invalid data';
            }
        }
        if (process.env.NODE_ENV === 'development') {
            return res.status(statusCode).json({
                message: message,
                stack: err.stack
            });
        } else {
            return res.status(statusCode).render("error", { message: message });
        }
    }
}