const express = require("express");

const router = express.Router();
const UserService = require("../services/user.service");

router.get("/", async (req, res) => {
  try {
    const users = await UserService.getUsers({});
    return res.status(200).json({
      status: 200,
      users,
    });
  } catch (e) {
    console.log(e);
  }
});

router.post("/", async (req, res) => {
  try {
    const user = await UserService.createUser(req.body);
    user.password = null;
    return res.status(201).json({
      status: 201,
      user,
    });
  } catch (e) {
    console.log(e);
  }
});

router.get("/:id", async (req, res) => {
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
    console.log(e);
  }
});

router.delete("/:id", async (req, res) => {
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
    console.log(e);
  }
});

router.put("/:id", async (req, res) => {
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
    console.log(e);
  }
});

module.exports = router;
