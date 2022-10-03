import express from 'express';
import { getUsersList, getSpecificUser } from '@controllers/users';

const usersRouter = express.Router();

usersRouter.get('/', getUsersList);
usersRouter.get('/:id', getSpecificUser);

export default usersRouter;
