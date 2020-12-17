const express = require("express");
const { check, validationResult } = require("express-validator");
const multer = require("multer");
const uploadConfig = require("../services/upload.service");

const router = express.Router();
const FileService = require("../services/file.service");
const SystemService = require("../services/system.service");
const { handleError, ErrorHandler } = require("../helpers/error");
const { AuthMiddleware } = require("../middlewares/auth.middleware");

router.post(
  "/:id/systems/:nickname/files",
  AuthMiddleware,
  multer(uploadConfig).single("file"),
  [check("name").not().isEmpty().withMessage("Name is missing")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    try {
      const { id, nickname } = req.params;
      const { contentType, location } = req.file;
      const { name } = req.body;
      let type;

      switch (contentType) {
        case "application/pdf":
          type = "project";
          break;
        case "video/mp4":
          type = "video";
          break;
        default:
      }

      const system = await SystemService.getSystem(id, nickname);
      if (!system) {
        throw new ErrorHandler(400, "Invalid System");
      }

      const file = await FileService.createFile({
        name,
        type,
        url: location,
        system: system._id,
      });

      return res.status(200).json({
        status: 200,
        file,
      });
    } catch (e) {
      handleError(e, res);
    }
  }
);

module.exports = router;