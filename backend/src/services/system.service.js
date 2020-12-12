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
  
  const getSystem = async (name) => {
    try {
      return await System.findOne({ name });
    } catch (e) {
      throw new ErrorHandler(500, e._message);
    }
  };
  
  const deleteSystem = async (id) => {
    try {
      return await System.findByIdAndDelete(id);
    } catch (e) {
      throw new ErrorHandler(500, e._message);
    }
  };
  
  const updateSystem = async (name, data) => {
    try {
      await System.updateOne({ name }, { $set: data });
      return await System.findById(id);
    } catch (e) {
      throw new ErrorHandler(500, e._message);
    }
  };
  
  module.exports = {
    getSystems,
    createSystem,
    getSystem,
    deleteSystem,
    updateSystem,
  };