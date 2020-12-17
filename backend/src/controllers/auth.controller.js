const express = require("express");

const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const fs = require("fs");

const { getUserWithPassword } = require("../services/auth.service");
const UserService = require("../services/user.service");

const { handleError, ErrorHandler } = require("../helpers/error");
const { clearCookies } = require("../helpers/cookie");

const jwtConfig = require("../jwt");
const { AuthMiddleware, VerifyRefreshToken } = require("../middlewares/auth.middleware");

let { TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;
const { NODE_ENV } = process.env;
const isProduction = NODE_ENV === "production";

if (isProduction) {
  TOKEN_SECRET = fs.readFileSync(TOKEN_SECRET, "utf-8").trim();
  REFRESH_TOKEN_SECRET = fs.readFileSync(REFRESH_TOKEN_SECRET, "utf-8").trim();
}

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
        secure: isProduction,
      })
      .cookie("refresh_token", refreshToken, {
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

router.post("/refresh", VerifyRefreshToken, async (req, res) => {
  try {
    const { refreshToken } = req.authContext;

    const { id, email, name } = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    const token = jwt.sign({ id, email, name }, TOKEN_SECRET, {
      expiresIn: jwtConfig.TOKEN_EXP,
    });

    return res
      .cookie("token", token, {
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

router.get("/me", AuthMiddleware, async (req, res) => {
  try {
    const { id } = req.authContext.data;
    const user = await UserService.getUser(id);
    if (!user) {
      throw new ErrorHandler(404, "User not found");
    }

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

router.post("/logout", async (req, res) => {
  try {
    await clearCookies(res);
    res.status(202).json({ status: 202 });
  } catch (e) {
    handleError(e, res);
  }
});

module.exports = router;
