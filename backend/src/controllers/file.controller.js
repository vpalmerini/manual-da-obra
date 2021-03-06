const express = require("express");
const { check, validationResult } = require("express-validator");
const multer = require("multer");
const s3 = require("../s3");
const { config, deleteParams } = require("../services/upload.service");

const router = express.Router();
const FileService = require("../services/file.service");
const SystemService = require("../services/system.service");
const { handleError, ErrorHandler } = require("../helpers/error");
const { AuthMiddleware } = require("../middlewares/auth.middleware");

/**
 * @swagger
 * /constructions/{id}/systems/{nickname}/files:
 *  post:
 *    security:
 *      - cookieAuth: []
 *    summary: Add new file to a system
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID generated by MongoDB
 *      - in: path
 *        name: nickname
 *        schema:
 *          type: string
 *        required: true
 *        description: System's nickname
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schemas/File'
 *    responses:
 *      '201':
 *        description: Created
 *      '400':
 *        description: Bad Request
 *    tags:
 *      - files
 */
router.post(
  "/:id/systems/:nickname/files",
  AuthMiddleware,
  multer(config).single("file"),
  [check("name").not().isEmpty().withMessage("Name is missing")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    try {
      const { id, nickname } = req.params;
      const { contentType, location, key } = req.file;
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

      let system = await SystemService.getSystem(id, nickname);
      if (!system) {
        throw new ErrorHandler(400, "Invalid System");
      }

      const file = await FileService.createFile({
        name,
        type,
        url: location,
        key,
        system: system._id,
      });

      system = await SystemService.addFile(
        system._id,
        file._id,
      );

      return res.status(201).json({
        status: 201,
        file,
      });
    } catch (e) {
      handleError(e, res);
    }
  }
);

/**
 * @swagger
 * /constructions/{id}/systems/{nickname}/files/{file_id}:
 *  get:
 *    security:
 *      - cookieAuth: []
 *    summary: Get the details of a system's file
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID generated by MongoDB
 *      - in: path
 *        name: nickname
 *        schema:
 *          type: string
 *        required: true
 *        description: System's nickname
 *      - in: path
 *        name: file_id
 *        schema:
 *          type: string
 *        required: true
 *        description: File's ID
 *    responses:
 *      '200':
 *        description: OK
 *      '404':
 *        description: Not Found
 *    tags:
 *      - files
 */
router.get("/:id/systems/:nickname/files/:file_id", async (req, res) => {
  try {
    const { file_id } = req.params;
    const file = await FileService.getFile(file_id);
    if (!file) {
      return res.status(404).json({
        status: 404,
      });
    }
    return res.status(200).json({
      status: 200,
      file,
    });
  } catch (e) {
    handleError(e, res);
  }
});

/**
 * @swagger
 * /constructions/{id}/systems/{nickname}/files/{file_id}:
 *  put:
 *    security:
 *      - cookieAuth: []
 *    summary: Edit a file
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID generated by MongoDB
 *      - in: path
 *        name: nickname
 *        schema:
 *          type: string
 *        required: true
 *        description: System's nickname
 *      - in: path
 *        name: file_id
 *        schema:
 *          type: string
 *        required: true
 *        description: File's ID
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schemas/File'
 *    responses:
 *      '200':
 *        description: OK
 *      '400':
 *        description: Bad Request
 *      '404':
 *        description: Not Found
 *    tags:
 *      - files
 */
router.put(
  "/:id/systems/:nickname/files/:file_id",
  AuthMiddleware,
  [check("type").isEmpty().withMessage("Type cannot be changed")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    try {
      const { file_id } = req.params;
      const file = await FileService.updateFile(file_id, req.body);
      if (!file) {
        return res.status(404).json({
          status: 404,
        });
      }
      return res.status(200).json({
        status: 200,
        file,
      });
    } catch (e) {
      handleError(e, res);
    }
  }
);

/**
 * @swagger
 * /constructions/{id}/systems/{nickname}/files/{file_id}:
 *  delete:
 *    security:
 *      - cookieAuth: []
 *    summary: Delete a file of a given construction's system
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID generated by MongoDB
 *      - in: path
 *        name: nickname
 *        schema:
 *          type: string
 *        required: true
 *        description: System's nickname
 *      - in: path
 *        name: file_id
 *        schema:
 *          type: string
 *        required: true
 *        description: File's ID
 *    responses:
 *      '202':
 *        description: Accepted
 *      '404':
 *        description: Not Found
 *    tags:
 *      - files
 */
router.delete("/:id/systems/:nickname/files/:id_file", AuthMiddleware, async (req, res) => {
  try {
    const { id_file } = req.params;
    const file = await FileService.deleteFile({ _id: id_file });
    if (!file) {
      return res.status(404).json({
        status: 404,
      });
    }
    const params = deleteParams(file.key);
    await s3.deleteObject(params).promise()
      .then(() => {
        return res.status(202).json({
          status: 202,
        });
      })
      .catch(() => {
        throw new ErrorHandler(500, "Error while deleting object")
      });
  } catch (e) {
    handleError(e, res);
  }
});

module.exports = router;