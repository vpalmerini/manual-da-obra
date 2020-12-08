const User = require("../models/user.model");

const getUsers = async (query) => {
  try {
    return await User.find(query);
  } catch (e) {
    console.log(e);
  }
};

const createUser = async (data) => {
  try {
    return await User.create(data);
  } catch (e) {
    if (e.code === 11000) {
      console.log(e);
    }
    console.log(e);
  }
};

const getUser = async (id) => {
  try {
    return await User.findById(id);
  } catch (e) {
    console.log(e);
  }
};

const deleteUser = async (id) => {
  try {
    return await User.findByIdAndDelete(id);
  } catch (e) {
    console.log(e);
  }
};

const updateUser = async (id, data) => {
  try {
    await User.updateOne({ _id: id }, { $set: data });
    return await User.findById(id);
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getUsers,
  createUser,
  getUser,
  deleteUser,
  updateUser,
};
