const { User } = require('../models');
const schema = require('./validations/validationsInputValue');

const { createToken } = require('../utils/jwt.utils');

const getUsers = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  const formatedUsers = users.map((user) => user.dataValues);
  return { status: 200, data: formatedUsers };
};

const getUserById = async (id) => {
  const user = await User.findOne({
    where: { id },
    attributes: { exclude: ['password'] },
  });
  if (!user) return { status: 404, data: { message: 'User does not exist' } };

  return { status: 200, data: user.dataValues };
};

const getUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

const createUser = async ({ displayName, email, password, image }) => {
  const errorName = schema.validateDisplayName(displayName);
  if (errorName) {
    return { status: errorName.status,
      data: { message: '"displayName" length must be at least 8 characters long' } };
  }

  const isEmailValid = schema.validateEmail(email);
  if (!isEmailValid) return { status: 400, data: { message: '"email" must be a valid email' } };

  const errorPass = schema.validatePassword(password);
  if (errorPass) {
    return { status: errorPass.status,
      data: { message: '"password" length must be at least 6 characters long' } };
  } 

  const isEmailExists = await getUserByEmail(email);
  if (isEmailExists) return { status: 409, data: { message: 'User already registered' } };

  const newUser = await User.create({ displayName, email, password, image });
  const token = createToken({ displayName: newUser.dataValues.displayName,
    email: newUser.dataValues.email });

  return { status: 201, data: { token } };
};

module.exports = {
  getUserByEmail,
  createUser,
  getUsers,
  getUserById,
};