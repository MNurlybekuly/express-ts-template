import express from 'express';
import usersMiddleware from '@middlewares/users';
import { getUsersList, getSpecificUser } from '@controllers/users';

const usersRouter = express.Router();

usersRouter.get('/', getUsersList);
usersRouter.get('/:id', usersMiddleware, getSpecificUser);

export default usersRouter;
