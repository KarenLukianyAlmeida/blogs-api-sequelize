const { User } = require('../models');
const schema = require('./validations/validationsInputValue');

const { createToken } = require('../utils/createToken');

const getUserByPassword = async (email) => {
  const user = await User.findOne({ where: { email } });

  return user;
};

function validateEmail(email) {
  const pattern = /^[^@]+@[^@]+$/;
  return pattern.test(email);
}

const createUser = async ({ displayName, email, password, image }) => {
  const errorName = schema.validateDisplayName(displayName);
  if (errorName) {
    return { status: errorName.status,
      data: { message: '"displayName" length must be at least 8 characters long' } };
  }

  const isEmailValid = validateEmail(email);
  if (!isEmailValid) return { status: 400, data: { message: '"email" must be a valid email' } };

  const errorPass = schema.validatePassword(password);
  if (errorPass) {
    return {
      status: errorPass.status,
      data: { message: '"password" length must be at least 6 characters long' } };
  } 

  const isEmailExists = await getUserByPassword(email);
  if (isEmailExists) return { status: 409, data: { message: 'User already registered' } };

  const newUser = await User.create({ displayName, email, password, image });
  const token = createToken(newUser.id);

  return { status: 201, data: { token } };
};

module.exports = {
  getUserByPassword,
  createUser,
};