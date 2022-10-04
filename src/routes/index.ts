/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         USE_CODE:
 *           type: integer
 *           format: int64
 *           example: 10
 *         USE_NAME:
 *           type: string
 *           example: theUser
 *
 *     DefaultError:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: ERROR
 *         message:
 *           type: string
 *           example: somethimg went wrong
 *         package:
 *           type: string
 *           example: null
 */

export { callRouter } from './call'
export { usersRouter } from './users'
