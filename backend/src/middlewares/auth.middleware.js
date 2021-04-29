import { verify } from 'jsonwebtoken';
import { readFileSync } from 'fs';

import { parseCookie } from '../helpers/cookie';

let { TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;
const { NODE_ENV } = process.env;
const isProduction = NODE_ENV === 'production';

if (isProduction) {
  TOKEN_SECRET = readFileSync(TOKEN_SECRET, 'utf-8').trim();
  REFRESH_TOKEN_SECRET = readFileSync(REFRESH_TOKEN_SECRET, 'utf-8').trim();
}

const AuthMiddleware = async (req, res, next) => {
  const { headers } = req;

  const cookie = headers ? headers.cookie : null;

  if (!cookie) {
    return res.status(401).send({ status: 401, message: 'Access token is missing' });
  }

  const parsedCookies = await parseCookie(cookie);
  const { token } = parsedCookies;
  if (!token) {
    return res.status(401).send({ status: 401, message: 'Access token is invalid or missing' });
  }

  verify(token, TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ status: 401, message: err.message });
    }
    req.authContext = {
      token,
      data: decoded,
    };
    next();
  });
};

const VerifyRefreshToken = async (req, res, next) => {
  const { headers } = req;

  const cookie = headers ? headers.cookie : null;

  if (!cookie) {
    return res.status(401).send({ status: 401, message: 'Refresh token is missing' });
  }

  const parsedCookies = await parseCookie(cookie);
  const refreshToken = parsedCookies.refresh_token;
  if (!refreshToken) {
    return res.status(401).send({ status: 401, message: 'Refresh token is invalid or missing' });
  }

  verify(refreshToken, REFRESH_TOKEN_SECRET, (err) => {
    if (err) {
      return res.status(401).send({ status: 401, message: err.message });
    }
    req.authContext = {
      refreshToken,
    };
    next();
  });
};

export { AuthMiddleware, VerifyRefreshToken };
