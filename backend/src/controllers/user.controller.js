const express = require("express");
const { check, validationResult } = require('express-validator');

const router = express.Router();
const UserService = require("../services/user.service");
const { handleError } = require("../helpers/error");
const { AuthMiddleware } = require("../middlewares/auth.middleware");

/**
 * @swagger
 * /users:
 *  get:
 *    security:
 *      - cookieAuth: []
 *    summary: List all users
 *    responses:
 *      '200':
 *        description: OK
 *    tags:
 *      - users
 */
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

/**
 * @swagger
 * /users:
 *  post:
 *    security:
 *      - cookieAuth: []
 *    summary: Create a new user
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schemas/User'
 *    responses:
 *      '201':
 *        description: Created
 *      '400':
 *        description: Bad Request
 *    tags:
 *      - users
 */
router.post("/", [
  check('username').not().isEmpty().withMessage('Username is missing'),
], AuthMiddleware, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

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

/**
 * @swagger
 * /users/{id}:
 *  get:
 *    security:
 *      - cookieAuth: []
 *    summary: Get a user's details
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID generated by MongoDB
 *    responses:
 *      '200':
 *        description: OK
 *      '404':
 *        description: Not Found
 *    tags:
 *      - users
 */
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

/**
 * @swagger
 * /users/{id}:
 *  delete:
 *    security:
 *      - cookieAuth: []
 *    summary: Delete a user
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID generated by MongoDB
 *    responses:
 *      '202':
 *        description: Accepted
 *      '404':
 *        description: Not Found
 *    tags:
 *      - users
 */
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

/**
 * @swagger
 * /users/{id}:
 *  put:
 *    security:
 *      - cookieAuth: []
 *    summary: Edit a user
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
 *            $ref: '#components/schemas/User'
 *    responses:
 *      '200':
 *        description: OK
 *      '400':
 *        description: Bad Request
 *      '404':
 *        description: Not Found
 *    tags:
 *      - users
 */
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
