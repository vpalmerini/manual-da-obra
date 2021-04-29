import Construction from '../models/construction.model';

const getConstructions = async (query) => Construction.find(query);

const createConstruction = async (data) => Construction.create(data);

const getConstruction = async (id) => Construction.findById(id).populate('systems');

const deleteConstruction = async (id) => Construction.findByIdAndDelete(id);

const updateConstruction = async (id, data) => Construction.updateOne({ _id: id }, { $set: data });

const addSystem = async (id, systemId) =>
  Construction.findOneAndUpdate(
    { _id: id },
    { $push: { systems: systemId } },
    { new: true, useFindAndModify: false }
  );

export {
  getConstructions,
  createConstruction,
  getConstruction,
  deleteConstruction,
  updateConstruction,
  addSystem,
};
