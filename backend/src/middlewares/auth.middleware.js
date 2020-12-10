const jwt = require("jsonwebtoken");

const { parseCookie } = require("../helpers/cookie");

const { REFRESH_TOKEN_SECRET } = process.env;

const VerifyRefreshToken = async (req, res, next) => {
  const { headers } = req;

  const cookie = headers ? headers.cookie : null;

  if (!cookie) {
    return res
      .status(401)
      .send({ status: 401, message: "Refresh token is missing" });
  }

  const parsedCookies = await parseCookie(cookie);
  const refreshToken = parsedCookies.refresh_token;
  if (!refreshToken) {
    return res
      .status(401)
      .send({ status: 401, message: "Refresh token is invalid or missing" });
  }

  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err) => {
    if (err) {
      return res.status(401).send({ status: 401, message: err.message });
    }
  });

  req.authContext = {
    refreshToken,
  };

  next();
};

module.exports = { VerifyRefreshToken };
