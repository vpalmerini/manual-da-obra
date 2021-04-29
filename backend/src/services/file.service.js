import File from '../models/file.model';

const getFiles = async (query) => File.find(query);

const createFile = async (data) => File.create(data);

const getFile = async (id) => File.findById(id);

const deleteFile = async (params) => File.findOneAndDelete(params);

const updateFile = async (id, data) => {
  await File.findOneAndUpdate({ _id: id }, { $set: data }, { useFindAndModify: false });
  return File.findOne({ _id: id });
};

export { getFiles, createFile, getFile, deleteFile, updateFile };
