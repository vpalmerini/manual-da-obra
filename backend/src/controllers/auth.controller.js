import { Router } from 'express';
import { sign, verify } from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import { readFileSync } from 'fs';

import { getUserWithPassword } from '../services/auth.service';
import { getUser } from '../services/user.service';

import { handleError, ErrorHandler } from '../helpers/error';
import { clearCookies } from '../helpers/cookie';

import { TOKEN_EXP, REFRESH_TOKEN_EXP } from '../jwt';
import { AuthMiddleware, VerifyRefreshToken } from '../middlewares/auth.middleware';

const router = Router();

let { TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;
const { NODE_ENV } = process.env;
const isProduction = NODE_ENV === 'production';

if (isProduction) {
  TOKEN_SECRET = readFileSync(TOKEN_SECRET, 'utf-8').trim();
  REFRESH_TOKEN_SECRET = readFileSync(REFRESH_TOKEN_SECRET, 'utf-8').trim();
}

/**
 * @swagger
 *  components:
 *    securitySchemas:
 *      cookieAuth:
 *        type: apiKey
 *        in: cookie
 *        name: token
 */

/**
 * @swagger
 * /auth:
 *  post:
 *    summary: Authentication
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - username
 *              - password
 *            properties:
 *              username:
 *                type: string
 *              password:
 *                type: string
 *    responses:
 *      '200':
 *        description: OK
 *      '401':
 *        description: Invalid Credentials
 *    tags:
 *      - auth
 */
router.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await getUserWithPassword({ username });
    if (!user) throw new ErrorHandler(401, 'Invalid credentials');

    const _compare = await compare(password, user.password);
    if (!_compare) throw new ErrorHandler(401, 'Invalid credentials');

    const token = sign({ id: user._id, email: user.email, name: user.name }, TOKEN_SECRET, {
      expiresIn: TOKEN_EXP,
    });
    const refreshToken = sign(
      { id: user._id, email: user.email, name: user.name },
      REFRESH_TOKEN_SECRET,
      {
        expiresIn: REFRESH_TOKEN_EXP,
      }
    );
    user.password = null;

    return res
      .cookie('token', token, {
        httpOnly: true,
        secure: isProduction,
      })
      .cookie('refresh_token', refreshToken, {
        httpOnly: true,
        secure: isProduction,
      })
      .status(200)
      .json({
        status: 200,
        user,
      });
  } catch (e) {
    handleError(e, res);
  }
});

/**
 * @swagger
 * /auth/refresh:
 *  post:
 *    security:
 *      - cookieAuth: []
 *    summary: Refresh Token
 *    responses:
 *      '200':
 *        description: Returns a new token as cookie
 *      '401':
 *        description: Expired or invalid token
 *    tags:
 *      - auth
 */
router.post('/refresh', VerifyRefreshToken, async (req, res) => {
  try {
    const { refreshToken } = req.authContext;

    const { id, email, name } = verify(refreshToken, REFRESH_TOKEN_SECRET);
    const token = sign({ id, email, name }, TOKEN_SECRET, {
      expiresIn: TOKEN_EXP,
    });

    return res
      .cookie('token', token, {
        httpOnly: true,
        secure: isProduction,
      })
      .status(200)
      .json({
        status: 200,
      });
  } catch (e) {
    handleError(e, res);
  }
});

/**
 * @swagger
 * /auth/me:
 *  get:
 *    security:
 *      - cookieAuth: []
 *    summary: Verifies if the given token is still valid and returns user's data
 *    responses:
 *      '200':
 *        description: Returns a user's details (the one signed in JWT)
 *      '401':
 *        description: Expired or invalid token
 *    tags:
 *      - auth
 */
router.get('/me', AuthMiddleware, async (req, res) => {
  try {
    const { id } = req.authContext.data;
    const user = await getUser(id);
    if (!user) throw new ErrorHandler(404, 'User not found');

    const { _id, username, email } = user;
    return res.status(200).json({
      status: 200,
      user: {
        _id,
        username,
        email,
      },
    });
  } catch (e) {
    handleError(e, res);
  }
});

/**
 * @swagger
 * /auth/logout:
 *  post:
 *    security:
 *      - cookieAuth: []
 *    summary: Removes cookies from browser
 *    responses:
 *      '202':
 *        description: Accepted
 *      '401':
 *        description: Expired or invalid token
 *    tags:
 *      - auth
 */
router.post('/logout', async (_req, res) => {
  try {
    await clearCookies(res);
    res.status(202).json({ status: 202 });
  } catch (e) {
    handleError(e, res);
  }
});

export default router;
