import { Request, Response } from 'express';

export const getUsersList = (_req: Request, res: Response) => {
    res.send('<h1>All users page</h1>');
};

export const getSpecificUser = (req: Request, res: Response) => {
    res.send(`<h1>Users ${req.params.id} page</h1>`);
};
