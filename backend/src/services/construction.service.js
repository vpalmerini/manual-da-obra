const Construction = require("../models/construction.model");
const { ErrorHandler } = require("../helpers/error");

const getConstructions = async (query) => {
  try {
    return await Construction.find(query);
  } catch (e) {
    throw new ErrorHandler(500, e.errmsg);
  }
};

const createConstruction = async (data) => {
  try {
    return await Construction.create(data);
  } catch (e) {
    throw new ErrorHandler(500, e.errmsg);
  }
};

const getConstruction = async (id) => {
  try {
    return await Construction.findById(id);
  } catch (e) {
    throw new ErrorHandler(500, e.errmsg);
  }
};

const deleteConstruction = async (id) => {
  try {
    return await Construction.findByIdAndDelete(id);
  } catch (e) {
    throw new ErrorHandler(500, e.errmsg);
  }
};

const updateConstruction = async (id, data) => {
  try {
    await Construction.updateOne({ _id: id }, { $set: data });
  } catch (e) {
    throw new ErrorHandler(500, e.errmsg);
  }
};

module.exports = {
  getConstructions,
  createConstruction,
  getConstruction,
  deleteConstruction,
  updateConstruction,
};
