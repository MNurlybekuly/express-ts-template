import express from 'express';
import { getUsersList, getSpecificUser } from '@controllers/users';

const usersRouter = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - users
 *     summary: Get all users
 *     description: Returns list of user code and use name
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
 *                 message:
 *                   type: string
 *                   example: successfully handled
 *                 package:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       '5XX':
 *         description: error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DefaultError'
 */
usersRouter.get('/', getUsersList);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags:
 *       - users
 *     summary: Get a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the user to get
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
 *                 message:
 *                   type: string
 *                   example: successfully handled
 *                 package:
 *                   $ref: '#/components/schemas/User'
 *
 *       '400':
 *         description: error when invalid id provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ERROR
 *                 message:
 *                   type: string
 *                   example: invalid id provided
 *                 package:
 *                   type: string
 *                   example: null
 *
 *       '404':
 *         description: error when user is not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ERROR
 *                 message:
 *                   type: string
 *                   example: user does not exists
 *                 package:
 *                   type: string
 *                   example: null
 *
 *       '5XX':
 *         description: error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DefaultError'
 */
usersRouter.get('/:id', getSpecificUser);

export { usersRouter };
