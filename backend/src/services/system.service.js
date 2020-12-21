const System = require("../models/system.model");
const { ErrorHandler } = require("../helpers/error");

const getSystems = async (query) => {
  try {
    return await System.find(query);
  } catch (e) {
    throw new ErrorHandler(500, e._message);
  }
};

const createSystem = async (data) => {
  try {
    return await System.create(data);
  } catch (e) {
    if (e.code === 11000) {
      throw new ErrorHandler(409, e.errmsg);
    }
    throw new ErrorHandler(500, e._message);
  }
};

const getSystem = async (id, nickname) => {
  try {
    return await System.findOne({ construction: id, nickname }).populate("files").populate("construction", ["name", "image"]);
  } catch (e) {
    throw new ErrorHandler(500, e._message);
  }
};

const deleteSystem = async (params) => {
  try {
    return await System.findOneAndDelete(params);
  } catch (e) {
    throw new ErrorHandler(500, e._message);
  }
};

const updateSystem = async (id, nickname, data) => {
  try {
    await System.findOneAndUpdate(
      { construction: id, nickname },
      { $set: data },
      { useFindAndModify: false }
    );
    return await System.findOne({ construction: id, nickname });
  } catch (e) {
    throw new ErrorHandler(500, e._message);
  }
};

const addFile = async (id, fileId) => {
  try {
    return await System.findOneAndUpdate({ _id: id }, {$push: {files: fileId}}, { new: true, useFindAndModify: false });
  } catch (e) {
    throw new ErrorHandler(500, e._message);
  }
}

module.exports = {
  getSystems,
  createSystem,
  getSystem,
  deleteSystem,
  updateSystem,
  addFile,
};
