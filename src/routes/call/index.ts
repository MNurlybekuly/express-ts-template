import express from 'express';
import { getCallRequest } from '@server/controllers/call';

const callRouter = express.Router();

callRouter.post('/request', getCallRequest);

export default callRouter;
