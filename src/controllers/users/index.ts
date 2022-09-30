import { Request, Response } from 'express';
import { handleResponse } from '@helpers/handleResponse';

export const getUsersList = async (_req: Request, res: Response) => {
    try {
        const list = await 'All users page';
        res.send(handleResponse(true, 'successfully handled', list));
    } catch (e) {
        res.send(handleResponse(false, 'unsuccessfully handled'));
    }
};

export const getSpecificUser = async (req: Request, res: Response) => {
    try {
        if (!req.params.id.match('^[0-9]+$')) {
            throw new Error('invalid id provided');
        }

        const list = await `User ${req.params.id} page`;
        res.send(handleResponse(true, 'successfully handled', list));
    } catch (e) {
        res.send(handleResponse(false, 'unsuccessfully handled'));
    }
};
