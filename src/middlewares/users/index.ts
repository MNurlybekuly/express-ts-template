import { Request, Response, NextFunction } from 'express';

const usersMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (parseInt(req.params.id, 10) === 1) {
        res.send('<h1>Admin page</h1>');
    } else {
        next();
    }
};

export default usersMiddleware;
