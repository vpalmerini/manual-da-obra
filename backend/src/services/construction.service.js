const Construction = require("../models/construction.model");
const { ErrorHandler } = require("../helpers/error");

const getConstructions = async (query) => {
  try {
    return await Construction.find(query);
  } catch (e) {
    throw new ErrorHandler(500, e._message);
  }
};

const createConstruction = async (data) => {
  try {
    return await Construction.create(data);
  } catch (e) {
    throw new ErrorHandler(500, e._message);
  }
};

const getConstruction = async (id) => {
  try {
    return await Construction.findById(id);
  } catch (e) {
    throw new ErrorHandler(500, e._message);
  }
};

const deleteConstruction = async (id) => {
  try {
    return await Construction.findByIdAndDelete(id);
  } catch (e) {
    throw new ErrorHandler(500, e._message);
  }
};

const updateConstruction = async (id, data) => {
  try {
    return await Construction.updateOne({ _id: id }, { $set: data });
  } catch (e) {
    throw new ErrorHandler(500, e._message);
  }
};

module.exports = {
  getConstructions,
  createConstruction,
  getConstruction,
  deleteConstruction,
  updateConstruction,
};
