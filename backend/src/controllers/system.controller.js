const express = require("express");
const { check, validationResult } = require("express-validator");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

const router = express.Router();
const SystemService = require("../services/system.service");
const ConstructionService = require("../services/construction.service");
const { handleError } = require("../helpers/error");
const { AuthMiddleware } = require("../middlewares/auth.middleware");

router.post(
  "/:id/systems",
  [check("name").not().isEmpty().withMessage("Name is missing")],
  AuthMiddleware,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    try {
      let data = req.body;
      data = {
        ...data,
        construction: req.params.id,
      };
      const system = await SystemService.createSystem(data);
      const construction = await ConstructionService.addSystem(
        req.params.id,
        system._id
      );
      return res.status(200).json({
        status: 200,
        construction,
      });
    } catch (e) {
      handleError(e, res);
    }
  }
);

router.get("/:id/systems/:nickname", async (req, res) => {
  try {
    const { id, nickname } = req.params;
    const system = await SystemService.getSystem(id, nickname);
    if (!system) {
      return res.status(404).json({
        status: 404,
      });
    }
    return res.status(200).json({
      status: 200,
      system,
    });
  } catch (e) {
    handleError(e, res);
  }
});

router.delete("/:id/systems/:nickname", AuthMiddleware, async (req, res) => {
  try {
    const { id, nickname } = req.params;
    const system = await SystemService.deleteSystem({
      construction: id,
      nickname,
    });
    if (!system) {
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

router.put("/:id/systems/:nickname", AuthMiddleware, async (req, res) => {
  try {
    const { id, nickname } = req.params;
    const system = await SystemService.updateSystem(id, nickname, req.body);
    if (!system) {
      return res.status(404).json({
        status: 404,
      });
    }
    return res.status(200).json({
      status: 200,
      system,
    });
  } catch (e) {
    handleError(e, res);
  }
});

router.post(
  "/:id/systems/:nickname",
  AuthMiddleware,
  upload.single("file"),
  async (req, res) => {
    try {
      return res.status(200).json({
        status: 200,
      });
    } catch (e) {
      handleError(e, res);
    }
  }
);

module.exports = router;
