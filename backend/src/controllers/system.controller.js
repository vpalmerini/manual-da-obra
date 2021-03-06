const express = require("express");
const { check, validationResult } = require("express-validator");

const router = express.Router();
const SystemService = require("../services/system.service");
const ConstructionService = require("../services/construction.service");
const { handleError } = require("../helpers/error");
const { AuthMiddleware } = require("../middlewares/auth.middleware");

/**
 * @swagger
 * /constructions/{id}/systems:
 *  post:
 *    security:
 *      - cookieAuth: []
 *    summary: Create a new system
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID generated by MongoDB
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schemas/System'
 *    responses:
 *      '201':
 *        description: Created
 *      '400':
 *        description: Bad Request
 *    tags:
 *      - systems
 */
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
      return res.status(201).json({
        status: 201,
        construction,
      });
    } catch (e) {
      handleError(e, res);
    }
  }
);

/**
 * @swagger
 * /constructions/{id}/systems/{nickname}:
 *  get:
 *    security:
 *      - cookieAuth: []
 *    summary: List all systems of a given construction
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
 *    responses:
 *      '200':
 *        description: OK
 *      '404':
 *        description: Not Found
 *    tags:
 *      - systems
 */
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

/**
 * @swagger
 * /constructions/{id}/systems/{nickname}:
 *  delete:
 *    security:
 *      - cookieAuth: []
 *    summary: Delete a system
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
 *    responses:
 *      '202':
 *        description: Accepted
 *      '404':
 *        description: Not Found
 *    tags:
 *      - systems
 */
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

/**
 * @swagger
 * /constructions/{id}/systems/{nickname}:
 *  put:
 *    security:
 *      - cookieAuth: []
 *    summary: Edit a system
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
 *            $ref: '#components/schemas/System'
 *    responses:
 *      '200':
 *        description: OK
 *      '400':
 *        description: Bad Request
 *      '404':
 *        description: Not Found
 *    tags:
 *      - systems
 */
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

module.exports = router;
