import express, { Request, Response } from 'express';
import cors from 'cors';
import usersRouter from '@routes/users';

const app = express();
const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/users/', usersRouter);

app.get('/', (_req: Request, res: Response) => {
    res.send('<h1>Home page</h1>');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});
