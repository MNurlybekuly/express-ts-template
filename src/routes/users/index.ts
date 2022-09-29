import express, { Request, Response } from 'express';
import usersMiddleware from '@middlewares/users';

const usersRouter = express.Router();

usersRouter.get('/', (_req: Request, res: Response) => {
    res.send('<h1>Users page</h1>');
});

usersRouter.get('/:id', usersMiddleware, (req: Request, res: Response) => {
    res.send(`<h1>Users ${req.params.id} page</h1>`);
});

export default usersRouter;
