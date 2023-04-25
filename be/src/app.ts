import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import notesRoutes from './routes/notes';
import morgan from 'morgan';
import createHttpError, { isHttpError } from 'http-errors';

const app = express();

// Middleware for logging requests to the console for development environment
app.use(morgan('dev'));

// Middleware for parsing the body of a request
app.use(express.json());

app.use('/api/notes', notesRoutes);

// Middleware for handling 404 errors
app.use((req, res, next) => {
    //res.status(404).json({ error: 'Endpoint not found' });
    next(createHttpError(404, 'Endpoint not found'));
});

// Error handling middleware
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
    let errorMessage = 'An unknown error occurred!';
    let statusCode = 500;
    // Check if the error is an HttpError
    if(isHttpError(error)) {
      statusCode = error.status;
      errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });
});

export default app;