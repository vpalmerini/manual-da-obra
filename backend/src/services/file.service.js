const File = require("../models/file.model");
const { ErrorHandler } = require("../helpers/error");

const getFiles = async (query) => {
  try {
    return await File.find(query);
  } catch (e) {
    throw new ErrorHandler(500, e._message);
  }
}

const createFile = async (data) => {
  try {
    return await File.create(data);
  } catch (e) {
    if (e.code === 11000) {
      throw new ErrorHandler(409, e.errmsg);
    }
    throw new ErrorHandler(500, e._message);
  }
};

const getFile = async (id) => {
  try {
    return await File.findById(id);
  } catch (e) {
    throw new ErrorHandler(500, e._message);
  }
};

const deleteFile = async (params) => {
  try {
    return await File.findOneAndDelete(params);
  } catch (e) {
    throw new ErrorHandler(500, e._message);
  }
};

const updateFile = async (id, data) => {
  try {
    await File.findOneAndUpdate(
      { _id: id },
      { $set: data },
      { useFindAndModify: false }
    );
    return await File.findOne({ _id: id });
  } catch (e) {
    throw new ErrorHandler(500, e._message);
  }
};

module.exports = {
  getFiles,
  createFile,
  getFile,
  deleteFile,
  updateFile,
};
