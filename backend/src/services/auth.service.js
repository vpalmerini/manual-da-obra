const User = require("../models/user.model");
const { ErrorHandler } = require("../helpers/error");

const getUserWithPassword = async (params) => {
  try {
    return await User.findOne(params).select("+password");
  } catch (e) {
    throw new ErrorHandler(500, e.errmsg);
  }
};

module.exports = { getUserWithPassword };
