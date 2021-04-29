import User from '../models/user.model';

const getUsers = async (query) => User.find(query);

const createUser = async (data) => User.create(data);

const getUser = async (id) => User.findById(id);

const deleteUser = async (id) => User.findByIdAndDelete(id);

const updateUser = async (id, data) => {
  await User.updateOne({ _id: id }, { $set: data });
  return User.findById(id);
};

export { getUsers, createUser, getUser, deleteUser, updateUser };
