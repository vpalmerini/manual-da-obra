const express = require("express");
const { check, validationResult } = require('express-validator');

const router = express.Router();
const ConstructionService = require("../services/construction.service");
const { handleError } = require("../helpers/error");
const { AuthMiddleware } = require("../middlewares/auth.middleware");

router.get("/", AuthMiddleware, async (req, res) => {
  try {
    const constructions = await ConstructionService.getConstructions({});
    return res.status(200).json({
      status: 200,
      constructions,
    });
  } catch (e) {
    handleError(e, res);
  }
});

router.post("/", [
  check('name').not().isEmpty().withMessage('Name is missing'),
  check('location').not().isEmpty().withMessage('Location is missing')
], AuthMiddleware, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  try {
    const construction = await ConstructionService.createConstruction(req.body);
    return res.status(201).json({
      status: 201,
      construction,
    });
  } catch (e) {
    handleError(e, res);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const construction = await ConstructionService.getConstruction(id);
    if (!construction) {
      return res.status(404).json({
        status: 404,
      });
    }
    return res.status(200).json({
      status: 200,
      construction,
    });
  } catch (e) {
    handleError(e, res);
  }
});

router.delete("/:id", AuthMiddleware, async (req, res) => {
  try {
    const construction = await ConstructionService.deleteConstruction(
      req.params.id
    );
    if (!construction) {
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
    const construction = await ConstructionService.updateConstruction(
      id,
      req.body
    );
    if (!construction) {
      return res.status(404).json({
        status: 404,
      });
    }
    return res.status(200).json({
      status: 200,
    });
  } catch (e) {
    handleError(e, res);
  }
});

module.exports = router;
