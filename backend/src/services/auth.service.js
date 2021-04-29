import User from '../models/user.model';

const getUserWithPassword = async (params) => User.findOne(params).select('+password');

export { getUserWithPassword };
