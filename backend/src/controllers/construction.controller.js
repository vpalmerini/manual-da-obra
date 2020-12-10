const express = require("express");

const router = express.Router();
const ConstructionService = require("../services/construction.service");
const { handleError } = require("../helpers/error");

router.get("/", async (req, res) => {
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

router.post("/", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
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

router.put("/:id", async (req, res) => {
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
