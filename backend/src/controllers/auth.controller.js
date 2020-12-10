const express = require("express");

const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { getUserWithPassword } = require("../services/auth.service");
const { handleError, ErrorHandler } = require("../helpers/error");
const jwtConfig = require("../jwt");
const { VerifyRefreshToken } = require("../middlewares/auth.middleware");

router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await getUserWithPassword({ username });
    if (!user) {
      throw new ErrorHandler(401, "Invalid credentials");
    }

    const compare = await bcrypt.compare(password, user.password);
    if (!compare) {
      throw new ErrorHandler(401, "Invalid credentials");
    }

    const { TOKEN_SECRET, REFRESH_TOKEN_SECRET, NODE_ENV } = process.env;

    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      TOKEN_SECRET,
      {
        expiresIn: jwtConfig.TOKEN_EXP,
      }
    );
    const refreshToken = jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      REFRESH_TOKEN_SECRET,
      {
        expiresIn: jwtConfig.REFRESH_TOKEN_EXP,
      }
    );
    user.password = null;

    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: NODE_ENV === "production",
      })
      .cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: NODE_ENV === "production",
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

router.post("/refresh", VerifyRefreshToken, async (req, res) => {
  try {
    const { refreshToken } = req.authContext;
    const { TOKEN_SECRET, REFRESH_TOKEN_SECRET, NODE_ENV } = process.env;

    const { id, email, name } = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    const token = jwt.sign({ id, email, name }, TOKEN_SECRET, {
      expiresIn: jwtConfig.TOKEN_EXP,
    });

    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: NODE_ENV === "production",
      })
      .status(200)
      .json({
        status: 200,
      });
  } catch (e) {
    handleError(e, res);
  }
});

module.exports = router;
