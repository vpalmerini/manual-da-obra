import System from '../models/system.model';

const getSystems = async (query) => System.find(query);

const createSystem = async (data) => System.create(data);

const getSystem = async (id, nickname) =>
  System.findOne({ construction: id, nickname })
    .populate('files')
    .populate('construction', ['name', 'image']);

const deleteSystem = async (params) => System.findOneAndDelete(params);

const updateSystem = async (id, nickname, data) =>
  System.findOneAndUpdate(
    { construction: id, nickname },
    { $set: data },
    { useFindAndModify: false }
  );

const addFile = async (id, fileId) =>
  System.findOneAndUpdate(
    { _id: id },
    { $push: { files: fileId } },
    { new: true, useFindAndModify: false }
  );

export { getSystems, createSystem, getSystem, deleteSystem, updateSystem, addFile };
