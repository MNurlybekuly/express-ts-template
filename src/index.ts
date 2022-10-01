import express, { Request, Response } from 'express';
import cors from 'cors';
import rateLimiterMiddleware from '@middlewares/rate-limiter';
import usersRouter from '@routes/users';
import callRouter from '@routes/call';

const app = express();
const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(rateLimiterMiddleware);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/users/', usersRouter);
app.use('/call/', callRouter);

app.get('/', (_req: Request, res: Response) => {
    res.send('<h1>Home page</h1>');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});
