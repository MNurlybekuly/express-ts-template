import express from 'express';
import { getCallRequest } from '@server/controllers/call';

const callRouter = express.Router();

/**
 * @swagger
 * /call/request:
 *   post:
 *     tags:
 *       - call
 *     summary: Register call
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reason:
 *                 type: number
 *                 example: 2
 *               iin:
 *                 type: string
 *                 example: 012345678901
 *               phone:
 *                 type: string
 *                 example: "+77777777777"
 *               name:
 *                 type: string
 *                 example: Ivan
 *               surname:
 *                 type: string
 *                 example: Ivanov
 *     responses:
 *       '200':
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 id:
 *                   type: string
 *                   example: F3D83500B85623AFB291D1071DE3A7FA
 *                 url:
 *                   type: string
 *                   example: https://google.com
 *                 callUrl:
 *                   type: string
 *                   example: https://google.com
 *                 conferenceUrl:
 *                   type: string
 *                   example: https://google.com
 *
 *       '5XX':
 *         description: error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DefaultError'
 */
callRouter.post('/request', getCallRequest);

export { callRouter };
