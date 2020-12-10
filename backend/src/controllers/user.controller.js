const express = require("express");

const router = express.Router();
const UserService = require("../services/user.service");
const { handleError } = require("../helpers/error");
const { AuthMiddleware } = require("../middlewares/auth.middleware");

router.get("/", AuthMiddleware, async (req, res) => {
  try {
    const users = await UserService.getUsers({});
    return res.status(200).json({
      status: 200,
      users,
    });
  } catch (e) {
    handleError(e, res);
  }
});

router.post("/", AuthMiddleware, async (req, res) => {
  try {
    const user = await UserService.createUser(req.body);
    user.password = null;
    return res.status(201).json({
      status: 201,
      user,
    });
  } catch (e) {
    handleError(e, res);
  }
});

router.get("/:id", AuthMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserService.getUser(id);
    if (!user) {
      return res.status(404).json({
        status: 404,
      });
    }
    return res.status(200).json({
      status: 200,
      user,
    });
  } catch (e) {
    handleError(e, res);
  }
});

router.delete("/:id", AuthMiddleware, async (req, res) => {
  try {
    const user = await UserService.deleteUser(req.params.id);
    if (!user) {
      return res.status(404).json({
        status: 404,
      });
    }
    return res.status(202).json({
      status: 202,
    });
  } catch (e) {
    handleError(e, res);
  }
});

router.put("/:id", AuthMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserService.updateUser(id, req.body);
    if (!user) {
      return res.status(404).json({
        status: 404,
      });
    }
    return res.status(200).json({
      status: 200,
      user,
    });
  } catch (e) {
    handleError(e, res);
  }
});

module.exports = router;
