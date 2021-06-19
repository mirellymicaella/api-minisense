import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import { StatusCodes as status, getReasonPhrase } from 'http-status-codes';
import { AppError } from './errors/AppError';
import { router } from './routes';
import 'reflect-metadata';
import './database';

const app = express();

app.use(express.json());
app.use(router);
app.use(
    (err: Error, request: Request, response: Response, _next: NextFunction) => {
        if (err instanceof AppError)
            return response.status(err.status).json({
                error: err.error,
                message: err.message
            });

        return response.status(status.INTERNAL_SERVER_ERROR).json({
            error: getReasonPhrase(status.INTERNAL_SERVER_ERROR),
            message: err.message
        });
    }
);

export { app };
