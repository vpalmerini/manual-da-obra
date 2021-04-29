import { Router } from 'express';
import { check, validationResult } from 'express-validator';
import { getUsers, createUser, getUser, deleteUser, updateUser } from '../services/user.service';
import { ErrorHandler, handleError } from '../helpers/error';
import { AuthMiddleware } from '../middlewares/auth.middleware';

const router = Router();

/**
 * @swagger
 * /users:
 *  get:
 *    security:
 *      - cookieAuth: []
 *    summary: List all users
 *    responses:
 *      '200':
 *        description: OK
 *    tags:
 *      - users
 */
router.get('/', AuthMiddleware, async (req, res) => {
  try {
    const users = await getUsers({});
    return res.status(200).json({
      status: 200,
      users,
    });
  } catch (e) {
    handleError(e, res);
  }
});

/**
 * @swagger
 * /users:
 *  post:
 *    security:
 *      - cookieAuth: []
 *    summary: Create a new user
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schemas/User'
 *    responses:
 *      '201':
 *        description: Created
 *      '400':
 *        description: Bad Request
 *    tags:
 *      - users
 */
router.post(
  '/',
  [check('username').not().isEmpty().withMessage('Username is missing')],
  AuthMiddleware,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    try {
      const user = await createUser(req.body);
      user.password = null;
      return res.status(201).json({
        status: 201,
        user,
      });
    } catch (e) {
      handleError(e, res);
    }
  }
);

/**
 * @swagger
 * /users/{id}:
 *  get:
 *    security:
 *      - cookieAuth: []
 *    summary: Get a user's details
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID generated by MongoDB
 *    responses:
 *      '200':
 *        description: OK
 *      '404':
 *        description: Not Found
 *    tags:
 *      - users
 */
router.get('/:id', AuthMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUser(id);
    if (!user) throw new ErrorHandler(404, 'User not found');

    return res.status(200).json({
      status: 200,
      user,
    });
  } catch (e) {
    handleError(e, res);
  }
});

/**
 * @swagger
 * /users/{id}:
 *  delete:
 *    security:
 *      - cookieAuth: []
 *    summary: Delete a user
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID generated by MongoDB
 *    responses:
 *      '202':
 *        description: Accepted
 *      '404':
 *        description: Not Found
 *    tags:
 *      - users
 */
router.delete('/:id', AuthMiddleware, async (req, res) => {
  try {
    const user = await deleteUser(req.params.id);
    if (!user) throw new ErrorHandler(404, 'User not found');

    return res.status(202).json({
      status: 202,
    });
  } catch (e) {
    handleError(e, res);
  }
});

/**
 * @swagger
 * /users/{id}:
 *  put:
 *    security:
 *      - cookieAuth: []
 *    summary: Edit a user
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID generated by MongoDB
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schemas/User'
 *    responses:
 *      '200':
 *        description: OK
 *      '400':
 *        description: Bad Request
 *      '404':
 *        description: Not Found
 *    tags:
 *      - users
 */
router.put('/:id', AuthMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await updateUser(id, req.body);
    if (!user) throw new ErrorHandler(404, 'User not found');

    return res.status(200).json({
      status: 200,
      user,
    });
  } catch (e) {
    handleError(e, res);
  }
});

export default router;
